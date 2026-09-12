import { NextResponse } from "next/server";
import { GITHUB_FALLBACK_DATA } from "@/data/githubFallback";
import { GitHubContributionDay, GitHubTelemetryData } from "@/types/github";

export const revalidate = 1800; // 30 minutes cache

export async function GET() {
  try {
    const headers: Record<string, string> = {
      "User-Agent": "Portfolio-VarshanGowda/2.0",
      Accept: "application/vnd.github.v3+json",
    };

    // Parallel fetch with 3.5s timeout guard
    const [userRes, eventsRes, contribRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/varshuai", {
        headers,
        signal: AbortSignal.timeout(3500),
        next: { revalidate: 1800 },
      }),
      fetch("https://api.github.com/users/varshuai/events/public", {
        headers,
        signal: AbortSignal.timeout(3500),
        next: { revalidate: 600 },
      }),
      fetch("https://github-contributions-api.jogruber.de/v4/varshuai?y=last", {
        signal: AbortSignal.timeout(3500),
        next: { revalidate: 3600 },
      }),
    ]);

    let publicRepos = GITHUB_FALLBACK_DATA.publicRepos;
    let followers = GITHUB_FALLBACK_DATA.followers;
    let following = GITHUB_FALLBACK_DATA.following;
    let createdAt = GITHUB_FALLBACK_DATA.createdAt;

    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const userData = await userRes.value.json();
      if (userData && typeof userData.public_repos === "number") {
        publicRepos = userData.public_repos;
        followers = userData.followers ?? followers;
        following = userData.following ?? following;
        createdAt = userData.created_at ?? createdAt;
      }
    }

    let recentEvents = GITHUB_FALLBACK_DATA.recentEvents;
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      const eventsData = await eventsRes.value.json();
      if (Array.isArray(eventsData) && eventsData.length > 0) {
        recentEvents = eventsData.slice(0, 5).map((evt: { id: string; type: string; repo?: { name: string }; created_at: string }) => {
          const repoName = evt.repo?.name || "varshuai/repository";
          let action = "Activity recorded";
          if (evt.type === "PushEvent") action = "Pushed commits to repository";
          else if (evt.type === "CreateEvent") action = "Created branch / repository";
          else if (evt.type === "WatchEvent") action = "Starred repository";
          else if (evt.type === "ForkEvent") action = "Forked repository";
          else if (evt.type === "PullRequestEvent") action = "Pull request activity";

          return {
            id: evt.id,
            type: evt.type,
            repo: repoName,
            repoUrl: `https://github.com/${repoName}`,
            createdAt: evt.created_at,
            actionSummary: action,
          };
        });
      }
    }

    let contributions: GitHubContributionDay[] = [];
    let totalContributionsLastYear = GITHUB_FALLBACK_DATA.totalContributionsLastYear;

    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      const contribData = await contribRes.value.json();
      if (contribData?.contributions && Array.isArray(contribData.contributions)) {
        contributions = contribData.contributions.map((c: { date: string; count: number; level: number }) => ({
          date: c.date,
          count: c.count,
          level: (Math.min(Math.max(c.level, 0), 4) as 0 | 1 | 2 | 3 | 4),
        }));
        if (contribData.total?.lastYear !== undefined) {
          totalContributionsLastYear = contribData.total.lastYear;
        } else if (contribData.total?.["2026"] !== undefined) {
          totalContributionsLastYear = contribData.total["2026"];
        }
      }
    }

    const payload: GitHubTelemetryData = {
      login: "VarshuAi",
      profileUrl: "https://github.com/varshuai",
      publicRepos,
      followers,
      following,
      createdAt,
      totalContributionsLastYear,
      contributions,
      recentEvents,
      repositories: GITHUB_FALLBACK_DATA.repositories,
      isLive: true,
      lastFetched: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("Failed to fetch live GitHub telemetry:", err);
    // Graceful fallback with verified non-fabricated cache
    return NextResponse.json(GITHUB_FALLBACK_DATA, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300",
      },
    });
  }
}

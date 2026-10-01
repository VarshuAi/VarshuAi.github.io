import { NextResponse } from "next/server";
import { GITHUB_FALLBACK_DATA } from "@/data/githubFallback";
import { GitHubContributionDay, GitHubEventItem, GitHubRepoItem, GitHubTelemetryData } from "@/types/github";

export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 seconds revalidation for live freshness

interface RawGitHubEvent {
  id: string;
  type: string;
  repo?: { name: string };
  payload?: {
    action?: string;
    ref?: string;
    ref_type?: string;
  };
  created_at: string;
}

interface RawGitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "1";

    const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    const headers: Record<string, string> = {
      "User-Agent": "Portfolio-VarshanGowda/2.0",
      Accept: "application/vnd.github.v3+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const fetchOptions: RequestInit = {
      headers,
      signal: AbortSignal.timeout(4500),
      ...(forceRefresh ? { cache: "no-store" } : { next: { revalidate: 60 } }),
    };

    // Parallel fetch: user stats, public events, contributions, user repos, and org repos
    const [userRes, eventsRes, contribRes, userReposRes, orgReposRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/varshuai", fetchOptions),
      fetch("https://api.github.com/users/varshuai/events/public?per_page=12", fetchOptions),
      fetch("https://github-contributions-api.jogruber.de/v4/varshuai?y=last", {
        signal: AbortSignal.timeout(4500),
        ...(forceRefresh ? { cache: "no-store" } : { next: { revalidate: 1800 } }),
      }),
      fetch("https://api.github.com/users/varshuai/repos?sort=pushed&direction=desc&per_page=12", fetchOptions),
      fetch("https://api.github.com/orgs/VelorioLabs/repos?sort=pushed&direction=desc&per_page=6", fetchOptions),
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
        recentEvents = eventsData.slice(0, 8).map((evt: RawGitHubEvent): GitHubEventItem => {
          const repoName = evt.repo?.name || "varshuai/repository";
          let action = "Activity recorded";

          if (evt.type === "PushEvent") {
            const branch = evt.payload?.ref ? evt.payload.ref.replace("refs/heads/", "") : "main";
            action = `Pushed commits to ${branch}`;
          } else if (evt.type === "CreateEvent") {
            const refType = evt.payload?.ref_type || "branch";
            const ref = evt.payload?.ref ? ` '${evt.payload.ref}'` : "";
            action = `Created ${refType}${ref}`;
          } else if (evt.type === "WatchEvent") {
            action = "Starred repository";
          } else if (evt.type === "ForkEvent") {
            action = "Forked repository";
          } else if (evt.type === "PullRequestEvent") {
            const prAction = evt.payload?.action || "updated";
            action = `${prAction.charAt(0).toUpperCase() + prAction.slice(1)} pull request`;
          } else if (evt.type === "IssuesEvent") {
            const issueAction = evt.payload?.action || "updated";
            action = `${issueAction.charAt(0).toUpperCase() + issueAction.slice(1)} issue`;
          }

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

    // Dynamic Repositories Merging & Sorting by Pushed Date
    let repositories: GitHubRepoItem[] = GITHUB_FALLBACK_DATA.repositories;
    const fetchedRepos: RawGitHubRepo[] = [];

    if (userReposRes.status === "fulfilled" && userReposRes.value.ok) {
      const data = await userReposRes.value.json();
      if (Array.isArray(data)) fetchedRepos.push(...data);
    }

    if (orgReposRes.status === "fulfilled" && orgReposRes.value.ok) {
      const data = await orgReposRes.value.json();
      if (Array.isArray(data)) fetchedRepos.push(...data);
    }

    if (fetchedRepos.length > 0) {
      // Filter out self-profile config repo and forks without changes
      const filtered = fetchedRepos.filter(
        (r) => r.name.toLowerCase() !== "varshuai" && !r.name.startsWith(".")
      );

      // Sort by pushed_at descending (most recent first!)
      filtered.sort((a, b) => {
        const timeA = new Date(a.pushed_at || a.updated_at).getTime();
        const timeB = new Date(b.pushed_at || b.updated_at).getTime();
        return timeB - timeA;
      });

      // Deduplicate by full_name
      const seen = new Set<string>();
      const uniqueRepos = filtered.filter((r) => {
        if (seen.has(r.full_name)) return false;
        seen.add(r.full_name);
        return true;
      });

      const now = Date.now();
      repositories = uniqueRepos.slice(0, 10).map((r): GitHubRepoItem => {
        const pushedTime = new Date(r.pushed_at || r.updated_at).getTime();
        const diffDays = Math.floor((now - pushedTime) / (1000 * 60 * 60 * 24));

        let tag = "OPEN SOURCE";
        if (diffDays <= 4) {
          tag = "RECENTLY PUSHED";
        } else if (diffDays <= 14) {
          tag = "ACTIVE DEV";
        } else if (r.stargazers_count > 0) {
          tag = "COMMUNITY";
        } else if (r.full_name.startsWith("VelorioLabs")) {
          tag = "ORG REPO";
        }

        let description = r.description;
        if (!description && r.name === "A1Swaara_apk") {
          description = "Official Android APK release for A1 Swaara 320 kbps high-fidelity music streaming suite.";
        } else if (!description && r.name === "a1raaga-web") {
          description = "Web audio player and companion interface for Raaga music streaming.";
        }

        return {
          name: r.name,
          fullName: r.full_name,
          description: description || "Open source software engineered by Varshan Gowda.",
          language: r.language || (r.name.includes("Swaara") ? "Flutter" : "TypeScript"),
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          url: r.html_url,
          updatedAt: r.pushed_at || r.updated_at,
          tag,
        };
      });
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
      repositories,
      isLive: true,
      lastFetched: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": forceRefresh
          ? "no-store, no-cache, must-revalidate"
          : "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    console.error("Failed to fetch live GitHub telemetry:", err);
    return NextResponse.json(GITHUB_FALLBACK_DATA, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    });
  }
}

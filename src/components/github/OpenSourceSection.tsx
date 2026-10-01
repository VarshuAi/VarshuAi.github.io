"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { GitHubTelemetryData } from "@/types/github";
import { GITHUB_FALLBACK_DATA } from "@/data/githubFallback";
import { ContributionGraph } from "./ContributionGraph";
import { ActivityFeed } from "./ActivityFeed";
import { RepoCard } from "./RepoCard";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/primitives/Button";
import { ArrowUpRight, RefreshCw, AlertCircle, Radio } from "lucide-react";

interface OpenSourceSectionProps {
  initialData?: GitHubTelemetryData;
}

export function OpenSourceSection({
  initialData = GITHUB_FALLBACK_DATA,
}: OpenSourceSectionProps) {
  const [data, setData] = useState<GitHubTelemetryData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<number>(() => Date.now());
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(() => Date.now());
  const [repoFilter, setRepoFilter] = useState<"recent" | "flagship" | "all">("recent");

  // Format relative seconds/minutes since last automated sync
  const formatSyncAge = useCallback((lastTime: number, nowTime: number): string => {
    const diffSec = Math.max(0, Math.floor((nowTime - lastTime) / 1000));
    if (diffSec < 5) return "Just updated";
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    return `${diffMin}m ago`;
  }, []);

  // Update clock tick every 5s for the relative sync counter
  useEffect(() => {
    const tick = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 5000);
    return () => clearInterval(tick);
  }, []);

  // Automated background polling & visibility-change revalidation
  useEffect(() => {
    let isCancelled = false;

    const executeFetch = async (isManual = false) => {
      if (isManual) {
        setIsLoading(true);
      }
      try {
        const res = await fetch(`/api/github?refresh=1&t=${Date.now()}`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const freshData: GitHubTelemetryData = await res.json();
        if (!isCancelled) {
          setData(freshData);
          setLastSyncTimestamp(Date.now());
          setHasError(false);
        }
      } catch (err) {
        console.warn("Automated GitHub telemetry sync issue:", err);
        if (!isCancelled) {
          setData((prev) => {
            if (!prev.isLive) setHasError(true);
            return prev;
          });
        }
      } finally {
        if (!isCancelled && isManual) {
          setIsLoading(false);
        }
      }
    };

    // Initial automated background fetch (no synchronous setState)
    executeFetch(false);

    // Automated background interval: every 60s
    const pollInterval = setInterval(() => {
      executeFetch(false);
    }, 60_000);

    // Automated focus / visibility revalidation
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        executeFetch(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    return () => {
      isCancelled = true;
      clearInterval(pollInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await fetch(`/api/github?refresh=1&t=${Date.now()}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const freshData: GitHubTelemetryData = await res.json();
      setData(freshData);
      setLastSyncTimestamp(Date.now());
    } catch (err) {
      console.warn("Manual refresh failed:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered & sorted repositories
  const displayedRepos = useMemo(() => {
    const list = [...data.repositories];

    if (repoFilter === "recent") {
      // Sort strictly by most recently updated/pushed
      return list.sort((a, b) => {
        const timeA = new Date(a.updatedAt).getTime();
        const timeB = new Date(b.updatedAt).getTime();
        return timeB - timeA;
      });
    }

    if (repoFilter === "flagship") {
      // Prioritize flagship / established systems
      return list.filter(
        (r) =>
          r.fullName.includes("A1Swaara") ||
          r.fullName.includes("movie") ||
          r.fullName.includes("PhishGuard") ||
          r.fullName.includes("AetherEye") ||
          r.fullName.includes("SubVortex")
      );
    }

    return list;
  }, [data.repositories, repoFilter]);

  const syncAgeText = formatSyncAge(lastSyncTimestamp, currentTimestamp);

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[rgba(245,240,232,0.06)]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E988F]">
            <span className="text-[#C8FF00] font-semibold">{"//"}</span>
            <span>03 // OPEN ACTIVITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F5F0E8]">
            BUILDING IN PUBLIC.
          </h2>

          <p className="text-base text-[#9E988F] leading-relaxed">
            &ldquo;I learn by building, experimenting, contributing, and shipping.&rdquo;
          </p>
        </div>

        {/* Action Controls & Automated Telemetry Status */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Automated Live Sync Status Badge */}
          <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#121212] border border-[rgba(245,240,232,0.08)] flex items-center gap-2 select-none shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF00]" />
            </span>
            <span className="text-[#C8FF00] font-semibold text-[11px] tracking-wider uppercase">
              AUTO-SYNC ON
            </span>
            <span className="text-[#68635B] text-[10px] hidden sm:inline">•</span>
            <span className="text-[#9E988F] text-[11px] hidden sm:inline">
              {isLoading ? "Syncing..." : syncAgeText}
            </span>
            <button
              onClick={handleManualRefresh}
              disabled={isLoading}
              title="Force sync now"
              aria-label="Force sync telemetry"
              className="text-[#68635B] hover:text-[#C8FF00] transition-colors ml-1 p-0.5 inline-flex items-center justify-center cursor-pointer"
            >
              <RefreshCw
                className={`w-3 h-3 ${isLoading ? "animate-spin text-[#C8FF00]" : ""}`}
              />
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            href="https://github.com/varshuai"
            isExternal
            icon={<GithubIcon className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            GitHub @varshuai
          </Button>

          <Button
            variant="ghost"
            size="sm"
            href="https://github.com/VelorioLabs"
            isExternal
            icon={<ArrowUpRight className="w-3.5 h-3.5 text-[#68635B]" />}
            iconPosition="right"
          >
            VelorioLabs
          </Button>
        </div>
      </div>

      {/* Error / Offline Notification Banner (Non-Intrusive) */}
      {hasError && (
        <div className="p-3 rounded-md bg-[#18120B] border border-yellow-500/20 flex items-center justify-between font-mono text-xs text-yellow-200/80">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>
              Live GitHub API rate-limited or unreachable. Displaying verified local audit snapshot.
            </span>
          </div>
          <button
            onClick={handleManualRefresh}
            className="underline hover:text-white transition-colors ml-4 shrink-0 cursor-pointer"
          >
            Retry Sync
          </button>
        </div>
      )}

      {/* Verified Metrics Strip (Strictly Real Numbers) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="p-4 sm:p-5 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-1">
          <div className="text-[10px] text-[#68635B] uppercase tracking-wider">
            Contributions (12M)
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-[#F5F0E8] tracking-tight">
            {data.totalContributionsLastYear}
          </div>
          <div className="text-[11px] text-[#9E988F]">
            Verified commits & PRs
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-1">
          <div className="text-[10px] text-[#68635B] uppercase tracking-wider">
            Public Repositories
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-[#F5F0E8] tracking-tight">
            {data.publicRepos}
          </div>
          <div className="text-[11px] text-[#9E988F]">
            Active GitHub repositories
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-1">
          <div className="text-[10px] text-[#68635B] uppercase tracking-wider">
            Developer Network
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-[#F5F0E8] tracking-tight">
            {data.followers}
          </div>
          <div className="text-[11px] text-[#9E988F]">
            Followers tracking code
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-1">
          <div className="text-[10px] text-[#68635B] uppercase tracking-wider">
            Organization
          </div>
          <div className="text-xl sm:text-2xl font-medium text-[#C8FF00] tracking-tight truncate">
            VelorioLabs
          </div>
          <div className="text-[11px] text-[#9E988F]">
            Open-source collective
          </div>
        </div>
      </div>

      {/* Interactive Contribution Heatmap */}
      <ContributionGraph
        contributions={data.contributions}
        totalContributions={data.totalContributionsLastYear}
      />

      {/* Dual Column: Live Git Activity Stream + Selected Repositories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Terminal Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#68635B] uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#C8FF00]" />
              {"//"} RECENT TRANSMISSIONS
            </span>
            <span className="text-[#9E988F] text-[11px] font-mono">
              Auto-sync: {syncAgeText}
            </span>
          </div>
          <ActivityFeed events={data.recentEvents} />
        </div>

        {/* Right Column: Automated Repositories (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#68635B] uppercase tracking-wider">
                {"//"} REPOSITORIES
              </span>
              {/* Automated View Selector */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#141414] border border-[rgba(245,240,232,0.08)]">
                <button
                  type="button"
                  onClick={() => setRepoFilter("recent")}
                  className={`px-2 py-0.5 rounded text-[10px] tracking-wider transition-all cursor-pointer ${
                    repoFilter === "recent"
                      ? "bg-[#202020] text-[#C8FF00] font-semibold border border-[rgba(200,255,0,0.3)] shadow-sm"
                      : "text-[#9E988F] hover:text-[#F5F0E8]"
                  }`}
                >
                  RECENT
                </button>
                <button
                  type="button"
                  onClick={() => setRepoFilter("flagship")}
                  className={`px-2 py-0.5 rounded text-[10px] tracking-wider transition-all cursor-pointer ${
                    repoFilter === "flagship"
                      ? "bg-[#202020] text-[#C8FF00] font-semibold border border-[rgba(200,255,0,0.3)] shadow-sm"
                      : "text-[#9E988F] hover:text-[#F5F0E8]"
                  }`}
                >
                  FLAGSHIP
                </button>
                <button
                  type="button"
                  onClick={() => setRepoFilter("all")}
                  className={`px-2 py-0.5 rounded text-[10px] tracking-wider transition-all cursor-pointer ${
                    repoFilter === "all"
                      ? "bg-[#202020] text-[#C8FF00] font-semibold border border-[rgba(200,255,0,0.3)] shadow-sm"
                      : "text-[#9E988F] hover:text-[#F5F0E8]"
                  }`}
                >
                  ALL
                </button>
              </div>
            </div>

            <a
              href="https://github.com/varshuai?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9E988F] hover:text-[#C8FF00] transition-colors inline-flex items-center gap-1 text-[11px]"
            >
              <span>View all {data.publicRepos} on GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {displayedRepos.map((repo) => (
              <RepoCard key={repo.fullName} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

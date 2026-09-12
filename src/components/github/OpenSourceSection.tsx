"use client";

import { useEffect, useState } from "react";
import { GitHubTelemetryData } from "@/types/github";
import { GITHUB_FALLBACK_DATA } from "@/data/githubFallback";
import { ContributionGraph } from "./ContributionGraph";
import { ActivityFeed } from "./ActivityFeed";
import { RepoCard } from "./RepoCard";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/primitives/Button";
import { ArrowUpRight, RefreshCw, AlertCircle } from "lucide-react";

interface OpenSourceSectionProps {
  initialData?: GitHubTelemetryData;
}

export function OpenSourceSection({
  initialData = GITHUB_FALLBACK_DATA,
}: OpenSourceSectionProps) {
  const [data, setData] = useState<GitHubTelemetryData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Cached baseline");

  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        const res = await fetch("/api/github", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const freshData: GitHubTelemetryData = await res.json();
        if (!isCancelled) {
          setData(freshData);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.warn("Falling back to verified GitHub baseline:", err);
        if (!isCancelled) {
          setHasError(true);
          setLastSyncTime("Offline fallback");
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await fetch("/api/github", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const freshData: GitHubTelemetryData = await res.json();
      setData(freshData);
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.warn("Manual refresh failed:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Action Controls & Telemetry Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#121212] border border-[rgba(245,240,232,0.08)] flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                data.isLive
                  ? "bg-[#C8FF00] animate-pulse shadow-[0_0_8px_#C8FF00]"
                  : "bg-yellow-400"
              }`}
            />
            <span className="text-[#9E988F]">
              {data.isLive ? "LIVE TELEMETRY" : "VERIFIED CACHE"}
            </span>
            <button
              onClick={handleManualRefresh}
              disabled={isLoading}
              title="Refresh GitHub telemetry"
              aria-label="Refresh telemetry data"
              className="text-[#68635B] hover:text-[#F5F0E8] transition-colors ml-1"
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
            className="underline hover:text-white transition-colors ml-4 shrink-0"
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
            <span className="text-[#68635B] uppercase tracking-wider">
              {"//"} RECENT TRANSMISSIONS
            </span>
            <span className="text-[#9E988F] text-[11px]">Synced: {lastSyncTime}</span>
          </div>
          <ActivityFeed events={data.recentEvents} />
        </div>

        {/* Right Column: Selected Public Repositories (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#68635B] uppercase tracking-wider">
              {"//"} CURATED PUBLIC REPOSITORIES
            </span>
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
            {data.repositories.map((repo) => (
              <RepoCard key={repo.fullName} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

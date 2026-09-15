"use client";

import { useState, useMemo } from "react";
import { GitHubContributionDay } from "@/types/github";

interface ContributionGraphProps {
  contributions: GitHubContributionDay[];
  totalContributions: number;
}

export function ContributionGraph({
  contributions,
  totalContributions,
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<GitHubContributionDay | null>(null);

  // Group into columns of 7 days (weeks)
  // Display the last 32 weeks on desktop, scrollable on smaller screens
  const weeks = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      // Generate placeholder weeks if data is still loading
      const dummy: GitHubContributionDay[][] = [];
      for (let w = 0; w < 32; w++) {
        const week: GitHubContributionDay[] = [];
        for (let d = 0; d < 7; d++) {
          week.push({ date: "", count: 0, level: 0 });
        }
        dummy.push(week);
      }
      return dummy;
    }

    // Take the last ~224 days (32 weeks) for optimal display
    const recent = contributions.slice(-224);
    const cols: GitHubContributionDay[][] = [];
    let currentWeek: GitHubContributionDay[] = [];

    recent.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === recent.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });

    return cols;
  }, [contributions]);

  const levelStyles: Record<number, string> = {
    0: "bg-[rgba(245,240,232,0.04)] border-[rgba(245,240,232,0.05)]",
    1: "bg-[#C8FF00]/25 border-[#C8FF00]/40 shadow-[0_0_6px_rgba(200,255,0,0.15)]",
    2: "bg-[#C8FF00]/50 border-[#C8FF00]/65 shadow-[0_0_8px_rgba(200,255,0,0.25)]",
    3: "bg-[#C8FF00]/75 border-[#C8FF00]/85 shadow-[0_0_10px_rgba(200,255,0,0.4)]",
    4: "bg-[#C8FF00] border-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.6)]",
  };

  return (
    <div className="rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] p-5 sm:p-6 space-y-4">
      {/* Top Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#68635B]">HEATMAP //</span>
          <span className="text-[#F5F0E8] font-medium tracking-wide">
            {totalContributions} Contributions Recorded
          </span>
          <span className="text-[#68635B]">in the last 12 months</span>
        </div>

        {/* Live Hover Readout */}
        <div className="h-5 flex items-center">
          {hoveredDay && hoveredDay.date ? (
            <span className="text-[#C8FF00] font-mono text-[11px] bg-[rgba(200,255,0,0.08)] px-2 py-0.5 rounded border border-[rgba(200,255,0,0.2)]">
              {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : (
            <span className="text-[#68635B] text-[11px]">Hover or tap nodes to inspect daily activity</span>
          )}
        </div>
      </div>

      {/* Grid Canvas with Smooth Horizontal Scroll for Mobile */}
      <div className="overflow-x-auto pb-2 scrollbar-thin overscroll-x-contain">
        <div className="inline-flex gap-1.5 min-w-max p-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  onMouseEnter={() => day.date && setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => day.date && setHoveredDay(day)}
                  onTouchStart={() => day.date && setHoveredDay(day)}
                  className={`w-3.5 h-3.5 rounded-[2px] border transition-transform duration-100 hover:scale-125 cursor-pointer active:scale-125 ${
                    levelStyles[day.level] || levelStyles[0]
                  }`}
                  aria-label={
                    day.date ? `${day.count} contributions on ${day.date}` : undefined
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Meta */}
      <div className="pt-2 border-t border-[rgba(245,240,232,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-[#68635B]">
        <div>Displaying last 32 weeks of verified GitHub commit & contribution frequency</div>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[rgba(245,240,232,0.04)] border border-[rgba(245,240,232,0.05)]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#C8FF00]/25 border border-[#C8FF00]/40" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#C8FF00]/50 border border-[#C8FF00]/65" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#C8FF00]/75 border border-[#C8FF00]/85" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#C8FF00] border border-[#C8FF00]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

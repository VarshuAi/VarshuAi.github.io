"use client";

import React, { useState } from "react";
import { Code2, ArrowUpRight, BookOpen } from "lucide-react";
import { ExperimentItem } from "@/data/experiments";
import { SortingVisualizer } from "./sorting/SortingVisualizer";
import { GithubIcon } from "@/components/icons/GithubIcon";

interface ExperimentRunnerProps {
  experiment: ExperimentItem;
  defaultExpanded?: boolean;
}

export function ExperimentRunner({
  experiment,
}: ExperimentRunnerProps) {
  const [activeTab, setActiveTab] = useState<"visualizer" | "how-it-works" | "code">("visualizer");

  return (
    <div className="space-y-6">
      {/* Component Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[rgba(245,240,232,0.06)] font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("visualizer")}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === "visualizer"
                ? "bg-[#1A1A1A] text-[#C8FF00] font-semibold border border-[rgba(245,240,232,0.1)]"
                : "text-[#9E988F] hover:text-[#F5F0E8]"
            }`}
          >
            PLAYGROUND VIEW
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("how-it-works")}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === "how-it-works"
                ? "bg-[#1A1A1A] text-[#C8FF00] font-semibold border border-[rgba(245,240,232,0.1)]"
                : "text-[#9E988F] hover:text-[#F5F0E8]"
            }`}
          >
            HOW IT WORKS
          </button>
          {experiment.codeSnippet && (
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === "code"
                  ? "bg-[#1A1A1A] text-[#C8FF00] font-semibold border border-[rgba(245,240,232,0.1)]"
                  : "text-[#9E988F] hover:text-[#F5F0E8]"
              }`}
            >
              SOURCE CODE
            </button>
          )}
        </div>

        {experiment.githubUrl && (
          <a
            href={experiment.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#9E988F] hover:text-[#C8FF00] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>View Source on GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#68635B]" />
          </a>
        )}
      </div>

      {/* Tab 1: Interactive Canvas */}
      {activeTab === "visualizer" && (
        <div className="space-y-4">
          {experiment.slug === "sorting-lab" && <SortingVisualizer />}
        </div>
      )}

      {/* Tab 2: How It Works & Invariants */}
      {activeTab === "how-it-works" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THEORY & INVARIANTS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F5F0E8]">
              Mathematical Mechanics of Comparison Sorts
            </h3>
            <p className="text-sm text-[#9E988F] leading-relaxed max-w-3xl">
              {experiment.howItWorks}
            </p>
          </div>

          {experiment.algorithmDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {Object.values(experiment.algorithmDetails).map((algo) => (
                <div
                  key={algo.name}
                  className="p-4 rounded-xl bg-[#080808] border border-[rgba(245,240,232,0.06)] space-y-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-semibold text-[#F5F0E8]">{algo.name}</span>
                    <span className="text-[#C8FF00]">{algo.timeAverage}</span>
                  </div>
                  <p className="text-xs text-[#9E988F] leading-relaxed">
                    {algo.summary}
                  </p>
                  <div className="pt-2 border-t border-[rgba(245,240,232,0.04)] font-mono text-[10px] text-[#68635B]">
                    <span className="text-[#9E988F] font-semibold">INVARIANT:</span> {algo.invariants}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Source Code Preview */}
      {activeTab === "code" && experiment.codeSnippet && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#080808] border border-[rgba(245,240,232,0.08)] space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-[#68635B] pb-3 border-b border-[rgba(245,240,232,0.06)]">
            <div className="flex items-center gap-2 text-[#9E988F]">
              <Code2 className="w-4 h-4 text-[#C8FF00]" />
              <span>{experiment.codeSnippet.filename}</span>
            </div>
            <span>{experiment.codeSnippet.language}</span>
          </div>

          <pre className="p-4 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.04)] font-mono text-xs text-[#E6E1D8] overflow-x-auto leading-relaxed">
            <code>{experiment.codeSnippet.code}</code>
          </pre>

          <div className="text-xs text-[#9E988F] flex items-center justify-between pt-2">
            <span>Synchronized generator implementation decoupling computation from UI frames.</span>
            {experiment.githubUrl && (
              <a
                href={experiment.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#C8FF00] hover:underline"
              >
                Inspect repository ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

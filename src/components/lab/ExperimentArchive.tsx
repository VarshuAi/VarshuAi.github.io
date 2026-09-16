"use client";

import React, { useState } from "react";
import { ExperimentCategory, ExperimentItem, ACTIVE_CATEGORIES } from "@/data/experiments";
import { ExperimentCard } from "./ExperimentCard";

interface ExperimentArchiveProps {
  experiments: ExperimentItem[];
}

export function ExperimentArchive({ experiments }: ExperimentArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<ExperimentCategory>("ALL");

  const filteredExperiments =
    selectedCategory === "ALL"
      ? experiments
      : experiments.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Navigation */}
      <div className="flex items-center justify-between border-b border-[rgba(245,240,232,0.06)] pb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {ACTIVE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1A1A1A] text-[#C8FF00] border border-[rgba(200,255,0,0.3)] font-semibold"
                    : "text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#121212] border border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-[#68635B] hidden sm:inline">
          {filteredExperiments.length} {filteredExperiments.length === 1 ? "EXPERIMENT" : "EXPERIMENTS"}
        </span>
      </div>

      {/* Grid of Experiments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredExperiments.map((exp) => (
          <ExperimentCard key={exp.slug} experiment={exp} />
        ))}
      </div>
    </div>
  );
}

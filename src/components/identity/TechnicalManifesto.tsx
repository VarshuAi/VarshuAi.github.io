"use client";

import React, { useState } from "react";
import { Cpu, Layers, Code, GitPullRequest } from "lucide-react";
import { TechnicalCategory } from "@/data/profile";

interface TechnicalManifestoProps {
  categories: TechnicalCategory[];
  compactStack: {
    languages: string[];
    technologies: string[];
  };
}

export function TechnicalManifesto({
  categories,
  compactStack,
}: TechnicalManifestoProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categoryIcons = [
    <Cpu key="cpu" className="w-4 h-4 text-[#C8FF00]" />,
    <Code key="code" className="w-4 h-4 text-[#C8FF00]" />,
    <Layers key="layers" className="w-4 h-4 text-[#C8FF00]" />,
    <GitPullRequest key="git" className="w-4 h-4 text-[#C8FF00]" />,
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 4 Editorial Category Rows */}
      <div className="divide-y divide-[rgba(245,240,232,0.08)] border-y border-[rgba(245,240,232,0.08)]">
        {categories.map((cat, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={cat.number}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(idx)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              role="region"
              aria-label={`${cat.number} — ${cat.title}`}
              className={`group py-8 sm:py-10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] px-3 sm:px-6 rounded-lg ${
                isHovered
                  ? "bg-[#111111] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                  : "bg-transparent hover:bg-[#0E0E0E]"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Number & Primary Title */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#68635B] group-hover:text-[#C8FF00] transition-colors">
                      {cat.number}
                    </span>
                    <span className="text-[#68635B] text-xs font-mono">{"//"}</span>
                    <div className="p-1 rounded bg-[#141414] border border-[rgba(245,240,232,0.06)]">
                      {categoryIcons[idx % categoryIcons.length]}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>

                  {/* Subcategories */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="font-mono text-xs text-[#9E988F] group-hover:text-[#F5F0E8] transition-colors"
                      >
                        • {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Narrative & Interactive Technology Reveal */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm sm:text-base text-[#9E988F] leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Supporting Architecture & Technology Context (Revealed / Emphasized on hover) */}
                  <div
                    className={`pt-3 transition-all duration-300 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-75"
                    }`}
                  >
                    <div className="font-mono text-[11px] uppercase tracking-widest text-[#68635B] mb-2 flex items-center gap-1.5">
                      <span className="text-[#C8FF00] font-bold">›</span>
                      <span>Active Focus & Supporting Systems</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.contextTechnologies.map((item) => (
                        <span
                          key={item}
                          className={`font-mono text-xs px-2.5 py-1 rounded transition-all duration-200 ${
                            isHovered
                              ? "bg-[#181818] text-[#F5F0E8] border border-[rgba(200,255,0,0.3)] shadow-[0_0_8px_rgba(200,255,0,0.08)]"
                              : "bg-[#141414] text-[#9E988F] border border-[rgba(245,240,232,0.06)]"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact Foundational Technical Stack Underneath */}
      <div className="rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[rgba(245,240,232,0.06)] pb-4">
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase tracking-widest text-[#68635B]">
              FOUNDATIONAL TOOLING & RUNTIMES
            </div>
            <h4 className="text-lg font-medium text-[#F5F0E8] tracking-tight">
              Compact Technical Stack
            </h4>
          </div>
          <div className="font-mono text-[11px] text-[#68635B]">
            STRICTLY PROFILED / NON-INFLATED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          {/* Languages Column */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-[#9E988F] flex items-center gap-2">
              <span className="text-[#C8FF00] font-semibold">{"//"}</span>
              <span>Core Languages</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {compactStack.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 rounded bg-[#141414] text-[#F5F0E8] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Technologies Column */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-[#9E988F] flex items-center gap-2">
              <span className="text-[#C8FF00] font-semibold">{"//"}</span>
              <span>Technologies & Environments</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {compactStack.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded bg-[#141414] text-[#F5F0E8] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

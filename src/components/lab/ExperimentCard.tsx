import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { ExperimentItem } from "@/data/experiments";

export function ExperimentCard({ experiment }: { experiment: ExperimentItem }) {
  const detailHref = `/lab/${experiment.slug}`;

  return (
    <article className="group rounded-2xl bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.22)] p-6 sm:p-7 space-y-6 transition-all flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-[#C8FF00] font-bold tracking-wider">{experiment.number}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#161616] text-[#9E988F] border border-[rgba(245,240,232,0.06)]">
              {experiment.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                experiment.status === "STABLE"
                  ? "bg-[#142314] text-[#C8FF00] border border-[rgba(200,255,0,0.2)]"
                  : "bg-[#1C1A14] text-[#FFAA00] border border-[rgba(255,170,0,0.2)]"
              }`}
            >
              {experiment.status}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight text-[#F5F0E8] group-hover:text-[#C8FF00] transition-colors">
            <Link href={detailHref}>{experiment.title}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
            {experiment.description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {experiment.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded bg-[#141414] border border-[rgba(245,240,232,0.06)] font-mono text-[11px] text-[#A8A29E]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[rgba(245,240,232,0.06)] flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-[#68635B]">
          {experiment.interactive && (
            <span className="inline-flex items-center gap-1 text-[#C8FF00]">
              <Play className="w-3 h-3 fill-current" />
              <span>Interactive</span>
            </span>
          )}
        </div>

        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#F5F0E8] group-hover:text-[#C8FF00] transition-colors min-h-[44px] px-2 py-2"
        >
          <span>Run Experiment</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

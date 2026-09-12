import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ActiveProjectItem {
  name: string;
  category: string;
  description: string;
  status: "ACTIVE";
  href: string;
  isExternal?: boolean;
  highlightTag: string;
}

const ACTIVE_PROJECTS: ActiveProjectItem[] = [
  {
    name: "A1 Swaara",
    category: "Flutter · Android",
    description: "Modern high-fidelity music streaming client with custom local audio routing and zero telemetry overhead.",
    status: "ACTIVE",
    href: "#projects",
    isExternal: false,
    highlightTag: "FLAGSHIP APP",
  },
  {
    name: "FLUXA",
    category: "Kotlin · Jetpack Compose",
    description: "Native video streaming platform built for Android with Kotlin Coroutines and smooth hardware-accelerated playback.",
    status: "ACTIVE",
    href: "https://github.com/Varshuai/movie",
    isExternal: true,
    highlightTag: "NATIVE CLIENT",
  },
  {
    name: "VelorioLabs",
    category: "Open Source · Software · AI",
    description: "Independent collective researching and developing foundational developer utilities, security tools, and algorithmic engines.",
    status: "ACTIVE",
    href: "https://github.com/VelorioLabs",
    isExternal: true,
    highlightTag: "OPEN SOURCE",
  },
];

export function CurrentlyBuilding() {
  return (
    <div className="space-y-6">
      {/* Header kicker and title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[rgba(245,240,232,0.06)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E988F]">
            <span className="text-[#C8FF00] font-semibold">{"//"}</span>
            <span>ACTIVE DISPATCH</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F5F0E8]">
            CURRENTLY BUILDING
          </h3>
        </div>
        <div className="font-mono text-xs text-[#68635B] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
          <span>REAL-TIME PIPELINE // NO FABRICATED METRICS</span>
        </div>
      </div>

      {/* 3 Connected Active Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACTIVE_PROJECTS.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target={project.isExternal ? "_blank" : undefined}
            rel={project.isExternal ? "noopener noreferrer" : undefined}
            className="group relative p-5 rounded-lg bg-[#121212] hover:bg-[#161616] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            {/* Top Row: Category & Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[11px] text-[#9E988F] font-mono tracking-wide">
                  {project.category}
                </span>

                {/* Status Indicator */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[rgba(200,255,0,0.08)] border border-[rgba(200,255,0,0.25)] text-[#C8FF00] text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Title & Tag */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-[#F5F0E8] group-hover:text-[#C8FF00] transition-colors">
                    {project.name}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-[#68635B] group-hover:text-[#C8FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="font-mono text-[10px] text-[#68635B] uppercase tracking-wider">
                  {project.highlightTag}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#9E988F] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3 border-t border-[rgba(245,240,232,0.05)] flex items-center justify-between font-mono text-[11px] text-[#68635B] group-hover:text-[#9E988F] transition-colors">
              <span>View details & source</span>
              <span>›</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

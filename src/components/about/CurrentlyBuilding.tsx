import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ActiveProjectItem {
  name: string;
  category: string;
  description: string;
  status: "BUILT" | "BUILDING" | "ACTIVE ORG";
  href: string;
  isExternal?: boolean;
  highlightTag: string;
}

const ACTIVE_PROJECTS: ActiveProjectItem[] = [
  {
    name: "A1 Swaara",
    category: "Flutter · Android · Next.js",
    description: "Modern high-fidelity Android and PC music streaming studio with 320 kbps audio engine, synchronized lyrics, and zero telemetry.",
    status: "BUILT",
    href: "/work/a1-swaara",
    isExternal: false,
    highlightTag: "SHIPPED V1.0.0",
  },
  {
    name: "FLUXA",
    category: "Kotlin · Jetpack Compose · Media3",
    description: "Native Android video streaming application in active development with ExoPlayer, adaptive HLS, and multi-audio track switching.",
    status: "BUILDING",
    href: "/work/fluxa",
    isExternal: false,
    highlightTag: "IN ACTIVE DEV",
  },
  {
    name: "VelorioLabs",
    category: "Open Source Collective · 43 Repos",
    description: "Open-source developer organization with 43 public repositories on GitHub across security (PhishGuard-AI), telemetry radar, and AI tools.",
    status: "ACTIVE ORG",
    href: "/work/veloriolabs",
    isExternal: false,
    highlightTag: "ORGANIZATION",
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

import React from "react";
import { ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import { Badge } from "@/components/primitives/Badge";

export interface ProjectData {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  status: "Active" | "Shipped" | "Production" | "Experimental";
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article
      className={`group relative rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        featured ? "md:col-span-2 p-6 sm:p-8" : "p-6"
      }`}
    >
      {/* Top bar: System Index & Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[rgba(245,240,232,0.06)]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#68635B]">
            <Terminal className="w-3.5 h-3.5 text-[#C8FF00]" />
            <span>{project.index}</span>
            <span>•</span>
            <span className="uppercase tracking-wider text-[#9E988F]">{project.category}</span>
          </div>

          <Badge
            variant={project.status === "Active" || project.status === "Production" ? "live" : "neutral"}
            size="sm"
          >
            {project.status}
          </Badge>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1 mb-4">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-[#C8FF00] tracking-wide">
            {project.tagline}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-[#9E988F] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Architecture & Engineering Highlights */}
        <div className="space-y-2 mb-6 bg-[#0E0E0E] rounded-md p-3.5 border border-[rgba(245,240,232,0.05)]">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#68635B] flex items-center gap-1.5">
            <GitBranch className="w-3 h-3 text-[#9E988F]" />
            Key Engineering Focus
          </div>
          <ul className="space-y-1.5 text-xs text-[#9E988F]">
            {project.architectureHighlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#C8FF00] font-mono text-xs leading-none select-none">›</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Area: Stack Badges & Links */}
      <div className="pt-4 border-t border-[rgba(245,240,232,0.06)] space-y-4">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-[#181818] text-[#9E988F] border border-[rgba(245,240,232,0.06)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex items-center gap-3 pt-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#F5F0E8] hover:text-[#C8FF00] transition-colors"
            >
              <span>Source Repository</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#9E988F] hover:text-[#F5F0E8] transition-colors"
            >
              <span>Deployment</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

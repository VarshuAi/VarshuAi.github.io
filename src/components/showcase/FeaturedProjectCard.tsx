import React from "react";
import Image from "next/image";
import { Download, Radio, GitBranch } from "lucide-react";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { ProjectItem } from "@/data/profile";

export function FeaturedProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group relative rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.22)] transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 items-center">
        {/* Left Column: Narrative & Technical Depth */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header metadata */}
          <div className="flex items-center justify-between border-b border-[rgba(245,240,232,0.06)] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#68635B]">
              <Radio className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span className="font-semibold text-[#C8FF00]">{project.index}</span>
              <span>{"//"}</span>
              <span className="uppercase tracking-widest text-[#9E988F]">FLAGSHIP SYSTEM</span>
            </div>
            <Badge variant="live" size="sm">
              {project.status}
            </Badge>
          </div>

          {/* Title & Category */}
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#C8FF00] tracking-wide">
              {project.category}
            </p>
          </div>

          {/* Core Description */}
          <p className="text-sm sm:text-base text-[#9E988F] leading-relaxed">
            {project.description}
          </p>

          {/* Key Implementation Highlights */}
          <div className="space-y-2 rounded-lg bg-[#121212] p-4 border border-[rgba(245,240,232,0.06)]">
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#68635B]">
              <GitBranch className="w-3 h-3 text-[#9E988F]" />
              Architectural Highlights
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

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono bg-[#161616] text-[#9E988F] border border-[rgba(245,240,232,0.06)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs: APK Download + GitHub */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.apkUrl && (
              <Button
                variant="primary"
                size="md"
                href={project.apkUrl}
                isExternal
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
                Download APK (v1.0)
              </Button>
            )}

            {project.githubUrl && (
              <Button
                variant="secondary"
                size="md"
                href={project.githubUrl}
                isExternal
                icon={<GithubIcon className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                GitHub Repository
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Mobile Screenshot Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] rounded-2xl p-2 bg-[#161616] border border-[rgba(245,240,232,0.12)] shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden group-hover:border-[rgba(200,255,0,0.3)] group-hover:-translate-y-1.5 transition-all duration-300 ease-out">
            {/* Top Phone Speaker Notch Sim */}
            <div className="w-full flex justify-center py-1">
              <div className="w-16 h-1 rounded-full bg-[#262626]" />
            </div>

            {/* Screenshot Container */}
            <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-[#0A0A0A]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt="A1 Swaara Android Music Player UI Screenshot"
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center text-[#68635B] font-mono text-xs">
                  <span>INTERFACE PREVIEW</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

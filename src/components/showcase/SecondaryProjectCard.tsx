import React from "react";
import Image from "next/image";
import { Video, GitBranch, Play } from "lucide-react";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { ProjectItem } from "@/data/profile";

export function SecondaryProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group relative rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.22)] hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between">
      {/* Visual Header / 16:9 Video Canvas Frame */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0A0A] border-b border-[rgba(245,240,232,0.08)]">
        {project.image ? (
          <Image
            src={project.image}
            alt="FLUXA Native Video Player Interface"
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-[#68635B] font-mono text-xs">
            <span>VIDEO INTERFACE FRAME</span>
          </div>
        )}

        {/* Video Overlay Specs Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0A]/80 backdrop-blur-md text-[11px] font-mono text-[#F5F0E8] border border-[rgba(245,240,232,0.1)]">
            <Play className="w-2.5 h-2.5 fill-[#C8FF00] text-[#C8FF00]" />
            1080p HLS Engine
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant="live" size="sm">
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Metadata & Title */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#68635B] mb-1.5">
              <Video className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span className="font-semibold text-[#C8FF00]">{project.index}</span>
              <span>{"//"}</span>
              <span className="uppercase tracking-widest text-[#9E988F]">NATIVE MEDIA CLIENT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-[#C8FF00] tracking-wide mt-1">
              {project.category}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-[#9E988F] leading-relaxed">
            {project.description}
          </p>

          {/* Implementation Highlights */}
          <div className="space-y-1.5 rounded-lg bg-[#121212] p-3.5 border border-[rgba(245,240,232,0.06)]">
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#68635B]">
              <GitBranch className="w-3 h-3 text-[#9E988F]" />
              Compose & Media Pipeline
            </div>
            <ul className="space-y-1 text-xs text-[#9E988F]">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#C8FF00] font-mono text-xs leading-none select-none">›</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer: Tech Stack & Action */}
        <div className="pt-4 border-t border-[rgba(245,240,232,0.06)] space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-[#161616] text-[#9E988F] border border-[rgba(245,240,232,0.06)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <div>
              <Button
                variant="secondary"
                size="sm"
                href={project.githubUrl}
                isExternal
                icon={<GithubIcon className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                Source Repository
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

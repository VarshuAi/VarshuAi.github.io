import React from "react";
import { FolderGit2, Terminal, Layers, ArrowRight } from "lucide-react";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { ProjectItem } from "@/data/profile";

export function OpenSourceProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group relative rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.22)] hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between">
      {/* Top Terminal / Repository Explorer Header */}
      <div className="bg-[#121212] border-b border-[rgba(245,240,232,0.08)] p-4 sm:p-5 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-[#F5F0E8]">
          <FolderGit2 className="w-4 h-4 text-[#C8FF00]" />
          <span className="font-semibold text-[11px] tracking-wider uppercase">
            OPEN-SOURCE ORGANIZATION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm">
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
              <Terminal className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span className="font-semibold text-[#C8FF00]">{project.index}</span>
              <span>{"//"}</span>
              <span className="uppercase tracking-widest text-[#9E988F]">RESEARCH & COLLECTIVE</span>
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

          {/* Curated Ecosystem Repositories Grid */}
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[11px] uppercase tracking-widest text-[#68635B] flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#9E988F]" />
              Featured Ecosystem Utilities
            </div>

            <div className="space-y-2">
              {project.ecosystem?.map((repo) => (
                <div
                  key={repo.name}
                  className="group/repo rounded-md bg-[#121212] p-3 border border-[rgba(245,240,232,0.06)] hover:border-[rgba(200,255,0,0.25)] hover:bg-[#151515] transition-all duration-150 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-[#F5F0E8] font-medium text-xs flex items-center gap-1.5">
                      <span className="text-[#C8FF00] transition-transform duration-150 group-hover/repo:translate-x-0.5">›</span>
                      <span>{repo.name}</span>
                    </div>
                    <div className="text-[11px] text-[#9E988F] font-sans">
                      {repo.tagline}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#68635B] hidden sm:inline whitespace-nowrap">
                    {repo.stack}
                  </span>
                </div>
              ))}
            </div>
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

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button
              variant="primary"
              size="sm"
              href={`/work/${project.id}`}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Case Study
            </Button>

            {project.githubUrl && (
              <Button
                variant="secondary"
                size="sm"
                href={project.githubUrl}
                isExternal
                icon={<GithubIcon className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                GitHub Org
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Badge } from '@/components/primitives/Badge';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { CaseStudyData } from '@/data/caseStudies';

interface CaseStudyHeaderProps {
  project: CaseStudyData;
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header className="pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[rgba(245,240,232,0.06)]">
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#9E988F] hover:text-[#C8FF00] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] rounded py-1 px-1.5 -ml-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO WORK</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#68635B] hidden sm:inline">CASE STUDY //</span>
          <Badge variant="live" size="sm">
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] font-semibold tracking-wider uppercase">
          <span>{"//"}</span>
          <span>{project.category}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F5F0E8] leading-[1.06]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-[#9E988F] font-normal leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Metadata Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-8 border-t border-[rgba(245,240,232,0.06)] font-mono text-xs">
        <div>
          <div className="text-[#68635B] text-[10px] uppercase tracking-wider">Role</div>
          <div className="text-[#F5F0E8] mt-1 font-medium">{project.role}</div>
        </div>

        <div>
          <div className="text-[#68635B] text-[10px] uppercase tracking-wider">Timeline</div>
          <div className="text-[#F5F0E8] mt-1 font-medium">{project.year}</div>
        </div>

        <div>
          <div className="text-[#68635B] text-[10px] uppercase tracking-wider">Platform</div>
          <div className="text-[#F5F0E8] mt-1 font-medium">{project.category}</div>
        </div>

        <div>
          <div className="text-[#68635B] text-[10px] uppercase tracking-wider">Status</div>
          <div className="text-[#C8FF00] mt-1 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            <span>{project.status}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="pt-8 flex flex-wrap items-center gap-3">
        {project.links.downloadUrl && (
          <Button
            variant="primary"
            size="md"
            href={project.links.downloadUrl}
            isExternal
            icon={<Download className="w-4 h-4" />}
            iconPosition="left"
          >
            Download Production APK
          </Button>
        )}

        {project.links.githubUrl && (
          <Button
            variant="secondary"
            size="md"
            href={project.links.githubUrl}
            isExternal
            icon={<GithubIcon className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            View on GitHub
          </Button>
        )}

        {project.links.liveUrl && (
          <Button
            variant="secondary"
            size="md"
            href={project.links.liveUrl}
            isExternal
            icon={<ArrowUpRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Live Site
          </Button>
        )}
      </div>
    </header>
  );
}

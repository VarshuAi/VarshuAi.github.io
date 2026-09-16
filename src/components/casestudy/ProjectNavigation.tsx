import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';

interface ProjectNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function ProjectNavigation({ prev, next }: ProjectNavProps) {
  return (
    <nav
      aria-label="Project Navigation"
      className="pt-12 sm:pt-16 mt-16 sm:mt-24 border-t border-[rgba(245,240,232,0.08)]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Project */}
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group p-6 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.25)] transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#68635B] group-hover:text-[#C8FF00] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>PREVIOUS CASE STUDY</span>
            </div>
            <div className="text-lg sm:text-xl font-medium text-[#F5F0E8] group-hover:text-white">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Next Project */}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group p-6 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.25)] transition-all flex flex-col justify-between space-y-3 text-right sm:items-end"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#68635B] group-hover:text-[#C8FF00] transition-colors">
              <span>NEXT CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="text-lg sm:text-xl font-medium text-[#F5F0E8] group-hover:text-white">
              {next.title}
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* Center Return to All Work */}
      <div className="pt-8 flex justify-center">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#9E988F] hover:text-[#C8FF00] transition-colors px-4 py-2 rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.06)] hover:border-[rgba(200,255,0,0.2)]"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>VIEW ALL SELECTED WORK</span>
        </Link>
      </div>
    </nav>
  );
}

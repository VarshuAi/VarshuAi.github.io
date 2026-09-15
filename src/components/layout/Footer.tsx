"use client";

import React from "react";
import { Container } from "@/components/primitives/Container";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[rgba(245,240,232,0.08)] bg-[#080808] py-14 sm:py-16">
      <Container size="wide">
        <div className="space-y-12">
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[rgba(245,240,232,0.06)]">
            {/* Identity & Role */}
            <div className="space-y-2">
              <h3 className="font-mono text-base sm:text-lg font-semibold tracking-wider text-[#F5F0E8] uppercase">
                {PROFILE.name}
              </h3>
              <p className="font-mono text-xs text-[#9E988F] tracking-widest uppercase">
                CSE • AI/ML • FULL-STACK
              </p>
              <p className="font-mono text-[11px] text-[#68635B] pt-1">
                Bangalore, IN // Systems, Mobile &amp; Machine Intelligence
              </p>
            </div>

            {/* Links: GitHub, LinkedIn, Email */}
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#68635B]" />
              </a>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#68635B]" />
              </a>

              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1 text-[#9E988F] hover:text-[#C8FF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#68635B]" />
              </a>

              {/* Back to top subtle button */}
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-[#9E988F] hover:text-[#C8FF00] px-2.5 py-1 rounded bg-[#121212] hover:bg-[#181818] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.18)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
                aria-label="Scroll back to top of page"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3 h-3 text-[#C8FF00]" />
              </button>
            </div>
          </div>

          {/* Sub-Footer Copyright & Spec */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#68635B]">
            <div>
              &copy; {currentYear} {PROFILE.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
              <span>Next.js 16 • Turbopack • Geist Typography</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

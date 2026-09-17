"use client";

import React from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Container } from "@/components/primitives/Container";

interface LabHeaderProps {
  onShowWelcome?: () => void;
}

export function LabHeader({ onShowWelcome }: LabHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(245,240,232,0.08)] bg-[#0A0A0A]/95 backdrop-blur-md font-mono text-xs">
      <Container size="wide">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand / Lab Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-[#F5F0E8] font-medium tracking-tight hover:text-[#C8FF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]">
              <span className="text-[#C8FF00] font-bold">{'//'}</span>
              <span className="tracking-wider text-sm font-semibold">LAB</span>
              <span className="text-[#68635B] hidden sm:inline">•</span>
              <span className="text-[#9E988F] text-[11px] hidden sm:inline uppercase">EXPERIMENTAL WORKSPACE</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#141414] border border-[rgba(245,240,232,0.08)] text-[10px] text-[#C8FF00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
              <span>STANDALONE RUNNER</span>
            </div>
          </div>

          {/* Center Navigation for Lab Modules */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] text-[#9E988F]">
            <a
              href="#featured"
              className="hover:text-[#F5F0E8] transition-colors py-1 focus-visible:outline-none focus-visible:text-[#C8FF00]"
            >
              PLAYGROUND
            </a>
            <a
              href="#catalog"
              className="hover:text-[#F5F0E8] transition-colors py-1 focus-visible:outline-none focus-visible:text-[#C8FF00]"
            >
              ARCHIVE
            </a>
          </nav>

          {/* Right Action: Re-open Welcome Screen & Telemetry */}
          <div className="flex items-center gap-3 text-[11px]">
            {onShowWelcome ? (
              <button
                type="button"
                onClick={onShowWelcome}
                className="px-2.5 py-1.5 rounded-md bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.1)] hover:border-[rgba(245,240,232,0.2)] text-[#9E988F] hover:text-[#F5F0E8] transition-all cursor-pointer inline-flex items-center gap-1.5"
                title="Return to Welcome Screen"
              >
                <RefreshCw className="w-3 h-3 text-[#C8FF00]" />
                <span className="hidden sm:inline">ENTRY SCREEN</span>
              </button>
            ) : (
              <Link
                href="/"
                className="px-2.5 py-1.5 rounded-md bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.1)] hover:border-[rgba(245,240,232,0.2)] text-[#9E988F] hover:text-[#F5F0E8] transition-all cursor-pointer inline-flex items-center gap-1.5"
                title="Return to Welcome Screen"
              >
                <RefreshCw className="w-3 h-3 text-[#C8FF00]" />
                <span className="hidden sm:inline">ENTRY SCREEN</span>
              </Link>
            )}

            <div className="flex items-center gap-2 pl-2 border-l border-[rgba(245,240,232,0.08)]">
              <span className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse" />
              <span className="text-[#C8FF00] font-medium hidden sm:inline">ACTIVE</span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

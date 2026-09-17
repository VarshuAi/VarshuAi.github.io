"use client";

import React, { useEffect, useCallback } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { LabCoordinateField } from "./LabCoordinateField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LabWelcomeExperienceProps {
  onEnter: () => void;
  isExiting: boolean;
}

const CATEGORIES = [
  "SYSTEMS",
  "AI / ML",
  "DSA",
  "COMPUTER VISION",
  "MOBILE",
  "WEB",
];

export function LabWelcomeExperience({ onEnter, isExiting }: LabWelcomeExperienceProps) {
  const reducedMotion = useReducedMotion();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        onEnter();
      }
    },
    [onEnter]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0A0A0A] text-[#F5F0E8] overflow-y-auto overflow-x-hidden flex flex-col justify-between transition-all ${
        reducedMotion
          ? isExiting
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
          : isExiting
          ? "opacity-0 -translate-y-4 scale-[0.99] pointer-events-none duration-500 ease-out"
          : "opacity-100 translate-y-0 scale-100 duration-300 ease-in"
      }`}
      role="region"
      aria-label="Engineering Lab Welcome Workspace"
    >
      {/* Top Technical Metadata Strip */}
      <header className="w-full border-b border-[rgba(245,240,232,0.08)] bg-[#0C0C0C]/90 backdrop-blur-sm px-6 sm:px-10 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 font-mono text-[11px] text-[#68635B]">
          {/* Identity Left */}
          <div className="flex items-center gap-3">
            <span className="text-[#C8FF00] font-semibold tracking-wider">LAB / 001</span>
            <span className="text-[#68635B]">•</span>
            <span className="text-[#F5F0E8] uppercase tracking-wider font-medium">EXPERIMENTAL WORKSPACE</span>
          </div>

          {/* Categories Strip */}
          <div className="hidden md:flex items-center gap-2 tracking-wider text-[10px]">
            {CATEGORIES.map((cat, idx) => (
              <React.Fragment key={cat}>
                <span className="text-[#9E988F] hover:text-[#F5F0E8] transition-colors">{cat}</span>
                {idx < CATEGORIES.length - 1 && <span className="text-[#403D39]">•</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Status Right */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            <span className="text-[#C8FF00] font-medium tracking-wide">STATUS: RUNNING</span>
          </div>
        </div>
      </header>

      {/* Main Composition: Split Left Typography + Right Coordinate Field */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 py-10 sm:py-16 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* LEFT / CENTER: Editorial Technical Narrative & Entry Actions */}
          <div className="lg:col-span-6 space-y-8">
            {/* Kicker Tag */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E988F]">
                <span className="text-[#C8FF00] font-semibold">{'//'}</span>
                <span>WELCOME TO THE LAB</span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F5F0E8] leading-[1.04]">
                LAB
                <span className="block text-[#C8FF00]">ENGINEERING</span>
                <span className="block text-[#9E988F]">PLAYGROUND</span>
              </h1>
            </div>

            {/* Concise Mission Statement */}
            <div className="space-y-3 max-w-xl">
              <p className="text-base sm:text-lg text-[#F5F0E8] font-normal leading-relaxed">
                &ldquo;Small systems, experiments, visualizations and ideas built to understand how things work.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed font-sans">
                A workspace for experiments, prototypes and technical ideas. Real algorithmic invariants and hardware models tested from first principles.
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-mono text-xs">
              <button
                type="button"
                onClick={onEnter}
                autoFocus
                className="min-h-[48px] px-7 py-3.5 rounded-lg bg-[#F5F0E8] text-[#0A0A0A] hover:bg-[#C8FF00] hover:text-[#0A0A0A] active:scale-[0.98] font-semibold text-sm tracking-tight inline-flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                <span>ENTER LAB</span>
                <ArrowRight className="w-4 h-4 text-current" />
              </button>

              <button
                type="button"
                onClick={onEnter}
                className="min-h-[48px] px-5 py-3 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.12)] hover:border-[rgba(245,240,232,0.25)] text-[#9E988F] hover:text-[#F5F0E8] active:scale-[0.98] font-medium tracking-tight inline-flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              >
                <Compass className="w-4 h-4 text-[#C8FF00]" />
                <span>EXPLORE EXPERIMENTS</span>
              </button>
            </div>

            {/* Precision Micro Spec Strip */}
            <div className="pt-4 border-t border-[rgba(245,240,232,0.06)] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-[11px] text-[#68635B]">
              <div>
                <div className="text-[#68635B] text-[10px] uppercase tracking-wider">WORKSPACE</div>
                <div className="text-[#F5F0E8] mt-0.5">STANDALONE LAB</div>
              </div>
              <div>
                <div className="text-[#68635B] text-[10px] uppercase tracking-wider">EXECUTION</div>
                <div className="text-[#C8FF00] mt-0.5">LOCAL / ZERO-CLOUD</div>
              </div>
              <div>
                <div className="text-[#68635B] text-[10px] uppercase tracking-wider">TELEMETRY</div>
                <div className="text-[#F5F0E8] mt-0.5">ZERO-TRACKING</div>
              </div>
            </div>
          </div>

          {/* RIGHT / SECONDARY AREA: Technical Experiment Node Field */}
          <div className="lg:col-span-6 w-full">
            <LabCoordinateField />
          </div>
        </div>
      </main>

      {/* Bottom Architectural Baseline Strip */}
      <footer className="w-full border-t border-[rgba(245,240,232,0.08)] bg-[#0C0C0C]/80 px-6 sm:px-10 py-3 font-mono text-[11px] text-[#68635B]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-2">
            <span>ENGINEERING WORKSTATION</span>
            <span>•</span>
            <span className="text-[#9E988F]">RESTRAINED SPECIFICATION</span>
          </div>
          <div className="text-[#68635B] text-[10px]">
            PRESS <span className="text-[#C8FF00] border border-[rgba(245,240,232,0.15)] px-1.5 py-0.5 rounded">ENTER ↵</span> OR CLICK ENTER LAB
          </div>
        </div>
      </footer>
    </div>
  );
}

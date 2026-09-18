"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

interface PortfolioWelcomeLoaderProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { text: "INITIALIZING SYSTEMS RUNTIME", code: "01/03" },
  { text: "MOUNTING ECOSYSTEM (SWAARA • FLUXA • VELORIO)", code: "02/03" },
  { text: "SYSTEMS NOMINAL • ENTERING PORTFOLIO", code: "03/03" },
];

export function PortfolioWelcomeLoader({ onComplete }: PortfolioWelcomeLoaderProps) {
  const reducedMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const finish = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    // Step 1 -> Step 2
    const t1 = setTimeout(() => {
      setStepIndex(1);
      setProgress(65);
    }, 380);

    // Step 2 -> Step 3
    const t2 = setTimeout(() => {
      setStepIndex(2);
      setProgress(100);
    }, 780);

    // Auto complete at ~1150ms
    const t3 = setTimeout(() => {
      finish();
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reducedMotion, finish, onComplete]);

  // Keyboard skip listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        finish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finish]);

  if (reducedMotion) return null;

  return (
    <div
      onClick={finish}
      className={`fixed inset-0 z-[100] bg-[#0A0A0A] text-[#F5F0E8] flex flex-col justify-between p-6 sm:p-12 font-mono select-none cursor-pointer transition-all duration-400 ease-out ${
        isFadingOut
          ? "opacity-0 -translate-y-2 pointer-events-none scale-[0.99]"
          : "opacity-100 translate-y-0 scale-100"
      }`}
      role="status"
      aria-label="Loading Varshan Gowda S R Portfolio"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between text-[11px] text-[#68635B] border-b border-[rgba(245,240,232,0.08)] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[#C8FF00] font-semibold">VARSHAN // 2.0</span>
          <span>•</span>
          <span className="text-[#9E988F] uppercase tracking-wider">SYSTEMS SPECIFICATION</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
          <span className="text-[#C8FF00]">ONLINE</span>
          <span className="text-[#403D39] hidden sm:inline">•</span>
          <span className="text-[#68635B] hidden sm:inline">UTC+5:30</span>
        </div>
      </div>

      {/* Centerpiece Hero Loading Unit */}
      <div className="max-w-xl w-full mx-auto space-y-8 text-center sm:text-left">
        {/* Monogram / Brand Block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141414] border border-[rgba(245,240,232,0.1)] text-[11px] text-[#C8FF00]">
            <span className="font-bold">{'//'}</span>
            <span className="tracking-widest uppercase font-medium">PORTFOLIO ENTRY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#F5F0E8] font-sans leading-[1.06]">
            VARSHAN GOWDA S R
          </h1>

          <p className="font-mono text-xs sm:text-sm text-[#C8FF00] tracking-widest uppercase font-semibold">
            CSE • AI/ML • FULL-STACK DEVELOPER
          </p>
        </div>

        {/* Progress & Live Telemetry Ticker */}
        <div className="space-y-3 pt-2">
          {/* Progress Track */}
          <div className="w-full h-[2px] bg-[rgba(245,240,232,0.08)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C8FF00] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Stage Indicator */}
          <div className="flex items-center justify-between text-[11px] text-[#68635B]">
            <span className="text-[#F5F0E8] tracking-wide text-xs">
              {BOOT_STEPS[stepIndex].text}
            </span>
            <span className="text-[#C8FF00] font-semibold tracking-wider">
              [{BOOT_STEPS[stepIndex].code}]
            </span>
          </div>
        </div>

        {/* Action Skip Button / Hint */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-[#68635B] tracking-wider">
            PRESS <span className="text-[#F5F0E8] border border-[rgba(245,240,232,0.2)] px-1.5 py-0.5 rounded">SPACE</span> OR TAP ANYWHERE TO ENTER
          </div>

          <button
            type="button"
            onClick={finish}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.12)] hover:border-[#C8FF00] text-[#F5F0E8] hover:text-[#C8FF00] text-xs font-mono transition-all cursor-pointer"
          >
            <span>ENTER</span>
            <ArrowRight className="w-3.5 h-3.5 text-current" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#68635B] border-t border-[rgba(245,240,232,0.08)] pt-3">
        <div className="flex items-center gap-2">
          <span>ACTIVE ECOSYSTEM:</span>
          <span className="text-[#9E988F]">SWAARA (BUILT) · FLUXA (BUILDING) · VELORIO (ACTIVE)</span>
        </div>
        <div className="text-[#68635B]">
          © {new Date().getFullYear()} VARSHAN GOWDA S R
        </div>
      </div>
    </div>
  );
}

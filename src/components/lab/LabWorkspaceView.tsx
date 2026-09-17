"use client";

import React, { useState, useCallback } from "react";
import { LabWelcomeExperience } from "./LabWelcomeExperience";
import { LabHeader } from "./LabHeader";
import { LabHero } from "./LabHero";
import { LabFooter } from "./LabFooter";
import { ExperimentRunner } from "./ExperimentRunner";
import { ExperimentArchive } from "./ExperimentArchive";
import { Container } from "@/components/primitives/Container";
import { ExperimentItem } from "@/data/experiments";
import { Sparkles, Terminal } from "lucide-react";

interface LabWorkspaceViewProps {
  featuredExperiment: ExperimentItem | undefined;
  experimentsList: ExperimentItem[];
}

export function LabWorkspaceView({
  featuredExperiment,
  experimentsList,
}: LabWorkspaceViewProps) {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("welcome") === "1" || params.get("intro") === "1") return false;
      return localStorage.getItem("lab_workspace_entered") === "true";
    } catch {
      return false;
    }
  });
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleEnter = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setHasEntered(true);
      setIsExiting(false);
      try {
        localStorage.setItem("lab_workspace_entered", "true");
      } catch {}
    } else {
      setIsExiting(true);
      setTimeout(() => {
        setHasEntered(true);
        setIsExiting(false);
        try {
          localStorage.setItem("lab_workspace_entered", "true");
        } catch {}
      }, 550);
    }
  }, []);

  const handleShowWelcome = useCallback(() => {
    setIsExiting(false);
    setHasEntered(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F0E8] flex flex-col">
      {/* Welcome Entry Overlay Screen */}
      {!hasEntered && (
        <LabWelcomeExperience onEnter={handleEnter} isExiting={isExiting} />
      )}

      {/* Standalone Lab Workspace Surface */}
      <div
        className={`flex-1 flex flex-col transition-all duration-700 ease-out ${
          !hasEntered ? "opacity-30 filter blur-[1px] pointer-events-none" : "opacity-100 filter-none"
        }`}
      >
        <LabHeader onShowWelcome={handleShowWelcome} />

        <main id="main-content" className="flex-1 space-y-16 sm:space-y-24 pb-20">
          <LabHero />

          {featuredExperiment && (
            <section id="featured" className="space-y-6 scroll-mt-20">
              <Container size="wide">
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED PLAYGROUND // 01</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                    Sorting Lab: Visual Algorithm Invariants
                  </h2>
                  <p className="text-sm text-[#9E988F] max-w-2xl leading-relaxed">
                    Real-time step-synchronized execution engine comparing memory access patterns, comparisons, and element swaps across 5 classic comparison sorts.
                  </p>
                </div>

                <ExperimentRunner experiment={featuredExperiment} />
              </Container>
            </section>
          )}

          <section id="catalog" className="space-y-6 border-t border-[rgba(245,240,232,0.06)] pt-16 scroll-mt-20">
            <Container size="wide">
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>ARCHIVE // ALL EXPERIMENTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                  Technical Catalog
                </h2>
              </div>

              <ExperimentArchive experiments={experimentsList} />
            </Container>
          </section>
        </main>

        <LabFooter />
      </div>
    </div>
  );
}

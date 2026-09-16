import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/primitives/Container";
import { LabHero } from "@/components/lab/LabHero";
import { ExperimentRunner } from "@/components/lab/ExperimentRunner";
import { ExperimentArchive } from "@/components/lab/ExperimentArchive";
import { EXPERIMENTS, EXPERIMENTS_LIST } from "@/data/experiments";
import { Sparkles, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Lab | Varshan Gowda S R",
  description:
    "Interactive algorithm visualizations, system experiments, and technical prototypes built by Varshan Gowda S R.",
  openGraph: {
    title: "Engineering Lab — Varshan Gowda S R",
    description: "Interactive algorithm visualizers, prototypes, and systems engineering playground.",
    url: "https://varshuai.github.io/lab",
  },
};

export default function LabPage() {
  const featuredExperiment = EXPERIMENTS["sorting-lab"];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <Header />

      <main id="main-content" className="flex-1 space-y-16 sm:space-y-24 pb-20">
        <LabHero />

        {featuredExperiment && (
          <section className="space-y-6">
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

        <section className="space-y-6 border-t border-[rgba(245,240,232,0.06)] pt-16">
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

            <ExperimentArchive experiments={EXPERIMENTS_LIST} />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

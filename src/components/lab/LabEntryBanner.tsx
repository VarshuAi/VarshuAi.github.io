import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Terminal, ArrowRight } from "lucide-react";

export function LabEntryBanner() {
  return (
    <section className="py-12 sm:py-16 border-b border-[rgba(245,240,232,0.06)] bg-[#090909]">
      <Container size="wide">
        <div className="rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[rgba(245,240,232,0.18)] transition-all">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] uppercase tracking-wider font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>{'//'} EXPERIMENTS & PROTOTYPES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F5F0E8]">
              The Engineering Lab
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
              Small technical prototypes, interactive algorithm visualizations, and experimental software I&apos;m building outside main production work.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.12)] hover:border-[rgba(200,255,0,0.4)] text-[#F5F0E8] hover:text-[#C8FF00] font-mono text-xs uppercase tracking-wider font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] min-h-[44px]"
            >
              <span>Enter The Lab</span>
              <ArrowRight className="w-4 h-4 text-[#C8FF00]" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

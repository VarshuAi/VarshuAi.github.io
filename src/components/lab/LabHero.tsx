import React from "react";
import { Container } from "@/components/primitives/Container";
import { Terminal, Cpu } from "lucide-react";

export function LabHero() {
  return (
    <section className="pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-[rgba(245,240,232,0.06)] relative overflow-hidden bg-[#0A0A0A]">
      <Container size="wide">
        <div className="space-y-6 max-w-3xl">
          {/* Status & Kicker */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-[#C8FF00] font-semibold">{'//'} LAB</span>
            <span className="text-[#68635B]">•</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121212] border border-[rgba(245,240,232,0.08)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
              <span className="text-[#F5F0E8] uppercase tracking-wider font-semibold">ACTIVE PLAYGROUND</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium tracking-tight text-[#F5F0E8] leading-[1.08]">
              ENGINEERING PLAYGROUND
            </h1>
            <p className="text-base sm:text-lg text-[#9E988F] font-normal leading-relaxed">
              Experiments, interactive prototypes, and technical ideas I&apos;m exploring outside the main project architecture.
            </p>
          </div>

          {/* Telemetry Strip */}
          <div className="pt-4 border-t border-[rgba(245,240,232,0.06)] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#68635B]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span className="text-[#9E988F]">EXPERIMENTS</span>
            </div>
            <span>/</span>
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span className="text-[#9E988F]">PROTOTYPES</span>
            </div>
            <span>/</span>
            <span className="text-[#9E988F]">ALGORITHMIC INVARIANTS</span>
            <span>/</span>
            <span className="text-[#9E988F]">SYSTEM MODELS</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

import React from "react";
import { Container } from "@/components/primitives/Container";

export function LabFooter() {
  return (
    <footer className="w-full border-t border-[rgba(245,240,232,0.08)] bg-[#0C0C0C] py-8 font-mono text-xs text-[#68635B]">
      <Container size="wide">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#F5F0E8] font-medium">
              <span className="text-[#C8FF00] font-semibold">{'//'}</span>
              <span>LAB / 001</span>
              <span>•</span>
              <span className="text-[#9E988F]">ENGINEERING EXPERIMENT RUNNER</span>
            </div>
            <p className="text-[11px] text-[#68635B]">
              Deterministic algorithmic models, interactive visualizers, and systems experiments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#9E988F]">
            <span>ZERO TELEMETRY</span>
            <span>•</span>
            <span>LOCAL RUNTIME</span>
            <span>•</span>
            <span className="text-[#C8FF00]">STATUS: OPERATIONAL</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

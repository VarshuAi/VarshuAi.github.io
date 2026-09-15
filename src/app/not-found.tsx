import React from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { ArrowLeft, Compass, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F0E8] justify-center items-center px-4 py-16">
      <Container size="tight" className="w-full max-w-lg">
        <div className="rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.1)] p-8 space-y-6 shadow-[0_16px_48px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#C8FF00_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[#161616] border border-[rgba(245,240,232,0.08)] text-[#9E988F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            <span>ERR_404 // COORDINATE_UNRESOLVED</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#F5F0E8] font-sans">
              404
            </h1>
            <h2 className="text-base sm:text-lg font-medium text-[#F5F0E8] tracking-tight">
              Route Does Not Exist
            </h2>
            <p className="text-xs sm:text-sm text-[#9E988F] max-w-md mx-auto leading-relaxed">
              The requested system coordinate could not be resolved on this network. It may have been decommissioned or relocated.
            </p>
          </div>

          <div className="rounded-lg bg-[#070707] border border-[rgba(245,240,232,0.06)] p-3 text-left font-mono text-[11px] text-[#68635B] space-y-1">
            <div className="text-[#9E988F] flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#C8FF00]" />
              <span>DIAGNOSTIC_TRACE</span>
            </div>
            <div>
              STATUS: <span className="text-[#C8FF00]">404 NOT_FOUND</span>
            </div>
            <div>ACTION: RETURN_TO_CANONICAL_INDEX</div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              href="/"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Return to Homepage
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/#projects"
              icon={<Compass className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Explore Projects
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Terminal, Activity, GitBranch, Cpu, Radio, CheckCircle2 } from "lucide-react";

export function SystemsConsole() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const fragments = [
    {
      id: "a1-swaara",
      index: "SYS_01",
      name: "A1 Swaara",
      domain: "Audio DSP & Speech Intelligence",
      pipeline: ["Audio In (48kHz)", "FFT Noise Gate", "On-Device Inference"],
      metric: "<24ms Latency",
      status: "Operational",
      stack: "PyTorch • Flutter • DSP",
      icon: <Radio className="w-3.5 h-3.5 text-[#C8FF00]" />,
    },
    {
      id: "fluxa",
      index: "SYS_02",
      name: "FLUXA",
      domain: "State Synchronization Engine",
      pipeline: ["Event Ingress", "Decoupled Queue", "State Reconciliation"],
      metric: "0 Packet Churn",
      status: "Synced",
      stack: "TypeScript • WebSockets • Redis",
      icon: <Activity className="w-3.5 h-3.5 text-[#C8FF00]" />,
    },
    {
      id: "veloriolabs",
      index: "SYS_03",
      name: "VelorioLabs",
      domain: "Open Source Tooling Collective",
      pipeline: ["@velorio/core", "Algorithmic Suite", "CI/CD Gate"],
      metric: "100% Test Pass",
      status: "Active",
      stack: "TypeScript • Android • Next.js",
      icon: <GitBranch className="w-3.5 h-3.5 text-[#C8FF00]" />,
    },
  ];

  return (
    <div className="w-full rounded-lg bg-[#0C0C0C] border border-[rgba(245,240,232,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden font-mono select-none">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[rgba(245,240,232,0.08)] bg-[#101010]/90">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#C8FF00] shrink-0" />
          <span className="font-semibold tracking-wider text-[10px] sm:text-[11px] uppercase text-[#F5F0E8] whitespace-nowrap">
            Systems Architecture HUD
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#68635B] shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[#9E988F]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />
            </span>
            <span className="text-[#C8FF00] text-[10px] uppercase tracking-wider font-semibold">Live</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Fragment Body */}
      <div className="p-3 sm:p-4 space-y-2.5">
        {fragments.map((frag, idx) => {
          const isActive = activeTab === idx;

          return (
            <div
              key={frag.id}
              onClick={() => setActiveTab(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveTab(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`System Fragment ${frag.name}`}
              className={`group rounded-md border p-3.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] ${
                isActive
                  ? "bg-[#141414] border-[rgba(200,255,0,0.3)] shadow-[0_0_12px_rgba(200,255,0,0.05)]"
                  : "bg-[#0E0E0E] border-[rgba(245,240,232,0.05)] hover:bg-[#121212] hover:border-[rgba(245,240,232,0.12)]"
              }`}
            >
              {/* Top metadata line */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs">
                  {frag.icon}
                  <span className="text-[#C8FF00] font-semibold text-[11px]">
                    {frag.index}
                  </span>
                  <span className="text-[#68635B] text-[11px]">•</span>
                  <span className="text-[#F5F0E8] font-medium text-xs tracking-tight">
                    {frag.name}
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#181818] text-[#9E988F] border border-[rgba(245,240,232,0.06)]">
                  {frag.metric}
                </span>
              </div>

              {/* Domain & Description */}
              <div className="text-[11px] text-[#9E988F] mb-3">
                {frag.domain}
              </div>

              {/* Data Pipeline Flow */}
              <div className="flex items-center gap-1.5 text-[10px] text-[#68635B] bg-[#090909] px-2.5 py-1.5 rounded border border-[rgba(245,240,232,0.04)] overflow-x-auto">
                {frag.pipeline.map((step, stepIdx) => (
                  <React.Fragment key={step}>
                    <span
                      className={`whitespace-nowrap ${
                        isActive ? "text-[#F5F0E8]" : "text-[#9E988F]"
                      }`}
                    >
                      {step}
                    </span>
                    {stepIdx < frag.pipeline.length - 1 && (
                      <span className="text-[#C8FF00] select-none font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Active Tab Extra Telemetry */}
              {isActive && (
                <div className="mt-2.5 pt-2 border-t border-[rgba(245,240,232,0.06)] flex items-center justify-between text-[10px] text-[#68635B]">
                  <span className="text-[#9E988F]">{frag.stack}</span>
                  <span className="inline-flex items-center gap-1 text-[#C8FF00]">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Architecture
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Terminal Footer Strip */}
      <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#090909] border-t border-[rgba(245,240,232,0.06)] flex items-center justify-between text-[10px] text-[#68635B]">
        <div className="flex items-center gap-1.5 whitespace-nowrap mr-2">
          <Cpu className="w-3 h-3 text-[#9E988F] shrink-0" />
          <span>SPEC: CONCURRENT ARCHITECTURE</span>
        </div>
        <div className="text-[#9E988F] shrink-0 text-[10px] whitespace-nowrap">BANGALORE // UTC+5:30</div>
      </div>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';
import { CaseStudyData } from '@/data/caseStudies';

interface ProjectHeroImageProps {
  project: CaseStudyData;
}

export function ProjectHeroImage({ project }: ProjectHeroImageProps) {
  if (project.heroType === 'mobile-portrait') {
    return (
      <div className="py-12 sm:py-16 flex justify-center items-center bg-[#070707] rounded-2xl border border-[rgba(245,240,232,0.06)] overflow-hidden relative">
        {/* Subtle radial aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.04)_0,transparent_70%)] pointer-events-none" />

        {/* Minimalist Phone Bezel */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-[32px] p-3 bg-[#141414] border border-[rgba(245,240,232,0.12)] shadow-[0_24px_64px_rgba(0,0,0,0.8)]">
          {/* Top Notch Speaker */}
          <div className="w-full flex justify-center py-1.5 mb-1">
            <div className="w-16 h-1 rounded-full bg-[#262626]" />
          </div>

          <div className="relative aspect-[9/16] w-full rounded-[24px] overflow-hidden bg-[#0A0A0A]">
            <Image
              src={project.heroImage}
              alt={project.heroImageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 280px, 320px"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  if (project.heroType === 'video-landscape') {
    return (
      <div className="py-6 sm:py-10 bg-[#070707] rounded-2xl border border-[rgba(245,240,232,0.06)] overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-[rgba(245,240,232,0.12)] shadow-[0_24px_64px_rgba(0,0,0,0.8)]">
            <Image
              src={project.heroImage}
              alt={project.heroImageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  // Systems HUD for VelorioLabs
  return (
    <div className="py-8 sm:py-12 bg-[#070707] rounded-2xl border border-[rgba(245,240,232,0.06)] p-6 sm:p-8 font-mono text-xs text-[#9E988F]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(245,240,232,0.08)]">
          <div className="flex items-center gap-2 text-[#F5F0E8]">
            <Terminal className="w-4 h-4 text-[#C8FF00]" />
            <span className="font-semibold">VELORIOLABS_ARCHITECTURE // CONTROL_PLANE</span>
          </div>
          <div className="flex items-center gap-2 text-[#68635B] text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse" />
            <span>DISPATCH: PUBLIC_MONOREPO</span>
          </div>
        </div>

        {/* HUD 3-Node Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-2">
            <div className="flex items-center justify-between text-[#F5F0E8]">
              <span className="font-semibold">AetherEye</span>
              <Activity className="w-3.5 h-3.5 text-[#C8FF00]" />
            </div>
            <p className="text-[11px] text-[#68635B] leading-relaxed">
              ADS-B Mode-S telemetry parser and real-time aircraft radar position streaming.
            </p>
            <div className="pt-1 text-[10px] text-[#C8FF00]">TypeScript • WebSocket Stream</div>
          </div>

          <div className="p-4 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-2">
            <div className="flex items-center justify-between text-[#F5F0E8]">
              <span className="font-semibold">TeleVortex</span>
              <Cpu className="w-3.5 h-3.5 text-[#C8FF00]" />
            </div>
            <p className="text-[11px] text-[#68635B] leading-relaxed">
              Universal media decompiler and asynchronous transcode worker pipeline.
            </p>
            <div className="pt-1 text-[10px] text-[#C8FF00]">Python • Media Pipelines</div>
          </div>

          <div className="p-4 rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] space-y-2">
            <div className="flex items-center justify-between text-[#F5F0E8]">
              <span className="font-semibold">Termux-Vault</span>
              <Shield className="w-3.5 h-3.5 text-[#C8FF00]" />
            </div>
            <p className="text-[11px] text-[#68635B] leading-relaxed">
              DoD 5220.22-M compliant multi-pass cryptographic flash storage sanitization.
            </p>
            <div className="pt-1 text-[10px] text-[#C8FF00]">Shell • POSIX Cryptography</div>
          </div>
        </div>

        {/* Console Diagnostic Stream */}
        <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[rgba(245,240,232,0.06)] space-y-1 text-[11px] text-[#68635B]">
          <div>$ velorio init --workspace=public --telemetry=disabled</div>
          <div className="text-[#F5F0E8]">[OK] Monorepo initialized: 3 core submodules mounted</div>
          <div className="text-[#C8FF00]">[ACTIVE] Zero external telemetry trackers verified</div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Mail, ArrowUpRight, Copy, Check, Flame } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export const GEN_Z_EXCUSES = [
  "Bro really thought there was an ATS-formatted 1-page PDF in 2026 💀",
  "Currently calculating the time complexity of updating my resume. Worst case: O(never).",
  "My resume is stored in a decentralized background isolate. Please allow 3-5 business days for consensus.",
  "ChatGPT ran out of corporate buzzwords to describe how I center a div.",
  "My dog ate the PDF compiler, but my git commits on GitHub are 100% verified.",
  "Why read an unverified PDF when you can literally stress test my Sorting Lab at /lab?",
  "A recruiter told me to put 10 years of Next.js 16 experience. I decided to build real apps instead.",
  "Aura check: +10,000 for checking my portfolio. -500 for asking for corporate paperwork.",
  "Error 418: I am a teapot. Also I prefer shipping code over tweaking margins in Google Docs.",
  "Bro, the Flutter & Android code literally compiles. What more do you want from me fr fr?",
];

export function ResumeView() {
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleNextExcuse = () => {
    setExcuseIndex((prev) => (prev + 1) % GEN_Z_EXCUSES.length);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@varshan.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.14)] p-6 sm:p-10 space-y-7 shadow-2xl overflow-hidden">
      {/* Subtle Background Ambient Accents */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#C8FF00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#FF3B30]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(245,240,232,0.08)] font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#C8FF00] font-semibold">{'//'} 404_RESUME_NOT_FOUND</span>
          <span className="text-[#68635B]">•</span>
          <span className="text-[#FF3B30] font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>AURA CHECK</span>
          </span>
        </div>
        <span className="text-[#68635B] font-mono text-[11px]">SYS.TELEMETRY: ACTIVE</span>
      </div>

      {/* Hero Hook */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F0E8] leading-tight">
          Bro really clicked the resume button 💀
        </h1>
        <p className="text-sm sm:text-base text-[#9E988F] leading-relaxed max-w-xl">
          You expected an ATS-formatted 1-page PDF in the big 2026? Be so serious right now.
        </p>
      </div>

      {/* Interactive Excuse Box */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#080808] border border-[rgba(200,255,0,0.25)] space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between font-mono text-[11px] text-[#68635B]">
          <div className="flex items-center gap-2 text-[#C8FF00]">
            <Terminal className="w-4 h-4" />
            <span>CURRENT STATUS // EXCUSE_ROUTER</span>
          </div>
          <span>#{excuseIndex + 1} / {GEN_Z_EXCUSES.length}</span>
        </div>

        <p className="font-mono text-sm sm:text-base text-[#F5F0E8] leading-relaxed select-all">
          &ldquo;{GEN_Z_EXCUSES[excuseIndex]}&rdquo;
        </p>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleNextExcuse}
            className="px-3.5 py-2 rounded-lg bg-[#161616] hover:bg-[#202020] border border-[rgba(245,240,232,0.1)] text-[#C8FF00] font-mono text-xs inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-[#C8FF00]/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Roll another excuse</span>
          </button>
        </div>
      </div>

      {/* Aura & Real Proof Breakdown */}
      <div className="space-y-3 font-mono text-xs">
        <div className="text-[11px] text-[#68635B] uppercase tracking-wider">
          VERIFIED PROOF OF WORK // NO CAP:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#111111] border border-[rgba(245,240,232,0.06)] space-y-1.5">
            <div className="text-[#C8FF00] font-semibold flex items-center gap-1.5">
              <span>+10,000 AURA</span>
            </div>
            <p className="text-[#9E988F] font-sans text-xs sm:text-[13px] leading-relaxed">
              Shipped real Android and systems apps (A1 Swaara &amp; FLUXA) with zero telemetry bloat and high performance.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#111111] border border-[rgba(245,240,232,0.06)] space-y-1.5">
            <div className="text-[#F5F0E8] font-semibold">PROOF &gt; PAPER</div>
            <p className="text-[#9E988F] font-sans text-xs sm:text-[13px] leading-relaxed">
              100% of my code, commit histories, architectural decisions, and lab experiments are open source on GitHub.
            </p>
          </div>
        </div>
      </div>

      {/* Recruiter Callout */}
      <div className="p-5 rounded-xl bg-[#121212] border border-[rgba(245,240,232,0.08)] space-y-2">
        <p className="text-xs sm:text-sm text-[#E6E1D8] leading-relaxed font-sans">
          <span className="text-[#C8FF00] font-semibold font-mono">[Real talk for Recruiters &amp; Founders]:</span> If you genuinely need an official piece of paper with corporate bullet points for your ATS/HR portal, slide into my inbox and I will gladly send you an up-to-date copy directly:
        </p>
      </div>

      {/* Action CTAs */}
      <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
        <a
          href="mailto:contact@varshan.dev?subject=Hey%20Varshan%20-%20Need%20your%20actual%20resume"
          className="flex-1 min-h-[46px] px-5 py-3 rounded-xl bg-[#C8FF00] text-[#0A0A0A] hover:bg-[#D4FF33] font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-[#C8FF00]/10"
        >
          <Mail className="w-4 h-4" />
          <span>Slide into Email</span>
        </a>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="min-h-[46px] px-4 py-3 rounded-xl bg-[#161616] hover:bg-[#202020] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8] inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          title="Copy email address"
        >
          {copied ? <Check className="w-4 h-4 text-[#C8FF00]" /> : <Copy className="w-4 h-4 text-[#9E988F]" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>

        <a
          href="https://github.com/varshuai"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[46px] px-4 py-3 rounded-xl bg-[#161616] hover:bg-[#202020] border border-[rgba(245,240,232,0.1)] text-[#9E988F] hover:text-[#F5F0E8] inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#68635B]" />
        </a>
      </div>
    </div>
  );
}

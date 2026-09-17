"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Sparkles, Terminal, Mail, ArrowUpRight, Copy, Check, Flame } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { PROFILE } from "@/data/profile";

const GEN_Z_EXCUSES = [
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

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setExcuseIndex(Math.floor(Math.random() * GEN_Z_EXCUSES.length));
    };
    window.addEventListener("open-resume-modal", handleOpen);
    return () => window.removeEventListener("open-resume-modal", handleOpen);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNextExcuse = () => {
    setExcuseIndex((prev) => (prev + 1) % GEN_Z_EXCUSES.length);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.14)] p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Ambient Accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C8FF00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FF3B30]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Telemetry Header & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,240,232,0.08)] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#C8FF00] font-semibold">{'//'} 404_RESUME_NOT_FOUND</span>
            <span className="text-[#68635B]">•</span>
            <span className="text-[#FF3B30] font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>AURA CHECK</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#1A1A1A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Hook */}
        <div className="space-y-2">
          <h2
            id="resume-modal-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8] leading-tight"
          >
            Bro really clicked the resume button 💀
          </h2>
          <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
            You expected an ATS-formatted 1-page PDF in the big 2026? Be so serious right now.
          </p>
        </div>

        {/* Interactive Excuse Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#080808] border border-[rgba(200,255,0,0.25)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#68635B]">
            <div className="flex items-center gap-1.5 text-[#C8FF00]">
              <Terminal className="w-3.5 h-3.5" />
              <span>CURRENT STATUS // EXCUSE_ROUTER</span>
            </div>
            <span>#{excuseIndex + 1} / {GEN_Z_EXCUSES.length}</span>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#F5F0E8] leading-relaxed select-all">
            &ldquo;{GEN_Z_EXCUSES[excuseIndex]}&rdquo;
          </p>

          <div className="pt-1 flex justify-end">
            <button
              type="button"
              onClick={handleNextExcuse}
              className="px-3 py-1.5 rounded-md bg-[#161616] hover:bg-[#202020] border border-[rgba(245,240,232,0.1)] text-[#C8FF00] font-mono text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Roll another excuse</span>
            </button>
          </div>
        </div>

        {/* Aura & Real Proof Breakdown */}
        <div className="space-y-2.5 font-mono text-xs">
          <div className="text-[11px] text-[#68635B] uppercase tracking-wider">
            VERIFIED PROOF OF WORK // NO CAP:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-3 rounded-lg bg-[#111111] border border-[rgba(245,240,232,0.06)] space-y-1">
              <div className="text-[#C8FF00] font-semibold">+10,000 AURA</div>
              <p className="text-[#9E988F]">Shipping real Android apps (A1 Swaara &amp; FLUXA) with zero telemetry bloat.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#111111] border border-[rgba(245,240,232,0.06)] space-y-1">
              <div className="text-[#F5F0E8] font-semibold">PROOF &gt; PAPER</div>
              <p className="text-[#9E988F]">100% of my code, commit history, and systems architecture are on GitHub.</p>
            </div>
          </div>
        </div>

        {/* Recruiter Callout */}
        <div className="p-4 rounded-xl bg-[#121212] border border-[rgba(245,240,232,0.08)] space-y-2">
          <p className="text-xs text-[#E6E1D8] leading-relaxed font-sans">
            <span className="text-[#C8FF00] font-semibold font-mono">[Real talk for Recruiters &amp; Founders]:</span> If you genuinely need an official piece of paper with corporate bullet points for your HR portal, slide into my inbox and I will send you one directly:
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <a
            href={`mailto:${PROFILE.email}?subject=Hey%20Varshan%20-%20Need%20your%20actual%20resume`}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#C8FF00] text-[#0A0A0A] hover:bg-[#D4FF33] font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Slide into Email</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-[#161616] hover:bg-[#202020] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8] inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            title="Copy email address"
          >
            {copied ? <Check className="w-4 h-4 text-[#C8FF00]" /> : <Copy className="w-4 h-4 text-[#9E988F]" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <a
            href="https://github.com/varshuai"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-[#161616] hover:bg-[#202020] border border-[rgba(245,240,232,0.1)] text-[#9E988F] hover:text-[#F5F0E8] inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#68635B]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
}

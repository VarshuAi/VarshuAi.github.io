"use client";

import React, { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { PROFILE } from "@/data/profile";

export function FinalCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="relative rounded-xl bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] p-8 sm:p-12 lg:p-16 overflow-hidden">
      {/* Editorial Content Container */}
      <div className="max-w-3xl space-y-8">
        {/* Kicker */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E988F]">
          <span className="text-[#C8FF00] font-semibold">{"//"}</span>
          <span>DIRECT TRANSMISSION</span>
        </div>

        {/* Large Editorial Statement */}
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F0E8] leading-[0.95]">
            HAVE AN IDEA?
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#C8FF00] leading-[0.95]">
            LET&apos;S BUILD.
          </h2>
        </div>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#9E988F] max-w-2xl font-normal leading-relaxed">
          Open to interesting projects, collaborations, and conversations around software.
        </p>

        {/* Buttons / Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5">
          {/* Primary Action: Email */}
          <Button
            variant="accent"
            size="lg"
            href={`mailto:${PROFILE.email}`}
            icon={<Mail className="w-4 h-4 text-[#0A0A0A]" />}
            iconPosition="left"
          >
            Email Me
          </Button>

          {/* Secondary Action: GitHub */}
          <Button
            variant="secondary"
            size="lg"
            href={PROFILE.githubUrl}
            isExternal
            icon={<GithubIcon className="w-4 h-4" />}
            iconPosition="left"
          >
            GitHub
          </Button>

          {/* Secondary Action: LinkedIn */}
          <Button
            variant="secondary"
            size="lg"
            href={PROFILE.linkedinUrl}
            isExternal
            icon={<LinkedinIcon className="w-4 h-4" />}
            iconPosition="left"
          >
            LinkedIn
          </Button>

          {/* Quick Copy Email Utility Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-md font-mono text-xs text-[#9E988F] hover:text-[#F5F0E8] bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.18)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
            aria-label="Copy email address to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span className="text-[#C8FF00]">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#68635B]" />
                <span>{PROFILE.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Minimal Monospace Telemetry Strip */}
        <div className="pt-6 border-t border-[rgba(245,240,232,0.06)] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#68635B]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
            <span>DIRECT CHANNEL: ACTIVE</span>
          </div>
          <div>ESTIMATED RESPONSE: &lt; 24 HOURS</div>
        </div>
      </div>
    </div>
  );
}

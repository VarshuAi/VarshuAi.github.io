import React from "react";
import { ArrowUpRight, BookOpen, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

const CURRENTLY_LEARNING = [
  { topic: "DSA", focus: "Algorithms & complexity" },
  { topic: "AI/ML", focus: "Neural inference & DSP" },
  { topic: "GenAI", focus: "Tooling & agent workflows" },
  { topic: "System Design", focus: "Scalable backends & cache" },
  { topic: "Open Source", focus: "Community code & tooling" },
];

export function AboutSection() {
  return (
    <div className="space-y-12">
      {/* Editorial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Personal Narrative & Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section Kicker */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E988F]">
            <span className="text-[#C8FF00] font-semibold">{"//"}</span>
            <span>04 // PERSONAL STANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F5F0E8]">
            A LITTLE ABOUT ME.
          </h2>

          {/* Core Copy */}
          <div className="space-y-4 text-base sm:text-lg text-[#9E988F] leading-relaxed">
            <p>
              I&apos;m <span className="text-[#F5F0E8] font-medium">Varshan</span>, a CSE student
              focused on building software rather than just studying it.
            </p>

            <p>
              I&apos;m currently exploring DSA, AI/ML, GenAI, full-stack development, mobile
              engineering, and open source.
            </p>

            {/* Standout Editorial Callout */}
            <div className="p-4 sm:p-5 rounded-md bg-[#121212] border-l-2 border-[#C8FF00] border-y border-r border-[rgba(245,240,232,0.06)]">
              <p className="font-mono text-sm sm:text-base text-[#F5F0E8] font-medium tracking-tight">
                &ldquo;Most of what I learn becomes a project.&rdquo;
              </p>
            </div>
          </div>

          {/* Currently Learning / Exploring Pills */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#68635B] uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span>CURRENT EXPLORATION & STUDY</span>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {CURRENTLY_LEARNING.map((item) => (
                <div
                  key={item.topic}
                  className="px-3 py-1.5 rounded bg-[#121212] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#F5F0E8] font-medium group-hover:text-[#C8FF00] transition-colors">
                    {item.topic}
                  </span>
                  <span className="text-[10px] text-[#68635B] border-l border-[rgba(245,240,232,0.08)] pl-2">
                    {item.focus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Detail — Technical Stance Badge (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-lg bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] overflow-hidden shadow-2xl">
            {/* Terminal Top Bar */}
            <div className="px-4 py-3 border-b border-[rgba(245,240,232,0.08)] bg-[#121212] flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span className="text-[#F5F0E8] font-medium">varshan.identity</span>
              </div>
              <span className="text-[10px] text-[#68635B] uppercase tracking-wider">
                CSE PROFILE
              </span>
            </div>

            {/* Profile Properties */}
            <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
              <div className="flex items-start justify-between pb-3 border-b border-[rgba(245,240,232,0.05)]">
                <span className="text-[#68635B]">ACADEMIC TRACK</span>
                <span className="text-[#F5F0E8] text-right">Computer Science & Engg</span>
              </div>

              <div className="flex items-start justify-between pb-3 border-b border-[rgba(245,240,232,0.05)]">
                <span className="text-[#68635B]">CORE BIAS</span>
                <span className="text-[#C8FF00] text-right">Build &gt; Theorize</span>
              </div>

              <div className="flex items-start justify-between pb-3 border-b border-[rgba(245,240,232,0.05)]">
                <span className="text-[#68635B]">ACTIVE PIPELINES</span>
                <span className="text-[#F5F0E8] text-right">A1 Swaara · FLUXA · VelorioLabs</span>
              </div>

              <div className="flex items-start justify-between pb-3 border-b border-[rgba(245,240,232,0.05)]">
                <span className="text-[#68635B]">PRIMARY LOCATION</span>
                <span className="text-[#F5F0E8] text-right">Bangalore, IN</span>
              </div>

              <div className="flex items-start justify-between pb-3 border-b border-[rgba(245,240,232,0.05)]">
                <span className="text-[#68635B]">COLLABORATION</span>
                <span className="text-[#F5F0E8] text-right text-emerald-400">Open to select roles</span>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] text-center text-[#F5F0E8] hover:text-[#C8FF00] transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span>View Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/varshuai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] text-center text-[#F5F0E8] hover:text-[#C8FF00] transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

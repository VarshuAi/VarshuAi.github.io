import React from 'react';
import { AlertCircle, CheckCircle2, Cpu, Wrench } from 'lucide-react';
import { EngineeringChallenge } from '@/data/caseStudies';

interface EngineeringChallengesProps {
  challenges: EngineeringChallenge[];
}

export function EngineeringChallenges({ challenges }: EngineeringChallengesProps) {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>ENGINEERING CHALLENGES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
          Technical Bottlenecks & Solutions
        </h2>
        <p className="text-sm sm:text-base text-[#9E988F] max-w-3xl leading-relaxed">
          Real implementation hurdles encountered during development, the architectural approaches taken, and the measurable results.
        </p>
      </div>

      {/* 3-Column or Stacked Challenge Cards */}
      <div className="space-y-6">
        {challenges.map((challenge) => (
          <article
            key={challenge.number}
            className="rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] p-6 sm:p-8 space-y-6 hover:border-[rgba(245,240,232,0.2)] transition-all"
          >
            {/* Challenge Title & Number Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(245,240,232,0.06)]">
              <div className="space-y-1">
                <div className="font-mono text-xs text-[#C8FF00] font-semibold">
                  CHALLENGE // {challenge.number}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#F5F0E8]">
                  {challenge.title}
                </h3>
              </div>
            </div>

            {/* Tri-Part Grid: Problem -> Approach -> Result */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Problem */}
              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-[rgba(245,240,232,0.06)]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF3B30] font-medium uppercase">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>The Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
                  {challenge.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-[rgba(245,240,232,0.06)]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#9E988F] font-medium uppercase">
                  <Wrench className="w-3.5 h-3.5 text-[#C8FF00]" />
                  <span>The Approach</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
                  {challenge.approach}
                </p>
              </div>

              {/* Result */}
              <div className="space-y-2 p-4 rounded-xl bg-[#121212] border border-[rgba(200,255,0,0.15)]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] font-medium uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>The Outcome</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F0E8] leading-relaxed font-normal">
                  {challenge.result}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

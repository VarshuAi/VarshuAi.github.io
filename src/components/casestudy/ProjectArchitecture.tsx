import React from 'react';
import { ArrowDown, Layers, Terminal } from 'lucide-react';
import { ArchitectureLayer } from '@/data/caseStudies';

interface ProjectArchitectureProps {
  summary: string;
  layers: ArchitectureLayer[];
  rationale: string;
}

export function ProjectArchitecture({
  summary,
  layers,
  rationale,
}: ProjectArchitectureProps) {
  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
          How the System Is Engineered
        </h2>
        <p className="text-sm sm:text-base text-[#9E988F] max-w-3xl leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Visual Architectural Layers Diagram */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#070707] border border-[rgba(245,240,232,0.08)] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(245,240,232,0.06)] font-mono text-xs text-[#68635B]">
          <div className="flex items-center gap-2 text-[#F5F0E8]">
            <Terminal className="w-3.5 h-3.5 text-[#C8FF00]" />
            <span className="font-medium">COMPONENT_TOPOLOGY_MAP</span>
          </div>
          <span className="text-[11px] text-[#C8FF00]">● UNIDIRECTIONAL_FLOW</span>
        </div>

        <div className="space-y-3 pt-2">
          {layers.map((layer, idx) => (
            <React.Fragment key={layer.name}>
              {/* Layer Node Box */}
              <div className="rounded-xl bg-[#0F0F0F] border border-[rgba(245,240,232,0.08)] p-4 sm:p-5 hover:border-[rgba(200,255,0,0.3)] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#C8FF00]">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-[#F5F0E8]">
                      {layer.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] bg-[#161616] text-[#9E988F] border border-[rgba(245,240,232,0.06)] w-fit">
                    {layer.badge}
                  </span>
                </div>

                {/* Layer Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="px-2.5 py-1.5 rounded bg-[#0A0A0A] border border-[rgba(245,240,232,0.04)] font-mono text-[11px] text-[#9E988F] flex items-center gap-1.5"
                    >
                      <span className="text-[#C8FF00] select-none">›</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting Pipe Indicator */}
              {idx < layers.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[#68635B]">
                    <ArrowDown className="w-3 h-3 text-[#C8FF00] animate-bounce" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Architectural Rationale Callout */}
      <div className="p-5 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.06)] space-y-2">
        <div className="font-mono text-xs text-[#C8FF00] uppercase tracking-wider font-semibold">
          Architectural Decision Rationale
        </div>
        <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
          {rationale}
        </p>
      </div>
    </section>
  );
}

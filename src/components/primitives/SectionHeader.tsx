import React from "react";

export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[rgba(245,240,232,0.08)] pb-5 mb-8 sm:mb-12 ${className}`}
    >
      <div className="space-y-2 max-w-2xl">
        {kicker && (
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9E988F]">
            <span className="text-[#C8FF00] font-semibold">{"//"}</span>
            <span>{kicker}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-[15px] text-[#9E988F] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 flex items-center">{action}</div>}
    </div>
  );
}

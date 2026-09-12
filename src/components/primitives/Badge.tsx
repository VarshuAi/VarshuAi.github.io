import React from "react";

export type BadgeVariant = "neutral" | "accent" | "signal" | "outline" | "live";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral:
    "bg-[#141414] text-[#9E988F] border border-[rgba(245,240,232,0.08)]",
  outline:
    "bg-transparent text-[#9E988F] border border-[rgba(245,240,232,0.12)]",
  accent:
    "bg-[rgba(200,255,0,0.06)] text-[#C8FF00] border border-[rgba(200,255,0,0.25)]",
  signal:
    "bg-[rgba(255,59,48,0.08)] text-[#FF3B30] border border-[rgba(255,59,48,0.25)]",
  live:
    "bg-[#141414] text-[#F5F0E8] border border-[rgba(245,240,232,0.1)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[11px] px-2 py-0.5 rounded gap-1.5",
  md: "text-xs px-2.5 py-1 rounded-md gap-2",
};

export function Badge({
  variant = "neutral",
  size = "sm",
  dot = false,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const showDot = dot || variant === "live";

  return (
    <span
      className={`inline-flex items-center font-mono font-normal tracking-wide transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {showDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
              variant === "signal" ? "bg-[#FF3B30]" : "bg-[#C8FF00]"
            }`}
          />
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
              variant === "signal" ? "bg-[#FF3B30]" : "bg-[#C8FF00]"
            }`}
          />
        </span>
      )}
      {children}
    </span>
  );
}

import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#F5F0E8] text-[#0A0A0A] font-medium hover:bg-[#FAF6F0] active:scale-[0.98] shadow-sm",
  secondary:
    "bg-[#141414] text-[#F5F0E8] border border-[rgba(245,240,232,0.12)] hover:border-[rgba(245,240,232,0.25)] hover:bg-[#1A1A1A] active:scale-[0.98]",
  outline:
    "bg-transparent text-[#F5F0E8] border border-[rgba(245,240,232,0.14)] hover:bg-[#141414] hover:border-[rgba(245,240,232,0.3)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#141414]/80 active:scale-[0.98]",
  accent:
    "bg-[#C8FF00] text-[#0A0A0A] font-medium hover:brightness-105 active:scale-[0.98] shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-3.5 py-2 rounded-md gap-2",
  lg: "text-sm sm:text-base px-5 py-2.5 rounded-md gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      href,
      isExternal = false,
      icon,
      iconPosition = "right",
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-sans tracking-tight transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none";

    const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
        )}
      </>
    );

    if (href) {
      if (isExternal || href.startsWith("http") || href.startsWith("mailto:")) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {content}
          </a>
        );
      }

      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={props.type || "button"}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

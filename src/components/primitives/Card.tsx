import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  accentBorderOnHover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  interactive = false,
  accentBorderOnHover = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const interactiveClasses = interactive
    ? `transition-all duration-200 ease-out hover:bg-[#161616] ${
        accentBorderOnHover
          ? "hover:border-[rgba(200,255,0,0.35)]"
          : "hover:border-[rgba(245,240,232,0.18)]"
      }`
    : "";

  return (
    <div
      className={`rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] p-5 sm:p-6 ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col space-y-2 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg sm:text-xl font-medium tracking-tight text-[#F5F0E8] ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-[#9E988F] leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-6 pt-4 border-t border-[rgba(245,240,232,0.06)] flex items-center justify-between text-xs text-[#68635B] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

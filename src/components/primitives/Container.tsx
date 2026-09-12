import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
}

export function Container({
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    tight: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
  }[size];

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

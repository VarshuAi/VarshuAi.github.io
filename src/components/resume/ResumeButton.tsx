"use client";

import React from "react";
import Link from "next/link";
import { openResumeModal } from "./ResumeModal";

export interface ResumeButtonProps {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function ResumeButton({
  className = "",
  children,
  ariaLabel = "View Resume",
}: ResumeButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Normal primary click opens the in-place easter egg modal
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      openResumeModal();
    }
  };

  return (
    <Link
      href="/resume"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

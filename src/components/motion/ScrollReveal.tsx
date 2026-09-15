"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  id?: string;
  as?: React.ElementType;
}

const emptySubscribe = () => () => {};

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  threshold = 0.12,
  id,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, prefersReducedMotion]);

  // If not on client (SSR), render directly so search engines / initial markup have no layout shift
  if (!isClient) {
    return (
      <Component ref={ref} id={id} className={className}>
        {children}
      </Component>
    );
  }

  const shouldShow = prefersReducedMotion || isVisible;

  return (
    <Component
      ref={ref}
      id={id}
      style={{
        transitionDuration: prefersReducedMotion ? "0ms" : "500ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: prefersReducedMotion ? "0ms" : `${delayMs}ms`,
      }}
      className={`${className} transition-all ${
        shouldShow
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {children}
    </Component>
  );
}

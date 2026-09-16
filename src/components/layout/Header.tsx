"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scrolling when mobile navigation is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[rgba(245,240,232,0.08)] py-3.5"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            className="font-mono text-sm tracking-widest uppercase font-semibold text-[#F5F0E8] hover:text-[#C8FF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1.5"
            aria-label="Varshan Home"
          >
            VARSHAN
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase"
            aria-label="Main Navigation"
          >
            <Link
              href="/#projects"
              className="text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              Work
            </Link>
            <Link
              href="/lab"
              className="text-[#9E988F] hover:text-[#C8FF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              Lab
            </Link>
            <Link
              href="/#about"
              className="text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              About
            </Link>
            <a
              href="https://github.com/varshuai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F5F0E8] px-2.5 py-1 rounded bg-[#141414] border border-[rgba(245,240,232,0.1)] hover:border-[rgba(245,240,232,0.25)] hover:bg-[#1A1A1A] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#C8FF00]" />
            </a>
          </nav>

          {/* Mobile Menu Trigger (44px min touch target) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#141414] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer with Backdrop Overlay & 44px Touch Targets */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto">
          <nav className="flex flex-col font-mono text-sm tracking-wider uppercase divide-y divide-[rgba(245,240,232,0.06)]">
            <Link
              href="/#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9E988F] hover:text-[#F5F0E8] active:text-[#C8FF00] min-h-[48px] flex items-center transition-colors"
            >
              Work
            </Link>
            <Link
              href="/lab"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9E988F] hover:text-[#F5F0E8] active:text-[#C8FF00] min-h-[48px] flex items-center transition-colors"
            >
              Lab
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9E988F] hover:text-[#F5F0E8] active:text-[#C8FF00] min-h-[48px] flex items-center transition-colors"
            >
              About
            </Link>
            <a
              href="https://github.com/varshuai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-[#9E988F] hover:text-[#F5F0E8] active:text-[#C8FF00] min-h-[48px] transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-[#9E988F]" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-[#C8FF00] min-h-[48px] transition-colors"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 text-[#C8FF00]" />
            </a>
          </nav>

          {/* Bottom Telemetry Info in Mobile Drawer */}
          <div className="pt-6 mt-6 border-t border-[rgba(245,240,232,0.08)] font-mono text-xs text-[#68635B] space-y-2">
            <div className="flex items-center justify-between">
              <span>LOCATION</span>
              <span className="text-[#F5F0E8]">Bangalore, IN (UTC+5:30)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>DIRECT CHANNEL</span>
              <a
                href="mailto:contact@varshan.dev"
                className="text-[#C8FF00] hover:underline"
              >
                contact@varshan.dev
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

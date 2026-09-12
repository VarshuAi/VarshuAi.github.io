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
            className="font-mono text-sm tracking-widest uppercase font-semibold text-[#F5F0E8] hover:text-[#C8FF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
            aria-label="Varshan Home"
          >
            VARSHAN
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase"
            aria-label="Main Navigation"
          >
            <a
              href="#projects"
              className="text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              Work
            </a>
            <a
              href="#open-source"
              className="text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              Open Source
            </a>
            <a
              href="#about"
              className="text-[#9E988F] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              About
            </a>
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

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#141414] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[56px] border-b border-[rgba(245,240,232,0.08)] bg-[#0A0A0A]/95 backdrop-blur-xl px-6 py-6 transition-all duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-4 font-mono text-sm tracking-wider uppercase">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9E988F] hover:text-[#F5F0E8] py-2 border-b border-[rgba(245,240,232,0.04)]"
            >
              Work
            </a>
            <a
              href="#open-source"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9E988F] hover:text-[#F5F0E8] py-2 border-b border-[rgba(245,240,232,0.04)]"
            >
              Open Source
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9E988F] hover:text-[#F5F0E8] py-2 border-b border-[rgba(245,240,232,0.04)]"
            >
              About
            </a>
            <a
              href="https://github.com/varshuai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-[#9E988F] hover:text-[#F5F0E8] py-2 border-b border-[rgba(245,240,232,0.04)]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-[#9E988F]" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-[#C8FF00] py-2"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 text-[#C8FF00]" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

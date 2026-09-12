"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Container } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Systems & Projects", href: "#projects" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

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

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[rgba(245,240,232,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-[#0A0A0A] border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-[#F5F0E8] transition-colors hover:text-white"
            >
              <span className="font-semibold">Varshan Gowda S R</span>
            </Link>

            <span className="hidden sm:inline-block text-[#68635B] font-mono text-xs">/</span>

            <div className="hidden sm:flex items-center">
              <Badge variant="neutral" size="sm" dot className="text-[11px] py-0.5 px-2 text-[#9E988F]">
                CSE • AI/ML • Full-Stack
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-mono uppercase tracking-wider text-[#9E988F] transition-colors hover:text-[#F5F0E8]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: GitHub & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/varshuai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-[#F5F0E8] bg-[#141414] border border-[rgba(245,240,232,0.12)] transition-all hover:bg-[#1A1A1A] hover:border-[rgba(245,240,232,0.25)]"
              aria-label="GitHub Profile @varshuai"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">varshuai</span>
              <ArrowUpRight className="w-3 h-3 text-[#9E988F]" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#141414] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(245,240,232,0.08)] bg-[#0A0A0A]/98 backdrop-blur-xl px-4 py-6 transition-all animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-4">
            <div className="pb-3 border-b border-[rgba(245,240,232,0.06)]">
              <Badge variant="neutral" size="sm" dot className="text-xs">
                CSE • AI/ML • Full-Stack Developer
              </Badge>
            </div>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-[#9E988F] hover:text-[#F5F0E8] py-1"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="https://github.com/varshuai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-xs font-mono bg-[#141414] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8]"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4" />
                  github.com/varshuai
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9E988F]" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

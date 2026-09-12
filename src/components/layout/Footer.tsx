import React from "react";
import { Container } from "@/components/primitives/Container";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(245,240,232,0.08)] bg-[#0A0A0A] py-12 sm:py-16 mt-20 sm:mt-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[rgba(245,240,232,0.06)]">
          {/* Identity & Stance */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5F0E8] font-medium">
                Varshan Gowda S R
              </span>
            </div>
            <p className="text-sm text-[#9E988F] max-w-md leading-relaxed">
              Software engineer focused on high-leverage systems across artificial intelligence,
              distributed backend services, and native mobile client architectures.
            </p>
            <div className="pt-2 text-xs font-mono text-[#68635B]">
              Operating Base: <span className="text-[#9E988F]">Bangalore, IN (UTC+5:30)</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#68635B]">
              Network
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <a
                  href="https://github.com/varshuai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#9E988F] hover:text-[#F5F0E8] transition-colors"
                >
                  <span>GitHub (@varshuai)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#68635B]" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@varshan.dev"
                  className="inline-flex items-center gap-1 text-[#9E988F] hover:text-[#F5F0E8] transition-colors"
                >
                  <span>Direct Transmission</span>
                  <ArrowUpRight className="w-3 h-3 text-[#68635B]" />
                </a>
              </li>
            </ul>
          </div>

          {/* System Spec */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#68635B]">
              Specifications
            </div>
            <div className="text-xs font-mono text-[#9E988F] space-y-1 leading-relaxed">
              <p>Framework: Next.js 15 App Router</p>
              <p>Type Safety: Strict TypeScript</p>
              <p>Design Language: Precision Editorial Dark</p>
              <p>Typography: Geist Sans & Geist Mono</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#68635B]">
          <div>
            © {new Date().getFullYear()} Varshan Gowda S R. Crafted with intentional restraint.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />
              Production Ready
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

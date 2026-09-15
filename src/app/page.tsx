import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FeaturedProjectCard } from "@/components/showcase/FeaturedProjectCard";
import { SecondaryProjectCard } from "@/components/showcase/SecondaryProjectCard";
import { OpenSourceProjectCard } from "@/components/showcase/OpenSourceProjectCard";
import { TechnicalManifesto } from "@/components/identity/TechnicalManifesto";
import { OpenSourceSection } from "@/components/github/OpenSourceSection";
import { CurrentlyBuilding } from "@/components/about/CurrentlyBuilding";
import { AboutSection } from "@/components/about/AboutSection";
import { FinalCTA } from "@/components/ending/FinalCTA";
import { SystemsConsole } from "@/components/hero/SystemsConsole";
import { PROFILE } from "@/data/profile";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <Header />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION — EDITORIAL ASYMMETRIC GRID */}
        <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[rgba(245,240,232,0.06)] relative overflow-hidden">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Typography & Intent */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                {/* Micro Details: Currently Building Status */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="live" size="sm" className="bg-[#121212] text-[#F5F0E8] border-[rgba(245,240,232,0.1)]">
                    CURRENTLY BUILDING
                  </Badge>
                  <span className="text-[#68635B] font-mono text-xs hidden sm:inline">•</span>
                  <span className="font-mono text-xs text-[#9E988F] tracking-wide">
                    A1 Swaara · FLUXA · VelorioLabs
                  </span>
                </div>

                {/* Name & Positioning */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-medium tracking-tight text-[#F5F0E8] leading-[1.08]">
                    VARSHAN GOWDA S R
                  </h1>
                  <p className="font-mono text-xs sm:text-sm text-[#C8FF00] tracking-widest uppercase font-semibold">
                    CSE • AI/ML • FULL-STACK DEVELOPER
                  </p>
                </div>

                {/* Stance & Manifesto */}
                <div className="space-y-3 max-w-xl">
                  <p className="text-lg sm:text-xl lg:text-2xl text-[#F5F0E8] font-normal leading-snug">
                    &ldquo;I build software, explore AI/ML, and contribute to open source.&rdquo;
                  </p>
                  <p className="text-sm sm:text-base text-[#9E988F] leading-relaxed">
                    Engineering robust, high-performance systems from first principles — across distributed backends, applied machine learning pipelines, and responsive client architectures.
                  </p>
                </div>

                {/* Call To Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href="#projects"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    View Work
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    href="https://github.com/varshuai"
                    isExternal
                    icon={<ArrowUpRight className="w-4 h-4 text-[#9E988F]" />}
                    iconPosition="right"
                  >
                    GitHub ↗
                  </Button>

                  <Button
                    variant="ghost"
                    size="md"
                    href="/resume.pdf"
                    isExternal
                    icon={<ArrowUpRight className="w-3.5 h-3.5 text-[#68635B]" />}
                    iconPosition="right"
                  >
                    Resume
                  </Button>
                </div>

                {/* Micro Telemetry Bar */}
                <div className="pt-6 mt-6 border-t border-[rgba(245,240,232,0.06)] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Location</div>
                    <div className="text-[#F5F0E8] mt-0.5">Bangalore, IN (UTC+5:30)</div>
                  </div>
                  <div>
                    <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Core Stack</div>
                    <div className="text-[#F5F0E8] mt-0.5">Next.js • Flutter • PyTorch</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Direct Channel</div>
                    <a
                      href="mailto:contact@varshan.dev"
                      className="text-[#C8FF00] hover:underline mt-0.5 inline-block"
                    >
                      contact@varshan.dev
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Systems Console */}
              <div className="lg:col-span-5 w-full">
                <SystemsConsole />
              </div>
            </div>
          </Container>
        </section>

        {/* SELECTED WORK / PROJECTS */}
        <section id="projects" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container size="wide">
            <SectionHeader
              kicker="01 // ARCHITECTURE & SYSTEMS"
              title="SELECTED WORK"
              description="Things I've built, shipped, and continue to improve."
              action={
                <a
                  href="https://github.com/varshuai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#9E988F] hover:text-[#C8FF00] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Browse all repositories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              }
            />

            {/* Visual Hierarchy: Flagship Featured Project */}
            <div className="space-y-8">
              <FeaturedProjectCard project={PROFILE.projects[0]} />

              {/* Secondary Substantial Project + Open Source Collective */}
              <div id="secondary-projects" className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24">
                <SecondaryProjectCard project={PROFILE.projects[1]} />
                <OpenSourceProjectCard project={PROFILE.projects[2]} />
              </div>
            </div>
          </Container>
        </section>

        {/* WHAT I BUILD — TECHNICAL IDENTITY */}
        <section id="capabilities" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container size="wide">
            <SectionHeader
              kicker="02 // TECHNICAL SCOPE"
              title="WHAT I BUILD"
              description="Editorial technical direction across machine intelligence, distributed backends, native client software, and open-source systems."
            />

            <TechnicalManifesto
              categories={PROFILE.technicalIdentity.categories}
              compactStack={PROFILE.technicalIdentity.compactStack}
            />
          </Container>
        </section>

        {/* OPEN SOURCE / GITHUB IDENTITY */}
        <section id="open-source" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container size="wide">
            <OpenSourceSection />
          </Container>
        </section>

        {/* CURRENTLY BUILDING & ABOUT SECTION */}
        <section id="about" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container size="wide">
            <div className="space-y-20 sm:space-y-24">
              {/* SECTION 1: CURRENTLY BUILDING */}
              <div id="currently-building" className="scroll-mt-24">
                <CurrentlyBuilding />
              </div>

              {/* SECTION 2: ABOUT */}
              <AboutSection />
            </div>
          </Container>
        </section>

        {/* PHILOSOPHY & STANCE */}
        <section id="philosophy" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container size="wide">
            <SectionHeader
              kicker="05 // ENGINEERING DISCIPLINE"
              title="How I Approach Software"
              description="A clear stance on building reliable, maintainable systems that outlast hype cycles."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] space-y-3">
                <div className="font-mono text-xs text-[#C8FF00]">01 // FIRST PRINCIPLES</div>
                <h4 className="font-medium text-sm text-[#F5F0E8]">Foundations Over Frameworks</h4>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  Deep grounding in algorithms, computational complexity, memory management, and network boundaries.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] space-y-3">
                <div className="font-mono text-xs text-[#C8FF00]">02 // PRODUCTION MINDSET</div>
                <h4 className="font-medium text-sm text-[#F5F0E8]">Resilient by Construction</h4>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  Defensive validation, graceful degradation, explicit error states, and end-to-end type safety across boundaries.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] space-y-3">
                <div className="font-mono text-xs text-[#C8FF00]">03 // SUB-100MS LATENCY</div>
                <h4 className="font-medium text-sm text-[#F5F0E8]">Speed Is a Feature</h4>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  Eliminating unnecessary render loops, optimizing payload sizes, caching strategically, and minimizing JS overhead.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] space-y-3">
                <div className="font-mono text-xs text-[#C8FF00]">04 // TASTE & RESTRAINT</div>
                <h4 className="font-medium text-sm text-[#F5F0E8]">Intentional Engineering</h4>
                <p className="text-xs text-[#9E988F] leading-relaxed">
                  Rejecting superficial flash, unnecessary animations, and bloat in favor of quiet, durable software excellence.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* FINAL CTA / ENDING EXPERIENCE */}
        <section id="contact" className="py-16 sm:py-24">
          <Container size="wide">
            <FinalCTA />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

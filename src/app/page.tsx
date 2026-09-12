import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/primitives/Card";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { ProjectCard } from "@/components/primitives/ProjectCard";
import { PROFILE } from "@/data/profile";
import { ArrowRight, Mail, Terminal, Cpu, Layers, Code } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <Header />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[rgba(245,240,232,0.06)] relative overflow-hidden">
          <Container>
            <div className="max-w-4xl space-y-8">
              {/* Eyebrow / Status */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="live" size="sm">
                  Available for Select Engineering Roles
                </Badge>
                <span className="text-[#68635B] font-mono text-xs">•</span>
                <span className="font-mono text-xs text-[#9E988F] uppercase tracking-wider">
                  Bangalore, IN
                </span>
              </div>

              {/* Primary Identity & Manifesto Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#F5F0E8] leading-[1.08]">
                  Varshan Gowda S R
                </h1>
                <p className="font-mono text-base sm:text-lg text-[#C8FF00] tracking-tight">
                  CSE • AI/ML • Full-Stack Developer
                </p>
              </div>

              {/* Non-cliché statement */}
              <div className="space-y-4 text-base sm:text-xl text-[#9E988F] font-normal leading-relaxed max-w-2xl">
                <p>
                  I am a young engineer who <span className="text-[#F5F0E8] font-medium">actually builds software</span>.
                  Transforming mathematical and computer science foundations into resilient, production-grade applications.
                </p>
                <p className="text-sm sm:text-base text-[#68635B]">
                  Specializing in machine learning integration, distributed full-stack systems, and native mobile client architectures.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  href="#projects"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Explore Systems
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  href="https://github.com/varshuai"
                  isExternal
                  icon={<GithubIcon className="w-4 h-4" />}
                  iconPosition="left"
                >
                  GitHub / varshuai
                </Button>

                <Button
                  variant="ghost"
                  size="md"
                  href="mailto:contact@varshan.dev"
                  icon={<Mail className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Direct Email
                </Button>
              </div>

              {/* Engineering Telemetry Strip */}
              <div className="pt-8 mt-8 border-t border-[rgba(245,240,232,0.06)] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Role / Discipline</div>
                  <div className="text-[#F5F0E8] mt-1">Systems Engineer</div>
                </div>
                <div>
                  <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Primary Focus</div>
                  <div className="text-[#F5F0E8] mt-1">AI/ML & Full-Stack</div>
                </div>
                <div>
                  <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Mobile Stack</div>
                  <div className="text-[#F5F0E8] mt-1">Flutter • Android</div>
                </div>
                <div>
                  <div className="text-[#68635B] uppercase tracking-wider text-[10px]">Status</div>
                  <div className="text-[#C8FF00] mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
                    Building Systems
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FEATURED PROJECTS / SYSTEMS */}
        <section id="projects" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container>
            <SectionHeader
              kicker="01 // ARCHITECTURE & SYSTEMS"
              title="Selected Engineering Projects"
              description="Real software projects architected with intentional technical trade-offs, clean interfaces, and resilient infrastructure."
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

            {/* Asymmetric Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Card: A1 Swaara */}
              <ProjectCard project={PROFILE.projects[0]} featured={true} />

              {/* FLUXA */}
              <ProjectCard project={PROFILE.projects[1]} />

              {/* VelorioLabs */}
              <ProjectCard project={PROFILE.projects[2]} />
            </div>
          </Container>
        </section>

        {/* CAPABILITIES & ARCHITECTURAL DEPTH (NO GENERIC LOGO WALL) */}
        <section id="capabilities" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container>
            <SectionHeader
              kicker="02 // TECHNICAL SCOPE"
              title="Engineering Competencies"
              description="Structured by technical discipline and theoretical depth rather than superficial logo lists."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROFILE.capabilities.map((cap, index) => {
                const icons = [
                  <Cpu key="cpu" className="w-5 h-5 text-[#C8FF00]" />,
                  <Layers key="layers" className="w-5 h-5 text-[#C8FF00]" />,
                  <Code key="code" className="w-5 h-5 text-[#C8FF00]" />,
                  <Terminal key="term" className="w-5 h-5 text-[#C8FF00]" />,
                ];

                return (
                  <Card key={cap.domain} interactive className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded bg-[#161616] border border-[rgba(245,240,232,0.08)]">
                          {icons[index % icons.length]}
                        </div>
                        <span className="font-mono text-xs text-[#68635B]">0{index + 1}</span>
                      </div>

                      <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg text-[#F5F0E8]">
                          {cap.domain}
                        </CardTitle>
                        <CardDescription className="text-sm text-[#9E988F] pt-1">
                          {cap.description}
                        </CardDescription>
                      </CardHeader>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[rgba(245,240,232,0.06)]">
                      <div className="flex flex-wrap gap-1.5">
                        {cap.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#161616] text-[#9E988F] border border-[rgba(245,240,232,0.06)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* PHILOSOPHY & STANCE */}
        <section id="philosophy" className="py-16 sm:py-24 border-b border-[rgba(245,240,232,0.06)]">
          <Container>
            <SectionHeader
              kicker="03 // ENGINEERING DISCIPLINE"
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

        {/* DIRECT TRANSMISSION / CONTACT */}
        <section id="contact" className="py-16 sm:py-24">
          <Container>
            <div className="rounded-lg bg-[#121212] border border-[rgba(245,240,232,0.08)] p-6 sm:p-10 relative overflow-hidden">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9E988F]">
                  <span className="text-[#C8FF00] font-semibold">{"//"}</span>
                  <span>Direct Communication</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                  Let&apos;s build something durable together.
                </h3>

                <p className="text-sm sm:text-base text-[#9E988F] leading-relaxed">
                  Whether discussing high-leverage engineering roles, collaborating on open-source systems,
                  or exploring technical ideas across AI/ML and distributed platforms.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="accent"
                    size="md"
                    href="mailto:contact@varshan.dev"
                    icon={<Mail className="w-4 h-4 text-[#0A0A0A]" />}
                    iconPosition="left"
                  >
                    Transmit Message
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    href="https://github.com/varshuai"
                    isExternal
                    icon={<GithubIcon className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    GitHub Profile
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

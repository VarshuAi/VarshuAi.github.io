import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { CaseStudyHeader } from '@/components/casestudy/CaseStudyHeader';
import { ProjectHeroImage } from '@/components/casestudy/ProjectHeroImage';
import { ProjectArchitecture } from '@/components/casestudy/ProjectArchitecture';
import { EngineeringChallenges } from '@/components/casestudy/EngineeringChallenges';
import { ProjectScreenshotGallery } from '@/components/casestudy/ProjectScreenshotGallery';
import { ProjectNavigation } from '@/components/casestudy/ProjectNavigation';
import { CASE_STUDIES } from '@/data/caseStudies';
import {
  Sparkles,
  Code2,
  BookOpen,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];

  if (!project) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${project.title} — Engineering Case Study | Varshan Gowda S R`,
    description: `${project.tagline}. ${project.overview.what.slice(0, 150)}...`,
    openGraph: {
      title: `${project.title} — Varshan Gowda S R`,
      description: project.tagline,
      url: `https://varshuai.github.io/work/${project.slug}`,
      type: 'article',
      images: [
        {
          url: project.heroImage,
          alt: project.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Varshan Gowda S R`,
      description: project.tagline,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <Header />

      <main id="main-content" className="flex-1 pb-24">
        <Container size="wide" className="space-y-16 sm:space-y-24">
          {/* Header & Meta */}
          <CaseStudyHeader project={project} />

          {/* Hero Visual */}
          <ProjectHeroImage project={project} />

          {/* SECTION: OVERVIEW */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                <span>01 // OVERVIEW</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                Project Genesis & Intent
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {/* What It Is */}
              <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] space-y-3">
                <div className="font-mono text-xs text-[#C8FF00] uppercase tracking-wider font-semibold">
                  WHAT IT IS
                </div>
                <p className="text-sm sm:text-base text-[#F5F0E8] leading-relaxed">
                  {project.overview.what}
                </p>
              </div>

              {/* Why I Built It */}
              <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] space-y-3">
                <div className="font-mono text-xs text-[#9E988F] uppercase tracking-wider font-semibold">
                  WHY I BUILT IT
                </div>
                <p className="text-sm sm:text-base text-[#9E988F] leading-relaxed">
                  {project.overview.why}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: FEATURES */}
          <section className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>02 // CAPABILITIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                Implemented Engineering Features
              </h2>
              <p className="text-sm sm:text-base text-[#9E988F] max-w-3xl leading-relaxed">
                Every feature below exists in the running application and is verified in the codebase.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(200,255,0,0.3)] transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#C8FF00] font-semibold">FEATURE // 0{idx + 1}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF00]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-[#F5F0E8]">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: TECH STACK */}
          <section className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>03 // TECHNICAL FOUNDATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                Technical Stack & Libraries
              </h2>
              <p className="text-sm sm:text-base text-[#9E988F] max-w-3xl leading-relaxed">
                Specific frameworks, packages, and engines utilized, accompanied by concrete architectural justifications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="p-5 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.06)] space-y-2 hover:border-[rgba(245,240,232,0.18)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-[#F5F0E8]">{tech.name}</span>
                    <span className="font-mono text-[10px] text-[#C8FF00] px-2 py-0.5 rounded bg-[#161616]">
                      {tech.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#9E988F] leading-relaxed">
                    {tech.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: ARCHITECTURE */}
          <ProjectArchitecture
            summary={project.architecture.summary}
            layers={project.architecture.layers}
            rationale={project.architecture.rationale}
          />

          {/* SECTION: ENGINEERING CHALLENGES */}
          <EngineeringChallenges challenges={project.challenges} />

          {/* SECTION: SCREENSHOTS GALLERY */}
          <ProjectScreenshotGallery screenshots={project.screenshots} />

          {/* SECTION: TECHNICAL DEEP DIVE */}
          <section className="p-8 rounded-2xl bg-[#070707] border border-[rgba(245,240,232,0.08)] space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>DEEP DIVE // SPECIFICATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F5F0E8]">
                {project.technicalDeepDive.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#9E988F] leading-relaxed max-w-2xl">
                {project.technicalDeepDive.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {project.technicalDeepDive.points.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0F0F0F] border border-[rgba(245,240,232,0.06)] font-mono text-xs text-[#9E988F] flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="text-[#C8FF00] font-bold select-none">{'//'}</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: WHAT I LEARNED */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>LESSONS // ENGINEERING MATURITY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                Technical Lessons & Retrospective
              </h2>
            </div>

            <div className="space-y-3">
              {project.whatILearned.map((lesson, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.06)] flex items-start gap-3 text-sm text-[#F5F0E8] leading-relaxed"
                >
                  <span className="font-mono text-xs text-[#C8FF00] font-semibold mt-0.5 select-none">
                    0{idx + 1}
                  </span>
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: LINKS & SOURCE ACCESS */}
          <section className="p-8 rounded-2xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="text-xl font-medium text-[#F5F0E8]">
                Inspect the Implementation
              </h3>
              <p className="text-xs sm:text-sm text-[#9E988F]">
                Source code repositories, verified release builds, and public documentation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.links.downloadUrl && (
                <Button
                  variant="primary"
                  size="md"
                  href={project.links.downloadUrl}
                  isExternal
                  icon={<Download className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Download APK
                </Button>
              )}

              {project.links.githubUrl && (
                <Button
                  variant="secondary"
                  size="md"
                  href={project.links.githubUrl}
                  isExternal
                  icon={<GithubIcon className="w-3.5 h-3.5" />}
                  iconPosition="left"
                >
                  GitHub Repository
                </Button>
              )}

              {project.links.liveUrl && (
                <Button
                  variant="ghost"
                  size="md"
                  href={project.links.liveUrl}
                  isExternal
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Live Deployment
                </Button>
              )}
            </div>
          </section>

          {/* PROJECT NAVIGATION */}
          <ProjectNavigation
            prev={project.navigation.prev}
            next={project.navigation.next}
          />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/primitives/Container";
import { ExperimentRunner } from "@/components/lab/ExperimentRunner";
import { EXPERIMENTS } from "@/data/experiments";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(EXPERIMENTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = EXPERIMENTS[slug];

  if (!experiment) {
    return {
      title: "Experiment Not Found",
    };
  }

  return {
    title: `${experiment.title} — Engineering Lab | Varshan Gowda S R`,
    description: experiment.description,
    openGraph: {
      title: `${experiment.title} — Varshan Gowda S R`,
      description: experiment.description,
      url: `https://varshuai.github.io/lab/${experiment.slug}`,
      type: "article",
    },
  };
}

export default async function ExperimentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = EXPERIMENTS[slug];

  if (!experiment) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <Header />

      <main id="main-content" className="flex-1 py-12 sm:py-16 space-y-12">
        <Container size="wide">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(245,240,232,0.06)] font-mono text-xs">
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 text-[#9E988F] hover:text-[#C8FF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO LAB</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[#68635B]">EXPERIMENT //</span>
              <span className="text-[#C8FF00] font-semibold">{experiment.number}</span>
            </div>
          </div>

          {/* Header Telemetry */}
          <div className="py-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-[#C8FF00] font-semibold">{'//'} {experiment.category}</span>
              <span className="text-[#68635B]">•</span>
              <span className="px-2 py-0.5 rounded bg-[#142314] text-[#C8FF00] border border-[rgba(200,255,0,0.2)]">
                {experiment.status}
              </span>
              <span className="text-[#68635B]">•</span>
              <span className="text-[#9E988F]">{experiment.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F5F0E8]">
              {experiment.title}
            </h1>

            <p className="text-sm sm:text-base text-[#9E988F] max-w-3xl leading-relaxed">
              {experiment.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {experiment.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#141414] border border-[rgba(245,240,232,0.08)] font-mono text-xs text-[#E6E1D8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Playground Runner */}
          <div className="py-4">
            <ExperimentRunner experiment={experiment} defaultExpanded />
          </div>

          {/* Retrospective & Lessons Learned */}
          {experiment.whatILearned && experiment.whatILearned.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[rgba(245,240,232,0.06)] space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[#C8FF00] tracking-wider uppercase font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>LESSONS // ENGINEERING TAKEAWAYS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F0E8]">
                  Technical Lessons & Retrospective
                </h2>
              </div>

              <div className="space-y-3">
                {experiment.whatILearned.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0D0D0D] border border-[rgba(245,240,232,0.06)] flex items-start gap-3.5 text-xs sm:text-sm text-[#9E988F] leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C8FF00] shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

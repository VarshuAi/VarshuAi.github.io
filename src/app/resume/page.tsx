import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResumeView } from "@/components/resume/ResumeView";

export const metadata: Metadata = {
  title: "Resume // Varshan Gowda S R",
  description:
    "Looking for Varshan's resume? Verified proof of work, engineering telemetry, and recruiter contact.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 sm:px-8 max-w-3xl mx-auto">
      {/* Back to Home */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#9E988F] hover:text-[#F5F0E8] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C8FF00]" />
          <span>BACK TO PORTFOLIO</span>
        </Link>
      </div>

      <ResumeView />
    </main>
  );
}

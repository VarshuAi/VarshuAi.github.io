import React from "react";
import { Metadata } from "next";
import { WelcomeRootEntry } from "@/components/lab/WelcomeRootEntry";

export const metadata: Metadata = {
  title: "Engineering Lab // Experimental Workspace",
  description:
    "Interactive algorithm visualizations, systems experiments, and technical prototypes built to understand how things work.",
  openGraph: {
    title: "Engineering Lab // Experimental Workspace",
    description: "Interactive algorithm visualizers, prototypes, and systems engineering playground.",
    url: "https://varshuai.github.io",
  },
};

export default function RootPage() {
  return <WelcomeRootEntry />;
}

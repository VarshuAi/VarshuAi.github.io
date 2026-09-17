import React from "react";
import { Metadata } from "next";
import { EXPERIMENTS, EXPERIMENTS_LIST } from "@/data/experiments";
import { LabWorkspaceView } from "@/components/lab/LabWorkspaceView";

export const metadata: Metadata = {
  title: "Engineering Lab // Experimental Workspace",
  description:
    "Interactive algorithm visualizations, systems experiments, and technical prototypes built to understand how things work.",
  openGraph: {
    title: "Engineering Lab // Experimental Workspace",
    description: "Interactive algorithm visualizers, prototypes, and systems engineering playground.",
    url: "https://varshuai.github.io/lab",
  },
};

export default function LabPage() {
  const featuredExperiment = EXPERIMENTS["sorting-lab"];

  return (
    <LabWorkspaceView
      featuredExperiment={featuredExperiment}
      experimentsList={EXPERIMENTS_LIST}
    />
  );
}

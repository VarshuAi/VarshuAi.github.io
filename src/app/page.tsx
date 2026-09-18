import React from "react";
import { Metadata } from "next";
import { PortfolioRootView } from "@/components/portfolio/PortfolioRootView";

export const metadata: Metadata = {
  title: "Varshan Gowda S R — Systems & AI/ML Engineer",
  description:
    "Personal portfolio of Varshan Gowda S R. Exploring systems architecture, algorithms, and applied machine learning.",
  openGraph: {
    title: "Varshan Gowda S R — Systems & AI/ML Engineer",
    description:
      "Personal portfolio of Varshan Gowda S R. Exploring systems architecture, algorithms, and applied machine learning.",
    url: "https://varshuai.github.io",
  },
};

export default function HomePage() {
  return <PortfolioRootView />;
}

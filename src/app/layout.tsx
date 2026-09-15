import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Varshan Gowda S R — CSE • AI/ML • Full-Stack Developer",
    template: "%s | Varshan Gowda S R",
  },
  description:
    "Engineering portfolio of Varshan Gowda S R. Building high-performance software across AI/ML, distributed web systems, and native mobile clients.",
  keywords: [
    "Varshan Gowda S R",
    "Software Engineer",
    "AI/ML",
    "Full-Stack Developer",
    "A1 Swaara",
    "FLUXA",
    "VelorioLabs",
    "Next.js",
    "Flutter",
    "Kotlin",
    "Jetpack Compose",
    "PyTorch",
    "Systems Engineer",
  ],
  authors: [{ name: "Varshan Gowda S R", url: "https://github.com/varshuai" }],
  creator: "Varshan Gowda S R",
  metadataBase: new URL("https://varshuai.github.io"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://varshuai.github.io",
    title: "Varshan Gowda S R — CSE • AI/ML • Full-Stack Developer",
    description:
      "Engineering portfolio of Varshan Gowda S R. Building high-performance software across AI/ML, distributed web systems, and native mobile clients.",
    siteName: "Varshan Gowda S R Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varshan Gowda S R — CSE • AI/ML • Full-Stack Developer",
    description:
      "Engineering portfolio of Varshan Gowda S R. Building high-performance software across AI/ML, distributed web systems, and native mobile clients.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] font-sans antialiased flex flex-col selection:bg-[#C8FF00] selection:text-[#0A0A0A]">
        {/* Accessible skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#C8FF00] text-[#0A0A0A] font-mono text-xs font-semibold rounded focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

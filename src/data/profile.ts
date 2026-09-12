export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  status: "Active" | "Shipped" | "Production" | "Open Source";
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  image?: string;
  githubUrl?: string;
  apkUrl?: string;
  liveUrl?: string;
  ecosystem?: {
    name: string;
    tagline: string;
    stack: string;
    url: string;
  }[];
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  status: string;
  githubUsername: string;
  githubUrl: string;
  email: string;
  manifesto: string[];
  capabilities: {
    domain: string;
    description: string;
    technologies: string[];
  }[];
  projects: ProjectItem[];
}

export const PROFILE: ProfileData = {
  name: "Varshan Gowda S R",
  role: "CSE • AI/ML • Full-Stack Developer",
  tagline: "Software Engineer & Systems Builder",
  location: "Bangalore, India",
  status: "Actively building & open for select engineering roles",
  githubUsername: "varshuai",
  githubUrl: "https://github.com/varshuai",
  email: "contact@varshan.dev",
  manifesto: [
    "I am an engineer who actually builds software — taking systems from first-principles architectural reasoning to resilient, production implementations.",
    "My focus is where high-throughput backend services, modern machine learning models, and uncompromising client experiences converge.",
  ],
  capabilities: [
    {
      domain: "Computer Science & Distributed Systems",
      description:
        "Data structures, algorithmic complexity, concurrent systems, and scalable backend services with strict reliability guarantees.",
      technologies: ["DSA", "Data Structures", "Algorithms", "Concurrency", "System Design", "Networking Protocols"],
    },
    {
      domain: "AI/ML & Generative Intelligence",
      description:
        "Applied machine learning, generative model integration, neural architectures, retrieval workflows, and low-latency inference pipelines.",
      technologies: ["AI/ML", "GenAI", "LLM Pipelines", "PyTorch", "Model Inference", "Embeddings"],
    },
    {
      domain: "Full-Stack Web Architecture",
      description:
        "Modern reactive web engineering, edge-rendered applications, type-safe API boundaries, and responsive interfaces with sub-100ms interactions.",
      technologies: ["Next.js", "React", "TypeScript", "Node.js", "REST / GraphQL", "Tailwind CSS"],
    },
    {
      domain: "Mobile & Client Engineering",
      description:
        "Cross-platform and native mobile software designed for fluid gestures, offline-first data consistency, and native hardware integration.",
      technologies: ["Flutter", "Android", "Dart", "Kotlin", "Jetpack Compose", "Local Cache Pipelines"],
    },
  ],
  projects: [
    {
      id: "a1-swaara",
      index: "01",
      title: "A1 Swaara",
      tagline: "Modern Sovereign Android Music Player",
      category: "Mobile · Flutter · Android",
      status: "Production",
      description:
        "A modern Android music player focused on a clean listening experience. Built with custom audio routing, on-device caching, and zero telemetry overhead.",
      architectureHighlights: [
        "Unthrottled audio stream resolution up to 320 kbps with low latency",
        "Hardware-accelerated equalizer shaping and real-time spectrum feedback",
        "Offline caching engine with resilient local database state storage",
      ],
      techStack: ["Flutter", "Android", "Dart", "Audio DSP", "ExoPlayer", "REST API"],
      image: "/projects/a1-swaara.png",
      githubUrl: "https://github.com/varshuai",
      apkUrl: "/downloads/A1_Swaara_v1.0.0.apk",
    },
    {
      id: "fluxa",
      index: "02",
      title: "FLUXA",
      tagline: "Native Android Video Application",
      category: "Android · Kotlin · Jetpack Compose",
      status: "Active",
      description:
        "A native Android video application built with Kotlin and Jetpack Compose. Engineered for smooth playback pipelines, low memory footprint, and reactive state management.",
      architectureHighlights: [
        "Declarative Jetpack Compose UI architecture with zero unnecessary recompositions",
        "Custom ExoPlayer media controller handling adaptive HLS video streaming",
        "Structured concurrency with Kotlin Coroutines and asynchronous StateFlow feeds",
      ],
      techStack: ["Kotlin", "Jetpack Compose", "ExoPlayer/Media3", "HLS Streaming", "Coroutines", "Material 3"],
      image: "/projects/fluxa.png",
      githubUrl: "https://github.com/varshuai",
    },
    {
      id: "veloriolabs",
      index: "03",
      title: "VelorioLabs",
      tagline: "Open-Source Systems & Developer Collective",
      category: "Open Source · Software · AI",
      status: "Open Source",
      description:
        "An open-source space for building and experimenting with software projects. Developing foundational developer utilities, security tools, and algorithmic systems.",
      architectureHighlights: [
        "Modular open-source tooling collective with automated continuous integration",
        "High test coverage across critical algorithmic paths and computational modules",
        "Active ecosystem spanning telemetry radar, media transcoders, and privacy utilities",
      ],
      techStack: ["Open Source", "TypeScript", "Python", "Systems Tooling", "AI/ML Experiments"],
      githubUrl: "https://github.com/varshuai",
      ecosystem: [
        {
          name: "AetherEye",
          tagline: "Tactical Global Satellite & ADS-B Flight Radar Terminal",
          stack: "TypeScript • Radar Telemetry",
          url: "https://github.com/varshuai",
        },
        {
          name: "TeleVortex",
          tagline: "Universal Media Decompiler & Transcoder Engine",
          stack: "Python • Media Pipelines",
          url: "https://github.com/varshuai",
        },
        {
          name: "Termux-Vault",
          tagline: "DoD 5220.22-M Multi-Pass File Shredder & Privacy Utility",
          stack: "Shell • Cryptographic Erase",
          url: "https://github.com/varshuai",
        },
      ],
    },
  ],
};

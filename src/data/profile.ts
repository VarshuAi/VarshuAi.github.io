export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  status: "Active" | "Shipped" | "Production" | "Open Source" | "Built" | "Building" | "Active Org";
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

export interface TechnicalCategory {
  number: string;
  title: string;
  subcategories: string[];
  description: string;
  contextTechnologies: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  status: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  manifesto: string[];
  technicalIdentity: {
    categories: TechnicalCategory[];
    compactStack: {
      languages: string[];
      technologies: string[];
    };
  };
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
  linkedinUrl: "https://www.linkedin.com/in/varshan-gowda-sr",
  email: "gowdavarshan466@gmail.com",
  manifesto: [
    "I am an engineer who actually builds software — taking systems from first-principles architectural reasoning to resilient, production implementations.",
    "My focus is where high-throughput backend services, modern machine learning models, and uncompromising client experiences converge.",
  ],
  technicalIdentity: {
    categories: [
      {
        number: "01",
        title: "AI / ML",
        subcategories: ["Machine Learning", "GenAI", "AI-powered applications"],
        description:
          "Applied model architectures, neural inference pipelines, and intelligent speech/audio processing systems.",
        contextTechnologies: ["PyTorch", "Model Inference", "Embeddings", "Acoustic DSP"],
      },
      {
        number: "02",
        title: "SOFTWARE",
        subcategories: ["Full-Stack Development", "APIs", "Developer Tools"],
        description:
          "Resilient full-stack web platforms, type-safe API boundaries, and low-latency synchronization engines.",
        contextTechnologies: ["Next.js", "React", "Node.js", "WebSockets", "Redis", "TypeScript"],
      },
      {
        number: "03",
        title: "MOBILE",
        subcategories: ["Flutter", "Android", "Kotlin", "Jetpack Compose"],
        description:
          "High-performance native Android media applications and cross-platform clients engineered for zero frame drops.",
        contextTechnologies: ["Flutter", "Android", "Kotlin", "Jetpack Compose", "ExoPlayer", "Coroutines"],
      },
      {
        number: "04",
        title: "OPEN SOURCE",
        subcategories: ["GitHub", "Open Source Contributions", "VelorioLabs"],
        description:
          "Sovereign developer infrastructure, experimental tooling suites, and collective public repositories.",
        contextTechnologies: ["GitHub @varshuai", "VelorioLabs Collective", "AetherEye", "TeleVortex", "Termux-Vault"],
      },
    ],
    compactStack: {
      languages: ["Python", "Java", "C++", "Dart", "Kotlin"],
      technologies: [
        "Flutter",
        "Android",
        "Jetpack Compose",
        "React",
        "Node.js",
        "Git",
        "GitHub",
      ],
    },
  },
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
      tagline: "High-Performance Sovereign Android & PC Music Suite",
      category: "Mobile · Flutter · Android",
      status: "Built",
      description:
        "A modern Android and Windows PC music streaming studio engineered for 320 kbps high-fidelity playback, synchronized karaoke lyrics, real-time parametric equalization, and zero telemetry overhead.",
      architectureHighlights: [
        "320 kbps high-fidelity audio stream resolution & low-latency on-device buffer",
        "Synchronized karaoke lyrics engine with real-time parametric audio equalizer",
        "Instagram Notes 60-char vibe status, 1-tap Spotify/YouTube playlist importer & web companion",
      ],
      techStack: ["Flutter", "Dart", "Android SDK", "Next.js", "Media3 Audio", "320 kbps Engine"],
      githubUrl: "https://github.com/VarshuAi/A1Swaara_apk",
      apkUrl: "/downloads/A1_Swaara_v1.0.0.apk",
    },
    {
      id: "fluxa",
      index: "02",
      title: "FLUXA",
      tagline: "Native Android Video Player & Streaming Client (In Development)",
      category: "Android · Kotlin · Jetpack Compose",
      status: "Building",
      description:
        "A native Android video application built with Kotlin and Jetpack Compose. Currently building adaptive HLS streaming, multi-audio track switching (Hindi, Tamil, Telugu, Kannada, English), and smart TV remote pairing.",
      architectureHighlights: [
        "Multi-audio track switching engine supporting regional and international dubs",
        "ExoPlayer (Media3) hardware-accelerated video decoding with adaptive HLS buffering",
        "Declarative Jetpack Compose UI architecture with Smart TV touch remote & PIN pairing",
      ],
      techStack: ["Kotlin", "Jetpack Compose", "ExoPlayer (Media3)", "HLS Streaming", "Coroutines", "Multi-Audio Engine"],
      githubUrl: "https://github.com/VarshuAi/movie",
    },
    {
      id: "veloriolabs",
      index: "03",
      title: "VelorioLabs",
      tagline: "Open-Source Systems & Developer Organization",
      category: "Open-Source Organization · 43 Repositories",
      status: "Active Org",
      description:
        "Open-source developer organization founded by Varshan, dedicated to building useful software, developer tools, and sovereign systems. Housing 43 public repositories on GitHub across security, telemetry, and AI.",
      architectureHighlights: [
        "Independent developer organization with 43 public open-source tools on GitHub",
        "PhishGuard-AI: SIH-25159 Real-Time AI/ML Phishing Detection with Decentralized Threat Registry",
        "AetherEye: Tactical Global Satellite, Maritime AIS & Flight ADS-B Radar Terminal",
      ],
      techStack: ["Python", "TypeScript", "AI/ML", "FastAPI", "Next.js", "Open Source Collective"],
      githubUrl: "https://github.com/VelorioLabs",
      ecosystem: [
        {
          name: "PhishGuard-AI",
          tagline: "SIH-25159 Real-Time AI/ML Phishing Detection & Threat Registry",
          stack: "Python • Scikit-learn • FastAPI",
          url: "https://github.com/VelorioLabs/PhishGuard-AI",
        },
        {
          name: "AetherEye",
          tagline: "Tactical Global Satellite, Maritime AIS & ADS-B Radar Terminal",
          stack: "WebGL • Python • OpenSky API",
          url: "https://github.com/VelorioLabs/AetherEye",
        },
        {
          name: "SubVortex",
          tagline: "Zero-Cloud AI Auto-Subtitle Studio & Timeline Editor",
          stack: "Python • Whisper AI",
          url: "https://github.com/VelorioLabs/SubVortex",
        },
      ],
    },
  ],
};

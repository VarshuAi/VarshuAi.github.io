import { ProjectData } from "@/components/primitives/ProjectCard";

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
  projects: ProjectData[];
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
      technologies: ["Flutter", "Android", "Dart", "Kotlin", "State Management", "Local Cache Pipelines"],
    },
  ],
  projects: [
    {
      id: "a1-swaara",
      index: "SYS_01",
      title: "A1 Swaara",
      tagline: "High-Fidelity Audio & Speech Intelligence Platform",
      category: "AI/ML • Mobile & Audio Processing",
      status: "Active",
      description:
        "An intelligent audio and acoustic processing system designed for real-time speech analytics, low-latency audio capture, and neural voice synthesis.",
      architectureHighlights: [
        "Architected low-latency audio capture and streaming pipeline",
        "Engineered on-device audio preprocessing with acoustic noise suppression",
        "Integrated lightweight ML inference models for instantaneous classification",
      ],
      techStack: ["Flutter", "Python", "PyTorch", "Audio DSP", "Dart", "REST API"],
      githubUrl: "https://github.com/varshuai",
    },
    {
      id: "fluxa",
      index: "SYS_02",
      title: "FLUXA",
      tagline: "High-Throughput State & Data Synchronization Engine",
      category: "Full-Stack • Distributed Systems",
      status: "Active",
      description:
        "A reactive data processing framework built to orchestrate concurrent pipelines, manage volatile application states, and provide bidirectional streaming feeds.",
      architectureHighlights: [
        "Structured asynchronous event bus with decoupled producer-consumer queues",
        "Optimized client state reconciliation reducing render churn across active streams",
        "Designed resilient error handling and automatic backpressure alleviation",
      ],
      techStack: ["TypeScript", "Next.js", "Node.js", "WebSockets", "Redis", "Tailwind CSS"],
      githubUrl: "https://github.com/varshuai",
    },
    {
      id: "veloriolabs",
      index: "SYS_03",
      title: "VelorioLabs",
      tagline: "Engineering Research & Open-Source Tooling Suite",
      category: "Open Source • Developer Tooling",
      status: "Active",
      description:
        "An experimental engineering collective and toolkit developing foundational software utilities, algorithmic experiments, and modern developer infrastructure.",
      architectureHighlights: [
        "Modular monorepo architecture with reusable shared utility packages",
        "Strict automated CI/CD pipeline enforcing semantic versioning and linting",
        "High test coverage across critical algorithmic paths and computational modules",
      ],
      techStack: ["Open Source", "TypeScript", "Android", "Next.js", "GitHub Actions"],
      githubUrl: "https://github.com/varshuai",
    },
  ],
};

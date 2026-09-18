export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ArchitectureLayer {
  name: string;
  badge: string;
  items: string[];
}

export interface EngineeringChallenge {
  number: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
}

export interface ScreenshotItem {
  src: string;
  alt: string;
  caption: string;
  aspectRatio?: '9/16' | '16/9' | '4/3';
}

export interface CaseStudyData {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: string;
  role: string;
  heroImage?: string;
  heroImageAlt: string;
  heroType: 'mobile-portrait' | 'video-landscape' | 'systems-hud' | 'audio-dsp' | 'video-pipeline';
  overview: {
    what: string;
    why: string;
  };
  features: ProjectFeature[];
  techStack: {
    name: string;
    role: string;
    detail: string;
  }[];
  architecture: {
    summary: string;
    layers: ArchitectureLayer[];
    rationale: string;
  };
  challenges: EngineeringChallenge[];
  screenshots: ScreenshotItem[];
  technicalDeepDive: {
    title: string;
    description: string;
    points: string[];
  };
  whatILearned: string[];
  links: {
    githubUrl?: string;
    downloadUrl?: string;
    liveUrl?: string;
  };
  navigation: {
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  };
}

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  'a1-swaara': {
    slug: 'a1-swaara',
    title: 'A1 SWAARA',
    tagline: 'High-Performance Sovereign Android & PC Music Suite',
    category: 'Mobile · Flutter · Android',
    year: '2024–2025',
    status: 'Built (Production v1.0.0)',
    role: 'Lead Mobile Architect & Systems Engineer',
    heroImage: '',
    heroImageAlt: 'A1 Swaara Audio DSP Architecture',
    heroType: 'audio-dsp',
    overview: {
      what: 'A1 Swaara is a modern Android music player engineered for high-fidelity audio playback, local caching, and zero telemetry overhead. Built from the ground up with Flutter and Dart, it provides unthrottled streaming up to 320 kbps with dynamic audio routing and an offline-first state machine.',
      why: 'Most mainstream streaming apps are cluttered with intrusive advertisements, background trackers, heavy memory footprints, and restrictive offline listening models. A1 Swaara was engineered to deliver a sovereign, low-latency client with native-speed UI rendering and complete listener privacy.',
    },
    features: [
      {
        title: 'High-Fidelity Audio Streaming',
        description: 'Supports continuous 320 kbps streaming resolution using Just Audio and direct stream resolvers with low-latency buffering.',
      },
      {
        title: 'Offline Database Persistence',
        description: 'Reactive on-device SQLite database managed through Drift with zero runtime reflection and instant track retrieval.',
      },
      {
        title: 'Dynamic Palette Theming',
        description: 'Real-time extraction of dominant swatch palettes from album artwork using PaletteGenerator to dynamically tint Material 3 UI surfaces.',
      },
      {
        title: 'Background Media Notification & Focus',
        description: 'System-level Android media session handling with hardware lockscreen controls, headphone disconnection audio ducking, and notification actions.',
      },
      {
        title: 'Indexed Search & Queuing',
        description: 'Instant asynchronous query pipeline across remote audio endpoints and on-device storage with queue reordering.',
      },
    ],
    techStack: [
      {
        name: 'Flutter & Dart',
        role: 'Client Engine',
        detail: 'Ahead-of-time (AOT) compiled native ARM64 rendering with smooth 60/120 FPS animations.',
      },
      {
        name: 'Riverpod 2.5',
        role: 'State Management',
        detail: 'Unidirectional reactive data flow with compile-time safety and decoupled provider state.',
      },
      {
        name: 'Just Audio & Audio Service',
        role: 'Audio Core',
        detail: 'Hardware-accelerated audio pipeline and Android foreground service lifecycle management.',
      },
      {
        name: 'Drift & SQLite',
        role: 'Persistence',
        detail: 'Type-safe reactive SQL database with live query streaming and zero runtime reflection.',
      },
      {
        name: 'Palette Generator',
        role: 'Visual Dynamics',
        detail: 'Extracts dominant color palettes from album covers to adapt UI backgrounds dynamically.',
      },
      {
        name: 'YoutubeExplode & Dart DES',
        role: 'Stream Extraction',
        detail: 'Direct audio stream deciphering and chunked buffering without third-party wrapper overhead.',
      },
    ],
    architecture: {
      summary: 'Decoupled isolate-based architecture isolating the UI render tree from the background audio service.',
      layers: [
        {
          name: 'Presentation & UI Layer',
          badge: 'Flutter Main Isolate',
          items: ['Material 3 Widgets', 'Mini-Player Drawer', 'Dynamic Palette Themer', 'Riverpod Consumer UI'],
        },
        {
          name: 'State & Coordination Layer',
          badge: 'Reactive Boundary',
          items: ['PlaybackNotifier', 'QueueNotifier', 'SearchStreamProvider', 'Drift Watch Streams'],
        },
        {
          name: 'Audio Service Isolate Layer',
          badge: 'Android Foreground Service',
          items: ['AudioHandler Implementation', 'MediaSessionCompat', 'Audio Focus Ducking', 'Headset Plug/Unplug Listener'],
        },
        {
          name: 'Hardware & Storage Layer',
          badge: 'System Boundary',
          items: ['ExoPlayer AudioTrack', 'Drift SQLite Database', 'Chunked Local Disk Cache', 'Remote Audio Streams'],
        },
      ],
      rationale: 'Decoupling the audio playback engine into a dedicated background service isolate ensures that high-priority audio processing and Android AudioFocus management run uninterrupted even when the Flutter UI isolate is under heavy layout calculations or minimized to the background.',
    },
    challenges: [
      {
        number: '01',
        title: 'Android 13+ Foreground Service & Notification Permissions',
        problem: 'Strict background execution limits and POST_NOTIFICATIONS permissions in Android 13+ frequently caused background audio playback to be abruptly killed by the OS battery manager.',
        approach: 'Engineered Android foreground service integration via AudioHandler with continuous playback state callbacks, explicit MediaSessionCompat bindings, and dedicated MEDIA_PLAYBACK notification channels.',
        result: 'Achieved 100% uninterrupted background playback and persistent lockscreen notification controls without OS termination.',
      },
      {
        number: '02',
        title: 'Stream Latency & Dynamic Bitrate Buffering',
        problem: 'Variable cellular bandwidth caused audible buffering hitches and long initial track buffering times on higher bitrate (320 kbps) streams.',
        approach: 'Tuned low-level buffer parameters through Just Audio native configuration, establishing a 2-second initial buffer threshold while concurrently caching pre-fetched chunks to local storage.',
        result: 'Sub-800ms time-to-first-sound on 320 kbps streams with seamless consecutive track playback.',
      },
      {
        number: '03',
        title: 'Dynamic Theming Without UI Render Stutter',
        problem: 'Extracting palette colors from high-resolution album artwork on every track change caused micro-stutters during UI transitions.',
        approach: 'Offloaded image downsampling to 64x64 pixels before passing bytes to PaletteGenerator in a background isolate, caching computed palette swatches in memory by track ID.',
        result: 'Zero frame drops during track transitions while preserving real-time adaptive UI color schemes.',
      },
    ],
    screenshots: [],
    technicalDeepDive: {
      title: 'Isolate-Based Audio Architecture & Offline Caching',
      description: 'How A1 Swaara achieves reliable audio playback and instant local responsiveness.',
      points: [
        'Dedicated Background Isolate: Keeps audio decoding running on a separate Dart isolate, preventing UI rendering work from ever interrupting audio buffers.',
        'Audio Focus Ducking: Listens to AudioManager audio focus loss events to gracefully duck volume when turn-by-turn navigation speaks and pause on incoming calls.',
        'Drift Type-Safe SQLite: Eliminates runtime JSON parsing bugs by querying strongly typed tables with streaming updates into Riverpod providers.',
        'Chunked Audio Cache: Encrypts and caches played tracks into local cache directories to eliminate redundant bandwidth consumption.',
      ],
    },
    whatILearned: [
      'Mastered Android low-level audio session lifecycles, background execution constraints, and notification media channels across Android 10 through 14.',
      'Gained deep experience architecting reactive multi-isolate Flutter applications with Riverpod state management.',
      'Learned the performance nuances of image downsampling and asynchronous bitmap analysis for dynamic UI adaptation.',
    ],
    links: {
      githubUrl: 'https://github.com/VarshuAi/A1Swaara_apk',
      downloadUrl: 'https://github.com/VarshuAi/A1Swaara_apk/raw/main/A1_Swaara_v1.0.0.apk',
      liveUrl: 'https://github.com/VarshuAi/a1raaga-web',
    },
    navigation: {
      prev: null,
      next: { slug: 'fluxa', title: 'FLUXA' },
    },
  },
  'fluxa': {
    slug: 'fluxa',
    title: 'FLUXA',
    tagline: 'Native Android Video Player & Streaming Platform (In Development)',
    category: 'Android · Kotlin · Jetpack Compose',
    year: '2024–Present',
    status: 'Building (In Active Development)',
    role: 'Native Android Engineer',
    heroImage: '',
    heroImageAlt: 'FLUXA Media3 Video Streaming Architecture',
    heroType: 'video-pipeline',
    overview: {
      what: 'FLUXA is a native Android video application currently in active development with Kotlin and Jetpack Compose. Engineered for adaptive HLS streaming, multi-audio track switching across Indian regional & international dubs, and low-latency hardware acceleration.',
      why: 'Many Android media clients are sluggish web wrappers or laden with complex legacy XML view hierarchies and intrusive telemetry libraries. FLUXA is being built to explore the bleeding edge of AndroidX Media3 ExoPlayer, Jetpack Compose declarative UI, and Kotlin Coroutines/StateFlow with zero tracking overhead.',
    },
    features: [
      {
        title: 'Adaptive HLS Video Streaming',
        description: 'Native HLS (.m3u8) video pipeline powered by Media3 ExoPlayer with adaptive bitrate switching between 360p, 720p, and 1080p.',
      },
      {
        title: 'Declarative Compose UI',
        description: '100% Jetpack Compose architecture using Material 3 guidelines with zero XML view hierarchy bloat.',
      },
      {
        title: 'Reactive State Architecture',
        description: 'Unidirectional data flow (UDF) powered by Kotlin Coroutines, ViewModel, and StateFlow with automatic lifecycle-aware collection.',
      },
      {
        title: 'Asynchronous Content Extraction',
        description: 'Direct self-contained parsing using Jsoup and OkHttp for rapid catalog queries without intermediate proxy latency.',
      },
      {
        title: 'Hardware-Accelerated Playback Surface',
        description: 'SurfaceView integration with custom player controls, aspect ratio fitting, and gesture-driven seeking.',
      },
    ],
    techStack: [
      {
        name: 'Kotlin 2.0',
        role: 'Language',
        detail: 'Modern expressive language with strict null safety, extension functions, and structured concurrency.',
      },
      {
        name: 'Jetpack Compose & Material 3',
        role: 'Declarative UI',
        detail: 'Modern declarative toolkit eliminating legacy Android view hierarchy overhead and XML layouts.',
      },
      {
        name: 'AndroidX Media3 ExoPlayer 1.3.1',
        role: 'Media Engine',
        detail: 'Google\'s official video playback and adaptive HLS streaming engine with hardware codec decoding.',
      },
      {
        name: 'Media3 OkHttp DataSource',
        role: 'Networking',
        detail: 'Low-level socket reuse, custom HTTP headers, and stream connection pooling.',
      },
      {
        name: 'Coil Compose',
        role: 'Image Pipeline',
        detail: 'Asynchronous image loading optimized for Compose with memory and disk bitmap caching.',
      },
      {
        name: 'Jsoup 1.17',
        role: 'Content Parser',
        detail: 'Lightweight, robust HTML/DOM parser for direct stream and catalog indexing.',
      },
    ],
    architecture: {
      summary: 'Clean MVVM architecture using Jetpack Compose and AndroidX Media3 with strict Unidirectional Data Flow.',
      layers: [
        {
          name: 'Compose UI Layer',
          badge: 'Declarative Presentation',
          items: ['VideoPlayerScreen', 'CatalogGrid', 'CustomPlayerControls', 'AnimatedPlaybackOverlay'],
        },
        {
          name: 'ViewModel & Presentation Layer',
          badge: 'Lifecycle-Aware State',
          items: ['MediaViewModel', 'PlayerUiState (Sealed)', 'StateFlow Emitted Streams', 'ViewModelScope'],
        },
        {
          name: 'Media3 ExoPlayer Core',
          badge: 'Native Decoding Engine',
          items: ['ExoPlayer Instance', 'DefaultTrackSelector', 'HlsMediaSourceFactory', 'SurfaceView Binding'],
        },
        {
          name: 'Network & Ingestion Layer',
          badge: 'I/O Boundary',
          items: ['OkHttp DataSource', 'HLS Segment Ingestion', 'Jsoup Parser', 'Coil Bitmap Cache'],
        },
      ],
      rationale: 'Adopting Android\'s recommended Unidirectional Data Flow (UDF) ensures all UI states are modeled as immutable sealed classes emitted via StateFlow, preventing UI desynchronization and eliminating player memory leaks on configuration changes.',
    },
    challenges: [
      {
        number: '01',
        title: 'Preventing Activity Recreations & Player Re-buffering on Orientation Change',
        problem: 'Rotating the device into landscape during video playback triggered Activity destruction, causing ExoPlayer to rebuild and re-buffer video streams.',
        approach: 'Scoped the ExoPlayer lifecycle to the ViewModel rather than the Composable Activity lifecycle, detaching and re-attaching the PlayerView surface seamlessly.',
        result: 'Instant, zero-buffering rotation between portrait and fullscreen landscape with zero audio/video stutter.',
      },
      {
        number: '02',
        title: 'Jitter-Free Adaptive HLS Bitrate Switching',
        problem: 'Network bandwidth fluctuations caused abrupt frame drops when ExoPlayer abruptly transitioned between resolution variants.',
        approach: 'Tuned DefaultTrackSelector parameters with custom AdaptiveTrackSelection.Factory thresholds (minDurationForQualityIncreaseMs set to 10,000ms), avoiding premature upscaling.',
        result: 'Smooth resolution stepping with zero visual stutter during network degradation.',
      },
      {
        number: '03',
        title: 'Memory Optimization in Heavy Video Catalogs',
        problem: 'Rapid scrolling through large media catalogs caused GC pauses and out-of-memory errors on lower-RAM devices.',
        approach: 'Implemented LazyVerticalGrid with strict Compose key stability, integrated Coil with hardware bitmap decoding (Bitmap.Config.HARDWARE), and enforced image cache eviction.',
        result: 'Maintained solid 60/120 FPS scrolling with total app heap footprint under 85 MB.',
      },
    ],
    screenshots: [],
    technicalDeepDive: {
      title: 'Media3 ExoPlayer & Jetpack Compose Integration',
      description: 'Key technical insights behind FLUXA\'s native media playback pipeline.',
      points: [
        'AndroidView SurfaceView Integration: Bridges low-level Android View rendering into the declarative Compose tree without creating view hierarchy leaks.',
        'Immutable Sealed UI State: State modeled as sealed interface PlayerUiState (Idle, Loading, Ready, Buffering, Error) ensuring exhaustive when-branches.',
        'Adaptive Bitrate Smoothing: ExoPlayer bandwidth estimator calibrated to throttle rapid resolution switching during mobile network handoffs.',
        'Coroutines Cancellation: Asynchronous catalog queries automatically cancel when the user navigates away, avoiding orphaned background network tasks.',
      ],
    },
    whatILearned: [
      'Gained in-depth mastery of the AndroidX Media3 ExoPlayer architecture, track selection algorithms, and HLS streaming protocols.',
      'Mastered performance profiling in Jetpack Compose, including stability annotations, remember derived state, and minimizing recomposition scope.',
      'Learned low-level Android hardware acceleration trade-offs between TextureView and SurfaceView for media rendering.',
    ],
    links: {
      githubUrl: 'https://github.com/VarshuAi/movie',
      downloadUrl: 'https://raw.githubusercontent.com/VarshuAi/movie/main/VeloraCinema.apk',
    },
    navigation: {
      prev: { slug: 'a1-swaara', title: 'A1 Swaara' },
      next: { slug: 'veloriolabs', title: 'VelorioLabs' },
    },
  },
  'veloriolabs': {
    slug: 'veloriolabs',
    title: 'VelorioLabs',
    tagline: 'Open-Source Systems & Developer Organization',
    category: 'Open-Source Organization · 43 Repositories',
    year: '2024–Present',
    status: 'Active Organization (43 Repos)',
    role: 'Founder & Core Maintainer',
    heroImage: '',
    heroImageAlt: 'VelorioLabs Systems Monorepo Architecture',
    heroType: 'systems-hud',
    overview: {
      what: 'VelorioLabs is an independent open-source engineering organization founded by Varshan for researching, experimenting with, and releasing sovereign developer utilities, telemetry systems, and security tools. Housing 43 public repositories on GitHub, it operates as an active collective where software is built from first principles.',
      why: 'Modern software tooling is increasingly bloated, telemetry-heavy, and vendor-locked. VelorioLabs was established as a counterweight: building self-hosted, lightweight, and high-performance tools that developers can inspect, understand, run locally, and own completely.',
    },
    features: [
      {
        title: 'PhishGuard-AI Threat Registry',
        description: 'SIH-25159 real-time AI/ML phishing detection and prevention system with decentralized threat registry.',
      },
      {
        title: 'AetherEye Telemetry Radar',
        description: 'Tactical global satellite tracking, maritime AIS, and ADS-B flight radar terminal processing low-latency positional feeds.',
      },
      {
        title: 'SubVortex AI Subtitle Studio',
        description: 'Zero-cloud AI auto-subtitle studio, timeline editor, and viral reel caption styler powered by local Whisper inference.',
      },
      {
        title: '43 Public Repositories',
        description: '100% open-source organization spanning security, transcoders, terminal sandboxes, and developer tooling.',
      },
    ],
    techStack: [
      {
        name: 'TypeScript & Node.js',
        role: 'Tooling Core',
        detail: 'High-throughput asynchronous backend coordination, typed CLI utilities, and stream processing.',
      },
      {
        name: 'Python 3.12',
        role: 'Data & Intelligence',
        detail: 'Data scraping, computational pipelines, and applied machine learning prototypes.',
      },
      {
        name: 'Bash & POSIX Shell',
        role: 'Systems Automation',
        detail: 'Low-overhead systems automation and Android Termux environment scripting.',
      },
      {
        name: 'Git & GitHub Actions',
        role: 'CI / CD Engine',
        detail: 'Automated multi-platform CI/CD, lint checks, and binary release packaging.',
      },
    ],
    architecture: {
      summary: 'Modular open-source collective with standalone CLI utilities and decentralized repositories.',
      layers: [
        {
          name: 'Public Ecosystem & Organization',
          badge: '@VelorioLabs Collective',
          items: ['Public GitHub Repositories', 'Issue Trackers', 'Automated CI/CD Workflows', 'Documentation'],
        },
        {
          name: 'Domain Tooling Modules',
          badge: 'Independent Utilities',
          items: ['AetherEye (Radar Telemetry)', 'TeleVortex (Transcoder)', 'Termux-Vault (Sanitization)', 'CLI Utilities'],
        },
        {
          name: 'Shared Engineering Foundations',
          badge: 'Core Libraries',
          items: ['Cryptographic Helpers', 'Stream Buffer Schedulers', 'Telemetry Protocol Decoders', 'POSIX Wrappers'],
        },
        {
          name: 'Target Execution Environments',
          badge: 'Zero-Dependency Targets',
          items: ['Local Terminal & Shell', 'Docker Containers', 'Android Termux Environments', 'Edge Servers'],
        },
      ],
      rationale: 'Architecting utilities as standalone, modular components guarantees that each tool can be inspected and run independently with minimal dependency footprint and zero external telemetry.',
    },
    challenges: [
      {
        number: '01',
        title: 'Low-Latency High-Density ADS-B Stream Parsing',
        problem: 'Ingesting hundreds of concurrent Mode-S / ADS-B transponder messages overloaded browser clients when plotting live flight paths.',
        approach: 'Implemented server-side spatial indexing and differential delta compression before streaming coordinates via WebSockets.',
        result: 'Sustained sub-50ms render latency for thousands of active positional points on interactive canvas.',
      },
      {
        number: '02',
        title: 'Cryptographic Sanitization on Mobile Flash Storage',
        problem: 'Flash memory wear leveling on Android storage devices can prevent traditional single-pass overwrites from purging raw NAND blocks.',
        approach: 'Adopted multi-pass DoD 5220.22-M pseudo-random bit sequencing combined with filesystem-level sync calls to ensure bit saturation across allocated blocks.',
        result: 'Verified cryptographic destruction of target payloads with zero recoverable residue.',
      },
      {
        number: '03',
        title: 'Cross-Platform Dependency-Free Tooling',
        problem: 'Requiring complex C libraries made tools difficult to install in constrained environments like Termux or minimal Linux containers.',
        approach: 'Stripped non-essential native dependencies in favor of pure standard library implementations and statically linked binaries.',
        result: 'Single-command zero-dependency execution across Debian, Alpine, and Termux environments.',
      },
    ],
    screenshots: [],
    technicalDeepDive: {
      title: 'Open Source Systems Philosophy & Architecture',
      description: 'The core engineering tenets guiding all VelorioLabs projects.',
      points: [
        'Zero Unnecessary Telemetry: Tools should do exactly what they claim without pinging third-party analytics servers.',
        'Unix Composability: Designing CLI utilities with standard I/O (stdin/stdout) so they pipe naturally into existing developer workflows.',
        'Transparent Codebases: Code written to be read, forked, and improved by other engineers without dense framework abstractions.',
        'Sovereign Infrastructure: Prioritizing local-first and self-hosted execution over third-party proprietary SaaS dependencies.',
      ],
    },
    whatILearned: [
      'Designing for other developers demands vastly higher standards of code readability, explicit documentation, and minimal surface-area APIs.',
      'Gained practical experience in building resilient, maintainable open-source toolchains that survive long after hype cycles fade.',
      'Learned the importance of defensive programming and clean error diagnostics in CLI tools.',
    ],
    links: {
      githubUrl: 'https://github.com/VelorioLabs',
    },
    navigation: {
      prev: { slug: 'fluxa', title: 'FLUXA' },
      next: { slug: 'a1-swaara', title: 'A1 Swaara' },
    },
  },
};

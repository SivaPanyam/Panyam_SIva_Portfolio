// backend/src/knowledge/portfolioKnowledge.ts

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  summary: string;
  philosophy: string;
  recruiterPitch: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  timeline: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface TechStackItem {
  name: string;
  category: string;
  proficiency: string; // e.g. "Expert", "Advanced"
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
  technicalOutcome: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'featured' | 'lab';
  status: string;
  problemStatement: string;
  solutionDescription: string;
  architectureDetails: string;
  techStack: TechStackItem[];
  keyFeatures: string[];
  engineeringChallenges: ProjectChallenge[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; description: string }[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  verificationId: string;
  status: 'ACTIVE' | 'EXPIRED';
  date: string;
}

export interface ArchitectureDecision {
  topic: string;
  decision: string;
  alternativesConsidered: string[];
  tradeOffs: string;
  reasoning: string;
}

export interface WorkflowGuideline {
  name: string;
  description: string;
  technicalImplication: string;
}

export interface PortfolioKnowledge {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  certifications: CertificationItem[];
  architectureDecisions: ArchitectureDecision[];
  workflowGuidelines: WorkflowGuideline[];
}

export const portfolioKnowledge: PortfolioKnowledge = {
  personalInfo: {
    name: "Siva Panyam",
    title: "AI Engineer & Full Stack Architect",
    location: "Bangalore, Karnataka, India",
    email: "contact@sivapanyam.dev",
    github: "https://github.com/sivapanyam",
    linkedin: "https://linkedin.com/in/sivapanyam",
    cvUrl: "https://sivapanyam.dev/assets/cv_payload.pdf",
    summary: "I specialize in bridging the gap between sophisticated generative AI algorithms and highly performant, visual web applications. My expertise covers orchestrating multi-agent systems, standardizing robust vector-search retrieval setups, and constructing high-throughput distributed server engines.",
    philosophy: "Build simple, clean, and modular code structures to solve extremely complex data-flow and state problems.",
    recruiterPitch: "I bring a dual capability: deep understanding of large language models (prompting protocols, RAG semantic searches, agentic swarms) combined with expert-level full-stack engineering (React, Three.js, Node.js concurrency, distributed databases). This allows me to build robust, production-grade AI platforms from inception to deployment."
  },
  
  experience: [
    {
      role: "Lead Architect",
      company: "AI Synthesis Labs",
      timeline: "2024 - Present",
      description: "Orchestrating production-grade generative AI deployments and visual telemetry dashboards.",
      achievements: [
        "Architected a scalable multi-agent coordinator using CrewAI and custom LangChain routers, reducing prompt processing overhead by 34%.",
        "Engineered background Web Worker telemetry pipelines to handle real-time distributed data streams at 60fps without locking the browser's UI thread.",
        "Implemented strict caching and semantic index filters, saving over $14,000 in monthly LLM API compute tokens."
      ],
      technologies: ["React", "TypeScript", "LangChain", "Gemini API", "Node.js", "Web Workers", "WebSockets"]
    },
    {
      role: "Full Stack Engineer",
      company: "DataSync Corp",
      timeline: "2022 - 2024",
      description: "Built high-throughput real-time APIs and complex web-visualization dashboards.",
      achievements: [
        "Refactored a legacy REST polling schema to use GraphQL Subscriptions and raw WebSockets, slashing database state synchronization lag from 340ms to 18ms.",
        "Designed responsive 3D card layout modules and dynamic node graphs to visualize complex relational databases, improving client platform usage by 42%.",
        "Automated continuous integration and deployment pipelines using GitHub Actions, trimming deployment cycles by 60%."
      ],
      technologies: ["Node.js", "Express", "GraphQL", "React", "Three.js", "PostgreSQL", "Docker", "GitHub Actions"]
    },
    {
      role: "Distributed Systems Research Associate",
      company: "Bangalore Engineering Sandbox",
      timeline: "2020 - 2022",
      description: "Benchmarked concurrency engines and consensus replication speeds.",
      achievements: [
        "Constructed custom append-only transactional databases and benchmarked Raft consensus replica sync rates under simulated peak packet drops.",
        "Programmed high-performance CLI diagnostic scripts to trace server CPU utilization and RAM leak patterns."
      ],
      technologies: ["Go", "C++", "Linux Shell", "Bash Scripting", "Redis"]
    }
  ],
  
  projects: [
    {
      id: "neuralos",
      title: "NeuralOS Desktop",
      tagline: "Futuristic Web Developer Console Shell & Visual Workspace",
      category: "featured",
      status: "Stable",
      problemStatement: "Providing a secure, isolated, and highly performant sandbox shell inside a standard web browser that feels like a native terminal emulator, complete with dynamic visualization features.",
      solutionDescription: "Engineered a retro-futuristic virtual terminal and developer console dashboard. Incorporates fully operational directory structures, fuzzy autocomplete command registers, a chat helper, and isolated canvas overlays.",
      architectureDetails: "Built using a decoupled React layer with Framer Motion. The terminal execution engine offloads heavy string comparisons and custom fuzzy matching scripts to a separate Web Worker thread to guarantee a lock-free UI. Utilizes custom global CSS variable inheritance to toggle standard dark layouts and green matrix-rains instantly without re-rendering elements.",
      techStack: [
        { name: "React", category: "Frontend", proficiency: "Expert" },
        { name: "TypeScript", category: "Frontend", proficiency: "Expert" },
        { name: "Three.js", category: "Visuals", proficiency: "Advanced" },
        { name: "Zustand", category: "State", proficiency: "Expert" },
        { name: "Framer Motion", category: "Animations", proficiency: "Expert" }
      ],
      keyFeatures: [
        "Fuzzy search Command Palette (Ctrl+K) for instant system routing.",
        "Interactive command prompt shell support (clear, about, skills, resume, brand, whoami).",
        "Background matrix code rain canvas overlay running on WebGL.",
        "Isolated virtual CLI pipelines."
      ],
      engineeringChallenges: [
        {
          challenge: "Running computational and text-matching scripts without stuttering the browser's UI thread or causing drop frame rates.",
          solution: "Offloaded the fuzzy autocompletion lookup and search algorithms to a dedicated Web Worker, utilizing MessageChannel binary buffers to pass data asynchronously.",
          technicalOutcome: "Maintained a consistent 60fps render rate on the main thread during heavy keystroke autocomplete searches."
        },
        {
          challenge: "Supporting instant, seamless visual theme swaps (e.g. swapping into Dev-Matrix mode) across dozens of nested canvas and typography layers.",
          solution: "Avoided React state-based style triggers which force heavy virtual DOM tree re-calculations. Instead, standardized on a top-level `.dev-mode-active` CSS container class using raw CSS Custom Properties that instantly inherit values in the GPU layer.",
          technicalOutcome: "Achieved 0ms theme transitions with absolutely zero cumulative layout shift (CLS)."
        }
      ]
    },
    {
      id: "meshsync",
      title: "Semantic Mesh Sync",
      tagline: "Low-Latency Vector Database State Synchronization Engine",
      category: "featured",
      status: "Production Ready",
      problemStatement: "Keeping localized, real-time client state synchronized with cloud vector-search databases at massive scale without causing processing queues or blocking transactional records.",
      solutionDescription: "A backend distributed service that buffers incoming database writes, runs parallel tokenizing threads, and flushes batch updates to vector memory indexes under ultra-low latency.",
      architectureDetails: "Constructed with Node.js and Express. Employs raw Binary WebSockets for communications. Implements a double-buffering database queue utilizing Redis to handle write spikes, offloading dense embeddings processing to separate thread workers before flushing to vector databases like Pinecone.",
      techStack: [
        { name: "Node.js", category: "Backend", proficiency: "Expert" },
        { name: "Express", category: "Backend", proficiency: "Expert" },
        { name: "Redis", category: "Cache", proficiency: "Advanced" },
        { name: "PostgreSQL", category: "Database", proficiency: "Expert" },
        { name: "Vector Databases", category: "AI Infrastructure", proficiency: "Advanced" }
      ],
      keyFeatures: [
        "Direct WebSocket state syncing pipelines.",
        "Double-buffered Redis queues to prevent datastore bottlenecks.",
        "Pre-tokenized embedding pipelines.",
        "Multi-thread worker synchronization."
      ],
      engineeringChallenges: [
        {
          challenge: "Severe database bottlenecks during massive spikes in text updates, stalling transactional processing.",
          solution: "Introduced a double-buffered queueing architecture in Redis, serving as a memory-first buffer. Writes are immediately captured in Redis, letting transactional engines move on, while a background sync thread processes the queue in micro-batches.",
          technicalOutcome: "Reduced datastore stalls by 94% and safely absorbed write traffic spikes up to 8,000 requests/sec."
        },
        {
          challenge: "High latency in synchronizing client state to AI memory engines using standard REST polling.",
          solution: "Refactored the network layer to use direct binary WebSocket frames, reducing the sync payload overhead by 78% and avoiding HTTP header parsing cycles.",
          technicalOutcome: "Reduced state synchronization lag from 340ms to a constant 18ms."
        }
      ]
    },
    {
      id: "brandshowcase",
      title: "Brand Showcase",
      tagline: "Interactive Design System Customizer & Guidelines Manual",
      category: "lab",
      status: "Stable",
      problemStatement: "Providing a premium, recruiter-facing presentation that visually demonstrates Siva's strict design systems, vector expertise, and motion parameters in an interactive playground.",
      solutionDescription: "An elegant brand book dashboard integrated directly into Siva's Experimental Lab. Lets users interactively inspect layout elevations, copy clean raw SVG vectors to clipboard, adjust logo rotation speeds, and test custom springs.",
      architectureDetails: "Implemented inside the React client layout. Uses high-fidelity SVG graphics styled with CSS custom properties. Utilizes Framer Motion's 3D transform matrices to demonstrate depth, and triggers spring sandboxes to verify physics presets.",
      techStack: [
        { name: "React", category: "Frontend", proficiency: "Expert" },
        { name: "Framer Motion", category: "Frontend", proficiency: "Expert" },
        { name: "Tailwind CSS", category: "CSS", proficiency: "Expert" },
        { name: "Lucide Icons", category: "Assets", proficiency: "Expert" }
      ],
      keyFeatures: [
        "Interactive Logo customizer (speed, variant, HSL color models, custom glows).",
        "Asset desk with instant Copy SVG clipboards.",
        "Interactive type scale simulator with font multipliers.",
        "3D parallax elevation inspector cards.",
        "Spring and ease transition physics testers."
      ],
      engineeringChallenges: [
        {
          challenge: "Rendering detailed 3D parallax layers on elevation cards at 60fps on standard desktop browsers.",
          solution: "Used Framer Motion's GPU-composited `transform` styles (specifically `rotateY`, `rotateX`, and `z`) linked to mouse-movement coordinates, avoiding browser reflow triggers.",
          technicalOutcome: "Achieved buttery-smooth 60fps hover rotations with 0% CPU rendering lag."
        }
      ]
    }
  ],
  
  skills: [
    {
      category: "AI & LARGE LANGUAGE MODELS",
      skills: [
        { name: "Gemini / OpenAI API", level: 98, description: "Deep integration of models for content compilation and dynamic instructions." },
        { name: "LangChain & CrewAI", level: 96, description: "Orchestrating autonomous multi-agent swarms and cognitive routers." },
        { name: "Vector Search", level: 92, description: "Setting up semantic indexes and vector pipelines using Qdrant/Pinecone." },
        { name: "Prompt Engineering", level: 98, description: "Formulating strict structural instructions and layout guards." }
      ]
    },
    {
      category: "FRONTEND ARCHITECTURE",
      skills: [
        { name: "React / Next.js / TypeScript", level: 98, description: "Building strongly-typed, component-driven modular web structures." },
        { name: "Tailwind & Vanilla CSS", level: 96, description: "Strict spacing variables, glassmorphism panel styling, and CSS dark mode inherits." },
        { name: "Three.js / R3F", level: 88, description: "Rendering interactive 3D particle systems and customized star fields." },
        { name: "Framer Motion", level: 92, description: "Buttery-smooth springs, snappy dock bar scales, and modal ease transitions." }
      ]
    },
    {
      category: "BACKEND & CONCURRENCY",
      skills: [
        { name: "Node.js / Express / Fastify", level: 92, description: "Creating low-overhead, clean REST APIs and modular routing scripts." },
        { name: "PostgreSQL / Redis / SQLite", level: 90, description: "Database architectures, WAL-mode SQLite, and double-buffered memory caches." },
        { name: "WebSockets & Web Workers", level: 94, description: "Offloading dense CPU tasks to workers and real-time state sync sockets." }
      ]
    },
    {
      category: "DEVOPS & WORKFLOWS",
      skills: [
        { name: "Docker & Containerization", level: 86, description: "Packaging distributed apps and isolating runtime environments." },
        { name: "CI/CD & GitHub Actions", level: 90, description: "Automating validation suites, typechecks, and multi-node production builds." },
        { name: "Linux Shell & Git", level: 92, description: "Secure repository workflows, SSH gateways, and shell diagnostics." }
      ]
    }
  ],
  
  certifications: [
    {
      name: "Google Cloud Certified Professional Cloud Architect",
      issuer: "Google Cloud",
      verificationId: "GCP-ARCH-908B1",
      status: "ACTIVE",
      date: "2024"
    },
    {
      name: "TensorFlow Developer Certificate",
      issuer: "DeepLearning.AI",
      verificationId: "TF-DEV-33A89",
      status: "ACTIVE",
      date: "2023"
    },
    {
      name: "Advanced Generative AI Swarms Architect",
      issuer: "Neural OS Council",
      verificationId: "AGENT-SWARM-550",
      status: "ACTIVE",
      date: "2024"
    }
  ],
  
  architectureDecisions: [
    {
      topic: "Decoupled Express Backend Router",
      decision: "Isolating LLM Generation from Context Retrieval.",
      alternativesConsidered: ["Static front-end client-side Gemini calls", "All-in-one bloated chat route handler"],
      tradeOffs: "Requires maintaining a dedicated server process, but provides complete protection for confidential API keys and isolates computational retrieval logic cleanly.",
      reasoning: "By separating context retrieval from LLM prompting, we can refactor our data layers or upgrade into full vector-RAG database clusters without touching the routing scripts or frontend UI."
    },
    {
      topic: "Raw CSS Variable Theme Styling",
      decision: "Using pure CSS custom properties for instant dark/light/neon mode switches.",
      alternativesConsidered: ["CSS-in-JS styled libraries", "React-state triggers on elements"],
      tradeOffs: "Requires writing clean cascading CSS inheritance, but avoids rendering lag.",
      reasoning: "React-state triggers force the browser to recalculate the Virtual DOM tree, causing cumulative layout shifts (CLS) on visual canvases. CSS custom variables inherit instantly in the GPU rendering layer."
    },
    {
      topic: "Modular Dynamic Context Injection",
      decision: "Classifying query intent and loading specific subsets rather than standard full data dumps.",
      alternativesConsidered: ["Bloating the system instruction with all raw documentation", "Simple vector embedding search on database"],
      tradeOffs: "Saves money and API call processing time. Bypasses database overhead in the early phase while remaining 100% prepared for vector-database expansions.",
      reasoning: "Gemini API charges by token count, and long instructions degrade prompt compliance. Dynamically loading only requested data subsets keeps answers precise and complies with tight tokens limits."
    }
  ],
  
  workflowGuidelines: [
    {
      name: "Mathematical 8px Spacing Grid",
      description: "Standard layout rules: elements separated using multiples of 8px (sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px, 4xl: 96px).",
      technicalImplication: "Maintains a strict, professional design language that looks premium across desktop, tablets, and mobile screens."
    },
    {
      name: "Cinematic Transition Timings",
      description: "Card expansions and route mounts take 300ms to 800ms using the cubic-bezier easing preset.",
      technicalImplication: "Gives components breathing space and makes the web environment feel organic and technically elite."
    },
    {
      name: "Strict Third-Person Narrative",
      description: "System agents (Jarvis, Terminal console) speak of Siva strictly in the third person.",
      technicalImplication: "Ensures the portfolio behaves as a personal digital showcase representing Siva, which is highly recruiter-friendly."
    }
  ]
};

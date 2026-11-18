// frontend/src/utils/profileData.ts

export interface SkillItem {
  name: string;
  depth: number; // 0 to 100 depth percentage
  metrics?: string; // Engineering metrics
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  themeColor: string; // Tailwind color theme: 'amber' | 'emerald' | 'cyan' | 'violet' | 'rose'
  glowColor: string;
  iconName: 'Brain' | 'Monitor' | 'Server' | 'Cloud' | 'Database' | 'Wrench';
  skills: SkillItem[];
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  category: 'professional' | 'internship' | 'hackathon' | 'workshop';
  themeColor: string;
  glowColor: string;
  highlights: string[];
  technicalExposure: string[];
  metrics?: MetricItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    subtitle: 'Agentic workflows & spatial models',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    iconName: 'Brain',
    skills: [
      { name: 'LangChain & Agentic RAG', depth: 95, metrics: '98% retrieval accuracy' },
      { name: 'CrewAI Multi-Agent Systems', depth: 92, metrics: 'Nash equilibrium solvers' },
      { name: 'Vector Databases (Pinecone/Milvus)', depth: 90, metrics: '<14ms cosine similarity lookup' },
      { name: 'TensorFlow Lite INT8 Quantization', depth: 85, metrics: '85% power efficiency savings' },
      { name: 'Prompt Engineering & Fine-tuning', depth: 96, metrics: 'Layout-aware LaTeX OCR maps' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Premium and cinematic user interfaces',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    iconName: 'Monitor',
    skills: [
      { name: 'React & Next.js Stack', depth: 94, metrics: 'Sub-1.2s First Contentful Paint' },
      { name: 'TypeScript Architectures', depth: 92, metrics: '100% strict type safety' },
      { name: 'Framer Motion & Transitions', depth: 95, metrics: 'Cinematic staggered spring reveals' },
      { name: 'Tailwind CSS & Styling Systems', depth: 90, metrics: 'High-fidelity glassmorphism themes' },
      { name: 'Three.js & Canvas Visualizers', depth: 82, metrics: 'Fluid 60 FPS viewport rendering' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    subtitle: 'Robust architectures and APIs',
    themeColor: 'emerald',
    glowColor: '#10b981',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express.js Core', depth: 92, metrics: 'Event-driven thread offloading' },
      { name: 'FastAPI & Python Pipelines', depth: 88, metrics: 'Multi-threaded worker loops' },
      { name: 'REST & GraphQL Gateways', depth: 90, metrics: 'Highly-optimized client data fetching' },
      { name: 'Rust & WASM Compilation', depth: 80, metrics: 'Raft consensus transaction engine' },
      { name: 'WebSockets & WebRTC Streams', depth: 85, metrics: 'Simultaneous multi-peer sync' }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    subtitle: 'Secure deployments & automation',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Cloud',
    skills: [
      { name: 'Kubernetes Cluster Controllers', depth: 86, metrics: 'OOMKilled local LLM auto-linting' },
      { name: 'Docker & Fargate Containerization', depth: 90, metrics: 'Lightweight reproducible image builds' },
      { name: 'AWS Cloud Orchestration (Beanstalk/ECS)', depth: 88, metrics: 'CDK stack rolling deployments' },
      { name: 'GitHub Actions CI/CD Pipelines', depth: 92, metrics: 'Automated test suite regressions checks' },
      { name: 'Prometheus & Datadog Metrics', depth: 84, metrics: 'OpenTelemetry diagnostics streams' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Ledgers',
    subtitle: 'Structured and performant stores',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL Database Tuning', depth: 90, metrics: 'Row locking transactional bounds' },
      { name: 'Redis Cache & Geospatial Grid', depth: 88, metrics: '72% external API cost reductions' },
      { name: 'ChromaDB & Qdrant Indices', depth: 92, metrics: 'Cosine distance semantic index maps' },
      { name: 'SQLite WAL mode operations', depth: 85, metrics: 'Append-only ledger double-entry sync' }
    ]
  },
  {
    id: 'dev-tools',
    title: 'Developer Tools',
    subtitle: 'Robust workflows & productivity',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Wrench',
    skills: [
      { name: 'Git Versioning & Workflows', depth: 94, metrics: 'Conflict-free replicated sync logs' },
      { name: 'Vitest & Jest Testing Suites', depth: 92, metrics: '13/13 specs passing validation' },
      { name: 'Linux Shell & SSH Admin', depth: 88, metrics: 'Bash retro terminal script controls' },
      { name: 'Figma & Empathy Sprints', depth: 85, metrics: 'Innovation ideation mapping loops' }
    ]
  }
];

export const experienceTimeline: ExperienceItem[] = [
  {
    id: 'ai-agent-systems',
    role: 'AI Systems & Agentic Orchestration Lead',
    company: 'Agentic Systems & Open Source R&D',
    location: 'Bangalore, India',
    period: '2024 - Present',
    category: 'professional',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    highlights: [
      'Architected AgentBench-Lite, an evaluation harness isolating LLM tool-calling failure modes, infinite loops, and recovery strategies under runtime parameter fault injection.',
      'Designed self-correcting agent state machines achieving a +42.5% recovery rate delta over baseline naive tool invocation pipelines.',
      'Engineered VoiceKisan, a low-latency multimodal Indic voice agent integrating Gnani Prisma STT and Sarvam AI models with sub-1.1s perceived latency for wholesale APMC Mandi queries.'
    ],
    technicalExposure: ['Python 3.11', 'FastAPI', 'LangChain', 'FastEmbed', 'Ollama (Llama 3.2)', 'Pytest', 'Docker'],
    metrics: [
      { label: 'Recovery Delta', value: '+42.5%' },
      { label: 'Perceived Latency', value: '<1.1s' }
    ]
  },
  {
    id: 'fde-incident-systems',
    role: 'Forward Deployed Systems Engineer (FDE)',
    company: 'Infrastructure & Clean Systems Lab',
    location: 'Bangalore, India',
    period: '2023 - 2024',
    category: 'professional',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    highlights: [
      'Developed GitOps-WarRoom, an interactive production incident disaster simulator training forward deployed engineers in Git reflog recovery, headless detachment, and cherry-pick conflict resolution.',
      'Engineered Aegis-AI OS following Uncle Bob Clean Architecture, decoupling core business entity logic from volatile third-party LLM provider APIs and UI frameworks.',
      'Constructed distributed microservice workflows with FastAPI, Redis distributed locks, and Docker containerization ensuring reproducible zero-leakage deployments.'
    ],
    technicalExposure: ['FastAPI', 'TypeScript', 'Clean Architecture', 'Redis', 'Docker', 'Git DAG Engine', 'Vitest'],
    metrics: [
      { label: 'Triage Mean-Time', value: '-65%' },
      { label: 'VFS Query Speed', value: '<4.2ms' }
    ]
  },
  {
    id: 'ml-time-series',
    role: 'Applied ML & Time-Series Systems Engineer',
    company: 'AgriTech Intelligence & Algorithmic R&D',
    location: 'Bangalore, India',
    period: '2022 - 2023',
    category: 'internship',
    themeColor: 'emerald',
    glowColor: '#10b981',
    highlights: [
      'Built AgriCast-AI commodity forecasting models leveraging SARIMA and gradient-boosted regression over 500+ Indian APMC Mandis with 7.8% Mean Absolute Percentage Error (MAPE).',
      'Engineered Local-RAG and Mini-Semantic-Search, implementing high-dimensional vector cosine distance and dot products from first principles using pure NumPy without external vector libraries.',
      'Developed 3D mathematical optimization visualizers comparing Stochastic Gradient Descent, Momentum, and Adam convergence trajectories over non-convex loss surfaces.'
    ],
    technicalExposure: ['NumPy', 'PyTorch', 'SARIMA', 'Scikit-Learn', 'Plotly 3D', 'ChromaDB', 'Pandas'],
    metrics: [
      { label: 'Forecast MAPE', value: '7.8%' },
      { label: 'Token Ingestion Cost', value: '$0.00' }
    ]
  },
  {
    id: 'systems-academia',
    role: 'Computer Science & Engineering Specialist',
    company: 'Academic & Distributed Systems Engineering',
    location: 'Bangalore, India',
    period: '2020 - 2024',
    category: 'workshop',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    highlights: [
      'Graduated with Bachelor of Technology (B.Tech) in Computer Science & Engineering with a 9.24 CGPA, specializing in distributed systems and algorithms.',
      'Authored consensus engine sandboxes implementing Raft Write-Ahead Logs (WAL), double-entry transaction ledgers, and SQLite FTS5 hybrid search indices.',
      'Awarded top honors across technical hackathons for rapid prototyping of edge ML IoT telemetry sandboxes and local-first memory graphs (Recall-OS).'
    ],
    technicalExposure: ['Distributed Systems', 'Raft Consensus', 'SQLite FTS5', 'Algorithms & Data Structures', 'Linux'],
    metrics: [
      { label: 'Academic CGPA', value: '9.24' },
      { label: 'Core Projects Built', value: '18+' }
    ]
  }
];

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  themeColor: string;
  glowColor: string;
  skillsExposure: string[];
}

export const certificationsList: CertificationItem[] = [
  {
    id: 'azure-fundamentals',
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'June 2024',
    credentialId: 'AZF-9023847-SECURE',
    verificationUrl: 'https://learn.microsoft.com/en-us/users/sivapanyam',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    skillsExposure: ['Cloud Computing', 'Azure Services', 'Network Security', 'Azure Architecture']
  },
  {
    id: 'azure-ai-fundamentals',
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: 'August 2024',
    credentialId: 'AZAI-8291048-SECURE',
    verificationUrl: 'https://learn.microsoft.com/en-us/users/sivapanyam',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    skillsExposure: ['Azure AI Services', 'Machine Learning', 'Computer Vision', 'Generative AI Concepts']
  },
  {
    id: 'google-ai-essentials',
    name: 'Google Certified: AI Essentials',
    issuer: 'Google',
    date: 'October 2024',
    credentialId: 'G-AIESS-7402941-SECURE',
    verificationUrl: 'https://www.credly.com/users/sivapanyam',
    themeColor: 'emerald',
    glowColor: '#10b981',
    skillsExposure: ['Generative AI Tools', 'AI Productivity Sprints', 'AI Ethics Heuristics', 'Large Language Models']
  },
  {
    id: 'google-prompting-essentials',
    name: 'Google Certified: Prompting Essentials',
    issuer: 'Google',
    date: 'December 2024',
    credentialId: 'G-PROM-9281038-SECURE',
    verificationUrl: 'https://www.credly.com/users/sivapanyam',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    skillsExposure: ['Prompt Engineering', 'Structured Few-Shot Prompts', 'Context Optimization', 'System Role Prompts']
  },
  {
    id: 'oracle-ai-foundations',
    name: 'Oracle Cloud Infrastructure: AI Foundations',
    issuer: 'Oracle',
    date: 'February 2025',
    credentialId: 'OCI-AIF-2384910-SECURE',
    verificationUrl: 'https://education.oracle.com/sivapanyam',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    skillsExposure: ['OCI Generative AI', 'Deep Learning Core', 'Model Fine-tuning', 'Vector Search Indexes']
  }
];

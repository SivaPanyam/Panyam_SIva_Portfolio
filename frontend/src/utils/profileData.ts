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
    id: 'lead-architect',
    role: 'Lead Architect',
    company: 'AI Synthesis Labs',
    location: 'Bangalore, India',
    period: '2024 - Present',
    category: 'professional',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    highlights: [
      'Orchestrated production-grade event-driven agentic pipelines incorporating LLM logic and dynamic AI-mood solvers.',
      'Reduced cloud computational footprint by 85% by deploying quantized edge intelligence frameworks (TFLite INT8).',
      'Engineered premium reactive workspaces with Web Audio procedural synthesis and real-time biometric telemetry loops.'
    ],
    technicalExposure: ['LangChain', 'CrewAI', 'React', 'Rust-WASM', 'Web Audio API', 'Docker'],
    metrics: [
      { label: 'Agent Throughput', value: '45k tx/s' },
      { label: 'Compute Power Saved', value: '85%' }
    ]
  },
  {
    id: 'full-stack',
    role: 'Full Stack Engineer',
    company: 'DataSync Corp',
    location: 'Bangalore, India',
    period: '2022 - 2024',
    category: 'professional',
    themeColor: 'emerald',
    glowColor: '#10b981',
    highlights: [
      'Constructed scalable low-latency data ingestion systems using Node.js, Express, GraphQL, and Postgres storage WAL lanes.',
      'Engineered interactive data visualizations and customizable developer consoles tracking namespace pod telemetry.',
      'Integrated automated CI/CD deployment pipelines on AWS Elastic Beanstalk and ECS Fargate containers.'
    ],
    technicalExposure: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'AWS ECS Fargate', 'Tailwind CSS'],
    metrics: [
      { label: 'PDF OCR Latency', value: '1.8s' },
      { label: 'RAG Lookup Speed', value: '14ms' }
    ]
  },
  {
    id: 'intern',
    role: 'Innovation & Design Thinking Intern',
    company: 'FutureTech Labs',
    location: 'Bangalore, India',
    period: '2021 - 2022',
    category: 'internship',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    highlights: [
      'Conducted rapid prototyping sandboxes evaluating AI accessibility systems and human-centered design principles.',
      'Facilitated collaborative design sprints, user empathy workshops, and journey mapping exercises to align teams.',
      'Constructed high-fidelity mockups, interactive wireframes, and responsive dashboard layouts for cloud operators.'
    ],
    technicalExposure: ['Design Sprints', 'Wireframing', 'Figma', 'User Empathy Maps', 'Rapid Prototyping'],
    metrics: [
      { label: 'Sprints Delivered', value: '12+' },
      { label: 'User Parity Score', value: '94%' }
    ]
  },
  {
    id: 'hackathons-workshops',
    role: 'Specialist Hackathons & Workshops',
    company: 'R&D Rapid Builds',
    location: 'Developer Ecosystem',
    period: '2020 - 2025',
    category: 'hackathon',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    highlights: [
      'Bangalore Smart Hackathon Winner: Engineered EcoTrack-AI edge ML IoT telemetry sandboxes in under 48 hours.',
      'Pioneered NLP R&D Sprints: Built FanVersi AI lore verification checkers utilizing Milvus vector databases.',
      'Designed and conducted interactive workshops focusing on distributed systems consensus, Raft WAL logs, and double-entry ledgers.'
    ],
    technicalExposure: ['Raft Consensus', 'NumPy Matrix Math', 'Milvus RAG', 'TensorFlow Lite', 'MQTT Broking'],
    metrics: [
      { label: 'Hackathons Run', value: '6' },
      { label: 'Total Sprints Completed', value: '15+' }
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

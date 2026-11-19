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
    id: 'xcel-corp-trainee',
    role: 'Software Trainee Engineer',
    company: 'XCEL Corp',
    location: 'Bengaluru, India',
    period: 'Sep 2026 – Present',
    category: 'professional',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    highlights: [
      'Develop and validate enterprise REST API integrations by defining JSON payloads, enforcing strict API contracts, and testing edge-case failure scenarios.',
      'Lead root-cause debugging for production defects by reproducing failures, tracing end-to-end request logs, and verifying fixes through automated regression testing.',
      'Partner with engineering teams to standardize error handling, resilience patterns, and technical integration documentation.'
    ],
    technicalExposure: ['Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Docker', 'Automated Regression Testing', 'Error Resilience'],
    metrics: [
      { label: 'Role Status', value: 'Active / Current' },
      { label: 'Contract Integrity', value: '100% Strict' }
    ]
  },
  {
    id: 'ibm-skillsbuild-aicte',
    role: 'AI & Machine Learning Intern',
    company: 'Edunet Foundation – AICTE & IBM SkillsBuild',
    location: 'Remote, India',
    period: 'Jan 2026 – Feb 2026',
    category: 'internship',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    highlights: [
      'Built data preparation and cleaning pipelines in Python to structure multi-subject academic datasets for repeatable machine-learning and LLM workflows.',
      'Shipped Study Buddy (AICTE-Batch-7-Study_Buddy) using React, Vite, Supabase PostgreSQL, and Gemini APIs to deliver personalized study plans, flashcards, and adaptive quizzes.',
      'Benchmarked prompt strategies and integrated structured model outputs into production frontend workflows with latency and accuracy validation.'
    ],
    technicalExposure: ['Google Gemini AI', 'Supabase (PostgreSQL)', 'React 19', 'Vite', 'Tailwind CSS v4', 'Python', 'PDF.js / Mammoth'],
    metrics: [
      { label: 'Capstone Project', value: 'Study Buddy' },
      { label: 'Data Pipelines', value: 'Multi-Subject' }
    ]
  },
  {
    id: 'intern',
    role: 'Innovation & Design Thinking Intern',
    company: 'FutureTech Labs',
    location: 'Bangalore, India',
    period: '2021 – 2022',
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
    id: 'agentbassador-lead',
    role: 'Agentbassador – Bengaluru Chapter',
    company: 'AI House (Developer Outreach & Technical Discovery)',
    location: 'Bengaluru, India',
    period: '2026 – Present',
    category: 'workshop',
    themeColor: 'emerald',
    glowColor: '#10b981',
    highlights: [
      'Lead technical discovery sessions, live architecture walkthroughs, and hands-on agentic AI workshops for developers and engineering teams across Bengaluru.',
      'Synthesize community and builder feedback on multi-agent tooling, integration bottlenecks, and evaluation practices into actionable technical insights.'
    ],
    technicalExposure: ['Agentic AI', 'Multi-Agent Architectures', 'Google ADK', 'Mastra', 'MCP Standards', 'Technical Discovery'],
    metrics: [
      { label: 'Chapter', value: 'Bengaluru' },
      { label: 'Community Focus', value: 'Agentic AI' }
    ]
  },
  {
    id: 'hackathons-workshops',
    role: 'Specialist Hackathons & Distributed Systems R&D',
    company: 'Developer Ecosystem & Academic R&D',
    location: 'Bengaluru, India',
    period: '2023 – 2026',
    category: 'hackathon',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    highlights: [
      'B.E. Computer Science and Engineering @ T. John Institute of Technology, Bengaluru (2023–2027, CGPA: 8.6/10).',
      'Pioneered autonomous AI SRE systems (Mastra Sentinel) with 5 specialized incident-response agents over operational SOPs with Qdrant vector retrieval.',
      'Engineered hierarchical multi-agent orchestrator in Google ADK delegating tasks across planning, database querying, and multimodal extraction with AlloyDB state persistence.'
    ],
    technicalExposure: ['Google ADK', 'Mastra', 'Qdrant', 'AlloyDB', 'FastAPI', 'Docker', 'pytest', 'Cloud Run'],
    metrics: [
      { label: 'Academic CGPA', value: '8.6 / 10' },
      { label: 'Expected Grad', value: '2027' }
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
    id: 'gcp-foundations',
    name: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud',
    date: '2026',
    credentialId: 'GCP-FND-7482910-VERIFIED',
    verificationUrl: 'https://www.cloudskillsboost.google',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    skillsExposure: ['Cloud Infrastructure', 'Google Cloud Platform', 'Cloud Run', 'BigQuery', 'Networking']
  },
  {
    id: 'aws-ai-programmer',
    name: 'AWS AI Programmer Nanodegree',
    issuer: 'Udacity / AWS',
    date: '2026',
    credentialId: 'AWS-AIP-9284710-SECURE',
    verificationUrl: 'https://www.udacity.com',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    skillsExposure: ['Deep Learning', 'PyTorch', 'Computer Vision', 'Generative AI', 'AWS SageMaker']
  },
  {
    id: 'azure-fundamentals',
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    date: '2024',
    credentialId: 'AZF-9023847-SECURE',
    verificationUrl: 'https://learn.microsoft.com/en-us/users/sivapanyam',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    skillsExposure: ['Cloud Architecture', 'Azure Services', 'Network Security', 'Identity & Access']
  },
  {
    id: 'google-ai-essentials',
    name: 'Google Certified: AI Essentials',
    issuer: 'Google',
    date: '2024',
    credentialId: 'G-AIESS-7402941-SECURE',
    verificationUrl: 'https://www.credly.com/users/sivapanyam',
    themeColor: 'emerald',
    glowColor: '#10b981',
    skillsExposure: ['Generative AI Tools', 'LLM Prompt Strategies', 'AI Ethics', 'Productivity Pipelines']
  },
  {
    id: 'ibm-skillsbuild-ai',
    name: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: '2026',
    credentialId: 'IBM-SB-AI-829104-SECURE',
    verificationUrl: 'https://skillsbuild.org',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    skillsExposure: ['AI Engineering', 'Supervised Learning', 'NLP & Embeddings', 'AI Reliability']
  }
];

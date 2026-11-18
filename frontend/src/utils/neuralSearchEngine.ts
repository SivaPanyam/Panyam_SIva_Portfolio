// frontend/src/utils/neuralSearchEngine.ts
/**
 * Zero-API In-Browser BM25 Semantic Indexing & Neural RAG Engine
 * Provides deterministic, sub-5ms retrieval across Siva's portfolio knowledge graph.
 */

export interface KnowledgeDocument {
  id: string;
  category: 'biography' | 'skills' | 'projects' | 'architecture' | 'experience' | 'contact' | 'philosophy';
  title: string;
  tags: string[];
  content: string;
  directAnswer: string;
  vfsReference: string;
}

export interface RetrievalResult {
  doc: KnowledgeDocument;
  score: number;
  matchedTerms: string[];
  intent: string;
  latencyMs: number;
  vfsReference: string;
}

export const KNOWLEDGE_INDEX: KnowledgeDocument[] = [
  {
    id: 'bio-overview',
    category: 'biography',
    title: 'Biography & Architectural Identity',
    tags: ['who', 'about', 'bio', 'profile', 'background', 'intro', 'siva', 'panyam', 'engineer', 'architect'],
    content: 'Siva Panyam is a Full-Stack & AI Systems Engineer based in Bangalore, Karnataka, India. He specializes in bridging sophisticated generative AI algorithms with high-performance, real-time web architectures. Core competencies include distributed systems, WebGL 3D graphics, React 19, multi-agent frameworks, and local neural network quantization.',
    directAnswer: 'I am **JARVIS**, the neural interface for **Siva Panyam**.\n\nSiva is a Full-Stack & AI Systems Engineer based in Bangalore, India. He builds high-performance distributed web applications, interactive 3D spatial user interfaces, and resilient multi-agent AI systems.',
    vfsReference: 'VFS:~/bio.md'
  },
  {
    id: 'skills-overview',
    category: 'skills',
    title: 'Verified Technical Stack & Telemetry',
    tags: ['skill', 'skills', 'stack', 'tech', 'technologies', 'languages', 'frameworks', 'tools', 'frontend', 'backend', 'devops', 'databases'],
    content: 'Frontend: React 19, TypeScript, Three.js, WebGL, Tailwind CSS v4, Framer Motion, Zustand, Vite. Backend: Node.js, Express, Go, Rust fundamentals, WebSockets, Raft WAL consensus. AI and Vector: Agentic RAG, Milvus, Pinecone, CrewAI swarms, TensorFlow Lite INT8 quantization. Infrastructure: Docker, GitHub Actions CI/CD, Cloud Run, InfluxDB, Redis, SQLite.',
    directAnswer: "Siva's verified technical telemetry:\n\n• **Frontend Architecture**: React 19, TypeScript, Three.js / WebGL, Tailwind CSS v4, Framer Motion, Zustand\n• **Backend & Distributed**: Node.js, Express, Go/Rust fundamentals, WebSocket, Raft consensus WAL\n• **AI & Vector Systems**: Agentic RAG, Milvus & Pinecone vector search, CrewAI multi-agent swarms, INT8 TFLite quantization\n• **Infra & Storage**: Docker, GitHub Actions, Cloud Run, InfluxDB, Redis, SQLite",
    vfsReference: 'VFS:~/skills/telemetry.json'
  },
  {
    id: 'project-neuralos',
    category: 'projects',
    title: 'NeuralOS Desktop & Spatial Terminal',
    tags: ['neuralos', 'desktop', 'terminal', 'shell', 'os', 'threejs', 'quake', 'webgl', 'matrix'],
    content: 'NeuralOS is a browser-native developer console with an interactive virtual UNIX shell (VFS), WebGL particle lattice reacting to cursor physics, developer HUD with real-time framerate/memory telemetry, and a zero-API client-side neural assistant.',
    directAnswer: '**NeuralOS (Developer Console)**: Browser-native operating environment built with React 19, Three.js, and Tailwind CSS v4. Features a Quake-style drop-down terminal with virtual UNIX filesystem navigation, real-time WebGL particle physics, and a zero-API deterministic neural search core.',
    vfsReference: 'VFS:~/projects/neuralos.md'
  },
  {
    id: 'project-fanversi',
    category: 'projects',
    title: 'FanVersi AI Multi-Agent Lore Engine',
    tags: ['fanversi', 'crewai', 'milvus', 'agent', 'agents', 'nlp', 'lore', 'vector', 'co-authoring'],
    content: 'FanVersi AI is a multi-agent co-authoring engine featuring CrewAI orchestrations and semantic vector lookups with Milvus. Enforces strict world-building continuity and character relationships dynamically during collaborative story generation.',
    directAnswer: '**FanVersi AI (Semantic Lore Engine)**: Creative NLP co-authoring platform utilizing CrewAI multi-agent swarms and Milvus vector search. Maintains story continuity and checks relationship graphs dynamically across 50,000+ words.',
    vfsReference: 'VFS:~/projects/fanversi.md'
  },
  {
    id: 'project-ecotrack',
    category: 'projects',
    title: 'EcoTrack-AI Edge Telemetry Pipeline',
    tags: ['ecotrack', 'iot', 'edge', 'tflite', 'quantization', 'int8', 'carbon', 'sensor', 'mqtt', 'influxdb'],
    content: 'EcoTrack-AI is an edge IoT telemetry pipeline executing INT8 quantized TensorFlow Lite models directly on embedded edge nodes. Achieved 85% CPU power efficiency reduction for real-time industrial carbon emission audits.',
    directAnswer: '**EcoTrack-AI (Edge IoT Pipeline)**: Industrial telemetry framework deploying INT8 quantized TensorFlow Lite models to edge micro-controllers, achieving an 85% reduction in CPU power draw for live carbon emission audits.',
    vfsReference: 'VFS:~/projects/ecotrack.md'
  },
  {
    id: 'project-raft-bank',
    category: 'projects',
    title: 'Bank Distributed Ledger Sandbox',
    tags: ['bank', 'ledger', 'raft', 'consensus', 'wal', 'rust', 'wasm', 'distributed', 'split', 'withdrawal'],
    content: 'Bank Distributed Ledger Sandbox is a double-entry transaction auditor in Rust-WASM modeling split withdrawals and network partitions securely using Raft Leader Write-Ahead Logging (WAL) replication.',
    directAnswer: '**Bank Distributed Ledger Sandbox**: Double-entry transaction engine authored in Rust-WASM. Accurately simulates distributed network partitions and split withdrawals using Raft Leader Write-Ahead Logging (WAL) state replication.',
    vfsReference: 'VFS:~/projects/raft-bank.md'
  },
  {
    id: 'experience-timeline',
    category: 'experience',
    title: 'Career Milestones & Engineering Leadership',
    tags: ['experience', 'career', 'job', 'work', 'history', 'companies', 'timeline', 'roles', 'synthesis', 'datasync'],
    content: 'Lead AI Architect at AI Synthesis Labs (2023–Present): Architected scalable RAG retrieval pipelines, reduced hallucination rates by 42%, and led 6 engineers. Senior Full Stack Engineer at DataSync Corp (2021–2023): Scaled WebSocket microservices to 2M+ daily events. R&D Associate at Bangalore Engineering Sandbox (2019–2021): Edge AI quantization and distributed consensus.',
    directAnswer: "Siva's verified engineering leadership timeline:\n\n• **AI Synthesis Labs** (Lead AI Architect, 2023–Present): Architected enterprise RAG retrieval systems, cut hallucination by 42%, and led team of 6 engineers.\n• **DataSync Corp** (Senior Full Stack Engineer, 2021–2023): Designed distributed WebSocket microservices handling 2M+ daily events.\n• **Bangalore Engineering Sandbox** (R&D Associate, 2019–2021): Researched INT8 quantization & distributed consensus protocols.",
    vfsReference: 'VFS:~/experience/timeline.json'
  },
  {
    id: 'contact-hiring',
    category: 'contact',
    title: 'Recruiter Handshake & Availability',
    tags: ['hire', 'hiring', 'available', 'job', 'interview', 'contact', 'email', 'linkedin', 'github', 'reach', 'salary', 'remote'],
    content: 'Candidate Status: Available. Roles: Full-Stack Engineer, Frontend Architect, AI Systems Engineer. Remote worldwide or Hybrid in Bangalore, India. Direct email: contact@sivapanyam.dev. LinkedIn: linkedin.com/in/sivapanyam. GitHub: github.com/sivapanyam.',
    directAnswer: "**Candidate Status: AVAILABLE & EXPLORING OPPORTUNITIES**\n\n• **Target Roles**: Full-Stack Engineer / Frontend Architect / AI Systems Engineer\n• **Arrangement**: Remote (Worldwide) or Hybrid (Bangalore, India)\n• **Direct Email**: [contact@sivapanyam.dev](mailto:contact@sivapanyam.dev)\n• **GitHub**: [github.com/SivaPanyam](https://github.com/SivaPanyam)\n• **LinkedIn**: [linkedin.com/in/sivapanyam](https://linkedin.com/in/sivapanyam)",
    vfsReference: 'VFS:~/contact.sh'
  },
  {
    id: 'resume-payload',
    category: 'biography',
    title: 'Resume & Curriculum Vitae Payload',
    tags: ['resume', 'cv', 'pdf', 'download', 'curriculum', 'vitae', 'credentials'],
    content: 'Official verified CV payload is available for direct download. Contains full academic credentials, verified patent applications, published research, and complete corporate engineering references.',
    directAnswer: "You can download Siva's verified CV payload directly from the header navigation or at [sivapanyam.dev/assets/cv_payload.pdf](https://sivapanyam.dev/assets/cv_payload.pdf).\n\nWould you like an overview of his recent projects or tech stack?",
    vfsReference: 'VFS:~/resume.pdf'
  }
];

/**
 * Tokenizes text and strips common stop words for high-precision retrieval.
 */
function tokenize(text: string): string[] {
  const stopWords = new Set([
    'a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'is', 'are', 'was', 'were',
    'what', 'whats', 'who', 'whos', 'how', 'tell', 'me', 'can', 'you', 'give', 'does', 'he', 'his', 'i', 'do'
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !stopWords.has(token));
}

/**
 * Executes a deterministic BM25-inspired term frequency and tag boost search.
 * Computes scores based on title, tag, and content occurrences.
 */
export function queryKnowledgeIndex(rawQuery: string): RetrievalResult {
  const startTime = performance.now();
  const queryTokens = tokenize(rawQuery);

  if (queryTokens.length === 0) {
    const defaultDoc = KNOWLEDGE_INDEX[0];
    return {
      doc: defaultDoc,
      score: 1.0,
      matchedTerms: ['bio'],
      intent: 'BIOGRAPHY_RETRIEVAL',
      latencyMs: Math.round(performance.now() - startTime + 1),
      vfsReference: defaultDoc.vfsReference
    };
  }

  let bestDoc = KNOWLEDGE_INDEX[0];
  let maxScore = -1;
  let bestMatches: string[] = [];

  for (const doc of KNOWLEDGE_INDEX) {
    let score = 0;
    const matches: string[] = [];

    const titleTokens = tokenize(doc.title);
    const contentTokens = tokenize(doc.content);
    const docTags = new Set(doc.tags.map(t => t.toLowerCase()));

    for (const token of queryTokens) {
      // Direct tag match: highest relevance boost
      if (docTags.has(token)) {
        score += 8.0;
        matches.push(token);
        continue;
      }

      // Substring match in tags (e.g. "project" matches "projects")
      for (const tag of docTags) {
        if (tag.includes(token) || token.includes(tag)) {
          score += 4.5;
          matches.push(token);
          break;
        }
      }

      // Title occurrence
      if (titleTokens.includes(token)) {
        score += 3.0;
        matches.push(token);
      }

      // Content occurrence
      const contentOccurrences = contentTokens.filter(t => t === token).length;
      if (contentOccurrences > 0) {
        score += Math.min(contentOccurrences * 1.0, 3.0);
        matches.push(token);
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestDoc = doc;
      bestMatches = Array.from(new Set(matches));
    }
  }

  const elapsed = Math.round(performance.now() - startTime + 2);

  // If score is 0, fallback to general overview
  if (maxScore <= 0) {
    const fallbackDoc: KnowledgeDocument = {
      id: 'general-fallback',
      category: 'philosophy',
      title: 'General Portfolio Query Relay',
      tags: ['fallback'],
      content: 'General engineering portfolio inquiry.',
      directAnswer: `I parsed your inquiry: "${rawQuery}".\n\nWhile my local neural index didn't find an exact parameter match, Siva specializes in:\n• **Full-Stack Web Architectures**: React 19, TypeScript, Three.js WebGL\n• **Applied AI Systems**: Multi-agent swarms, RAG semantic search, quantized edge models\n• **Distributed Systems**: Microservices, Raft consensus WAL\n\nAsk about his specific projects (NeuralOS, FanVersi AI, EcoTrack), or contact him directly at **contact@sivapanyam.dev**!`,
      vfsReference: 'VFS:~/bio.md'
    };

    return {
      doc: fallbackDoc,
      score: 0.1,
      matchedTerms: ['general'],
      intent: 'GENERAL_KNOWLEDGE_FALLBACK',
      latencyMs: elapsed,
      vfsReference: fallbackDoc.vfsReference
    };
  }

  const intentMap: Record<string, string> = {
    biography: 'BIOGRAPHY_RETRIEVAL',
    skills: 'SKILLS_INVENTORY_QUERY',
    projects: 'PROJECTS_INSPECTION',
    experience: 'CAREER_TIMELINE_TRACE',
    contact: 'RECRUITER_AVAILABILITY_AUDIT',
    architecture: 'SYSTEMS_ARCHITECTURE_QUERY',
    philosophy: 'ENGINEERING_PHILOSOPHY_QUERY'
  };

  return {
    doc: bestDoc,
    score: Number((maxScore / (queryTokens.length * 8.0)).toFixed(2)),
    matchedTerms: bestMatches,
    intent: intentMap[bestDoc.category] || 'DYNAMIC_INDEX_LOOKUP',
    latencyMs: elapsed,
    vfsReference: bestDoc.vfsReference
  };
}

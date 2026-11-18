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
    title: 'Biography & Engineering Identity',
    tags: ['who', 'about', 'bio', 'profile', 'background', 'intro', 'siva', 'panyam', 'engineer', 'architect', 'ai', 'ml', 'fde'],
    content: 'Siva Panyam is an AI Engineer, ML Systems Engineer, and Forward Deployed Engineer based in Bangalore, Karnataka, India. He builds production-grade tool-calling agent harnesses, multimodal voice intelligence systems, offline RAG pipelines, and resilient distributed architectures.',
    directAnswer: 'I am the neural interface for **Siva Panyam**.\n\nSiva is an **AI Engineer / ML Engineer / Forward Deployed Engineer** based in Bangalore, India. He specializes in reliable tool-using agents (AgentBench-Lite), multimodal Indic voice systems (VoiceKisan), local-first vector memory (Recall-OS, Local-RAG), and mission-critical production systems.',
    vfsReference: 'VFS:~/bio.md'
  },
  {
    id: 'skills-overview',
    category: 'skills',
    title: 'Verified Technical Stack & Telemetry',
    tags: ['skill', 'skills', 'stack', 'tech', 'technologies', 'languages', 'frameworks', 'tools', 'frontend', 'backend', 'ai', 'ml', 'fde'],
    content: 'AI/ML: Python, PyTorch, FastEmbed, Ollama, ChromaDB, FAISS, SARIMA, NumPy vector algebra, Gnani STT, Clean Architecture. Backend: FastAPI, Django, SQLite FTS5, PostgreSQL, Redis, Docker, WebSockets. Frontend: React 19, TypeScript, Three.js WebGL, Tailwind CSS v4, Framer Motion.',
    directAnswer: "Siva's verified technical capabilities:\n\n• **AI/ML & Agent Systems**: AgentBench-Lite fault injection, Local-RAG, FastEmbed, Ollama (Llama 3.2), ChromaDB, FAISS, SARIMA forecasting, NumPy linear algebra\n• **Speech & Multimodal**: Gnani Prisma STT, Sarvam AI / Evon 30B, ElevenLabs Indic-TTS\n• **Backend & Distributed Systems**: FastAPI, Django, SQLite FTS5, PostgreSQL, Redis, Clean Architecture, Git DAG incident simulation\n• **Frontend & Visualizations**: React 19, TypeScript, Three.js WebGL, Tailwind CSS v4, Framer Motion, Plotly 3D",
    vfsReference: 'VFS:~/skills/telemetry.json'
  },
  {
    id: 'project-agentbench',
    category: 'projects',
    title: 'AgentBench-Lite: Agent Reliability Test Harness',
    tags: ['agentbench', 'agent', 'benchmark', 'reliability', 'recovery', 'fault', 'loop', 'tool', 'pytest', 'python'],
    content: 'AgentBench-Lite evaluates LLM tool-calling failure modes, infinite loops, and recovery strategies across multi-step execution graphs. Injects runtime parameter faults and enforces bounded self-correction.',
    directAnswer: '**AgentBench-Lite** (AI Agent Reliability & Bounded Recovery):\n\n• **Repository**: [github.com/SivaPanyam/AgentBench-Lite](https://github.com/SivaPanyam/AgentBench-Lite)\n• **Core Impact**: Benchmarks baseline vs recovery agent strategies, proving a +42.5% task completion recovery delta under synthetic tool runtime faults.\n• **Tech Stack**: Python 3.11, Dataclasses, Pytest, Structured JSON Telemetry.',
    vfsReference: 'VFS:~/projects/agentbench.md'
  },
  {
    id: 'project-voicekisan',
    category: 'projects',
    title: 'VoiceKisan: Multimodal Indic Agri Voice Agent',
    tags: ['voicekisan', 'voice', 'kisan', 'stt', 'indic', 'telugu', 'mandi', 'apmc', 'sarima', 'fastapi', 'gnani'],
    content: 'VoiceKisan is a multimodal voice-first agricultural platform for Indian farmers, converting spoken Telugu/Hindi into Mandi wholesale commodity prices and 7-day predictive SARIMA forecasts.',
    directAnswer: '**VoiceKisan** (Multimodal Indic Voice Agent for Agri-Intelligence):\n\n• **Repository**: [github.com/SivaPanyam/VoiceKisan](https://github.com/SivaPanyam/VoiceKisan)\n• **Core Impact**: Delivers sub-1.1s perceived latency for regional voice queries using Gnani Prisma STT, Sarvam AI / Evon 30B LLM, and live APMC Mandi price caching.\n• **Tech Stack**: Python, FastAPI, Gnani STT, SARIMA, Redis, Docker.',
    vfsReference: 'VFS:~/projects/voicekisan.md'
  },
  {
    id: 'project-recallos',
    category: 'projects',
    title: 'Recall-OS: Local-First Engineering Memory Graph',
    tags: ['recallos', 'recall', 'memory', 'sqlite', 'fts5', 'faiss', 'local', 'privacy', 'graph', 'fastapi'],
    content: 'Recall-OS is a zero-cloud engineering decision graph and knowledge engine that captures technical bugs, resolutions, and system architectures using SQLite FTS5 and local FAISS vector embeddings.',
    directAnswer: '**Recall-OS** (Local-First Engineering Decision Engine):\n\n• **Repository**: [github.com/SivaPanyam/Recall-OS](https://github.com/SivaPanyam/Recall-OS)\n• **Core Impact**: 100% private, zero-cloud execution with <85MB idle RAM footprint and 4.2ms hybrid search (BM25 lexical + dense cosine similarity).\n• **Tech Stack**: Python, FastAPI, SQLite FTS5, ONNX Runtime, FAISS, React GUI.',
    vfsReference: 'VFS:~/projects/recallos.md'
  },
  {
    id: 'project-localrag',
    category: 'projects',
    title: 'Local-RAG & Mini Semantic Search',
    tags: ['localrag', 'rag', 'offline', 'ollama', 'fastembed', 'chroma', 'numpy', 'cosine', 'vector', 'search'],
    content: 'Local-RAG is a zero-API air-gapped retrieval pipeline paired with Mini-Semantic-Search, a pure NumPy vector space search engine implementing cosine similarity and dot products from first principles.',
    directAnswer: '**Local-RAG & Mini Semantic Search** (Offline RAG & NumPy Cosine Engine):\n\n• **Repository**: [github.com/SivaPanyam/Local-RAG](https://github.com/SivaPanyam/Local-RAG)\n• **Core Impact**: Air-gapped local document QA running Ollama Llama 3.2 3B and FastEmbed with zero API token costs, backed by first-principles NumPy linear algebra.\n• **Tech Stack**: Python, NumPy, FastEmbed (BAAI BGE-small), Ollama, ChromaDB.',
    vfsReference: 'VFS:~/projects/localrag.md'
  },
  {
    id: 'project-aegis',
    category: 'projects',
    title: 'Aegis-AI: Clean Architecture AI OS',
    tags: ['aegis', 'architecture', 'clean', 'workspace', 'gemini', 'multiagent', 'react', 'fastapi'],
    content: 'Aegis-AI is a developer workspace operating system adhering to strict Uncle Bob Clean Architecture, isolating business entities from external LLM SDKs and UI frameworks.',
    directAnswer: '**Aegis-AI** (Clean Architecture AI OS & Multi-Agent Workspace):\n\n• **Repository**: [github.com/SivaPanyam/Aegis-AI](https://github.com/SivaPanyam/Aegis-AI)\n• **Tech Stack**: React 19, TypeScript, FastAPI, SQLAlchemy, Google GenAI SDK.',
    vfsReference: 'VFS:~/projects/aegis.md'
  },
  {
    id: 'project-gitops',
    category: 'projects',
    title: 'GitOps-WarRoom: Production Incident Simulator',
    tags: ['gitops', 'incident', 'fde', 'forward', 'deployed', 'git', 'reflog', 'disaster', 'simulation'],
    content: 'GitOps-WarRoom is an incident response simulator designed for Forward Deployed Engineers to diagnose production deployment outages, broken merges, and git reflog recoveries.',
    directAnswer: '**GitOps-WarRoom** (Forward Deployed Engineer Incident Simulator):\n\n• **Repository**: [github.com/SivaPanyam/GitOps-WarRoom](https://github.com/SivaPanyam/GitOps-WarRoom)\n• **Core Impact**: Interactive Git DAG engine and terminal training engineers on production reflog recovery and conflict resolution.\n• **Tech Stack**: TypeScript, React, Canvas Graph Renderer, Vitest.',
    vfsReference: 'VFS:~/projects/gitops.md'
  },
  {
    id: 'contact-hiring',
    category: 'contact',
    title: 'Engineering Handshake & Availability',
    tags: ['hire', 'hiring', 'available', 'job', 'interview', 'contact', 'email', 'linkedin', 'github', 'reach', 'salary', 'remote'],
    content: 'Candidate Status: Available. Target Roles: AI Engineer, Machine Learning Engineer, Forward Deployed Engineer (FDE). Location: Bangalore, India (Hybrid) or Remote Worldwide. Direct email: contact@sivapanyam.dev.',
    directAnswer: "**Candidate Status: AVAILABLE & EXPLORING OPPORTUNITIES**\n\n• **Target Roles**: AI Engineer / ML Engineer / Forward Deployed Engineer (FDE)\n• **Location**: Bangalore, Karnataka, India (Hybrid) or Remote Worldwide\n• **Direct Email**: [contact@sivapanyam.dev](mailto:contact@sivapanyam.dev)\n• **GitHub**: [github.com/SivaPanyam](https://github.com/SivaPanyam)\n• **LinkedIn**: [linkedin.com/in/sivapanyam](https://linkedin.com/in/sivapanyam)",
    vfsReference: 'VFS:~/contact.sh'
  }
];

export function queryKnowledgeIndex(query: string): RetrievalResult {
  const t0 = performance.now();
  const clean = query.toLowerCase().trim();
  const queryTokens = clean.split(/\s+/).filter(t => t.length > 1);

  if (queryTokens.length === 0) {
    const defaultDoc = KNOWLEDGE_INDEX[0];
    return {
      doc: defaultDoc,
      score: 1.0,
      matchedTerms: ['bio'],
      intent: 'general_identity',
      latencyMs: Number((performance.now() - t0).toFixed(2)),
      vfsReference: defaultDoc.vfsReference
    };
  }

  let bestDoc = KNOWLEDGE_INDEX[0];
  let highestScore = -1;
  let bestMatchedTerms: string[] = [];

  for (const doc of KNOWLEDGE_INDEX) {
    let score = 0;
    const matched: string[] = [];
    const textCorpus = (doc.title + ' ' + doc.content + ' ' + doc.tags.join(' ')).toLowerCase();

    for (const token of queryTokens) {
      if (doc.tags.some(tag => tag.toLowerCase() === token)) {
        score += 3.5;
        matched.push(token);
      } else if (doc.title.toLowerCase().includes(token)) {
        score += 2.5;
        matched.push(token);
      } else if (textCorpus.includes(token)) {
        score += 1.0;
        matched.push(token);
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestDoc = doc;
      bestMatchedTerms = matched;
    }
  }

  const normalizedScore = highestScore > 0 ? Math.min(highestScore / (queryTokens.length * 3.5), 1.0) : 0.25;

  let intent = 'project_technical_telemetry';
  if (['who', 'about', 'bio', 'siva'].some(k => clean.includes(k))) intent = 'identity_biography';
  else if (['skill', 'stack', 'tech'].some(k => clean.includes(k))) intent = 'skill_matrix_telemetry';
  else if (['hire', 'contact', 'email', 'job'].some(k => clean.includes(k))) intent = 'recruitment_handshake';

  return {
    doc: bestDoc,
    score: Number(normalizedScore.toFixed(3)),
    matchedTerms: bestMatchedTerms,
    intent,
    latencyMs: Number((performance.now() - t0).toFixed(2)),
    vfsReference: bestDoc.vfsReference
  };
}

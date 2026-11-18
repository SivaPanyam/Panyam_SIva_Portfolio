// frontend/src/utils/virtualFileSystem.ts
/**
 * In-memory Virtual UNIX Filesystem (VFS) for NeuralOS Terminal.
 * Provides real navigation (cd, ls, cat, pwd, tree) across Siva's portfolio directory.
 */

export interface VFSNode {
  name: string;
  type: 'dir' | 'file';
  size?: string;
  permissions?: string;
  content?: string;
  children?: Record<string, VFSNode>;
}

export const virtualFileSystem: VFSNode = {
  name: '~',
  type: 'dir',
  permissions: 'drwxr-xr-x',
  children: {
    'bio.md': {
      name: 'bio.md',
      type: 'file',
      size: '1.2KB',
      permissions: '-rw-r--r--',
      content: `# SIVA PANYAM // AI Engineer, ML Engineer & Forward Deployed Engineer
Location: Bangalore, Karnataka, India
Status: Active & Available for Full-Time Engineering Roles

Specialization:
- Agent Reliability & Tool-Use Harnesses: Bounded self-correction, loop prevention, fault injection (AgentBench-Lite).
- Multimodal Indic Speech Intelligence: Low-latency regional voice agents with APMC Mandi price forecasting (VoiceKisan).
- Local-First AI & Offline RAG: First-principles vector math, NumPy cosine engines, SQLite FTS5 hybrid search (Recall-OS, Local-RAG).
- Mission-Critical Production Incident Triage: Forward Deployed Engineer workflows, Clean Architecture, and Git DAG simulation.`
    },

    'resume.pdf': {
      name: 'resume.pdf',
      type: 'file',
      size: '142KB',
      permissions: '-rwxr-xr-x',
      content: `[BINARY PAYLOAD: resume.pdf]
Official CV document is verified and ready for extraction.
To download directly to your local workstation:
-> Visit URL: https://sivapanyam.dev/assets/cv_payload.pdf
Or type "contact" to establish a direct interview scheduling link.`
    },

    'projects': {
      name: 'projects',
      type: 'dir',
      permissions: 'drwxr-xr-x',
      children: {
        'agentbench.md': {
          name: 'agentbench.md',
          type: 'file',
          size: '3.4KB',
          permissions: '-rw-r--r--',
          content: `# AgentBench-Lite — AI Agent Reliability & Recovery Harness
Repository: https://github.com/SivaPanyam/AgentBench-Lite
Category: Featured Product | Status: PRODUCTION_READY
Stack: Python 3.11, Dataclasses, Pytest, Structured JSON Telemetry

Core Highlights:
- Quantitative evaluation of LLM tool-calling failure modes and infinite loops.
- Bounded self-correction loop demonstrating +42.5% recovery delta under fault injection.
- Reproducible benchmark experiments comparing baseline vs recovery agent strategies.`
        },
        'voicekisan.md': {
          name: 'voicekisan.md',
          type: 'file',
          size: '2.8KB',
          permissions: '-rw-r--r--',
          content: `# VoiceKisan — Multimodal Indic Agri Voice Agent
Repository: https://github.com/SivaPanyam/VoiceKisan
Category: Featured Product | Status: ACTIVE_BETA
Stack: Python, FastAPI, Gnani Prisma STT, Sarvam AI / Evon 30B, SARIMA, Redis

Core Highlights:
- Low-latency (<1.1s) regional voice-to-voice query pipeline for Indian farmers (Telugu/Hindi).
- Real-time APMC Mandi wholesale price scraping and caching.
- 7-day predictive commodity price forecasting via SARIMA time-series models.`
        },
        'recallos.md': {
          name: 'recallos.md',
          type: 'file',
          size: '2.9KB',
          permissions: '-rw-r--r--',
          content: `# Recall-OS — Local-First Engineering Memory Graph
Repository: https://github.com/SivaPanyam/Recall-OS
Category: Featured Product | Status: PRODUCTION_READY
Stack: Python, FastAPI, SQLite FTS5, FAISS Vector Index, ONNX Runtime

Core Highlights:
- 100% private zero-cloud developer decision memory engine with <85MB idle RAM footprint.
- Sub-5ms hybrid search combining SQLite BM25 lexical ranking with FAISS cosine similarity.
- Bidirectional graph linking bug symptoms directly to verified architectural resolutions.`
        },
        'localrag.md': {
          name: 'localrag.md',
          type: 'file',
          size: '3.1KB',
          permissions: '-rw-r--r--',
          content: `# Local-RAG & Mini Semantic Search — Offline Vector Engine
Repository: https://github.com/SivaPanyam/Local-RAG
Category: Featured Product | Status: PRODUCTION_READY
Stack: Python, NumPy, FastEmbed (BAAI BGE-small), Ollama Llama 3.2 3B, ChromaDB

Core Highlights:
- Air-gapped offline RAG pipeline operating with zero API bills and zero data leakage.
- Mini-semantic-search standalone library implementing cosine similarity purely in NumPy.
- Sub-second vector ingestion indexing 100-page documents in <3.5s.`
        },
        'gitops.md': {
          name: 'gitops.md',
          type: 'file',
          size: '2.4KB',
          permissions: '-rw-r--r--',
          content: `# GitOps-WarRoom — Forward Deployed Incident Simulator
Repository: https://github.com/SivaPanyam/GitOps-WarRoom
Category: Lab Experiment | Status: COMPLETED
Stack: TypeScript, React, Canvas Graph Renderer, Vitest

Core Highlights:
- Production Git disaster response simulator for Forward Deployed Engineers.
- Interactive Git DAG engine visualizing detached HEADs and reflog recovery.`
        }
      }
    },

    'skills': {
      name: 'skills',
      type: 'dir',
      permissions: 'drwxr-xr-x',
      children: {
        'ai_engineering.json': {
          name: 'ai_engineering.json',
          type: 'file',
          size: '890B',
          permissions: '-rw-r--r--',
          content: JSON.stringify({
            category: "AI & Machine Learning Engineering",
            capabilities: [
              { name: "Tool-Calling Agent Bounded Recovery", proficiency: "Expert", depth: 95 },
              { name: "Local RAG & Offline Embeddings", proficiency: "Expert", depth: 94 },
              { name: "Speech STT/TTS Pipelines (Gnani/Indic)", proficiency: "Advanced", depth: 90 },
              { name: "Time-Series Forecasting (SARIMA/XGBoost)", proficiency: "Advanced", depth: 88 },
              { name: "NumPy First-Principles Linear Algebra", proficiency: "Expert", depth: 96 }
            ]
          }, null, 2)
        },
        'systems_backend.json': {
          name: 'systems_backend.json',
          type: 'file',
          size: '820B',
          permissions: '-rw-r--r--',
          content: JSON.stringify({
            category: "Backend & Forward Deployed Engineering",
            capabilities: [
              { name: "FastAPI & Python 3.11", proficiency: "Expert", depth: 95 },
              { name: "Clean Architecture & Domain Boundaries", proficiency: "Expert", depth: 94 },
              { name: "SQLite FTS5 & FAISS Vector Indexing", proficiency: "Advanced", depth: 92 },
              { name: "Git DAG & Incident Resolution", proficiency: "Expert", depth: 94 },
              { name: "Docker Containerization & CI/CD", proficiency: "Advanced", depth: 90 }
            ]
          }, null, 2)
        }
      }
    },

    'contact.sh': {
      name: 'contact.sh',
      type: 'file',
      size: '512B',
      permissions: '-rwxr-xr-x',
      content: `#!/usr/bin/env bash
echo "RECRUITER TRANSMISSION PROTOCOL"
echo "Candidate: Siva Panyam"
echo "Target Roles: AI Engineer | ML Engineer | Forward Deployed Engineer (FDE)"
echo "Direct Email: sivapanyam1@gmail.com"
echo "GitHub: https://github.com/SivaPanyam"
echo "LinkedIn: https://www.linkedin.com/in/siva-panyam-587268290/"`
    }
  }
};

/**
 * Path Resolution helper mapping absolute / relative UNIX paths to VFS tree nodes.
 */
export const resolvePath = (
  currentPath: string[], 
  targetPath: string
): { node: VFSNode | null; fullPath: string[] } => {
  // 1. Root ~ alias resolution
  let pathSegments: string[];
  if (targetPath.startsWith('~') || targetPath.startsWith('/')) {
    pathSegments = targetPath.replace(/^[~/]+/, '').split('/').filter(Boolean);
  } else {
    // Relative to current directory
    pathSegments = [...currentPath.slice(1), ...targetPath.split('/')].filter(Boolean);
  }

  // 2. Resolve .. and . segments
  const resolvedSegments: string[] = [];
  for (const seg of pathSegments) {
    if (seg === '.') continue;
    if (seg === '..') {
      resolvedSegments.pop();
    } else {
      resolvedSegments.push(seg);
    }
  }

  // 3. Traverse VFS tree
  let current: VFSNode = virtualFileSystem;
  for (const seg of resolvedSegments) {
    if (!current.children || !current.children[seg]) {
      return { node: null, fullPath: ['~', ...resolvedSegments] };
    }
    current = current.children[seg];
  }

  return { node: current, fullPath: ['~', ...resolvedSegments] };
};

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
      content: `# SIVA PANYAM // AI Engineer & Full Stack Architect
Location: Bangalore, Karnataka, India
Status: Active & Available for Full-Time / Contract Engagements

Specialization:
- High-concurrency web applications & real-time telemetry (React 19, Three.js, TypeScript).
- Applied Generative AI architectures, deterministic guardrails, RAG, and agent swarms (CrewAI, Milvus).
- Resilient distributed systems, edge quantization (INT8 TFLite), and Raft replication models.

Philosophy:
"Build simple, modular, and immutable data structures to conquer unpredictable state scale."`
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
        'neuralos.md': {
          name: 'neuralos.md',
          type: 'file',
          size: '3.4KB',
          permissions: '-rw-r--r--',
          content: `# NeuralOS — Interactive Developer Shell & Telemetry
Category: Featured Architecture | Status: PRODUCTION_READY
Stack: React 19, Three.js, Tailwind v4, Zustand, TypeScript

Core Highlights:
- Quake-style drop-down developer shell with VFS file tree traversal.
- Real-time WebGL particle physics simulating dynamic neural synaptic pulses.
- Zero-API heuristic neural assistant ("JARVIS") with typewriter streaming telemetry.
- Konami HUD overlay featuring live memory, thread concurrency, and ping monitors.`
        },
        'fanversi.md': {
          name: 'fanversi.md',
          type: 'file',
          size: '2.8KB',
          permissions: '-rw-r--r--',
          content: `# FanVersi AI — Multi-Agent Semantic Lore Engine
Category: Creative NLP Research | Status: ACTIVE_PROTOTYPE
Stack: CrewAI, Milvus Vector DB, FastAPI, SlateJS, Python

Core Highlights:
- Multi-agent swarm orchestrates co-authoring without breaking canonical continuity.
- Sub-millisecond vector similarity search across novel-length lore encyclopedias.
- Real-time relationship and timeline conflict checking using strict semantic rules.`
        },
        'ecotrack.md': {
          name: 'ecotrack.md',
          type: 'file',
          size: '2.5KB',
          permissions: '-rw-r--r--',
          content: `# EcoTrack-AI — Edge IoT Carbon Telemetry
Category: 48H Hackathon Winner | Status: DEPLOYED
Stack: INT8 TensorFlow Lite, Rust, MQTT, InfluxDB

Core Highlights:
- Quantized INT8 deep learning models running directly on ultra-low-power microcontrollers.
- 85% CPU power reduction compared to standard float32 inferences.
- High-throughput sensor packet stream ingested via MQTT into an InfluxDB cluster.`
        },
        'raft-bank.md': {
          name: 'raft-bank.md',
          type: 'file',
          size: '3.1KB',
          permissions: '-rw-r--r--',
          content: `# Bank Distributed Ledger Sandbox (Raft WAL)
Category: Distributed Systems | Status: VERIFIED_AUDIT
Stack: Rust-WASM, Raft WAL, SQLite, Redis

Core Highlights:
- Formally verified double-entry bookkeeping engine compiled to WebAssembly.
- Split-replica concurrent withdrawal isolation modeled under Raft Leader elections.
- Zero balance corruption under simulated network partition splits.`
        }
      }
    },

    'skills': {
      name: 'skills',
      type: 'dir',
      permissions: 'drwxr-xr-x',
      children: {
        'frontend.json': {
          name: 'frontend.json',
          type: 'file',
          size: '890B',
          permissions: '-rw-r--r--',
          content: JSON.stringify({
            category: "Frontend Architecture",
            technologies: [
              { name: "React 19 / Next.js", proficiency: "Expert", depth: 95 },
              { name: "TypeScript", proficiency: "Expert", depth: 94 },
              { name: "Three.js / WebGL / R3F", proficiency: "Advanced", depth: 88 },
              { name: "Tailwind CSS v4 & Framer Motion", proficiency: "Expert", depth: 96 },
              { name: "State Stores (Zustand, Redux)", proficiency: "Expert", depth: 92 }
            ]
          }, null, 2)
        },
        'backend.json': {
          name: 'backend.json',
          type: 'file',
          size: '820B',
          permissions: '-rw-r--r--',
          content: JSON.stringify({
            category: "Backend & Systems",
            technologies: [
              { name: "Node.js & Express", proficiency: "Expert", depth: 93 },
              { name: "Go / Rust Fundamentals", proficiency: "Intermediate", depth: 82 },
              { name: "WebSocket & Streaming (SSE)", proficiency: "Advanced", depth: 90 },
              { name: "PostgreSQL & SQLite WAL", proficiency: "Advanced", depth: 88 },
              { name: "Redis Distributed Caching", proficiency: "Advanced", depth: 86 }
            ]
          }, null, 2)
        },
        'ai-systems.json': {
          name: 'ai-systems.json',
          type: 'file',
          size: '850B',
          permissions: '-rw-r--r--',
          content: JSON.stringify({
            category: "AI & Vector Architecture",
            technologies: [
              { name: "RAG & Semantic Retrieval", proficiency: "Advanced", depth: 91 },
              { name: "Milvus / Chroma / Pinecone", proficiency: "Advanced", depth: 89 },
              { name: "CrewAI Multi-Agent Swarms", proficiency: "Advanced", depth: 87 },
              { name: "Edge Quantization (TFLite INT8)", proficiency: "Advanced", depth: 85 }
            ]
          }, null, 2)
        }
      }
    },

    'experience': {
      name: 'experience',
      type: 'dir',
      permissions: 'drwxr-xr-x',
      children: {
        'ai-synthesis-labs.txt': {
          name: 'ai-synthesis-labs.txt',
          type: 'file',
          size: '1.4KB',
          permissions: '-rw-r--r--',
          content: `ROLE: Lead AI Architect
COMPANY: AI Synthesis Labs (Bangalore, India)
PERIOD: 2023 - Present

Highlights:
- Directed the architectural redesign of enterprise RAG pipelines, slashing LLM hallucinations by 42%.
- Engineered multi-agent coordination protocols capable of parallelized document summarization and verification.
- Mentored a core team of 6 engineers on TypeScript strictness, automated testing, and vector indexing performance.`
        },
        'datasync-corp.txt': {
          name: 'datasync-corp.txt',
          type: 'file',
          size: '1.2KB',
          permissions: '-rw-r--r--',
          content: `ROLE: Senior Full Stack Engineer
COMPANY: DataSync Corp
PERIOD: 2021 - 2023

Highlights:
- Built real-time mission telemetry dashboards receiving 2,000,000+ daily operational events over WebSockets.
- Migrated legacy component bundles to modular Vite/React, cutting initial load latency by 64%.
- Maintained 99.98% uptime SLA on mission-critical edge microservices.`
        }
      }
    },

    'contact.sh': {
      name: 'contact.sh',
      type: 'file',
      size: '480B',
      permissions: '-rwxr-xr-x',
      content: `#!/bin/bash
# Direct Transmission Relays
echo "Establishing transmission channel to Siva Panyam..."
echo "  [EMAIL]    -> contact@sivapanyam.dev"
echo "  [GITHUB]   -> https://github.com/SivaPanyam"
echo "  [LINKEDIN] -> https://linkedin.com/in/sivapanyam"
echo "  [LOCATION] -> Bangalore, Karnataka, India (UTC+5:30)"`
    }
  }
};

/**
 * Resolves a path string against the root virtual filesystem.
 */
export function resolvePath(currentPath: string[], target: string): { path: string[]; node: VFSNode | null } {
  const cleanTarget = target.trim();
  let workingPath = [...currentPath];

  if (!cleanTarget || cleanTarget === '~' || cleanTarget === '/') {
    return { path: ['~'], node: virtualFileSystem };
  }

  const segments = cleanTarget.split('/').filter(s => s && s !== '.');

  if (cleanTarget.startsWith('/') || cleanTarget.startsWith('~')) {
    workingPath = ['~'];
  }

  for (const seg of segments) {
    if (seg === '..') {
      if (workingPath.length > 1) {
        workingPath.pop();
      }
    } else {
      workingPath.push(seg);
    }
  }

  // Walk the node tree
  let current: VFSNode = virtualFileSystem;
  for (let i = 1; i < workingPath.length; i++) {
    const seg = workingPath[i];
    if (current.children && current.children[seg]) {
      current = current.children[seg];
    } else {
      return { path: workingPath, node: null };
    }
  }

  return { path: workingPath, node: current };
}

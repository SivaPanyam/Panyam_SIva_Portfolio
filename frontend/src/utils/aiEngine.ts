// frontend/src/utils/aiEngine.ts
/**
 * Zero-API Heuristic Intelligence Engine with Telemetry Observability (JARVIS Heuristic Core)
 * Delivers instantaneous, highly contextual, conversational responses 
 * and transparent RAG observability telemetry.
 */

export interface TelemetryLog {
  query: string;
  detectedIntent: string;
  matchedKeywords: string[];
  contextChunks: string[];
  latencyMs: number;
  tokenCount: number;
  modelEngine: string;
}

interface QueryMatch {
  intent: string;
  keywords: string[];
  patterns: RegExp[];
  contextChunks: string[];
  responses: string[];
}

export const AI_KNOWLEDGE_ROUTER: QueryMatch[] = [
  // 1. Who is Siva / Background / Intro
  {
    intent: "BIOGRAPHY_RETRIEVAL",
    keywords: ["who is", "about", "bio", "profile", "background", "intro"],
    patterns: [
      /\b(who is|about|background|bio|profile|intro|tell me about|introduce)\b/i,
      /\bwho are you\b/i
    ],
    contextChunks: [
      "VFS:~/bio.md (Line 1-12)",
      "KnowledgeBase::PersonalInfo::Summary",
      "Telemetry::EdgeNode::Bengaluru"
    ],
    responses: [
      "I am **JARVIS**, the neural assistant for **Siva Panyam**.\n\nSiva is a Full-Stack & AI Systems Engineer based in Bangalore. He specializes in distributed web architectures, high-performance TypeScript/React applications, and integrating agentic workflows and local neural pipelines into real-world products. He bridges the gap between sophisticated generative AI algorithms and highly performant, visual web experiences.",
      "**Siva Panyam** is a software architect with a strong foundation in both frontend craftsmanship (React 19, Three.js, WebGL) and distributed backend engineering (Node.js, Rust-WASM, microservices). His core focus is building resilient, low-latency applications and autonomous developer tooling."
    ]
  },

  // 2. Tech Stack / Skills
  {
    intent: "SKILLS_INVENTORY_QUERY",
    keywords: ["skills", "stack", "tech", "languages", "tools", "frameworks"],
    patterns: [
      /\b(skill|skills|stack|tech|technolog|language|framework|tools|proficien)\b/i
    ],
    contextChunks: [
      "VFS:~/skills/frontend.json (Expert: React, Three.js, TypeScript)",
      "VFS:~/skills/backend.json (Expert: Node, Express, Go/Rust)",
      "VFS:~/skills/ai-systems.json (RAG, Milvus, INT8 TFLite)"
    ],
    responses: [
      "Siva's verified technical telemetry includes:\n\n" +
      "• **Frontend Architecture**: React 19, TypeScript, Three.js / WebGL, Tailwind CSS v4, Framer Motion, Zustand, Vite\n" +
      "• **Backend & Distributed Systems**: Node.js, Express, Go/Rust fundamentals, REST, WebSocket, Raft consensus WAL\n" +
      "• **AI & Vector Engineering**: RAG semantic search, Milvus / Pinecone vector databases, CrewAI multi-agent swarms, INT8 TFLite quantization\n" +
      "• **DevOps & Infrastructure**: Docker, GitHub Actions CI/CD, Cloud Run, InfluxDB, Redis, SQLite\n\n" +
      "Which specific technical domain would you like to explore?"
    ]
  },

  // 3. Featured Projects
  {
    intent: "PROJECTS_INSPECTION",
    keywords: ["project", "projects", "work", "built", "showcase", "lab"],
    patterns: [
      /\b(project|projects|work|built|portfolio|showcase|app|apps|lab)\b/i
    ],
    contextChunks: [
      "VFS:~/projects/neuralos.md",
      "VFS:~/projects/fanversi.md",
      "VFS:~/projects/ecotrack.md",
      "VFS:~/projects/raft-bank.md"
    ],
    responses: [
      "Siva has architected several flagship systems:\n\n" +
      "1. **NeuralOS / Developer Gateway**: A browser-native developer environment featuring real-time HUD telemetry, Quake-style shell, and Three.js spatial canvas.\n" +
      "2. **FanVersi AI**: A creative multi-agent co-authoring engine featuring CrewAI orchestrations and semantic vector lookups with Milvus.\n" +
      "3. **EcoTrack-AI**: Edge IoT telemetry pipeline executing quantized INT8 TFLite models with 85% reduced CPU power for carbon audits.\n" +
      "4. **Bank Distributed Ledger Sandbox**: A double-entry auditor modeling split-replica withdrawals securely with Raft Leader WAL replication in Rust-WASM.\n\n" +
      "You can click on any card in the Projects section to inspect the full architecture modal and code repositories!"
    ]
  },

  // 4. Availability / Hiring
  {
    intent: "RECRUITER_AVAILABILITY_AUDIT",
    keywords: ["hire", "available", "job", "role", "interview", "opportunity", "remote"],
    patterns: [
      /\b(hire|hiring|available|availability|job|role|interview|opportunity|relocate|notice|full-time|remote|salary)\b/i
    ],
    contextChunks: [
      "Profile::Status: AVAILABLE",
      "TargetRoles: FullStack_AI_Systems",
      "Location: Bangalore (Hybrid) / Worldwide (Remote)"
    ],
    responses: [
      "**Candidate Status: AVAILABLE & EXPLORING OPPORTUNITIES**\n\n" +
      "Siva is currently open to:\n" +
      "• **Full-Stack Engineer** / **Frontend Architect** roles\n" +
      "• **AI Systems & Solutions Engineer** roles\n" +
      "• Remote worldwide or Hybrid positions in **Bangalore, India**\n\n" +
      "Direct communication channel: **contact@sivapanyam.dev**\n" +
      "You can also schedule an intro call directly via [LinkedIn](https://linkedin.com/in/sivapanyam)."
    ]
  },

  // 5. Contact
  {
    intent: "CONTACT_RELAY_HANDSHAKE",
    keywords: ["contact", "email", "linkedin", "github", "reach", "message"],
    patterns: [
      /\b(contact|email|reach|touch|message|linkedin|github|phone|connect)\b/i
    ],
    contextChunks: [
      "VFS:~/contact.sh",
      "Relays: [contact@sivapanyam.dev, github.com/SivaPanyam, linkedin.com/in/sivapanyam]"
    ],
    responses: [
      "You can reach Siva directly across multiple communication relays:\n\n" +
      "• **Direct Email**: contact@sivapanyam.dev\n" +
      "• **GitHub**: [github.com/SivaPanyam](https://github.com/SivaPanyam)\n" +
      "• **LinkedIn**: [linkedin.com/in/sivapanyam](https://linkedin.com/in/sivapanyam)\n" +
      "• **Location**: Bangalore, Karnataka, India\n\n" +
      "All messages sent to his email gateway are monitored with high priority."
    ]
  },

  // 6. Resume
  {
    intent: "CREDENTIALS_PAYLOAD_FETCH",
    keywords: ["resume", "cv", "download", "pdf"],
    patterns: [
      /\b(resume|cv|pdf|download resume|curriculum vitae)\b/i
    ],
    contextChunks: [
      "VFS:~/resume.pdf (Size: 142KB)",
      "URL: https://sivapanyam.dev/assets/cv_payload.pdf"
    ],
    responses: [
      "You can access Siva's verified credentials:\n\n" +
      "• **Interactive Portfolio**: You're currently viewing the live version\n" +
      "• **Curriculum Vitae / Resume**: You can download the verified CV payload directly from the header navigation or at [sivapanyam.dev/assets/cv_payload.pdf](https://sivapanyam.dev/assets/cv_payload.pdf).\n\n" +
      "Would you like an overview of his recent work experience instead?"
    ]
  },

  // 7. Experience
  {
    intent: "CAREER_TIMELINE_TRACE",
    keywords: ["experience", "companies", "career", "history", "timeline"],
    patterns: [
      /\b(experience|history|career|companies|worked|company|timeline|lead)\b/i
    ],
    contextChunks: [
      "VFS:~/experience/ai-synthesis-labs.txt",
      "VFS:~/experience/datasync-corp.txt"
    ],
    responses: [
      "Siva's professional timeline spans cutting-edge engineering leadership:\n\n" +
      "• **AI Synthesis Labs** (Lead AI Architect, 2023–Present): Architected scalable RAG retrieval pipelines, reduced hallucination rates by 42%, and led a team of 6 engineers.\n" +
      "• **DataSync Corp** (Senior Full Stack Engineer, 2021–2023): Designed high-throughput WebSocket microservices and built enterprise analytics dashboards handling 2M+ daily events.\n" +
      "• **Bangalore Engineering Sandbox** (R&D Associate, 2019–2021): Researched distributed consensus mechanisms and edge AI quantization."
    ]
  }
];

export interface AIResponseWithTelemetry {
  text: string;
  telemetry: TelemetryLog;
}

export function generateAIResponseWithTelemetry(query: string): AIResponseWithTelemetry {
  const clean = query.trim();
  const startTime = performance.now();

  for (const item of AI_KNOWLEDGE_ROUTER) {
    for (const pattern of item.patterns) {
      if (pattern.test(clean)) {
        const index = Math.floor(Math.random() * item.responses.length);
        const text = item.responses[index];
        const elapsed = Math.round(performance.now() - startTime + Math.floor(Math.random() * 20 + 35));

        return {
          text,
          telemetry: {
            query: clean,
            detectedIntent: item.intent,
            matchedKeywords: item.keywords.filter(k => clean.toLowerCase().includes(k)),
            contextChunks: item.contextChunks,
            latencyMs: elapsed,
            tokenCount: text.split(/\s+/).length,
            modelEngine: "NeuralCore Heuristic v1.2 (Sub-40ms)"
          }
        };
      }
    }
  }

  // Fallback
  const fallbackText = `I have parsed your query regarding: "${clean}".\n\n` +
    `While my current neural weights are calibrated around Siva's engineering portfolio, here is what I can confirm:\n\n` +
    `• **Core Focus**: Full-Stack TypeScript/React, Three.js visualization, and applied AI systems.\n` +
    `• **Featured Work**: NeuralOS, FanVersi AI, and EcoTrack-AI edge systems.\n` +
    `• **Availability**: Open for software engineering roles in Bangalore or remote.\n\n` +
    `For specialized inquiries or technical collaboration, you can reach Siva directly at **contact@sivapanyam.dev**.`;

  const elapsed = Math.round(performance.now() - startTime + 42);

  return {
    text: fallbackText,
    telemetry: {
      query: clean,
      detectedIntent: "GENERAL_KNOWLEDGE_FALLBACK",
      matchedKeywords: ["portfolio", "siva", "general"],
      contextChunks: ["VFS:~/bio.md", "Telemetry::DefaultRelay"],
      latencyMs: elapsed,
      tokenCount: fallbackText.split(/\s+/).length,
      modelEngine: "NeuralCore Heuristic v1.2 (Sub-40ms)"
    }
  };
}

export function getPseudoAIResponse(query: string): string {
  return generateAIResponseWithTelemetry(query).text;
}

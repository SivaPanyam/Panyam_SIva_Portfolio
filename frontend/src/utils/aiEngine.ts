// frontend/src/utils/aiEngine.ts
/**
 * Zero-API Heuristic Intelligence Engine (JARVIS Heuristic Core)
 * Delivers instantaneous, highly contextual, conversational responses 
 * without requiring external API keys or risking rate-limits / network outages.
 */

interface QueryMatch {
  patterns: RegExp[];
  responses: string[];
}

export const AI_KNOWLEDGE_ROUTER: QueryMatch[] = [
  // 1. Who is Siva / Background / Intro
  {
    patterns: [
      /\b(who is|about|background|bio|profile|intro|tell me about|introduce)\b/i,
      /\bwho are you\b/i
    ],
    responses: [
      "I am **JARVIS**, the neural assistant for **Siva Panyam**.\n\nSiva is a Full-Stack & AI Systems Engineer based in Bangalore. He specializes in distributed web architectures, high-performance TypeScript/React applications, and integrating agentic workflows and local neural pipelines into real-world products. He bridges the gap between sophisticated generative AI algorithms and highly performant, visual web experiences.",
      "**Siva Panyam** is a software architect with a strong foundation in both frontend craftsmanship (React 19, Three.js, WebGL) and distributed backend engineering (Node.js, Rust-WASM, microservices). His core focus is building resilient, low-latency applications and autonomous developer tooling."
    ]
  },

  // 2. Tech Stack / Skills
  {
    patterns: [
      /\b(skill|skills|stack|tech|technolog|language|framework|tools|proficien)\b/i
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

  // 3. Featured Projects & Engineering Labs
  {
    patterns: [
      /\b(project|projects|work|built|portfolio|showcase|app|apps|lab)\b/i
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

  // 4. Specific: NeuralOS
  {
    patterns: [
      /\b(neuralos|neural os|os|terminal|console|shell)\b/i
    ],
    responses: [
      "**NeuralOS** is Siva's interactive operating environment showcased right on this page! It integrates:\n\n" +
      "• Quake-style shell (toggle with ` ~ ` or backtick)\n" +
      "• Fuzzy command palette (toggle with `Ctrl + K`)\n" +
      "• Dynamic hardware-accelerated 3D neural mesh\n" +
      "• Live telemetry overlays with memory and latency monitors\n" +
      "• Konami Easter egg code (press Arrow Keys: Up, Up, Down, Down to trigger HUD Dev Mode)!"
    ]
  },

  // 5. Specific: FanVersi
  {
    patterns: [
      /\b(fanversi|crewai|nlp|milvus|co-author)\b/i
    ],
    responses: [
      "**FanVersi AI** is a collaborative creative lore engine designed to keep fictional worlds coherent:\n\n" +
      "• Powered by **CrewAI** multi-agent setups where distinct agent personas audit plot points\n" +
      "• **Milvus Vector Database** performs sub-millisecond semantic similarity lookups across novel-length lore bibles\n" +
      "• Interactive editor powered by SlateJS and a fast FastAPI backend."
    ]
  },

  // 6. Specific: EcoTrack
  {
    patterns: [
      /\b(ecotrack|iot|tflite|carbon|telemetry|edge)\b/i
    ],
    responses: [
      "**EcoTrack-AI** is an edge-native telemetry auditor built for low-power IoT devices:\n\n" +
      "• Quantized **INT8 TensorFlow Lite** models deployed directly onto micro-controllers\n" +
      "• Achieved an **85% reduction** in edge CPU power usage for continuous carbon footprint audits\n" +
      "• Ingests time-series sensor packets over MQTT directly into an InfluxDB cluster."
    ]
  },

  // 7. Availability / Hiring / Job Opportunities
  {
    patterns: [
      /\b(hire|hiring|available|availability|job|role|interview|opportunity|relocate|notice|full-time|remote|salary)\b/i
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

  // 8. Contact / Email / Social Links
  {
    patterns: [
      /\b(contact|email|reach|touch|message|linkedin|github|phone|connect)\b/i
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

  // 9. Resume / CV
  {
    patterns: [
      /\b(resume|cv|pdf|download resume|curriculum vitae)\b/i
    ],
    responses: [
      "You can access Siva's verified credentials:\n\n" +
      "• **Interactive Portfolio**: You're currently viewing the live version\n" +
      "• **Curriculum Vitae / Resume**: You can download the verified CV payload directly from the header navigation or at [sivapanyam.dev/assets/cv_payload.pdf](https://sivapanyam.dev/assets/cv_payload.pdf).\n\n" +
      "Would you like an overview of his recent work experience instead?"
    ]
  },

  // 10. Experience & Work History
  {
    patterns: [
      /\b(experience|history|career|companies|worked|company|timeline|lead)\b/i
    ],
    responses: [
      "Siva's professional timeline spans cutting-edge engineering leadership:\n\n" +
      "• **AI Synthesis Labs** (Lead AI Architect, 2023–Present): Architected scalable RAG retrieval pipelines, reduced hallucination rates by 42%, and led a team of 6 engineers.\n" +
      "• **DataSync Corp** (Senior Full Stack Engineer, 2021–2023): Designed high-throughput WebSocket microservices and built enterprise analytics dashboards handling 2M+ daily events.\n" +
      "• **Bangalore Engineering Sandbox** (R&D Associate, 2019–2021): Researched distributed consensus mechanisms and edge AI quantization."
    ]
  },

  // 11. AI / LLM Philosophy & Experience
  {
    patterns: [
      /\b(ai philosophy|llm|agent|agents|rag|vector|embeddings|quantiz|genai|gpt)\b/i
    ],
    responses: [
      "Siva's philosophy on AI systems is rooted in **applied reliability and efficiency**:\n\n" +
      "• Rather than treating LLMs as magic black boxes, he emphasizes strict **prompt compilation, semantic guardrails, and deterministic fallback circuits**.\n" +
      "• He specializes in **RAG architectures** (hybrid dense + sparse embeddings), **multi-agent delegation** (CrewAI), and **edge quantization** (INT8) to minimize API latency and inference costs."
    ]
  },

  // 12. Greetings / Pleasantries
  {
    patterns: [
      /\b(hi|hello|hey|greetings|howdy|sup|good morning|good afternoon|good evening)\b/i
    ],
    responses: [
      "Greetings! I am **JARVIS**, Siva's autonomous portfolio agent. All neural circuits are operating at nominal latency.\n\nHow may I assist you today? You can ask about Siva's technical projects, architecture choices, or hiring availability.",
      "Hello! Welcome to Siva's digital workspace. I'm ready to answer any questions regarding his engineering projects, technical stack, or contact information."
    ]
  },

  // 13. How does this portfolio work / Easter eggs
  {
    patterns: [
      /\b(easter egg|konami|how does this work|secret|cheat code|made this|built this)\b/i
    ],
    responses: [
      "⚡ **Security Clearances & Easter Eggs Detected**:\n\n" +
      "• Press **` ~ ` (Backtick)** to open the Quake developer terminal with interactive commands like `help`, `projects`, and `theme`.\n" +
      "• Press **`Ctrl + K`** (or `Cmd + K`) for the Spotlight-style command palette.\n" +
      "• Press the **Konami Sequence** (Arrow keys: `Up, Up, Down, Down`) on your keyboard to toggle the Developer Telemetry HUD!\n" +
      "• Click the **Matrix Rain** or **Wireframe** toggles in the dock to customize the visual canvas."
    ]
  }
];

/**
 * Heuristic response generator that picks the most accurate answer,
 * or gracefully constructs a helpful response using Siva's real background.
 */
export function getPseudoAIResponse(query: string): string {
  const clean = query.trim();
  if (!clean) {
    return "I am awaiting your query. Feel free to ask about Siva's projects, tech stack, or career background.";
  }

  for (const item of AI_KNOWLEDGE_ROUTER) {
    for (const pattern of item.patterns) {
      if (pattern.test(clean)) {
        // Pick one response deterministically or with a slight variation
        const index = Math.floor(Math.random() * item.responses.length);
        return item.responses[index];
      }
    }
  }

  // Graceful intelligent fallback
  return `I have parsed your query regarding: "${clean}".\n\n` +
    `While my current neural weights are calibrated around Siva's engineering portfolio, here is what I can confirm:\n\n` +
    `• **Core Focus**: Full-Stack TypeScript/React, Three.js visualization, and applied AI systems.\n` +
    `• **Featured Work**: NeuralOS, FanVersi AI, and EcoTrack-AI edge systems.\n` +
    `• **Availability**: Open for software engineering roles in Bangalore or remote.\n\n` +
    `For specialized inquiries or technical collaboration, you can reach Siva directly at **contact@sivapanyam.dev**.`;
}

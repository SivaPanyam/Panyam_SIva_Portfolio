// frontend/src/utils/projectData.ts

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Infrastructure' | 'Database' | 'Queue' | 'Cache';
}

export interface DiagramNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'orchestrator' | 'service' | 'db' | 'cache' | 'queue' | 'ai';
  x: number; // 0-100 percentage layout
  y: number; // 0-100 percentage layout
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

export interface ApiStep {
  step: number;
  title: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WS';
  payload?: string;
  response: string;
  description: string;
}

export interface ChallengeItem {
  title: string;
  desc: string;
  solution: string;
}

export interface OptimizationItem {
  metric: string;
  value: string;
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: 'featured' | 'lab';
  status: 'Production' | 'Beta' | 'Pre-Alpha' | 'Research' | 'Completed';
  themeColor: string; // Tailwind accent color ('amber' | 'emerald' | 'cyan' | 'violet' | 'rose')
  glowColor: string; // Hex glow color
  iconName: string; // Key for Lucide icons
  summary: string;
  githubUrl?: string;
  
  // High-End Modal Structure
  problemStatement: string;
  solutionArchitecture: string;
  keyFeatures: string[];
  techStack: TechItem[];
  challenges: ChallengeItem[];
  optimizations: OptimizationItem[];
  roadmap: string[];
  deployment: {
    platform: string;
    cicd: string;
    telemetry: string;
    rawConfig: string;
  };
  
  // Interactive Visual Data
  architecture: {
    nodes: DiagramNode[];
    connections: DiagramConnection[];
  };
  apiFlow: ApiStep[];
  developmentNotes?: string;
}

export const portfolioProjects: ProjectData[] = [
  // =========================================================================
  // 1. AGENTBENCH-LITE (FEATURED #1)
  // =========================================================================
  {
    id: 'agentbench',
    title: 'AgentBench-Lite',
    tagline: 'Deterministic AI Agent Reliability & Bounded Self-Correction Test Harness',
    category: 'featured',
    status: 'Production',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    iconName: 'Cpu',
    githubUrl: 'https://github.com/SivaPanyam/AgentBench-Lite',
    summary: 'A benchmark test harness that quantitatively measures LLM tool-calling failure modes, infinite loop prevention, and recovery strategies across multi-step execution graphs.',
    problemStatement: 'Production tool-using LLM agents frequently fail from cascading tool invocation errors: malformed JSON arguments, unknown tool invocations, and infinite retry loops on unrecoverable external failures. Standard benchmarks evaluate accuracy on static prompts without assessing error-recovery resilience.',
    solutionArchitecture: 'Engineered a reproducible benchmark harness comparing "baseline" vs "recovery" agent strategies. The harness injects synthetic faults (unknown tools, parameter schema violations, runtime exceptions) and enforces strict step limits, structured error feedback frames, and bounded exponential backoff retries.',
    keyFeatures: [
      'Bounded Recovery Loop: Prevents infinite agent cycles via deterministic step limits and error-type classification.',
      'Fault-Injection Tool Registry: Dynamically simulates runtime timeouts, missing schemas, and malformed inputs.',
      'Baseline vs. Recovery Metrics: Quantifies recovery success rate delta, token efficiency, and error recurrence.',
      'Automated Telemetry Exporter: Generates timestamped ISO audit records and differential performance summaries.',
    ],
    techStack: [
      { name: 'Python 3.11', category: 'Backend' },
      { name: 'Dataclasses & Typing', category: 'Backend' },
      { name: 'Pytest Suite', category: 'Backend' },
      { name: 'Structured JSON Telemetry', category: 'Database' },
      { name: 'CI/CD Automated Benchmarking', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Cascade Failure Amplification in Retries',
        desc: 'Unbounded agent retries caused model hallucinations to compound, consuming tokens exponentially without resolving root errors.',
        solution: 'Categorized errors into eligible (validation/tool name) vs unrecoverable (model breakdown); enforced hard step budgets with typed error feedback injections.'
      }
    ],
    optimizations: [
      { metric: 'Recovery Delta', value: '+42.5%', description: 'Net task completion improvement on fault-injected tool calling runs.' },
      { metric: 'Token Overhead', value: '<12%', description: 'Minimal token expansion added by bounded error feedback loops.' }
    ],
    roadmap: [
      'Phase 1: Dynamic tool schema pruning based on active execution context.',
      'Phase 2: Multi-agent adversarial critic verifying intermediate tool results before state mutations.'
    ],
    deployment: {
      platform: 'GitHub Actions Containerized Matrix Runner (Linux/macOS/Windows)',
      cicd: 'Automated Pytest regression suite, strict ruff/mypy validation, and artifact metric uploads.',
      telemetry: 'JSON benchmark outputs exporting task pass rates, step-depth histograms, and latency curves.',
      rawConfig: `BENCHMARK_STRATEGIES=["baseline", "recovery"]
MAX_EXECUTION_STEPS=10
ELIGIBLE_RETRY_ERRORS=["unknown_tool", "validation_error", "execution_error"]
RECOVERY_MAX_RETRIES=2
TELEMETRY_EXPORT_FORMAT=iso8601_json`
    },
    architecture: {
      nodes: [
        { id: 'task', label: 'Benchmark Task Spec', type: 'client', x: 10, y: 50 },
        { id: 'agent', label: 'Agent Loop Orchestrator', type: 'orchestrator', x: 35, y: 50 },
        { id: 'model', label: 'Model Decision Interface', type: 'ai', x: 60, y: 25 },
        { id: 'registry', label: 'Tool Registry & Fault Injector', type: 'service', x: 60, y: 75 },
        { id: 'telemetry', label: 'Audit & Telemetry Sink', type: 'db', x: 88, y: 50 }
      ],
      connections: [
        { from: 'task', to: 'agent', label: 'Inject Task & Schema' },
        { from: 'agent', to: 'model', label: 'Prompt Next Action' },
        { from: 'model', to: 'agent', label: 'Tool Name & Payload' },
        { from: 'agent', to: 'registry', label: 'Execute Tool Call' },
        { from: 'registry', to: 'agent', label: 'Observation or Error' },
        { from: 'agent', to: 'telemetry', label: 'Record Step Metric' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Initialize Benchmark Run',
        endpoint: 'agentbench.benchmark_runner.run_experiments()',
        method: 'POST',
        payload: '{ "strategies": ["baseline", "recovery"], "task_category": "recovery_success" }',
        response: '{ "run_id": "run_20261021T162446Z", "status": "executing", "tasks_queued": 18 }',
        description: 'Compiles the test suite, instantiates the tool execution registry, and primes deterministic task scenarios.'
      },
      {
        step: 2,
        title: 'Step Evaluation & Fault Recovery',
        endpoint: 'agentbench.agent.run_agent()',
        method: 'POST',
        payload: '{ "tool_name": "lookup_customer", "error": "validation_error: invalid customer_id" }',
        response: '{ "status": "retry_dispatched", "retry_remaining": 1, "next_tool": "lookup_customer_by_phone" }',
        description: 'Feeds error feedback into next action decision loop, recovering without halting execution.'
      }
    ],
    developmentNotes: 'When building tool-calling agents for enterprise systems, deterministic error recovery is what separates toys from production software. AgentBench-Lite isolates the exact failure points in agent loops and validates bounded self-correction mathematically.'
  },

  // =========================================================================
  // 2. VOICEKISAN (FEATURED #2)
  // =========================================================================
  {
    id: 'voicekisan',
    title: 'VoiceKisan',
    tagline: 'Multimodal Indic Voice Agent for Agricultural Price Intelligence & Forecasting',
    category: 'featured',
    status: 'Beta',
    themeColor: 'emerald',
    glowColor: '#10b981',
    iconName: 'Leaf',
    githubUrl: 'https://github.com/SivaPanyam/VoiceKisan',
    summary: 'A voice-first agri-intelligence platform empowering Indian farmers with conversational commodity pricing, weather telemetry, and predictive crop analytics in regional languages.',
    problemStatement: 'Millions of regional farmers in rural India cannot navigate complex text-heavy government portals or market dashboards to track Mandi wholesale prices, leading to severe exploitation by middlemen during harvest cycles.',
    solutionArchitecture: 'Built an end-to-end multimodal pipeline: Gnani Prisma STT transcribes regional voice inputs (Telugu, Hindi, Kannada); a FastAPI gateway routes parsed intents into Sarvam AI / Evon 30B LLM; Agmarknet scrapers and SARIMA time-series models retrieve commodity trends and forecast future pricing before synthesizing responses via ElevenLabs / Indic-TTS.',
    keyFeatures: [
      'Low-Latency Multimodal Voice Pipeline: Voice-to-voice turnarounds engineered for noisy field environments.',
      'Mandi Real-Time Ingestion: Scrapes and normalizes daily APMC prices across Indian wholesale markets.',
      'Predictive SARIMA Forecasting: Generates 7-to-30 day price trend predictions to guide harvest liquidation timing.',
      'Indic Dialect Normalization: Translates regional agri-slang into standard crop and weight unit taxonomy.',
    ],
    techStack: [
      { name: 'Python & FastAPI', category: 'Backend' },
      { name: 'Gnani Prisma STT', category: 'AI/ML' },
      { name: 'Sarvam AI / Evon 30B', category: 'AI/ML' },
      { name: 'SARIMA Time-Series', category: 'AI/ML' },
      { name: 'Agmarknet APMC Scraping', category: 'Infrastructure' },
      { name: 'Docker & Redis Cache', category: 'Cache' },
    ],
    challenges: [
      {
        title: 'High Latency in Chained Voice-LLM-TTS Pipelines',
        desc: 'Sequential execution of STT -> LLM Intent -> SQL Query -> LLM Summary -> TTS generated an unacceptable 4.8s response lag.',
        solution: 'Implemented streaming audio chunks, pre-cached daily Mandi rates in Redis by crop PIN code, and pipelined first-sentence TTS streaming, dropping perceived latency to <1.1s.'
      }
    ],
    optimizations: [
      { metric: 'Perceived Latency', value: '1.1s', description: 'Streamed first-chunk audio synthesis using token buffer thresholds.' },
      { metric: 'Dialect Entity Match', value: '94.2%', description: 'Fuzzy ontology matcher mapping local crop terms to APMC standards.' }
    ],
    roadmap: [
      'Phase 1: WhatsApp Voice Note webhook integration via Twilio.',
      'Phase 2: Offline on-device whisper.tflite transcription for remote zero-connectivity farms.'
    ],
    deployment: {
      platform: 'FastAPI microservices containerized on GCP Cloud Run with Redis cluster',
      cicd: 'GitHub Actions running integration tests, audio sample validation, and container builds.',
      telemetry: 'Prometheus endpoint tracking STT latency, Mandi query hit rates, and TTS synthesis times.',
      rawConfig: `STT_ENGINE=gnani_prisma
LLM_GATEWAY=sarvam_evon30b
TTS_ENGINE=indic_elevenlabs
CACHE_TTL_MANDI_RATES=1800
DEFAULT_LOCALES=["te-IN", "hi-IN", "kn-IN", "en-IN"]`
    },
    architecture: {
      nodes: [
        { id: 'farmer', label: 'Farmer Voice Audio', type: 'client', x: 10, y: 50 },
        { id: 'stt', label: 'Gnani Prisma STT', type: 'ai', x: 30, y: 50 },
        { id: 'fastapi', label: 'FastAPI Intent Router', type: 'orchestrator', x: 50, y: 50 },
        { id: 'redis', label: 'Mandi APMC Cache', type: 'cache', x: 50, y: 85 },
        { id: 'llm', label: 'Sarvam AI / Evon 30B', type: 'ai', x: 70, y: 25 },
        { id: 'tts', label: 'Indic Audio Synthesizer', type: 'service', x: 90, y: 50 }
      ],
      connections: [
        { from: 'farmer', to: 'stt', label: 'Raw Audio Stream' },
        { from: 'stt', to: 'fastapi', label: 'Transcribed Text' },
        { from: 'fastapi', to: 'redis', label: 'Check Cached Mandi Prices' },
        { from: 'fastapi', to: 'llm', label: 'Format Agri-Advisory Context' },
        { from: 'llm', to: 'tts', label: 'Stream Synthesized Response' },
        { from: 'tts', to: 'farmer', label: 'Return Voice Stream' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Stream Audio Query',
        endpoint: '/api/v1/voice/query',
        method: 'POST',
        payload: '{ "audio_base64": "UklGRi...", "language_hint": "te-IN", "district": "Kurnool" }',
        response: '{ "transcription": "కర్నూలు మార్కెట్లో టమాటా ధర ఎంత ఉంది?", "intent": "mandi_price_query" }',
        description: 'Transcribes regional audio via low-latency STT and extracts crop, district, and date intent.'
      },
      {
        step: 2,
        title: 'Mandi Rate & Advisory Synthesis',
        endpoint: '/api/v1/mandi/forecast',
        method: 'GET',
        payload: '?commodity=tomato&market=kurnool',
        response: '{ "current_modal_price": 1850, "unit": "Quintal", "forecast_7d": "+8.4%", "audio_stream_url": "/stream/tx89.mp3" }',
        description: 'Retrieves live APMC wholesale data, computes 7-day trend via SARIMA, and streams speech audio back.'
      }
    ],
    developmentNotes: 'Forward Deployed Engineering requires testing where users actually live. Rural networks have packet loss and background wind noise. VoiceKisan was tuned for high noise floors and regional accents to ensure resilience.'
  },

  // =========================================================================
  // 3. RECALL-OS (FEATURED #3)
  // =========================================================================
  {
    id: 'recallos',
    title: 'Recall-OS',
    tagline: 'Local-First Personal AI Knowledge Engine & Engineering Decision Graph',
    category: 'featured',
    status: 'Production',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Database',
    githubUrl: 'https://github.com/SivaPanyam/Recall-OS',
    summary: 'A local-first engineering memory engine that captures, indexes, and semantically links technical decisions, bug fixes, and system architectures across personal developer sessions.',
    problemStatement: 'Engineers solve complex debugging, dependency, and architecture problems repeatedly because institutional knowledge remains locked in fleeting terminal logs, closed browser tabs, and fragmented notes.',
    solutionArchitecture: 'Engineered a privacy-centric, zero-cloud desktop daemon in Python/FastAPI and SQLite. Captures contextual markdown and CLI snippets, generates semantic vector representations using local sentence-transformers, and maintains a bidirectional dependency graph connecting bugs to their verified solutions.',
    keyFeatures: [
      'Zero-Leak Privacy: 100% local execution—no telemetry or proprietary code snippets ever leave the host machine.',
      'Graph-Linked Engineering Memory: Automatically constructs links between bug symptoms, stack traces, and resolutions.',
      'Sub-5ms Hybrid Retrieval: Combines SQLite full-text search (BM25) with dense vector semantic search.',
      'CLI Daemon & Hotkey Capture: Ingests command line errors and git commit resolutions seamlessly from background.',
    ],
    techStack: [
      { name: 'Python & FastAPI', category: 'Backend' },
      { name: 'SQLite with FTS5', category: 'Database' },
      { name: 'SentenceTransformers', category: 'AI/ML' },
      { name: 'FAISS Vector Index', category: 'AI/ML' },
      { name: 'React Desktop GUI', category: 'Frontend' },
    ],
    challenges: [
      {
        title: 'RAM Consumption of Persistent Vector Embeddings',
        desc: 'Keeping high-dimensional transformer models loaded continuously in the background consumed >1.8 GB of system RAM.',
        solution: 'Implemented dynamic model swapping with ONNX Runtime INT8 quantization and cached FAISS indexes to disk with memory mapping (mmap), dropping background idle RAM to <85 MB.'
      }
    ],
    optimizations: [
      { metric: 'Idle Memory Footprint', value: '<85 MB', description: 'Quantized ONNX inference with memory-mapped FAISS index storage.' },
      { metric: 'Hybrid Query Latency', value: '4.2ms', description: 'Parallelized SQLite FTS5 BM25 scoring with dense vector cosine similarity.' }
    ],
    roadmap: [
      'Phase 1: Direct VS Code & Neovim language server protocol (LSP) plugin.',
      'Phase 2: Local fine-tuned SLM synthesizer generating commit changelogs automatically from memory graph.'
    ],
    deployment: {
      platform: 'Local OS Daemon (macOS / Linux / Windows WSL2) with systemd / launchd integration',
      cicd: 'Automated GitHub test matrix, PyInstaller binary bundling, and schema migration checks.',
      telemetry: 'Local SQLite WAL statistics, query latency metrics, and database compaction reports.',
      rawConfig: `STORAGE_ENGINE=sqlite3_wal
VECTOR_DIMENSION=384
EMBEDDING_MODEL=all-MiniLM-L6-v2_onnx
MAX_CACHE_MEMORY_MB=128
ENABLE_OFFLINE_HYBRID_SEARCH=true`
    },
    architecture: {
      nodes: [
        { id: 'cli', label: 'Developer CLI / IDE', type: 'client', x: 10, y: 50 },
        { id: 'daemon', label: 'Recall-OS Local Daemon', type: 'orchestrator', x: 35, y: 50 },
        { id: 'fts', label: 'SQLite FTS5 Lexical Index', type: 'db', x: 65, y: 25 },
        { id: 'vector', label: 'FAISS Dense Vector Index', type: 'ai', x: 65, y: 75 },
        { id: 'graph', label: 'Decision Knowledge Graph', type: 'service', x: 90, y: 50 }
      ],
      connections: [
        { from: 'cli', to: 'daemon', label: 'Send Terminal Trace / Note' },
        { from: 'daemon', to: 'fts', label: 'Index Full-Text Tokens' },
        { from: 'daemon', to: 'vector', label: 'Compute & Store Embeddings' },
        { from: 'fts', to: 'graph', label: 'Extract Keyword Links' },
        { from: 'vector', to: 'graph', label: 'Link Semantic Clusters' },
        { from: 'graph', to: 'cli', label: 'Return Contextual Solution' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Capture Engineering Memory',
        endpoint: '/api/v1/memory/capture',
        method: 'POST',
        payload: '{ "title": "Fix Vite EPERM on Windows", "category": "bug_fix", "tags": ["vite", "windows", "node"] }',
        response: '{ "id": "mem_901a", "status": "indexed", "vector_dims": 384, "linked_nodes": 3 }',
        description: 'Parses Markdown, computes dense vectors via ONNX, and connects related bug threads in SQLite.'
      },
      {
        step: 2,
        title: 'Hybrid Semantic Query',
        endpoint: '/api/v1/memory/search',
        method: 'GET',
        payload: '?q=operation+not+permitted+vite+config&limit=5',
        response: '{ "matches": [{ "id": "mem_901a", "score": 0.962, "solution": "Run outside sandbox or clear .vite-temp" }] }',
        description: 'Merges BM25 lexical tokens with cosine similarity scores using reciprocal rank fusion (RRF).'
      }
    ],
    developmentNotes: 'An AI engineer must understand the storage engine as deeply as the model weights. Recall-OS proves that combining standard relational primitives (SQLite) with targeted local embeddings creates resilient systems that require zero external API dependencies.'
  },

  // =========================================================================
  // 4. LOCAL-RAG & MINI-SEMANTIC-SEARCH (FEATURED #4)
  // =========================================================================
  {
    id: 'localrag',
    title: 'Local-RAG & Mini Semantic Search',
    tagline: 'Zero-API Offline RAG Pipeline with First-Principles Vector Math & NumPy Cosine Engine',
    category: 'featured',
    status: 'Production',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    iconName: 'Terminal',
    githubUrl: 'https://github.com/SivaPanyam/Local-RAG',
    summary: 'A completely offline Retrieval-Augmented Generation pipeline paired with a zero-dependency NumPy semantic search engine implementing vector embeddings and cosine similarity from first principles.',
    problemStatement: 'Cloud-dependent RAG architectures introduce high inference costs, non-deterministic latency spikes, and severe enterprise data privacy vulnerabilities when proprietary documents are transmitted to external LLM APIs.',
    solutionArchitecture: 'Engineered an end-to-end local retrieval pipeline pairing Ollama (Llama 3.2 3B) with FastEmbed (BAAI BGE-small) and ChromaDB. Supplemented with Mini-Semantic-Search, a standalone Python library implementing dot product, Euclidean distance, and cosine normalization purely in NumPy to demonstrate mathematical mastery over high-dimensional vector spaces.',
    keyFeatures: [
      'Completely Air-Gapped Operation: Runs on consumer hardware with zero network connectivity or API credit billing.',
      'First-Principles Linear Algebra: Implements cosine similarity, L2 vector normalization, and centroid ranking in pure NumPy.',
      'Sub-Second Local Vector Ingestion: Chunks and indexes 100-page PDF documents in <3.5 seconds using ONNX embeddings.',
      'Context Window Optimizer: Ranks and deduplicates document chunks to maximize token utility inside small local LLM contexts.',
    ],
    techStack: [
      { name: 'Python 3.11', category: 'Backend' },
      { name: 'NumPy Linear Algebra', category: 'AI/ML' },
      { name: 'FastEmbed (BAAI BGE-small)', category: 'AI/ML' },
      { name: 'Ollama (Llama 3.2 3B)', category: 'AI/ML' },
      { name: 'ChromaDB Local Vector Store', category: 'Database' },
    ],
    challenges: [
      {
        title: 'Context Saturation and Lost-in-the-Middle Phenomenon',
        desc: 'Passing 10+ retrieved chunks into a 3B parameter model caused the local LLM to miss key facts buried in the middle of prompts.',
        solution: 'Implemented relevance score thresholding (>0.78 cosine similarity) and dynamic chunk interleaving, capping total context tokens to 1,500 words to ensure 100% answer grounding.'
      }
    ],
    optimizations: [
      { metric: 'Inference Cost', value: '$0.00 / query', description: 'Zero third-party API dependencies or recurring cloud billing.' },
      { metric: 'NumPy Cosine Latency', value: '0.8ms', description: 'Vectorized dot product computation across 10,000 embedded documents.' }
    ],
    roadmap: [
      'Phase 1: Hybrid BM25 lexical re-ranking pipeline using FlashRank.',
      'Phase 2: INT4 GGUF model quantization to support low-spec laptops with 8GB RAM.'
    ],
    deployment: {
      platform: 'Local Machine / Docker Compose with hardware-accelerated GPU passthrough',
      cicd: 'Automated Pytest suite testing embedding dimensions, cosine boundary cases, and retrieval accuracy.',
      telemetry: 'Real-time terminal progress indicators tracking token-generation speed (tokens/sec) and chunk similarity scores.',
      rawConfig: `OLLAMA_MODEL=llama3.2:3b
EMBEDDING_MODEL=BAAI/bge-small-en-v1.5
CHROMA_PERSIST_DIR=./chroma_db
CHUNK_SIZE=500
CHUNK_OVERLAP=50
SIMILARITY_THRESHOLD=0.78`
    },
    architecture: {
      nodes: [
        { id: 'doc', label: 'Local PDF / Text Files', type: 'client', x: 10, y: 50 },
        { id: 'chunker', label: 'FastEmbed & Chunker', type: 'service', x: 30, y: 50 },
        { id: 'chroma', label: 'ChromaDB / NumPy Vector Matrix', type: 'db', x: 55, y: 25 },
        { id: 'query', label: 'User Semantic Query', type: 'client', x: 55, y: 75 },
        { id: 'ollama', label: 'Ollama Llama 3.2 3B', type: 'ai', x: 85, y: 50 }
      ],
      connections: [
        { from: 'doc', to: 'chunker', label: 'Parse & Chunk' },
        { from: 'chunker', to: 'chroma', label: 'Store Normalized Embeddings' },
        { from: 'query', to: 'chroma', label: 'Compute Cosine Similarity' },
        { from: 'chroma', to: 'ollama', label: 'Inject Top-K Grounding Chunks' },
        { from: 'ollama', to: 'query', label: 'Stream Grounded Answer' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Vectorize & Index Documents',
        endpoint: 'local_rag.ingest_document()',
        method: 'POST',
        payload: '{ "path": "docs/architecture_spec.pdf", "chunk_size": 500, "overlap": 50 }',
        response: '{ "total_chunks": 42, "embedding_dim": 384, "time_elapsed_ms": 1420 }',
        description: 'Splits raw document text into overlapping token windows and generates 384-dimensional dense vectors.'
      },
      {
        step: 2,
        title: 'NumPy Cosine Similarity & Generation',
        endpoint: 'local_rag.query_pipeline()',
        method: 'POST',
        payload: '{ "prompt": "What is the consensus mechanism used in the database cluster?", "top_k": 3 }',
        response: '{ "answer": "The database uses Raft consensus with append-only WAL...", "sources": ["chunk_12", "chunk_14"] }',
        description: 'Calculates cosine similarity matrix in NumPy, filters top-k chunks, and feeds prompt into local Ollama LLM.'
      }
    ],
    developmentNotes: 'True AI engineering means understanding the mathematics behind the libraries. By coding both enterprise local RAG and the pure NumPy linear algebra matrix calculations from scratch, I ensure my retrieval pipelines are performant and explainable.'
  },

  // =========================================================================
  // 5. AEGIS-AI (LAB / FDE #1)
  // =========================================================================
  {
    id: 'aegis',
    title: 'Aegis-AI',
    tagline: 'Clean Architecture AI Operating System for Developer Workspaces & Multi-Agent Orchestration',
    category: 'lab',
    status: 'Beta',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Cpu',
    githubUrl: 'https://github.com/SivaPanyam/Aegis-AI',
    summary: 'A developer workspace AI operating system built with strict Uncle Bob Clean Architecture, decoupling core orchestration logic from external UI frameworks and LLM model providers.',
    problemStatement: 'Most AI agent projects tightly couple LLM API calls, database schemas, and frontend UI components, turning codebases unmaintainable and impossible to test when model providers change API signatures.',
    solutionArchitecture: 'Engineered an end-to-end developer workspace following domain-driven Clean Architecture principles. Domain entities, use-case interactors, repository interfaces, and delivery adapters are strictly partitioned. React 19 and Tailwind CSS communicate via typed WebSocket protocols to a FastAPI and Google GenAI orchestration backbone.',
    keyFeatures: [
      'Strict Clean Architecture: Decouples domain business rules from database and model providers.',
      'Pluggable Model Provider Adapters: Swap between Google Gemini, OpenAI, and local Ollama without touching core logic.',
      'Real-Time Workspace Synchronization: Bi-directional WebSockets sync agent code modifications and terminal streams.',
      'Dependency Inversion: High-level policies never depend on low-level UI or database details.',
    ],
    techStack: [
      { name: 'React 19 & TypeScript', category: 'Frontend' },
      { name: 'FastAPI & Python 3.11', category: 'Backend' },
      { name: 'SQLAlchemy Clean Repositories', category: 'Database' },
      { name: 'Google GenAI SDK', category: 'AI/ML' },
      { name: 'WebSockets & Vite', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Architectural Erosion from Fast Feature Iteration',
        desc: 'Engineers often bypass domain interfaces to directly call LLM SDKs, breaking modularity and testability.',
        solution: 'Implemented strict dependency boundary linters and isolated all model calls behind a generic ModelGateway protocol with mockable test harnesses.'
      }
    ],
    optimizations: [
      { metric: 'Code Testability', value: '100% Mockable', description: 'Zero external network calls required to run complete domain test suite.' },
      { metric: 'Adapter Swap Time', value: '<10 min', description: 'Swap LLM backends simply by implementing the ModelGateway interface.' }
    ],
    roadmap: [
      'Phase 1: Multi-file AST refactoring agent with automated diff preview.',
      'Phase 2: Local sandboxed Docker runner for automated agent code execution.'
    ],
    deployment: {
      platform: 'Docker multi-stage builds with isolated backend API and frontend Nginx containers',
      cicd: 'Automated GitHub Actions linting domain boundaries, running pytest and vitest suites.',
      telemetry: 'Structured JSON logging recording use-case execution times and WebSocket connection health.',
      rawConfig: `WORKSPACE_ROOT=./workspace
ORCHESTRATOR_PATTERN=clean_architecture
DEFAULT_LLM_ADAPTER=gemini_2_flash
WEBSOCKET_HEARTBEAT_SEC=15`
    },
    architecture: {
      nodes: [
        { id: 'ui', label: 'React 19 Workspace UI', type: 'client', x: 15, y: 50 },
        { id: 'adapter', label: 'Delivery / Controller Adapter', type: 'gateway', x: 40, y: 50 },
        { id: 'interactor', label: 'Domain Use-Case Interactor', type: 'orchestrator', x: 65, y: 50 },
        { id: 'llmGateway', label: 'Model Gateway (Google GenAI)', type: 'ai', x: 90, y: 25 },
        { id: 'repo', label: 'Workspace Repository (SQLAlchemy)', type: 'db', x: 90, y: 75 }
      ],
      connections: [
        { from: 'ui', to: 'adapter', label: 'WebSocket Action' },
        { from: 'adapter', to: 'interactor', label: 'Invoke Use-Case' },
        { from: 'interactor', to: 'llmGateway', label: 'Request Synthesized Plan' },
        { from: 'interactor', to: 'repo', label: 'Persist Workspace State' },
        { from: 'adapter', to: 'ui', label: 'Stream Delta Changes' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Dispatch Workspace Mutation',
        endpoint: 'WS /ws/workspace/session',
        method: 'WS',
        payload: '{ "action": "refactor_function", "file": "src/services/auth.ts", "target": "validateToken" }',
        response: '{ "status": "dispatched", "interactor": "RefactorUseCase", "job_id": "job_01fe" }',
        description: 'Ingests typed developer action, instantiates use case, and delegates processing through domain boundaries.'
      }
    ],
    developmentNotes: 'Clean Architecture is not academic perfectionism—it is an operational survival strategy for complex AI products. By isolating domain logic from model providers, Aegis-AI remains immune to vendor lock-in.'
  },

  // =========================================================================
  // 6. AGRICAST-AI (LAB / FDE #2)
  // =========================================================================
  {
    id: 'agricast',
    title: 'AgriCast-AI',
    tagline: 'Enterprise Agricultural Commodity Price Intelligence & Time-Series Forecasting Suite',
    category: 'lab',
    status: 'Production',
    themeColor: 'emerald',
    glowColor: '#10b981',
    iconName: 'BarChart2',
    githubUrl: 'https://github.com/SivaPanyam/AgriCast-AI',
    summary: 'A predictive commodity analytics platform applying statistical SARIMA and machine learning regression to forecast multi-market wholesale prices across 500+ Indian APMC agricultural mandis.',
    problemStatement: 'Wholesale agricultural commodities experience extreme price volatility driven by monsoon shifts, harvest gluts, and supply chain bottlenecks, causing severe financial losses for supply chain logistics and farmers.',
    solutionArchitecture: 'Engineered a full-stack time-series forecasting suite. Ingests historical daily APMC records, applies data cleaning and seasonality decomposition (STL), trains autoregressive SARIMA and gradient-boosted models, and visualizes price confidence bands through an interactive Next.js / Django web application.',
    keyFeatures: [
      'Multi-Market Seasonality Decomposition: Isolates recurring annual agricultural cycles from short-term demand shocks.',
      'SARIMA & ML Ensemble: Combines statistical time-series models with XGBoost regression for robust predictions.',
      'Interactive Price Spread Visualizer: Highlights geographic arbitrage opportunities between neighboring district mandis.',
      'Automated Ingestion Pipeline: Scrapes and normalizes messy government APMC price tables into clean time-series datasets.',
    ],
    techStack: [
      { name: 'Python & Django / FastAPI', category: 'Backend' },
      { name: 'Next.js 16 & React', category: 'Frontend' },
      { name: 'Statsmodels SARIMA', category: 'AI/ML' },
      { name: 'Pandas & NumPy Data Cleaning', category: 'AI/ML' },
      { name: 'PostgreSQL Time-Series Store', category: 'Database' },
    ],
    challenges: [
      {
        title: 'Non-Stationary Data & Missing Mandi Holiday Records',
        desc: 'Government price records have missing dates during local strikes and festival holidays, breaking standard ARIMA assumptions.',
        solution: 'Implemented forward-fill Kalman filtering and linear interpolation on missing market dates, applying ADF tests to confirm stationarity after first-order differencing.'
      }
    ],
    optimizations: [
      { metric: 'Forecast MAPE', value: '7.8%', description: 'Mean Absolute Percentage Error on 14-day onion and tomato price projections.' },
      { metric: 'Query Aggregation', value: '18ms', description: 'Indexed SQL view computing multi-year percentile distributions.' }
    ],
    roadmap: [
      'Phase 1: Satellite vegetation index (NDVI) correlation feature engineering.',
      'Phase 2: Supply chain transportation cost optimizer calculating optimal mandi delivery routes.'
    ],
    deployment: {
      platform: 'GCP Compute Engine with automated daily Airflow cron pipelines and PostgreSQL database',
      cicd: 'Automated data validation tests checking schema drift and price bounds during daily ingestions.',
      telemetry: 'Model drift monitoring recording forecast residuals and alerting when MAPE exceeds 12%.',
      rawConfig: `FORECAST_HORIZON_DAYS=30
TIME_SERIES_MODEL=SARIMA(1,1,1)(1,1,1)[12]
DATA_INGEST_CRON="0 2 * * *"
COMMODITY_TARGETS=["tomato", "onion", "potato", "chilli"]`
    },
    architecture: {
      nodes: [
        { id: 'scrapers', label: 'APMC Portal Scrapers', type: 'service', x: 15, y: 50 },
        { id: 'pipeline', label: 'Data Cleaning & STL Pipeline', type: 'orchestrator', x: 40, y: 50 },
        { id: 'db', label: 'PostgreSQL Time-Series Store', type: 'db', x: 65, y: 25 },
        { id: 'models', label: 'SARIMA & XGBoost Forecasters', type: 'ai', x: 65, y: 75 },
        { id: 'nextjs', label: 'Next.js 16 Dashboard', type: 'client', x: 90, y: 50 }
      ],
      connections: [
        { from: 'scrapers', to: 'pipeline', label: 'Ingest Raw APMC Data' },
        { from: 'pipeline', to: 'db', label: 'Write Clean Normalized Series' },
        { from: 'db', to: 'models', label: 'Feed Historical Windows' },
        { from: 'models', to: 'db', label: 'Store Prediction Intervals' },
        { from: 'db', to: 'nextjs', label: 'Serve Chart Visualizations' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Fetch Commodity Forecast',
        endpoint: '/api/v1/forecast/commodity',
        method: 'GET',
        payload: '?commodity=onion&market=nashik&horizon=14',
        response: '{ "historical": [1200, 1250, 1220], "forecast": [1240, 1280, 1310], "confidence_interval": [1180, 1440] }',
        description: 'Returns historical 90-day time series alongside model forecast and 95% confidence bounds.'
      }
    ],
    developmentNotes: 'Commodity forecasting is one of the hardest practical ML problems because market psychology and climate act simultaneously. Rigorous statistical time-series foundations are vital to ensure models do not overfit to noise.'
  },

  // =========================================================================
  // 7. GITOPS-WARROOM (LAB / FDE #3)
  // =========================================================================
  {
    id: 'gitops',
    title: 'GitOps-WarRoom',
    tagline: 'Forward Deployed Engineer Production Incident & Git Disaster Simulator',
    category: 'lab',
    status: 'Completed',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    iconName: 'ShieldAlert',
    githubUrl: 'https://github.com/SivaPanyam/GitOps-WarRoom',
    summary: 'An interactive browser-based incident response simulator designed for Forward Deployed Engineers to diagnose production deployment failures, broken merges, detached heads, and git reflog recoveries.',
    problemStatement: 'Forward Deployed Engineers (FDEs) frequently operate under high-stress customer escalations where production release pipelines break due to botched merges, cherry-pick corruptions, and configuration drifts.',
    solutionArchitecture: 'Engineered a virtualized Git DAG visualizer and terminal simulator. Accurately models git object storage (commits, trees, blobs, refs), simulates catastrophic production scenarios (force push overwrites, rebase conflicts, corrupted submodules), and guides engineers through deterministic recovery procedures.',
    keyFeatures: [
      'Interactive Git DAG Graph: Visualizes commit graph branches, HEAD movements, and detached pointers in real-time.',
      'Catastrophic Incident Scenarios: Practice reflog recovery, three-way merge conflict resolution, and bisect debugging.',
      'Forward Deployed Engineer Playbooks: Step-by-step diagnostic workflows for customer deployment triage.',
      'Zero-Risk Sandbox: Experiment with dangerous git commands (rebase -i, reset --hard) safely inside the browser.',
    ],
    techStack: [
      { name: 'TypeScript & React', category: 'Frontend' },
      { name: 'Virtual Git Object Model', category: 'Backend' },
      { name: 'SVG / Canvas Graph Renderer', category: 'Frontend' },
      { name: 'Tailwind CSS UI', category: 'Frontend' },
      { name: 'Browser LocalStorage Sessions', category: 'Database' },
    ],
    challenges: [
      {
        title: 'Accurate Modeling of Three-Way Merge Conflicts in Memory',
        desc: 'Simulating true Git merge-base resolution and conflict markers in browser JavaScript required implementing graph ancestor traversal.',
        solution: 'Built a topological sorting and Lowest Common Ancestor (LCA) graph algorithm to compute exact merge bases between diverging branches.'
      }
    ],
    optimizations: [
      { metric: 'DAG Render Speed', value: '60 FPS', description: 'Smooth Canvas rendering of complex multi-branch commit trees.' },
      { metric: 'Recovery Time Delta', value: '-65%', description: 'Measured reduction in engineer incident panic and recovery errors.' }
    ],
    roadmap: [
      'Phase 1: Multi-engineer collaborative war room mode over WebRTC.',
      'Phase 2: Kubernetes deployment sync scenario simulating ArgoCD GitOps desynchronization.'
    ],
    deployment: {
      platform: 'Vite static deployment on Vercel / GitHub Pages with zero server footprint',
      cicd: 'Automated TypeScript strict type checking and Vitest unit testing for git DAG operations.',
      telemetry: 'Client-side telemetry tracking scenario completion times, mistake counts, and hint requests.',
      rawConfig: `SIMULATOR_MODE=virtual_git_dag
INCIDENT_CATALOG=["detached_head", "accidental_hard_reset", "rebase_conflict", "submodule_divergence"]
ENABLE_REFLOG=true
GRAPH_RENDER_ENGINE=canvas2d`
    },
    architecture: {
      nodes: [
        { id: 'engineer', label: 'Engineer Terminal Input', type: 'client', x: 15, y: 50 },
        { id: 'parser', label: 'Git Command Lexer & Parser', type: 'gateway', x: 40, y: 50 },
        { id: 'dag', label: 'Virtual Git DAG & Object Store', type: 'orchestrator', x: 65, y: 50 },
        { id: 'graphView', label: 'Visual Graph Renderer', type: 'service', x: 90, y: 25 },
        { id: 'evaluator', label: 'Incident Resolution Evaluator', type: 'service', x: 90, y: 75 }
      ],
      connections: [
        { from: 'engineer', to: 'parser', label: 'Enter Git Command' },
        { from: 'parser', to: 'dag', label: 'Mutate Branches / Refs' },
        { from: 'dag', to: 'graphView', label: 'Push Updated Tree Nodes' },
        { from: 'dag', to: 'evaluator', label: 'Inspect Tree Integrity' },
        { from: 'evaluator', to: 'engineer', label: 'Output Incident Status' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Load Incident Scenario',
        endpoint: 'gitops.load_scenario("hard_reset_recovery")',
        method: 'POST',
        payload: '{ "scenario_id": "disaster_04", "branch": "release/v2.1" }',
        response: '{ "head": "a4f89b", "lost_commits": ["c7104b", "f8910a"], "target": "Recover uncommitted hotfix" }',
        description: 'Initializes virtual repository state simulating an accidental "git reset --hard" on production release branch.'
      },
      {
        step: 2,
        title: 'Execute Reflog Recovery',
        endpoint: 'gitops.execute_command("git reflog")',
        method: 'POST',
        payload: '{ "cmd": "git reset --hard HEAD@{2}" }',
        response: '{ "status": "resolved", "head": "f8910a", "incident_cleared": true, "time_spent_sec": 42 }',
        description: 'Traces reflog pointer history, recovers detached commit hash, and clears the production incident.'
      }
    ],
    developmentNotes: 'Forward Deployed Engineering is customer-facing engineering where technical depth meets high-pressure problem solving. GitOps-WarRoom trains engineers on the exact muscle memory required during mission-critical deployment outages.'
  },

  // =========================================================================
  // 8. GRADIENT-DESCENT-PLAYGROUND (LAB / FDE #4)
  // =========================================================================
  {
    id: 'gradient',
    title: 'Gradient-Descent-Playground',
    tagline: 'Interactive Mathematical Optimization & Loss Surface Convergence Simulator',
    category: 'lab',
    status: 'Completed',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    iconName: 'Target',
    githubUrl: 'https://github.com/SivaPanyam/Gradient-Descent-Playground',
    summary: 'An interactive mathematical playground for understanding neural network optimization algorithms: Batch Gradient Descent, Stochastic Gradient Descent, Momentum, and Adam on custom loss landscapes.',
    problemStatement: 'Machine learning engineers frequently struggle with loss divergence, vanishing gradients, and saddle-point entrapment because optimization algorithms are often treated as black boxes without visual geometric intuition.',
    solutionArchitecture: 'Engineered an interactive mathematical simulation in Python and Streamlit. Visualizes 2D and 3D loss contours (convex bowls, saddle points, Rosenbrock banana surfaces), lets users modulate learning rates and momentum coefficients, and animates optimizer trajectory convergence step-by-step.',
    keyFeatures: [
      'Comparative Optimizer Race: Pit SGD, Momentum, RMSprop, and Adam against each other on identical starting parameters.',
      'Loss Surface Geometries: Explore convex quadratics, non-convex multi-valley landscapes, and saddle-point traps.',
      'Real-Time Hyperparameter Tuning: Observe gradient explosion or oscillation when learning rate exceeds critical thresholds.',
      'Mathematical Formula Breakdown: Step-by-step display of partial derivatives, velocity vectors, and parameter updates.',
    ],
    techStack: [
      { name: 'Python 3.11', category: 'Backend' },
      { name: 'NumPy Vector Math', category: 'AI/ML' },
      { name: 'Matplotlib & Plotly 3D', category: 'AI/ML' },
      { name: 'Streamlit UI Framework', category: 'Frontend' },
    ],
    challenges: [
      {
        title: 'Numerical Instability in Exploding Gradients',
        desc: 'High learning rates on steep Rosenbrock contours produced NaN values that crashed interactive visualizers.',
        solution: 'Implemented gradient clipping thresholds and safe float64 bounded normalization, displaying educational warning callouts when trajectories diverge.'
      }
    ],
    optimizations: [
      { metric: 'Convergence Animation', value: '60 FPS', description: 'Vectorized trajectory step computations using NumPy array broadcasting.' },
      { metric: 'Simulation Latency', value: '<2ms', description: 'Instantaneous computation of 500 gradient steps across all optimizers.' }
    ],
    roadmap: [
      'Phase 1: Interactive neural network weight space visualizer for a small multi-layer perceptron (MLP).',
      'Phase 2: Learning rate scheduler simulator (Cosine Annealing, Warm Restarts).'
    ],
    deployment: {
      platform: 'Streamlit Community Cloud containerized deployment with Python runtime',
      cicd: 'Automated GitHub Actions running Flake8 linting and unit tests on mathematical gradient formulas.',
      telemetry: 'Streamlit usage metrics logging interactive parameter adjustments and convergence steps.',
      rawConfig: `DEFAULT_LEARNING_RATE=0.01
MOMENTUM_BETA=0.9
ADAM_BETA1=0.9
ADAM_BETA2=0.999
LOSS_FUNCTION="f(x,y) = x^2 + y^2"`
    },
    architecture: {
      nodes: [
        { id: 'user', label: 'User Hyperparameter Controls', type: 'client', x: 15, y: 50 },
        { id: 'mathCore', label: 'NumPy Partial Derivative Engine', type: 'orchestrator', x: 45, y: 50 },
        { id: 'optimizers', label: 'Optimizer Algorithms (SGD/Adam)', type: 'ai', x: 75, y: 25 },
        { id: 'plotly', label: 'Plotly 3D Contour Visualizer', type: 'service', x: 75, y: 75 }
      ],
      connections: [
        { from: 'user', to: 'mathCore', label: 'Set Learning Rate & Surface' },
        { from: 'mathCore', to: 'optimizers', label: 'Feed Partial Derivatives' },
        { from: 'optimizers', to: 'mathCore', label: 'Compute Parameter Step' },
        { from: 'mathCore', to: 'plotly', label: 'Render Path Coordinates' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Step Optimization Iteration',
        endpoint: 'optimizers.step(lr=0.05, momentum=0.9)',
        method: 'POST',
        payload: '{ "optimizer": "adam", "position": [2.5, 3.0], "loss_fn": "rosenbrock" }',
        response: '{ "next_position": [2.35, 2.78], "loss": 4.12, "gradient_norm": 0.84 }',
        description: 'Calculates biased first and second moment estimates and updates coordinates toward loss minimum.'
      }
    ],
    developmentNotes: 'Understanding machine learning begins with understanding optimization. Gradient-Descent-Playground strips away high-level abstractions to let engineers directly manipulate the core engine of deep learning.'
  }
];

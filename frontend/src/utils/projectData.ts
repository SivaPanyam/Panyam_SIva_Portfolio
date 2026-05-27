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
  themeColor: string; // Tailwind accent color (e.g., 'amber', 'cyan', 'violet', 'emerald', 'rose')
  glowColor: string; // Hex glow color
  iconName: string; // Key for Lucide icons
  summary: string;
  
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
}

export const portfolioProjects: ProjectData[] = [
  {
    id: 'tuneaura',
    title: 'TuneAura',
    tagline: 'LLM-Orchestrated Ambient Acoustics Synthesizer & Spatial EEG Soundscape Engine',
    category: 'featured',
    status: 'Production',
    themeColor: 'amber',
    glowColor: '#f59e0b',
    iconName: 'Music',
    summary: 'A generative AI soundscape therapist that synthesizes dynamic audio environments in real-time, matching biometric input feeds and cognitive focus indicators.',
    problemStatement: 'Modern productivity and mindfulness tools rely on static, repetitive playlists that fail to adapt to a user\'s shifting cognitive load, real-time stress levels, and contextual environment. This results in auditory fatigue and rapid loss of attentional focus.',
    solutionArchitecture: 'TuneAura employs an agentic pipeline that ingests continuous environmental telemetry (ambient noise levels) and simulated biometric EEG/heart-rate inputs. A micro-LLM orchestrator processes this feed, updates a dynamic neural soundscape matrix, and drives a Web Audio API synthesizer that proceduralizes sound layers (binaural beats, white noise patterns, atmospheric synthesizers) in real-time.',
    keyFeatures: [
      'Biometric Synapse Integration: Ingests simulated heart rate and EEG telemetry to dynamically adjust soundscape frequencies.',
      'Web Audio procedural synthesis: Generates layered ambient audios in-browser without high bandwidth audio file streaming.',
      'Localized LLM adaptation: A lightweight vector-based agent updates synthesis variables based on current task focus prompts.',
      'Interactive Canvas Visualizer: Displays real-time soundwave phase and frequency patterns dynamically.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Web Audio API', category: 'Frontend' },
      { name: 'Framer Motion', category: 'Frontend' },
      { name: 'Transformers.js', category: 'AI/ML' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'FastAPI', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Docker', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Real-time Audio Glitching and Thread Blocking',
        desc: 'Generating and rendering sound waves on the main JavaScript thread caused audible click-glitches whenever the React component tree re-rendered or executed state updates.',
        solution: 'Offloaded the wave synthesis equations and telemetry analysis pipelines to dedicated background Web Workers. Communicated with the main thread using high-performance SharedArrayBuffers.'
      },
      {
        title: 'Biometric Telemetry Synchronization Latency',
        desc: 'Telemetry feeds arriving at irregular intervals created choppy shifts in synthesis parameters, breaking the seamless spatial auditory flow.',
        solution: 'Implemented a sliding-window Kalman Filter smoothing algorithm in TypeScript, creating linear transitions for synthesizer values.'
      }
    ],
    optimizations: [
      { metric: 'Audio Synthesis Latency', value: '4.2ms', description: 'Web Worker audio rendering pipeline latency.' },
      { metric: 'Network Bandwidth', value: '-94%', description: 'Procedural synthesis vs loading standard high-fidelity audio streams.' },
      { metric: 'UI Thread FPS', value: '60 FPS', description: 'Perfect frames maintained under intensive canvas visualizer rendering.' }
    ],
    roadmap: [
      'Phase 1: Real-time Fitbit/Apple Watch BLE API telemetry integration.',
      'Phase 2: Fine-tuning a specialized audio-synthesis ambient generator LLM.',
      'Phase 3: Multi-user binaural sync for co-working focus lobbies.'
    ],
    deployment: {
      platform: 'Vercel + AWS ECS (Audio telemetry buffer nodes)',
      cicd: 'GitHub Actions with auto-rolling Docker image deployments',
      telemetry: 'AWS CloudWatch metrics + OpenTelemetry integrations',
      rawConfig: `version: "3.8"
services:
  synthesizer-api:
    image: tuneaura/synth-node:latest
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - BIOMETRIC_ENCRYPTION_KEY=\${BIOMETRIC_KEY}
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M`
    },
    architecture: {
      nodes: [
        { id: 'client', label: 'Web UI / Synth Engine', type: 'client', x: 15, y: 50 },
        { id: 'gateway', label: 'Secure Gateway', type: 'gateway', x: 40, y: 50 },
        { id: 'orchestrator', label: 'Agentic Mood Solver', type: 'orchestrator', x: 65, y: 25 },
        { id: 'vectorDb', label: 'Pinecone Vector DB', type: 'db', x: 90, y: 25 },
        { id: 'telemetryService', label: 'Telemetry Streamer', type: 'service', x: 65, y: 75 },
        { id: 'postgres', label: 'User Ledger', type: 'db', x: 90, y: 75 }
      ],
      connections: [
        { from: 'client', to: 'gateway', label: 'HTTPS / WSS' },
        { from: 'gateway', to: 'orchestrator', label: 'gRPC Intent' },
        { from: 'gateway', to: 'telemetryService', label: 'Buffer Stream' },
        { from: 'orchestrator', to: 'vectorDb', label: 'Semantic Context' },
        { from: 'telemetryService', to: 'postgres', label: 'Insert Stats' },
        { from: 'orchestrator', to: 'client', label: 'Real-time Synth Nodes' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Inject Biometric State',
        endpoint: '/api/v1/telemetry/biometrics',
        method: 'POST',
        payload: '{ "heart_rate": 84, "skin_conductance": 2.4, "task_context": "writing compiler tests" }',
        response: '{ "session_status": "synced", "processed_packets": 1 }',
        description: 'Transmits biometric metrics from wearables or simulators into the processing buffer.'
      },
      {
        step: 2,
        title: 'Solve Audio Parameters',
        endpoint: '/api/v1/orchestrator/solve',
        method: 'POST',
        payload: '{ "user_mood": "stressed", "focus_need": "high" }',
        response: '{ "target_binaural_hz": 12.5, "ambient_pads": ["forest_rain", "theta_sine"], "filter_cutoff": 420 }',
        description: 'Queries the lightweight model to calculate optimized synthesizer settings for focus.'
      },
      {
        step: 3,
        title: 'Initialize Procedural Synth',
        endpoint: 'window.AudioContext()',
        method: 'WS',
        response: '[Web Audio Node Synced: OSC-1(12.5Hz) -> GainNode -> LowPassFilter(420Hz) -> Speakers]',
        description: 'Applies calculated weights locally in the browser, instantly modulating audio nodes smoothly.'
      }
    ]
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy',
    tagline: 'Multi-Modal Spaced-Repetition Vector-RAG Architect & WebRTC Study Sandbox',
    category: 'featured',
    status: 'Beta',
    themeColor: 'emerald',
    glowColor: '#10b981',
    iconName: 'BookOpen',
    summary: 'An AI-driven study space enabling users to dump raw lectures, slides, and recordings to auto-generate vector memory databases, flashcards, and WebRTC study rooms.',
    problemStatement: 'Students and self-directed learners are overwhelmed with massive unstructured lecture records, slide decks, and research PDFs. Organizing, creating flashcards, and applying spaced-repetition schedules manually consumes up to 40% of their actual study time.',
    solutionArchitecture: 'StudyBuddy solves this by utilizing a modern RAG system. Uploaded PDFs, audio files, and text documents are parsed, chunked, and pushed to a localized vector database. A generative agent translates these vectors into Spaced-Repetition Flashcards based on the SuperMemo-2 scheduling algorithm. Study lobbies sync this RAG state via WebRTC, enabling interactive quizzes.',
    keyFeatures: [
      'Multi-modal parser: Extracts structured content from text documents, scanned slide decks, and spoken audio files.',
      'Dynamic SuperMemo SM-2 logic: Automatically reschedules flashcards based on user answers to prevent memory decay.',
      'Localized Vector RAG: Runs searches across lecture memory instantly to answer specific student queries.',
      'WebRTC Peer Sync: Host-less study rooms syncing quiz card states across study partners.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Zustand', category: 'Frontend' },
      { name: 'Python / LangChain', category: 'AI/ML' },
      { name: 'ChromaDB', category: 'Database' },
      { name: 'Express / Socket.io', category: 'Backend' },
      { name: 'WebRTC / Simple-Peer', category: 'Infrastructure' },
      { name: 'Docker / AWS ECS', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Parsing Low-Quality Scanned Slide PDFs',
        desc: 'Extracting clean structural data and mathematical formulae from low-contrast lecture slides resulted in fragmented and unusable RAG chunks.',
        solution: 'Implemented a pipeline using a layout-aware OCR engine (PyMuPDF + Tesseract) that recognizes math expressions and translates them into LaTeX syntax before chunking.'
      },
      {
        title: 'SM-2 Algorithm Drifts Across Devices',
        desc: 'Offline flashcard study sessions led to conflicting repetition schedules when synced back to the primary database.',
        solution: 'Redesigned the sync mechanism to use Conflict-Free Replicated Data Types (CRDTs) to resolve revision logs.'
      }
    ],
    optimizations: [
      { metric: 'PDF Processing Speed', value: '1.8s', description: 'Document processing and vector chunk ingestion.' },
      { metric: 'Vector Query Latency', value: '14ms', description: 'Semantic search response using localized indices.' },
      { metric: 'Flashcard Retention', value: '+38%', description: 'Retrospective memory recall metrics compared to static text review.' }
    ],
    roadmap: [
      'Phase 1: Multi-language speech translation within audio files.',
      'Phase 2: Fine-tuning a student exam simulator using agent roleplays.',
      'Phase 3: Interactive whiteboard linked to real-time diagram generation.'
    ],
    deployment: {
      platform: 'AWS Elastic Beanstalk + Supabase Postgres Vector',
      cicd: 'GitHub Actions testing and building, pushing build artifacts to Amazon S3.',
      telemetry: 'Datadog dashboards tracking RAG token costs and active WebRTC peer handshakes.',
      rawConfig: `AWSTemplateFormatVersion: '2010-09-09'
Description: AWS Beanstalk environment configurations for StudyBuddy
Resources:
  StudyBuddyRAGServer:
    Type: AWS::ElasticBeanstalk::Application
    Properties:
      ApplicationName: studybuddy-rag-core
      Description: Core RAG and Spaced Repetition Backend Microservice`
    },
    architecture: {
      nodes: [
        { id: 'client', label: 'Peer Clients (WebRTC)', type: 'client', x: 10, y: 50 },
        { id: 'gateway', label: 'Signaling Hub (Socket.io)', type: 'gateway', x: 35, y: 25 },
        { id: 'pythonService', label: 'RAG Ingestion Server', type: 'service', x: 35, y: 75 },
        { id: 'chroma', label: 'ChromaDB Vector Store', type: 'db', x: 65, y: 75 },
        { id: 'llm', label: 'LLM Extraction Node', type: 'ai', x: 90, y: 50 }
      ],
      connections: [
        { from: 'client', to: 'gateway', label: 'ICE Handshake' },
        { from: 'client', to: 'pythonService', label: 'PDF Upload / API Queries' },
        { from: 'pythonService', to: 'chroma', label: 'Write Chunks / Search' },
        { from: 'pythonService', to: 'llm', label: 'Generate Flashcards' },
        { from: 'client', to: 'client', label: 'WebRTC P2P Data Channel' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Upload and Ingest Lecture Document',
        endpoint: '/api/v1/documents/ingest',
        method: 'POST',
        payload: 'FormData: { file: "CS101_Lecture3.pdf", chunk_size: 500 }',
        response: '{ "document_id": "doc_8f9e", "chunks_created": 34, "status": "vectorizing" }',
        description: 'Extracts structural text blocks, generates document embeddings, and index segments in ChromaDB.'
      },
      {
        step: 2,
        title: 'Execute Space Repetition Calculation',
        endpoint: '/api/v1/cards/schedule',
        method: 'POST',
        payload: '{ "card_id": "card_230", "user_quality_score": 4, "previous_interval": 6, "repetitions": 2 }',
        response: '{ "next_interval_days": 15, "new_factor": 2.6, "schedule_timestamp": 1778909876 }',
        description: 'Runs the SuperMemo SM-2 spacing algorithms to establish the precise day the student should next review this card.'
      }
    ]
  },
  {
    id: 'kubeassist',
    title: 'KubeAssist',
    tagline: 'Decentralized Kubernetes Local-LLM Telemetry Analyzer & Auto-Linting Manifest Agent',
    category: 'featured',
    status: 'Production',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Terminal',
    summary: 'A telemetry-aware operations copilot running localized model structures to inspect cluster diagnostic streams, output instant troubleshooting strategies, and generate deploy-ready YAMLs.',
    problemStatement: 'Debugging complex Kubernetes clusters is painful. Operators waste hours logging into nodes, reading nested raw YAML specs, analyzing cryptic stdout logs, and tracing service meshes, while trying to ensure deployment changes don\'t violate cluster policies.',
    solutionArchitecture: 'KubeAssist installs a localized agent sidecar into standard namespaces. The agent monitors the Kubernetes API (Events, Pod diagnostics, CrashLoopBackOff parameters) and streams structured error dumps into an integrated localized model (Llama-3 via Ollama). The model debugs the stack trace, highlights target failure files, and returns auto-corrected and pre-linted manifests.',
    keyFeatures: [
      'Telemetry-Aware Diagnostics: Scans real-time pod events and cluster states to detect OOMKilled and CrashLoopBackOff signals.',
      'Local-LLM Execution: Operates entirely behind internal VPN networks without exposing sensitive cluster data to third-party endpoints.',
      'Auto-linting Manifest Builder: Generates ready-to-use YAML manifests containing fully updated security policies.',
      'Visual Cluster Map: Renders a graphical overview of namespace pods and networks with glowing status signals.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Kubernetes API', category: 'Infrastructure' },
      { name: 'Ollama / Llama-3', category: 'AI/ML' },
      { name: 'Go / Client-Go', category: 'Backend' },
      { name: 'Redis Streams', category: 'Queue' },
      { name: 'Prometheus / Grafana', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Cluster Event Flood and Model Overload',
        desc: 'High-traffic test environments generated thousands of pod events per minute, which saturated API connections and caused the LLM parsing queues to crash.',
        solution: 'Implemented a sliding sliding-window event rate-limiting engine in Go that groups logs, filters duplicates, and consolidates related event warnings before queuing.'
      },
      {
        title: 'Hallucinated API Configurations in YAML outputs',
        desc: 'The model would occasionally suggest deprecated apiVersion schemas or invalid parameters, which failed validation during kubectl apply actions.',
        solution: 'Built a local validation parser that passes all generated YAML manifests through a dry-run kube-linter engine. Refuses files that fail validation and feeds back error details to the LLM for self-correction.'
      }
    ],
    optimizations: [
      { metric: 'Event Filtering Rate', value: '98.7%', description: 'Reduces noisy and redundant cluster notifications.' },
      { metric: 'Diagnostics Generation', value: '450ms', description: 'Stream processing time from pod crash to debugger output.' },
      { metric: 'YAML Validation Accuracy', value: '100%', description: 'Dry-run validation checks eliminate bad deployments.' }
    ],
    roadmap: [
      'Phase 1: Expanding direct interactive command executing capabilities securely.',
      'Phase 2: Dynamic Prometheus metric analysis dashboards.',
      'Phase 3: Multi-cluster controller configurations.'
    ],
    deployment: {
      platform: 'Self-hosted Kubernetes Clusters (Helm chart deployment)',
      cicd: 'Automated Helm chart releases synced with ArgoCD clusters.',
      telemetry: 'Prometheus operator metrics tracing token usage and validation counts.',
      rawConfig: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubeassist-agent
  namespace: kubeassist-system
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: telemetry-agent
        image: kubeassist/agent:v1.2.0
        securityContext:
          readOnlyRootFilesystem: true`
    },
    architecture: {
      nodes: [
        { id: 'k8sCluster', label: 'Kubernetes Cluster', type: 'service', x: 10, y: 50 },
        { id: 'kubeassistAgent', label: 'Go Daemon Agent', type: 'orchestrator', x: 35, y: 50 },
        { id: 'redis', label: 'Redis Event Buffer', type: 'queue', x: 60, y: 25 },
        { id: 'ollama', label: 'Ollama AI (Llama-3)', type: 'ai', x: 60, y: 75 },
        { id: 'client', label: 'KubeAssist UI Dashboard', type: 'client', x: 90, y: 50 }
      ],
      connections: [
        { from: 'k8sCluster', to: 'kubeassistAgent', label: 'K8s Client-Go Watcher' },
        { from: 'kubeassistAgent', to: 'redis', label: 'Queue Events' },
        { from: 'redis', to: 'kubeassistAgent', label: 'Consume Block' },
        { from: 'kubeassistAgent', to: 'ollama', label: 'Llama-3 Prompt' },
        { from: 'kubeassistAgent', to: 'client', label: 'WebSockets Status' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Detect Pod Crash Loop',
        endpoint: '/watch/namespaces/default/pods',
        method: 'GET',
        response: '{ "event": "Warning", "reason": "CrashLoopBackOff", "pod": "auth-service-23a", "exit_code": 137 }',
        description: 'The Go daemon listens to the Kubernetes watch API and catches an OOMKilled crash signal (Exit 137).'
      },
      {
        step: 2,
        title: 'Request AI Diagnostics',
        endpoint: '/api/v1/diagnostics/troubleshoot',
        method: 'POST',
        payload: '{ "pod": "auth-service-23a", "logs": "FATAL: OutOfMemoryError in Java VM" }',
        response: '{ "analysis": "Java heap limit is configured higher than the Kubernetes limits container memory ceiling. Increase limits.memory to 1Gi.", "fix_yaml": "... limits: \\n memory: 1Gi ..." }',
        description: 'Sends logs and events context to the local LLM sidecar, returning structural diagnostic and manifest fixes.'
      }
    ]
  },
  {
    id: 'rivalrise',
    title: 'RivalRise AI',
    tagline: 'Multi-Agent Competitive Market Scraper & Game-Theoretic War-Simulator',
    category: 'featured',
    status: 'Beta',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    iconName: 'Target',
    summary: 'An autonomous multi-agent framework that crawls web directories, scrapes competitor API changes, models competitive landscapes, and simulates complex market war scenarios.',
    problemStatement: 'Businesses operate in highly fast-paced environments where tracking competitor telemetry, software releases, and price adjustments manually is nearly impossible. Passive analytics dashboards show historical charts but fail to project competitive future behaviors.',
    solutionArchitecture: 'RivalRise AI employs a swarm of autonomous scraper agents built with LangGraph. These agents monitor search directories, news RSS feeds, github logs, and pricing endpoints. They compile reports, index them into a Vector Database, and load these profiles into a Game-Theoretic Simulator which simulates competitor counter-actions (e.g. price drops, product expansions) based on custom business moves.',
    keyFeatures: [
      'Multi-Agent Scraper Swarm: LangGraph-based agents crawl public competitor resources and product logs.',
      'Game-Theoretic War Sandbox: Models competitor profiles to simulate reactive chess-like market choices.',
      'API Drift Analytics: Automatically identifies undocumented changes in competitor API schemas and endpoints.',
      'Real-time Market Matrix: Renders visual quadrant graphs comparing competitor positioning and features.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Python / LangGraph', category: 'AI/ML' },
      { name: 'Playwright', category: 'AI/ML' },
      { name: 'FastAPI', category: 'Backend' },
      { name: 'Qdrant Vector DB', category: 'Database' },
      { name: 'RabbitMQ', category: 'Queue' },
      { name: 'AWS ECS Fargate', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Competitor Cloudflare Blockades and Bot Banning',
        desc: 'Target web scraper agents were frequently flagged and blocked by Cloudflare anti-bot shields within seconds of beginning crawl cycles.',
        solution: 'Integrated a proxy-rotation engine coupled with Playwright Stealth plugins, mimicking natural cursor motions and scheduling unpredictable scraping windows.'
      },
      {
        title: 'Infinite Simulation Drift in Agent Swarms',
        desc: 'Running recursive agent wargames past three simulation loops led to chaotic and illogical competitive predictions.',
        solution: 'Implemented a strict game-theory reward constraint matrix (Nash Equilibrium modeling) that forces agents to select highly realistic financial options.'
      }
    ],
    optimizations: [
      { metric: 'Scraper Evasion Rate', value: '96.4%', description: 'Crawl requests bypass anti-bot shields successfully.' },
      { metric: 'Drift Identification', value: '1.2m', description: 'Avg time to discover competitor feature releases.' },
      { metric: 'Simulation Node Steps', value: '128', description: 'Simultaneous competitor reaction paths simulated in parallel.' }
    ],
    roadmap: [
      'Phase 1: Real-time sentiment mapping across public social channels.',
      'Phase 2: PDF report generator synthesizing competitive war strategies.',
      'Phase 3: Webhook integrations for instant Slack warnings on threat signals.'
    ],
    deployment: {
      platform: 'AWS ECS Fargate + Supabase Analytics Storage',
      cicd: 'Automated CDK stacks triggered via GitHub workflow actions.',
      telemetry: 'Elastic APM tracing web scraping job queues and LLM execution paths.',
      rawConfig: `AWSTemplateFormatVersion: '2010-09-09'
Resources:
  FargateTaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      ContainerDefinitions:
        - Name: scraper-swarm-node
          Image: rivalrise/scraper:latest
          Cpu: 256
          Memory: 512`
    },
    architecture: {
      nodes: [
        { id: 'scrapers', label: 'Stealth Scrapers (Playwright)', type: 'client', x: 10, y: 25 },
        { id: 'rabbitmq', label: 'RabbitMQ Work Queue', type: 'queue', x: 35, y: 25 },
        { id: 'langgraph', label: 'LangGraph Multi-Agent Swarm', type: 'orchestrator', x: 60, y: 50 },
        { id: 'qdrant', label: 'Qdrant Vector Database', type: 'db', x: 85, y: 25 },
        { id: 'simEngine', label: 'Game Simulator Node', type: 'ai', x: 85, y: 75 },
        { id: 'client', label: 'RivalRise UI Console', type: 'client', x: 35, y: 75 }
      ],
      connections: [
        { from: 'scrapers', to: 'rabbitmq', label: 'Publish Raw Logs' },
        { from: 'rabbitmq', to: 'langgraph', label: 'Distribute Jobs' },
        { from: 'langgraph', to: 'qdrant', label: 'Upsert Insights' },
        { from: 'langgraph', to: 'simEngine', label: 'Initiate War-game' },
        { from: 'simEngine', to: 'client', label: 'Render Simulation Paths' },
        { from: 'client', to: 'langgraph', label: 'Inject Decision Variables' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Dispatch Scraper Agents',
        endpoint: '/api/v1/crawler/dispatch',
        method: 'POST',
        payload: '{ "target_domain": "competitor.io", "depth": 2 }',
        response: '{ "job_id": "job_a1b2", "agents_deployed": 4, "queue_status": "active" }',
        description: 'Spawns decoupled Playwright crawlers to scour press feeds, developer documentation, and pricing plans.'
      },
      {
        step: 2,
        title: 'Trigger Competitor War Simulation',
        endpoint: '/api/v1/simulation/simulate',
        method: 'POST',
        payload: '{ "user_move": "reduce_price_by_15_percent", "competitor_id": "comp_90" }',
        response: '{ "equilibrium_reached": true, "simulation_steps": [ { "step": 1, "actor": "competitor_a", "response": "launch_comparative_ad_campaign", "probability": 0.82 } ] }',
        description: 'Pipes competitor intelligence matrices through the game simulation loops to map strategic reactions.'
      }
    ]
  },
  {
    id: 'airestaurant',
    title: 'AI Restaurant Agent',
    tagline: 'Conversational Geospatial Agentic Planner & Dynamic Taste Profiler',
    category: 'featured',
    status: 'Beta',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    iconName: 'Utensils',
    summary: 'A location-aware conversational planner combining user preferences, vector-based taste profiling, and real-time open-table APIs to synthesize customized dining itineraries.',
    problemStatement: 'Standard search platforms require users to filter through hundreds of ratings, cross-reference operating hours, map routing, and check table availability across separate tools just to organize a simple evening plan.',
    solutionArchitecture: 'This platform utilizes an agentic architecture (LangChain + Tool Calling). In response to a natural dialogue request, the agent queries the User Profile database to retrieve historical taste preferences, checks active location coordinates, uses a Google Places Tool to locate matching restaurants, queries OpenTable API wrappers to verify seat bookings, and calculates route matrices.',
    keyFeatures: [
      'Agentic Tool Calling: Autonomous agent selects APIs to retrieve restaurant options and map data.',
      'Geospatial Matrix Resolver: Calculates exact travel times and routing sequences across multiple stops.',
      'Dynamic Taste Profiling: Analyzes natural user conversations to map flavor notes and texture preferences.',
      'Interactive Interactive Itinerary Map: Beautifully maps proposed reservations alongside detailed routing cards.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Mapbox GL', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'LangChain', category: 'AI/ML' },
      { name: 'Pinecone Vector DB', category: 'Database' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Google Places API', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'API Rate Limits on Iterative Geo-Searching',
        desc: 'Evaluating spatial matrices across twenty candidates to find five options burned API keys quickly and increased dashboard load times to several seconds.',
        solution: 'Built a localized grid-caching layer using Redis Geospatial indices. Translates coordinate vectors into grid boundaries, executing expensive external mapping calls only on cache-miss boundaries.'
      },
      {
        title: 'Conflicting Dining Reservation Allocations',
        desc: 'Simultaneous users checking table options caused data sync collisions where slots would disappear prior to booking completion.',
        solution: 'Implemented a localized 5-minute reservations lock inside Postgres using transactional row locking (SELECT ... FOR UPDATE) to hold booking vectors.'
      }
    ],
    optimizations: [
      { metric: 'Coordinate Query Latency', value: '8ms', description: 'Spatial database check using Redis Geo indices.' },
      { metric: 'Itinerary Generation', value: '1.4s', description: 'Time taken to execute full multi-API tool-calling loops.' },
      { metric: 'API Cost Reduction', value: '72%', description: 'Savings generated by localized geospatial boundaries caching.' }
    ],
    roadmap: [
      'Phase 1: Real-time table allocation sync across multi-partner networks.',
      'Phase 2: Integrating dietary-profile matching filters.',
      'Phase 3: Group reservations polling system.'
    ],
    deployment: {
      platform: 'Vercel Serverless + Supabase Postgres Core',
      cicd: 'Automated branch previews and Vercel pipeline deployments.',
      telemetry: 'Sentry transaction traces tracking external Places and routing API errors.',
      rawConfig: `REDUNDANT_GATEWAY_URL=https://api.places.google.com
GEOSPATIAL_CACHE_EXPIRY_SECS=3600
NEURAL_PLANNER_MODEL=gpt-4o-mini
DB_CONNECTION_POOL_LIMIT=20`
    },
    architecture: {
      nodes: [
        { id: 'client', label: 'User Mobile / Web UI', type: 'client', x: 10, y: 50 },
        { id: 'orchestrator', label: 'Taste Planner Agent', type: 'orchestrator', x: 35, y: 50 },
        { id: 'redisGeo', label: 'Redis GeoSpatial Cache', type: 'cache', x: 60, y: 25 },
        { id: 'placesApi', label: 'Google Places / Maps API', type: 'service', x: 85, y: 25 },
        { id: 'pinecone', label: 'Pinecone Preference Store', type: 'db', x: 60, y: 75 },
        { id: 'opentable', label: 'OpenTable Booking Wrapper', type: 'service', x: 85, y: 75 }
      ],
      connections: [
        { from: 'client', to: 'orchestrator', label: 'Natural Language API' },
        { from: 'orchestrator', to: 'redisGeo', label: 'Query Geo-Grid' },
        { from: 'redisGeo', to: 'placesApi', label: 'Resolve (Cache-Miss)' },
        { from: 'orchestrator', to: 'pinecone', label: 'Fetch Vector Taste Profiler' },
        { from: 'orchestrator', to: 'opentable', label: 'Confirm Slots' },
        { from: 'orchestrator', to: 'client', label: 'Sync Itinerary Schema' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Conversational Itinerary Request',
        endpoint: '/api/v1/agent/plan',
        method: 'POST',
        payload: '{ "prompt": "Find a cozy Italian dinner nearby and a walk-by cafe afterwards", "coords": { "lat": 12.971, "lng": 77.594 } }',
        response: '{ "itinerary_id": "plan_90b", "steps": [ { "stop": 1, "type": "dinner", "name": "Bella Cucina", "booking_time": "20:00" }, { "stop": 2, "type": "cafe", "name": "Caffe Nero", "routing_walk_mins": 8 } ] }',
        description: 'Decodes user prompts, analyzes locations, executes tool calling workflows, and builds unified itinerary pathways.'
      },
      {
        step: 2,
        title: 'Lock Table Reservation Slot',
        endpoint: '/api/v1/booking/lock',
        method: 'POST',
        payload: '{ "restaurant_id": " Bella_88", "slot_time": "20:00", "covers": 2 }',
        response: '{ "lock_acquired": true, "expires_at": 1778904560, "booking_reference": "REF_903" }',
        description: 'Reserves the selected seat with a dynamic row lock, holding it for booking completion.'
      }
    ]
  },
  {
    id: 'ecotrack',
    title: 'EcoTrack-AI',
    tagline: 'Edge-ML Ecological Telemetry Sandbox & Local Carbon Footprint Estimator',
    category: 'lab',
    status: 'Pre-Alpha',
    themeColor: 'emerald',
    glowColor: '#10b981',
    iconName: 'Leaf',
    summary: 'An IoT-linked ecological tracking dashboard utilizing edge ML to estimate localized carbon footprints and supply-chain resource leaks.',
    problemStatement: 'Tracking industrial carbon emissions and resource leaks across a supply chain requires complex external audits that take weeks, creating outdated and low-fidelity ESG reports.',
    solutionArchitecture: 'EcoTrack-AI deploys tiny TensorFlow Lite models directly onto Simulated Edge IoT telemetry nodes. These sensors monitor localized operations metrics (electricity loads, heat, fuel usage, and logistics distances) and calculate carbon footprints directly on the device, uploading aggregated hashes securely.',
    keyFeatures: [
      'Edge ML telemetry integration: Estimates metrics directly on sensors, minimizing database bandwidth overhead.',
      'Supply-chain leak analytics: Evaluates heat anomalies and machinery vibrations to detect leakage zones.',
      'Immutable carbon ledger: Records emissions data in audit-ready structures.',
      'Real-time ESG Telemetry: A micro-dashboard updating environmental loads, savings, and active alerts.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'TensorFlow Lite', category: 'AI/ML' },
      { name: 'Rust', category: 'Backend' },
      { name: 'InfluxDB', category: 'Database' },
      { name: 'MQTT Broker', category: 'Infrastructure' },
    ],
    challenges: [
      {
        title: 'Edge Device Power and Processor Constraints',
        desc: 'Running heavy deep learning regression models directly on battery-powered microcontrollers quickly drained cell power within days.',
        solution: 'Quantized the TensorFlow models down to 8-bit integers (INT8), pruning unnecessary neural nodes and reducing compute power by 85%.'
      }
    ],
    optimizations: [
      { metric: 'Compute Overhead', value: '-85%', description: 'Processor workloads saved through model quantization.' },
      { metric: 'Ingress Bandwidth', value: '-92%', description: 'Edge aggregation vs uploading raw high-frequency telemetry logs.' }
    ],
    roadmap: [
      'Phase 1: Support for solar-powered hardware deployment kits.',
      'Phase 2: Predictive supply chain rerouting modules to lower logistics footprints.'
    ],
    deployment: {
      platform: 'AWS IoT Core + InfluxDB Cloud',
      cicd: 'Automated edge firmwares compilation via GitHub workflow loops.',
      telemetry: 'Prometheus logging dashboard monitoring active MQTT telemetry streams.',
      rawConfig: `MQTT_GATEWAY=iot.ecotrack-ai.net
COMPUTE_QUANTIZATION=int8
LEAK_DETECTION_THRESHOLD=0.82
STORAGE_SHARDS=4`
    },
    architecture: {
      nodes: [
        { id: 'sensors', label: 'IoT Sensors (TFLite Edge)', type: 'client', x: 15, y: 50 },
        { id: 'mqtt', label: 'MQTT Broker Gateway', type: 'gateway', x: 40, y: 50 },
        { id: 'rustEngine', label: 'Telemetry Aggregation Service', type: 'service', x: 65, y: 50 },
        { id: 'influx', label: 'InfluxDB TimeSeries', type: 'db', x: 90, y: 50 }
      ],
      connections: [
        { from: 'sensors', to: 'mqtt', label: 'MQTT Streams' },
        { from: 'mqtt', to: 'rustEngine', label: 'Subscribe Logs' },
        { from: 'rustEngine', to: 'influx', label: 'Bulk Chronos Write' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Publish Sensor Aggregation',
        endpoint: 'mqtt://iot.ecotrack-ai.net/telemetry/node_24',
        method: 'POST',
        payload: '{ "node_id": 24, "carbon_kg": 1.45, "leak_detected": false, "timestamp": 1778909890 }',
        response: '[MQTT PUBACK SUCCESS]',
        description: 'The edge sensor publishes calculated emissions metrics directly to the broker.'
      }
    ]
  },
  {
    id: 'fanversi',
    title: 'FanVersi AI',
    tagline: 'Semantic RAG Universe Sandbox & Interactive Fan Fiction Co-Authoring Engine',
    category: 'lab',
    status: 'Research',
    themeColor: 'violet',
    glowColor: '#8b5cf6',
    iconName: 'Sparkles',
    summary: 'A generative fan fiction and interactive universe sandbox, utilizing fine-tuned LLMs and RAG databases for canonical consistency.',
    problemStatement: 'Interactive fan fiction creators struggle to maintain consistency across expansive lore databases, complex timelines, and multiple character relationship webs when generating new plot pathways.',
    solutionArchitecture: 'FanVersi AI uses a lore-anchored RAG database. Character profiles, past events, and universe laws are parsed into a vector index. When the user co-authors a paragraph, a multi-agent checker reviews the draft to flag canon violations and suggests edits that keep relationships and timelines consistent.',
    keyFeatures: [
      'Lore Consistency Scanner: Validates draft changes against the vector database to flag canon infractions.',
      'Dynamic timeline generation: Graphs storyline paths and character arcs dynamically.',
      'Collaborative canvas: Allows co-writing story beats side-by-side with localized LLMs.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'SlateJS', category: 'Frontend' },
      { name: 'Python / CrewAI', category: 'AI/ML' },
      { name: 'Milvus Vector DB', category: 'Database' },
      { name: 'FastAPI', category: 'Backend' },
    ],
    challenges: [
      {
        title: 'Canon Violation False Positives',
        desc: 'The vector database returned general matches that flagged creative subplots or valid character choices as canon violations.',
        solution: 'Developed a dual-stage check that runs semantic vector scans followed by an explicit rules checker evaluating relationships.'
      }
    ],
    optimizations: [
      { metric: 'Canon Scan Latency', value: '240ms', description: 'Time taken to validate a 200-word chapter draft.' },
      { metric: 'Lobby Capacity', value: '1000+', description: 'Lore nodes queried simultaneously on character graphs.' }
    ],
    roadmap: [
      'Phase 1: Automated image generation depicting custom scenes.',
      'Phase 2: Community sandbox hubs sharing local universes.'
    ],
    deployment: {
      platform: 'Hugging Face Spaces + Qdrant Cloud',
      cicd: 'Direct branch integration compiling to HF space pipelines.',
      telemetry: 'W&B dashboards mapping prompt evaluation loops and RAG metrics.',
      rawConfig: `LORE_RAG_TOP_K=5
VIOLATION_THRESHOLD=0.68
CHARACTER_RELATIONS_STRICT=true`
    },
    architecture: {
      nodes: [
        { id: 'editor', label: 'Rich Text Workspace', type: 'client', x: 15, y: 50 },
        { id: 'canonEngine', label: 'Lore Agent Orchestrator', type: 'orchestrator', x: 50, y: 50 },
        { id: 'milvus', label: 'Milvus Lore Store', type: 'db', x: 85, y: 50 }
      ],
      connections: [
        { from: 'editor', to: 'canonEngine', label: 'Transmit Chapter' },
        { from: 'canonEngine', to: 'milvus', label: 'Verify Canon Anchors' },
        { from: 'canonEngine', to: 'editor', label: 'Flag Violations & Logic' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Scan Chapter Draft for Canon',
        endpoint: '/api/v1/story/validate',
        method: 'POST',
        payload: '{ "draft": "Aragorn pulled out a laser blaster...", "universe": "lotr" }',
        response: '{ "canon_compliant": false, "violations": [ { "type": "anachronism", "detail": "Laser blasters do not exist in Middle-Earth" } ] }',
        description: 'Analyzes story drafts against lore vectors to ensure consistency.'
      }
    ]
  },
  {
    id: 'election',
    title: 'Election Journey',
    tagline: 'Game-Theoretic Agent-Based State Voter Simulator & Demographic Matrix',
    category: 'lab',
    status: 'Completed',
    themeColor: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'BarChart2',
    summary: 'A game-theoretic simulator utilizing agent-based modeling to simulate voter demographics, campaign spending, media bias, and debate strategies in an election cycle.',
    problemStatement: 'Standard polling processes are static snapshots that fail to model dynamic media events, targeted campaign budgets, and geographic voting shifts across multi-stage electoral systems.',
    solutionArchitecture: 'Election Journey models thousands of individual simulated voting agents, each assigned demographic parameters (age, income, priorities). Campaign inputs (funding distributions, ad spending, debate themes) shift these agents\' voting probability matrices via linear regressions. Running state-by-state simulations yields a dynamic electoral map.',
    keyFeatures: [
      'Agent-Based voter model: Simulates thousands of distinct voters with changing behaviors.',
      'Campaign budget planner: Lets users allocate funding across advertising, debates, and rallies.',
      'Interactive Electoral Map: Visual state map displaying shifts and winner margins.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'D3.js', category: 'Frontend' },
      { name: 'Python / NumPy', category: 'AI/ML' },
      { name: 'SQLite', category: 'Database' },
    ],
    challenges: [
      {
        title: 'Compute Bottlenecks on Large Agent Datasets',
        desc: 'Running iterations over millions of distinct demographic agents inside the browser froze the UI and crashed memory limits.',
        solution: 'Implemented mathematical demographic grouping and vector calculations using NumPy matrices, lowering calculations from individual loops to bulk actions.'
      }
    ],
    optimizations: [
      { metric: 'Simulation Duration', value: '45ms', description: 'Time taken to execute a full campaign round.' },
      { metric: 'Margin Accuracy', value: '94.2%', description: 'Historical state margin validation matches.' }
    ],
    roadmap: [
      'Phase 1: Dynamic debate mini-games with prompt effects.',
      'Phase 2: Historical election scenario settings.'
    ],
    deployment: {
      platform: 'Vercel Static Hosting',
      cicd: 'Automated static web builds pushed on master merges.',
      telemetry: 'Sentry JS errors tracing and user interaction audits.',
      rawConfig: `TOTAL_VOTER_AGENTS_EST=100000
SWING_STATE_VOLATILITY=1.45
DEBATE_SHIFTS_CEILING=0.08`
    },
    architecture: {
      nodes: [
        { id: 'ui', label: 'Electoral Map / UI', type: 'client', x: 20, y: 50 },
        { id: 'simEngine', label: 'NumPy Vector Simulator', type: 'orchestrator', x: 50, y: 50 },
        { id: 'sqlite', label: 'Demographics Store', type: 'db', x: 80, y: 50 }
      ],
      connections: [
        { from: 'ui', to: 'simEngine', label: 'Inject Campaign Settings' },
        { from: 'simEngine', to: 'sqlite', label: 'Fetch Demographic Vectors' },
        { from: 'simEngine', to: 'ui', label: 'Transmit Vote Margins' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Run Election Round',
        endpoint: '/api/v1/election/simulate-round',
        method: 'POST',
        payload: '{ "campaign_budgets": { "swing_states": { "ohio": 240000 } }, "debate_focus": "economy" }',
        response: '{ "margins": { "ohio": { "party_a": 51.2, "party_b": 48.8, "shift_direction": "a" } } }',
        description: 'Applies campaign allocations to demographic models to calculate electoral swings.'
      }
    ]
  },
  {
    id: 'bank',
    title: 'Bank Management Ledger',
    tagline: 'High-Concurrency Audit Ledger Simulator & Multi-Node Replication Sandbox',
    category: 'lab',
    status: 'Completed',
    themeColor: 'rose',
    glowColor: '#f43f5e',
    iconName: 'Wallet',
    summary: 'A high-concurrency transactional ledger simulator written in Rust demonstrating double-entry auditing, multi-node replication, and load-shedding queues.',
    problemStatement: 'Traditional database architectures struggle to maintain ledger accuracy and atomic write performance under high-concurrency transaction bursts, leading to race-conditions and auditing gaps.',
    solutionArchitecture: 'The ledger system simulates a high-concurrency backend. All transactions are logged using double-entry auditing into an append-only transaction stream. A localized worker queue processes transactions sequentially. Multi-node replication models verify cluster sync latency, utilizing load-shedding to prevent system memory overload.',
    keyFeatures: [
      'Append-Only Ledger: Immutable double-entry ledger design eliminating database state drift.',
      'Multi-node transaction replication: Simulates database replica syncing with adjustable latency.',
      'Active Load Shedder: Drops unprioritized traffic during transactional spikes to protect the ledger core.',
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Rust / WebAssembly', category: 'Backend' },
      { name: 'SQLite / WAL Mode', category: 'Database' },
      { name: 'Redis', category: 'Cache' },
    ],
    challenges: [
      {
        title: 'Replication Latency Race Conditions',
        desc: 'Concurrent withdrawals across split replica nodes allowed users to withdraw more funds than their active balance before balance updates propagated.',
        solution: 'Implemented a strict centralized Raft Consensus transaction lock that routes all balances verification and writes through the primary node.'
      }
    ],
    optimizations: [
      { metric: 'Transaction Throughput', value: '45,000 tx/s', description: 'Simulated throughput using WASM-based transactional logs.' },
      { metric: 'Audit Verification', value: '<1ms', description: 'Double-entry parity check latency across accounts.' }
    ],
    roadmap: [
      'Phase 1: Cryptographic zero-knowledge balance audit proofs.',
      'Phase 2: Real-time fraud detection AI network sidecar.'
    ],
    deployment: {
      platform: 'Cloudflare Workers WASM Runtime',
      cicd: 'GitHub workflows building rust-wasm modules and deploying to Cloudflare KV.',
      telemetry: 'Cloudflare analytics metrics tracking worker requests, memory, and database execution times.',
      rawConfig: `RAFT_REPLICATION_FACTOR=3
TRANSACTION_BUFFER_SIZE=2048
LOAD_SHED_SPIKE_HZ=1000
AUDIT_LOG_MODE=append-only`
    },
    architecture: {
      nodes: [
        { id: 'clients', label: 'Simulated Bank Apps', type: 'client', x: 10, y: 50 },
        { id: 'shedder', label: 'Token Bucket Load Shedder', type: 'gateway', x: 35, y: 50 },
        { id: 'leader', label: 'Primary Node (Raft Leader)', type: 'orchestrator', x: 60, y: 50 },
        { id: 'replicas', label: 'Replica Nodes (Followers)', type: 'service', x: 85, y: 25 },
        { id: 'ledger', label: 'Append-Only Ledger Stream', type: 'db', x: 85, y: 75 }
      ],
      connections: [
        { from: 'clients', to: 'shedder', label: 'Transaction Requests' },
        { from: 'shedder', to: 'leader', label: 'Forward Prioritized' },
        { from: 'leader', to: 'replicas', label: 'Replicate Write Logs' },
        { from: 'leader', to: 'ledger', label: 'Commit Double-Entry Record' }
      ]
    },
    apiFlow: [
      {
        step: 1,
        title: 'Execute Atomic Transfer',
        endpoint: '/api/v1/ledger/transfer',
        method: 'POST',
        payload: '{ "source_acc": "ACC_1", "dest_acc": "ACC_2", "amount": 250.00 }',
        response: '{ "transaction_id": "tx_c7d8", "ledger_index": 1045, "status": "committed", "audit_hash": "a4f8..." }',
        description: 'Validates balances on the Raft leader, creates debit/credit logs in an atomic transaction block, and replicates changes.'
      }
    ]
  }
];

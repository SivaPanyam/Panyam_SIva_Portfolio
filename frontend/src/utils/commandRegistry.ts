// frontend/src/utils/commandRegistry.ts
import React from 'react';
import { portfolioProjects } from './projectData';

export interface Command {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  execute: (args: string[]) => Promise<string | React.ReactNode>;
}

export const commandRegistry: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Displays a directory of all permitted console prompt operations.',
    usage: 'help [command_name]',
    execute: async (args) => {
      if (args.length > 0) {
        const cmdName = args[0].toLowerCase();
        const cmd = commandRegistry[cmdName];
        if (cmd && !cmd.hidden) {
          return `
Command: ${cmd.name}
Description: ${cmd.description}
Usage: ${cmd.usage || cmd.name}
`;
        }
        return `[ERROR] Command "${args[0]}" not found in secure prompt index.`;
      }

      // Generate a structured monochrome command table
      const list = Object.values(commandRegistry)
        .filter(c => !c.hidden)
        .map(c => `  ${c.name.padEnd(16)} - ${c.description}`)
        .join('\n');

      return `
NEURAL_OS v1.0.4 - PERMITTED PROMPT DIRECTORY
===================================================
${list}

[TIP] Run "help [command]" for syntax details.
[R&D] Enter special access keys to initiate systems checks.
`;
    }
  },

  about: {
    name: 'about',
    description: 'Queries background credentials and diagnostic profile of Siva Panyam.',
    execute: async () => {
      return `
PROFILE TELEMETRY: SIVA PANYAM
===================================================
ROLE: AI Engineer & Full Stack Architect
LOCATION: Bangalore, India // Edge Edge Node
FOCUS: generative_ai // system_concurrency // robust_frontends

"I bridge the gap between heavy deep learning backends and highly interactive, performant web applications. My work focuses on offloading expensive telemetry processes to distributed nodes, standardizing robust vector-RAG infrastructures, and crafting sleek developer-focused user workspaces."

Core philosophy: "Build simple code structures to solve extremely complex data-flow problems."
`;
    }
  },

  resume: {
    name: 'resume',
    description: 'Fetches the structured CV profile including education and milestones.',
    execute: async () => {
      return `
CURRICULUM VITAE // SIVA PANYAM
===================================================
[01] SKILLS INDEX           - Run "skills" for active language grids.
[02] CAREER TELEMETRY       - Run "experience" for job timelines.
[03] VERIFIED CREDENTIALS   - Run "certifications" for professional certifications.
[04] CONTACT ROUTING        - Run "contact" to establish communication channels.

EDUCATION SUMMARY:
---------------------------------------------------
Degree: Bachelor of Technology (B.Tech) in Computer Science
Focus: Algorithms, Distributed Architectures, Intelligent Systems

Download official encrypted resume file:
URL: https://sivapanyam.dev/assets/cv_payload.pdf
`;
    }
  },

  projects: {
    name: 'projects',
    description: 'Lists all chronicled featured architectures and active lab sandboxes.',
    execute: async () => {
      const featured = portfolioProjects
        .filter(p => p.category === 'featured')
        .map(p => `  * ${p.title.padEnd(15)} - ${p.tagline}`)
        .join('\n');

      const lab = portfolioProjects
        .filter(p => p.category === 'lab')
        .map(p => `  * ${p.title.padEnd(15)} - ${p.tagline}`)
        .join('\n');

      return `
CHRONICLED PRODUCTS & SYSTEMS
===================================================
FEATURED ARCHITECTURES:
---------------------------------------------------
${featured}

EXPERIMENTAL LAB (R&D Sandbox):
---------------------------------------------------
${lab}

[RUN] Enter "featured" to inspect structural specs, or select cards behind this terminal.
`;
    }
  },

  featured: {
    name: 'featured',
    description: 'Inspects key architectural metrics and features of production systems.',
    execute: async () => {
      const items = portfolioProjects
        .filter(p => p.category === 'featured')
        .map(p => `
---------------------------------------------------
TITLE: ${p.title.toUpperCase()} [${p.status}]
TAGLINE: ${p.tagline}
TECH: ${p.techStack.slice(0, 4).map(t => t.name).join(', ')}
PROBLEM: ${p.problemStatement.slice(0, 100)}...
---------------------------------------------------`)
        .join('\n');

      return `
PRODUCTION PORTFOLIO ARCHITECTURES
===================================================
${items}
`;
    }
  },

  skills: {
    name: 'skills',
    description: 'Outputs active technical capability matrices and stack parameters.',
    execute: async () => {
      return `
TECHNICAL CAPABILITY INVENTORY
===================================================
AI & LARGE LANGUAGE MODELS
---------------------------------------------------
* LangChain & CrewAI Agentic Orchestrations   [███████████████] 96%
* Vector Database Pipelines (Pinecone/Qdrant)  [██████████████░] 92%
* Fine-tuning, RAG, Embeddings, Prompt Eng.   [███████████████] 98%

FRONTEND ARCHITECTURE
---------------------------------------------------
* React, Next.js, SolidJS, TypeScript         [███████████████] 98%
* Tailwind CSS, Vanilla CSS, Styled-Libs      [██████████████░] 94%
* Framer Motion, D3.js, High-Speed Canvas     [█████████████░░] 88%

BACKEND & DISTRIBUTED CONCURRENCY
---------------------------------------------------
* Node.js, Express, Fastify, Go-Client        [██████████████░] 92%
* SQL & NoSQL (PostgreSQL, WAL Sqlite, Redis) [██████████████░] 90%
* WebRTC Protocol & P2P Stream sockets        [████████████░░░] 82%

DEVOPS & WORKFLOW SYSTEM
---------------------------------------------------
* Docker containers, Kubernetes sidecars       [█████████████░░] 86%
* CI/CD automation pipelines (GitHub Actions) [██████████████░] 90%
`;
    }
  },

  experience: {
    name: 'experience',
    description: 'Traces employment timeline and engineering roles chronological stats.',
    execute: async () => {
      return `
CAREER TIMELINE & TELEMETRY
===================================================
ROLE: Lead Architect
COMPANY: AI Synthesis Labs
TIMELINE: 2024 - Present
METRICS: Orchestrated large-scale multi-agent deployments; engineered low-latency telemetry processors utilizing background Web Workers. Redesigned client web pipelines.
---------------------------------------------------
ROLE: Full Stack Engineer
COMPANY: DataSync Corp
TIMELINE: 2022 - 2024
METRICS: Spearheaded core GraphQL data synchronization frameworks, dropping data latency from 340ms to 18ms. Engineered high-traffic Node interfaces and responsive dashboard canvases.
---------------------------------------------------
ROLE: Distributed Systems Research Associate
COMPANY: Bangalore Engineering Sandbox
TIMELINE: 2020 - 2022
METRICS: Built append-only concurrency balance ledgers and benchmarked Raft Consensus replica sync rates under peak network congestion thresholds.
`;
    }
  },

  certifications: {
    name: 'certifications',
    description: 'Lists verified professional cloud, network, and developer credentials.',
    execute: async () => {
      return `
VERIFIED CREDENTIALS
===================================================
* Google Cloud Professional Cloud Architect
  - Issued by: Google Cloud
  - Verification ID: GCP-ARCH-908B1
  - Status: ACTIVE
 
* TensorFlow Developer Certificate
  - Issued by: DeepLearning.AI
  - Verification ID: TF-DEV-33A89
  - Status: ACTIVE
 
* Advanced Generative AI Swarms Architect
  - Issued by: Neural OS Council
  - Verification ID: AGENT-SWARM-550
  - Status: ACTIVE
`;
    }
  },
 
  brand: {
    name: 'brand',
    description: 'Queries brand guidelines, typography variables, and loads the interactive playground.',
    execute: async () => {
      setTimeout(() => {
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return `
SYNCHRONIZING SECURE BRAND MANUAL PIPELINE...
===================================================
* THEME:       futuristic // abstract AI-inspired // premium
* CODE NAME:   The "Neural Lattice" (or "Synapse Core")
* TYPOGRAPHY:  Outfit Sans-serif // JetBrains Mono Code
* ELEVATION:   3-Tier glassmorphic layout system
* ACCENTS:     Monochrome (White/Zinc) / Developer Matrix Neon
 
[AUTONOMIC ACTION] Directing viewpoint to interactive Brand Playground inside Experimental Lab section...
`;
    }
  },

  contact: {
    name: 'contact',
    description: 'Establishes secure communication channels and routing.',
    execute: async () => {
      // Returns an interactive react component!
      return React.createElement('div', { className: 'p-4 border border-zinc-800 bg-zinc-950 rounded-xl space-y-3 font-mono text-xs max-w-md' },
        React.createElement('div', { className: 'text-zinc-500 uppercase tracking-widest font-bold' }, 'Secure Synapse Routing'),
        React.createElement('p', { className: 'text-zinc-400 font-sans leading-relaxed' }, 
          'Choose a gateway to establish connection with Siva. Click directly below to route messages:'
        ),
        React.createElement('div', { className: 'flex flex-col gap-2 pt-2' },
          React.createElement('a', { 
            href: 'mailto:contact@sivapanyam.dev', 
            className: 'px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded text-zinc-300 hover:text-white flex items-center justify-between transition-colors' 
          }, 
            React.createElement('span', null, '📧 Email Gateway:'), 
            React.createElement('span', { className: 'text-[10px] text-zinc-500 font-bold' }, 'contact@sivapanyam.dev ↗')
          ),
          React.createElement('a', { 
            href: 'https://linkedin.com/in/sivapanyam', 
            target: '_blank', 
            rel: 'noopener noreferrer', 
            className: 'px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded text-zinc-300 hover:text-white flex items-center justify-between transition-colors' 
          }, 
            React.createElement('span', null, '🔗 LinkedIn Interface:'), 
            React.createElement('span', { className: 'text-[10px] text-zinc-500 font-bold' }, 'linkedin.com/in/sivapanyam ↗')
          )
        )
      );
    }
  },

  github: {
    name: 'github',
    description: 'Redirects to the secure code repository hosting current projects.',
    execute: async () => {
      return `
ESTABLISHING CODEBASE COUPLING...
===================================================
BRANCH: main // origin
REPOSITORY: github.com/sivapanyam
LATENCY: 12ms // secure handshake

GitHub connection resolved. Press the link below to access repository index:
URL: https://github.com/sivapanyam
`;
    }
  },

  clear: {
    name: 'clear',
    description: 'Flushes the current console logs and resets history buffer.',
    execute: async () => {
      return 'CLEAR_CONSOLE_TRIGGER';
    }
  },

  // ==========================================
  // HIDDEN / EASTER EGG COMMANDS
  // ==========================================
  
  whoami: {
    name: 'whoami',
    description: 'Queries details of your active console connection.',
    hidden: true,
    execute: async () => {
      return `
CONNECTION CREDENTIALS
===================================================
USER: Guest Operator // Portfolio Explorer
WORKSPACE: guest@sivapanyam.dev
NETWORK: Bangalore edge node (IPv6 auto-hashed)
SESSION STATUS: stable
PERMISSION LEVEL: read-only (Type "sudo reveal-secrets" to test security parameters)
`;
    }
  },

  'system-status': {
    name: 'system-status',
    description: 'Calculates active console processor loads and network thresholds.',
    hidden: true,
    execute: async () => {
      const ram = (Math.random() * 20 + 34).toFixed(1);
      const latency = (Math.random() * 8 + 4).toFixed(0);
      const threads = (Math.random() * 4 + 8).toFixed(0);
      return `
OS TELEMETRY STATUS
===================================================
SYSTEM NAME: NeuralOS v1.0.4
PROCESSOR FREQ: 3.42 GHz
COGNITIVE ALLOC: ${ram}% RAM utilized
ACTIVE WORKERS: ${threads} threads allocated
NETWORK LATENCY: ${latency}ms (Indiranagar edge gateway)
SYNAPSE INTEGRITY: 100% stable
`;
    }
  },

  'sudo reveal-secrets': {
    name: 'sudo reveal-secrets',
    description: 'Reveals funny secret developer assets and encrypted logs.',
    hidden: true,
    execute: async () => {
      return React.createElement('div', { className: 'p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl space-y-3 font-mono text-xs max-w-xl text-amber-400 glow-amber' },
        React.createElement('div', { className: 'text-amber-500 uppercase tracking-widest font-black flex items-center gap-2 text-glow-amber animate-pulse' }, 
          '⚠️ CLASSIFIED: SIVA\'S SECRETS REVEALED'
        ),
        React.createElement('pre', { className: 'text-[9px] leading-relaxed overflow-x-auto whitespace-pre font-mono bg-black/80 p-3 rounded border border-amber-500/10 text-amber-500/80 custom-scrollbar' }, 
`[SECURE ENTRY] Encryption bypassed.
[CLASSIFIED LOG #240]
  "Siva runs entirely on filter-coffee and high-concurrency systems coding.
   If you ask the Jarvis assistant orb nice things, he might reveal
   the terminal code keys to compile the canvas stars!"

[AI COMPILER METRICS]
  * Model Core: Gemini 3.5 Flash (Medium)
  * System Temperament: Friendly, pair programmer
  * Agent status: stable // antigravity offline: false`
        ),
        React.createElement('div', { className: 'text-[9px] text-amber-600 font-sans' }, 
          'Security clearance: guest_sudo // do not leak parameters.'
        )
      );
    }
  },

  'launch-dev-mode': {
    name: 'launch-dev-mode',
    description: 'Compiles dynamic visual sandboxes in high speed developer logs.',
    hidden: true,
    execute: async () => {
      // Returns a beautiful animated loading console!
      return React.createElement('div', { className: 'p-4 border border-green-500/20 bg-green-500/5 rounded-xl space-y-3 font-mono text-xs max-w-md' },
        React.createElement('div', { className: 'text-green-400 font-bold uppercase tracking-widest animate-pulse' }, '⚙️ INITIALIZING RUNTIME DEV_MODE'),
        React.createElement('div', { className: 'space-y-1 text-[9px] text-green-500/80 leading-tight bg-black/80 p-3 rounded border border-green-500/10 font-mono' },
          React.createElement('div', null, '[NPM] Installing npm dependencies... complete'),
          React.createElement('div', null, '[LINT] Auditing static component imports... 0 issues'),
          React.createElement('div', null, '[COMPILER] Bundling assets via Vite...'),
          React.createElement('div', { className: 'text-green-300 font-bold' }, '[SUCCESS] Local Server listening on PORT: 3000'),
          React.createElement('div', { className: 'text-green-300 font-bold' }, '[SUCCESS] Telemetry Core synced on PORT: 8080')
        ),
        React.createElement('div', { className: 'text-[9px] text-zinc-500 font-sans' }, 
          'Live workspace loaded. Telemetry interfaces verified.'
        )
      );
    }
  }
};

// Autocomplete finder: given a prompt prefix, returns matching standard or hidden commands
export const getAutocompleteSuggestion = (input: string): string => {
  if (!input.trim()) return '';
  const prefix = input.toLowerCase();
  
  const cmdNames = Object.keys(commandRegistry);
  const match = cmdNames.find(name => name.startsWith(prefix));
  
  if (match) {
    // Return only the suffix part to be appended in UI
    return match.slice(prefix.length);
  }
  return '';
};

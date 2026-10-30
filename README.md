# Siva Panyam — AI Engineer & Full Stack Architect Portfolio

[![Status: Online](https://img.shields.io/badge/Neural_OS-v1.0.4_Online-39FF14?style=flat-square&logo=terminal)](http://localhost:5173)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_+_Vite-000000?style=flat-square&logo=react)](http://localhost:5173)
[![Backend](https://img.shields.io/badge/Backend-Express_+_TypeScript-09090B?style=flat-square&logo=node.js)](http://localhost:3001)
[![Design](https://img.shields.io/badge/Design_System-Monochrome_Neural_Lattice-ffffff?style=flat-square)](docs/brand_identity.md)

An interactive, high-fidelity developer portfolio and **Neural OS console** built for **Siva Panyam** (AI Engineer & Full Stack Architect based in Bangalore, India). 

The platform merges a minimalist monochrome drafting aesthetic with real-time 3D generative graphics, an embedded virtual terminal, a Spotlight-style command palette, an interactive design system sandbox, and an autonomous AI assistant (**JARVIS**) backed by dynamic context retrieval and Google Gemini GenAI.

---

## 🌐 Active Localhost URLs

When running locally, the project runs on the following endpoints:

| Service | Port | Local URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | `5173` | **[http://localhost:5173](http://localhost:5173)** | Vite + React interactive client interface |
| **Backend REST API** | `3001` | **[http://localhost:3001](http://localhost:3001)** | Express API with JARVIS LLM & offline RAG fallback |
| **Chat Telemetry Endpoint** | `3001` | **`POST http://localhost:3001/api/chat`** | Dynamic context & Gemini chat route |

---

## 🌟 Key Features & Architectural Highlights

### 1. 🚀 Cinematic Boot Sequence (`BootSequence.tsx`)
- High-tech terminal initialization sequence displaying BIOS-style checks, edge telemetry pings, and hardware validation.
- Automatically stores boot state in `localStorage` to avoid repeating on subsequent page visits while providing a smooth CRT fade-out.

### 2. 🌌 3D Neural Particle Lattice (`HeroScene.tsx`, `NeuralNetwork.tsx`)
- Built with **Three.js** and **React Three Fiber (`@react-three/fiber`, `@react-three/drei`)**.
- Interactive starfield with smooth mouse parallax and floating neural lattice meshes that react to cursor position.

### 3. 🤖 JARVIS AI Assistant & Offline Fallback Core (`JarvisAssistant.tsx`, `useChat.ts`)
- Floating interactive orb widget anchored to the lower-right viewport.
- **Dynamic Context Injection**: The backend (`contextManager.ts`) classifies user intent and retrieves relevant knowledge slices (projects, skills, career history, architecture decisions).
- **Dual Mode Operation**:
  - **Online Mode**: When `GEMINI_API_KEY` is provided, queries are forwarded to **Gemini 2.5 Flash** with grounded system instructions and strict third-person persona rules.
  - **Offline Telemetry Mode**: If an API key is omitted or the network is unreachable, an internal factual database retrieval engine serves structured portfolio records without crashing.
- Cinematic word-by-word streaming animation for real-time conversational pacing.

### 4. 💻 Embedded Developer Terminal Shell (`Terminal.tsx`)
- Press **Backtick (`` ` `` / `~`)** or click the Terminal icon in the Dock to summon a full-screen retro-futuristic CLI emulator.
- Supported CLI Commands:
  - `help` — Lists all available terminal commands.
  - `about` — Prints Siva's professional summary, role, and location.
  - `skills` — Displays technical stack proficiencies across AI, Frontend, Backend, and DevOps.
  - `projects` — Lists featured projects and experimental labs.
  - `resume` — Direct access to CV and career milestones.
  - `contact` — Dispatches direct contact telemetry gateways.
  - `matrix` / `dev` — Toggles Developer HUD & Matrix code rain overlay.
  - `jarvis` — Launches the conversational AI assistant.
  - `clear` — Wipes the terminal buffer.
  - `whoami` — Displays active operator security credentials.

### 5. 🔍 Spotlight Command Palette (`CommandPalette.tsx`)
- Summoned via **`Ctrl + K`** (or **`Cmd + K`** on macOS).
- Fast fuzzy search navigation to jump straight into projects, change themes, inspect skills, or open external GitHub/LinkedIn profiles.

### 6. 🟢 Matrix Code Rain & Dev Mode HUD (`MatrixRain.tsx`, `DevOverlayWidgets.tsx`)
- Activated via terminal command (`matrix`) or the **Konami sequence**: `↑ ↑ ↓ ↓`.
- Instantly activates an HTML5/WebGL falling green digital rain canvas backdrop.
- Injects real-time developer HUD widgets (FPS counter, memory utilization, latency telemetry, active node counters).
- Built using zero-runtime CSS Custom Properties (`.dev-mode-active`) for 0ms layout shifts.

### 7. 🧪 Interactive Experimental Lab & Visualizers
- **Architecture Visualizer (`ArchitectureVisualizer.tsx`)**: Step-by-step interactive node diagrams of distributed systems (e.g., Semantic Mesh Sync).
- **API Flow Simulator (`ApiFlowSimulator.tsx`)**: Simulates live request/response payloads, latency benchmarks, and caching mechanisms.
- **Project Lab Sandbox (`ProjectLabSandbox.tsx`)**: In-browser test bench exploring technical trade-offs and code architectures.

### 8. 🎨 Interactive Brand System Manual (`BrandShowcase.tsx`)
- Real-time design system laboratory implementing the [Brand Identity Manual](docs/brand_identity.md).
- Allows dynamic inspection of the "Neural Lattice" SVG logo (speed controls, orbit multipliers, glowing shaders).
- One-click "Copy SVG" clipboard utilities, typography scale multipliers, and 3D parallax elevation inspectors.

---

## 📁 Repository Directory Structure

```plaintext
Portfolio/
├── package.json                 # Monorepo root scripts & project configuration
├── README.md                    # Project documentation, guides, and architecture specs
├── docs/                        # Specifications, brand manual, and design guidelines
│   ├── brand_identity.md        # Official visual identity and aesthetic guidelines
│   └── superpowers/
│       ├── plans/               # Implementation task checklists and execution logs
│       └── specs/               # Engineering requirements and architectural design specs
├── backend/                     # Node.js + Express + TypeScript Backend
│   ├── package.json             # Backend dependencies (@google/genai, express, vitest)
│   ├── tsconfig.json            # TypeScript configuration for ES Modules
│   ├── dist/                    # Compiled production JavaScript files
│   └── src/
│       ├── server.ts            # Express server entry point & CORS configuration
│       ├── routes/
│       │   └── chat.ts          # POST /api/chat route with Gemini + fallback engine
│       ├── services/
│       │   ├── contextManager.ts# Query classifier & semantic context selector
│       │   └── promptBuilder.ts # Grounded prompt constructor for JARVIS
│       ├── knowledge/
│       │   └── portfolioKnowledge.ts # Single source of truth knowledge base
│       └── tests/
│           └── chat.test.ts     # Vitest route integration tests
└── frontend/                    # React 19 + TypeScript + Vite Frontend
    ├── package.json             # Frontend dependencies (Three.js, Framer Motion, Tailwind)
    ├── vite.config.ts           # Vite + Tailwind v4 + Vitest configuration
    ├── tsconfig.json            # Root tsconfig referencing app & node configs
    ├── index.html               # HTML entry point with CRT scanline overlays & metadata
    ├── vercel.json              # Deployment configuration for SPA routing
    ├── public/
    │   └── favicon.svg          # High-contrast Neural Lattice icon
    └── src/
        ├── main.tsx             # React DOM root initialization
        ├── App.tsx              # Main layout, keyboard listeners, section routing
        ├── index.css            # Tailwind 4 theme variables, CRT scanlines & fonts
        ├── App.css              # Custom layout animations and micro-classes
        ├── assets/              # Raw SVG logo assets (icon, full, blueprint)
        ├── components/          # 27+ modular UI and interactive 3D components
        │   ├── BootSequence.tsx
        │   ├── DockNavbar.tsx
        │   ├── HeroScene.tsx
        │   ├── JarvisAssistant.tsx
        │   ├── Terminal.tsx
        │   ├── CommandPalette.tsx
        │   ├── MatrixRain.tsx
        │   ├── DevOverlayWidgets.tsx
        │   ├── ProjectCard.tsx
        │   ├── ProjectModal.tsx
        │   ├── ProjectLabSandbox.tsx
        │   ├── ArchitectureVisualizer.tsx
        │   ├── ApiFlowSimulator.tsx
        │   ├── SkillsSection.tsx
        │   ├── ExperienceTimeline.tsx
        │   ├── CertificationsShowcase.tsx
        │   ├── BrandShowcase.tsx
        │   └── Logo.tsx
        ├── hooks/
        │   └── useChat.ts       # Chat state, streaming timing, and API connection
        ├── store/
        │   └── uiStore.ts       # Zustand state (Terminal, DevMode, CommandPalette, Jarvis)
        └── utils/
            ├── motion.ts        # Framer Motion transitions and spring curves
            └── projectData.ts   # In-depth project case studies and technical outcomes
```

---

## 🛠️ Tech Stack & Libraries

### Frontend
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS v4 + Custom CSS Custom Properties
- **3D Graphics & Canvas:** Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Animations:** Framer Motion (spring curves, layout animations, exit transitions)
- **State Management:** Zustand
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library + jsdom

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express 5
- **Language:** TypeScript
- **AI Integration:** Google GenAI SDK (`@google/genai`) — Gemini 2.5 Flash
- **Knowledge / RAG:** Custom semantic intent classification & factual markdown synthesis
- **Testing:** Vitest + Supertest

---

## ⌨️ Keyboard Shortcuts & Easter Eggs

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| **`` ` `` / `~`** *(Backtick)* | **Toggle Terminal** | Opens or closes the floating developer CLI shell. |
| **`Ctrl + K` / `Cmd + K`** | **Command Palette** | Opens the Spotlight quick search and navigation dialog. |
| **`↑` `↑` `↓` `↓`** | **Matrix / Dev Mode** | Toggles green digital rain, HUD widgets, and system metrics. |
| **`Esc`** | **Close Overlays** | Closes any open modal, terminal, or command palette. |

---

## 🚦 How to Run the Application

### Prerequisites
- **Node.js** (v18 or higher recommended, tested on Node v24)
- **npm** (v9 or higher)

### 1. Clone & Enter Repository
```bash
git clone <repository-url>
cd Portfolio
```

### 2. Install Dependencies
Install dependencies for both the frontend and backend:
```bash
# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Environment Configuration (Optional)
The backend functions out-of-the-box using the built-in offline knowledge retrieval engine. To enable live Gemini LLM generation, create a `.env` file in `backend/`:

```env
# backend/.env
PORT=3001
GEMINI_API_KEY=your_google_gemini_api_key_here
```

To configure a custom backend endpoint for the frontend, create a `.env` file in `frontend/`:
```env
# frontend/.env
VITE_API_BASE_URL=http://localhost:3001
```

### 4. Running Both Services

You can start both services from the root folder:

```bash
# Terminal 1: Run Backend
npm run dev:backend
# Or directly:
cd backend && node dist/server.js

# Terminal 2: Run Frontend
npm run dev:frontend
# Or directly:
cd frontend && npm run dev
```

Once started:
- Access the web interface at: **[http://localhost:5173](http://localhost:5173)**
- Verify the backend API at: **[http://localhost:3001/api/chat](http://localhost:3001/api/chat)**

---

## 📡 API Reference

### `POST /api/chat`
Sends a prompt or query to JARVIS and receives a context-grounded response.

**Request:**
```http
POST /api/chat HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "message": "What projects has Siva built?"
}
```

**Response (HTTP 200 OK):**
```json
{
  "response": "Siva has architected several high-impact systems:\n\n1. **NeuralOS Desktop**: A retro-futuristic virtual developer shell in the browser utilizing Web Workers for 60fps search algorithms.\n2. **Semantic Mesh Sync**: A low-latency state synchronization service utilizing binary WebSockets, Redis double-buffering, and vector databases.\n3. **Brand Showcase**: An interactive laboratory displaying Siva's design system, vector graphics, and 3D parallax layers."
}
```

*Note: If `GEMINI_API_KEY` is not present, the system returns an offline telemetry block with precise factual data extracted from `portfolioKnowledge.ts`.*

---

## 🧪 Testing

Run automated test suites across both projects:

```bash
# Run backend API tests (Vitest + Supertest)
npm run test:backend

# Run frontend unit & component tests (Vitest + React Testing Library)
npm run test:frontend

# Run all test suites
npm test
```

---

## 🏗️ Production Build

To compile both frontend and backend for production deployment:

```bash
# Build backend TypeScript
npm run build:backend

# Build frontend static bundle (outputs to frontend/dist)
npm run build:frontend
```

The frontend can be deployed directly to static hosts like **Vercel**, **Cloudflare Pages**, or **Netlify** (configured via `frontend/vercel.json`), while the backend can run on any Node.js container or cloud runtime (Cloud Run, Render, Railway, AWS ECS).

---

## 📄 License & Attribution

Designed and engineered by **Siva Panyam**.  
Visual identity conforms to the [sivapanyam.dev Brand Manual](docs/brand_identity.md).

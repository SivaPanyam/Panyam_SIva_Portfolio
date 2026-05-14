# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic AI-engineer portfolio with a floating 3D assistant, a global terminal overlay, and an LLM-integrated Node.js backend.

**Architecture:** A monolithic-style repo (or monorepo) containing a Vite/React frontend and an Express Node.js backend. The frontend communicates with the backend for AI responses.
**Tech Stack:** React, Vite, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Node.js, Express, Vitest, React Testing Library, Supertest.

---

### Task 1: Project Initialization & Tooling

**Files:**
- Create: `package.json`
- Create: `frontend/package.json`
- Create: `backend/package.json`

- [ ] **Step 1: Scaffold root and frontend**
```bash
npm init -y
npm create vite@latest frontend -- --template react-ts
cd frontend && npm install && npm install tailwindcss postcss autoprefixer framer-motion three @react-three/fiber @react-three/drei zustand lucide-react
npx tailwindcss init -p
```

- [ ] **Step 2: Scaffold backend**
```bash
mkdir backend && cd backend && npm init -y
npm install express cors dotenv @google/genai
npm install -D typescript @types/node @types/express @types/cors ts-node nodemon vitest supertest @types/supertest
npx tsc --init
```

- [ ] **Step 3: Setup frontend testing**
```bash
cd frontend && npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initialize frontend and backend projects"
```

---

### Task 2: Backend - LLM Chat API Endpoint

**Files:**
- Create: `backend/src/server.ts`
- Create: `backend/src/routes/chat.ts`
- Create: `backend/src/tests/chat.test.ts`

- [ ] **Step 1: Write the failing test**
```typescript
// backend/src/tests/chat.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server';

describe('POST /api/chat', () => {
  it('should return a simulated AI response', async () => {
    const res = await request(app).post('/api/chat').send({ message: 'Hello' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('response');
    expect(typeof res.body.response).toBe('string');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
```bash
cd backend && npx vitest run src/tests/chat.test.ts
```
Expected: FAIL (app not defined)

- [ ] **Step 3: Write minimal implementation**
```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);

if (require.main === module) {
  app.listen(3001, () => console.log('Server running on port 3001'));
}

// backend/src/routes/chat.ts
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body;
  // TODO: integrate real LLM here, simulated for now
  res.json({ response: `AI processing: ${message}` });
});

export default router;
```

- [ ] **Step 4: Run test to verify it passes**
```bash
cd backend && npx vitest run src/tests/chat.test.ts
```
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add backend/
git commit -m "feat(backend): add /api/chat endpoint"
```

---

### Task 3: Frontend - Terminal Component & Global State

**Files:**
- Create: `frontend/src/store/uiStore.ts`
- Create: `frontend/src/components/Terminal.tsx`
- Create: `frontend/src/components/Terminal.test.tsx`
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: Write the failing test**
```typescript
// frontend/src/components/Terminal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Terminal from './Terminal';
import { useUIStore } from '../store/uiStore';

describe('Terminal Component', () => {
  it('should render when terminal is open', () => {
    useUIStore.setState({ isTerminalOpen: true });
    render(<Terminal />);
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
```bash
cd frontend && npx vitest run src/components/Terminal.test.tsx
```
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Write minimal implementation**
```typescript
// frontend/src/store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
}));

// frontend/src/components/Terminal.tsx
import React, { useState } from 'react';
import { useUIStore } from '../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
  const { isTerminalOpen, toggleTerminal } = useUIStore();
  
  if (!isTerminalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-3xl rounded-lg shadow-2xl flex flex-col h-[60vh] font-mono text-green-400">
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <span>Terminal</span>
          <button onClick={toggleTerminal} className="text-gray-400 hover:text-white">X</button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div>Welcome to sivapanyam.dev</div>
        </div>
        <div className="p-3 border-t border-gray-700">
          <input type="text" placeholder="Type a command..." className="w-full bg-transparent outline-none text-green-400" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
```

- [ ] **Step 4: Run test to verify it passes**
```bash
cd frontend && npx vitest run src/components/Terminal.test.tsx
```
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add frontend/
git commit -m "feat(frontend): create global terminal overlay and store"
```

---

### Task 4: Frontend - AI Assistant (Jarvis) API Integration

**Files:**
- Create: `frontend/src/hooks/useChat.ts`
- Create: `frontend/src/hooks/useChat.test.ts`

- [ ] **Step 1: Write the failing test**
```typescript
// frontend/src/hooks/useChat.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useChat } from './useChat';

global.fetch = vi.fn();

describe('useChat hook', () => {
  it('should send message and receive response', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'AI processing: hello' })
    });

    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('hello');
    });

    expect(result.current.messages).toContainEqual({ role: 'ai', content: 'AI processing: hello' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
```bash
cd frontend && npx vitest run src/hooks/useChat.test.ts
```
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
```typescript
// frontend/src/hooks/useChat.ts
import { useState } from 'react';

type Message = { role: 'user' | 'ai'; content: string };

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Error connecting to neural net.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};
```

- [ ] **Step 4: Run test to verify it passes**
```bash
cd frontend && npx vitest run src/hooks/useChat.test.ts
```
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add frontend/
git commit -m "feat(frontend): integrate AI chat hook"
```

---

### Task 5: Frontend - Three.js Basic Hero Scene

**Files:**
- Create: `frontend/src/components/HeroScene.tsx`
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: Write the failing test**
(No test needed for Three.js visual rendering, we'll verify it loads without crashing)
```typescript
// frontend/src/components/HeroScene.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroScene from './HeroScene';

describe('HeroScene', () => {
  it('renders canvas container', () => {
    const { container } = render(<HeroScene />);
    expect(container.querySelector('.hero-canvas-container')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
```bash
cd frontend && npx vitest run src/components/HeroScene.test.tsx
```

- [ ] **Step 3: Write minimal implementation**
```typescript
// frontend/src/components/HeroScene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const HeroScene = () => {
  return (
    <div className="hero-canvas-container w-full h-screen absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate speed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
```

```typescript
// frontend/src/App.tsx
import React, { useEffect } from 'react';
import Terminal from './components/Terminal';
import HeroScene from './components/HeroScene';
import { useUIStore } from './store/uiStore';

function App() {
  const { toggleTerminal } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden">
      <HeroScene />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen pointer-events-none">
        <h1 className="text-5xl font-bold mb-4 tracking-tighter">Siva Panyam</h1>
        <p className="text-xl text-gray-400 mb-8">AI Engineer & Full Stack Developer</p>
        <button 
          onClick={toggleTerminal}
          className="pointer-events-auto px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 rounded-full transition-colors font-mono text-sm"
        >
          [ Cmd+K ] Open Terminal
        </button>
      </div>
      <Terminal />
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Run test to verify it passes**
```bash
cd frontend && npx vitest run src/components/HeroScene.test.tsx
```

- [ ] **Step 5: Commit**
```bash
git add frontend/
git commit -m "feat(frontend): setup 3D hero scene and App structure"
```

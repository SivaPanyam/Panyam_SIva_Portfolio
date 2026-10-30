// backend/src/routes/chat.ts
import { Router } from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { getContextForQuery } from '../services/contextManager.js';
import { buildSystemInstruction } from '../services/promptBuilder.js';

const router = Router();

/**
 * Intelligent natural-language fallback responses for common portfolio queries
 * so visitors always get an engaging, intelligent experience even with 0 API keys.
 */
function getIntelligentHeuristicResponse(message: string): string {
  const query = message.toLowerCase();

  if (/\b(who|about|background|bio|profile|intro)\b/.test(query)) {
    return "I am JARVIS, Siva Panyam's portfolio neural interface. Siva is a Full-Stack & AI Systems Engineer based in Bangalore. He builds high-performance distributed web applications, 3D interactive user interfaces, and robust multi-agent developer systems.";
  }

  if (/\b(skill|stack|tech|technolog|language|framework|tool)\b/.test(query)) {
    return "Siva's verified technical telemetry:\n\n• Frontend: React 19, TypeScript, Three.js / WebGL, Tailwind CSS v4, Framer Motion\n• Backend & Distributed: Node.js, Express, Go/Rust fundamentals, WebSocket, Raft consensus WAL\n• AI & Data: RAG pipelines, Milvus/Pinecone vector databases, CrewAI swarms, INT8 TFLite quantization\n• Infrastructure: Docker, GitHub Actions, Cloud Run, InfluxDB, Redis, SQLite";
  }

  if (/\b(project|projects|work|built|showcase|app|lab)\b/.test(query)) {
    return "Siva has architected several flagship applications:\n\n1. NeuralOS: Browser-native developer desktop with interactive terminal & 3D telemetry.\n2. FanVersi AI: Multi-agent co-authoring engine using Milvus vector search and CrewAI.\n3. EcoTrack-AI: Edge IoT telemetry pipeline running quantized INT8 TFLite models.\n4. Bank Ledger Sandbox: Distributed ledger modeling split withdrawals with Raft Leader WAL in Rust-WASM.";
  }

  if (/\b(hire|hiring|available|availability|job|role|interview|opportunity)\b/.test(query)) {
    return "Siva is currently open to Full-Stack Engineer, Frontend Architect, and AI Systems Engineer roles (Remote worldwide or Hybrid in Bangalore). Contact him directly at contact@sivapanyam.dev or via LinkedIn.";
  }

  if (/\b(contact|email|reach|message|linkedin|github)\b/.test(query)) {
    return "You can reach Siva directly:\n• Email: contact@sivapanyam.dev\n• GitHub: https://github.com/SivaPanyam\n• LinkedIn: https://linkedin.com/in/sivapanyam\n• Location: Bangalore, Karnataka, India";
  }

  if (/\b(resume|cv|pdf|download)\b/.test(query)) {
    return "You can access Siva's verified CV payload directly from the header navigation or download it at https://sivapanyam.dev/assets/cv_payload.pdf.";
  }

  // General contextual fallback
  return `I have analyzed your query: "${message}". Siva specializes in Full-Stack TypeScript/React, Three.js 3D web interfaces, and applied AI agent systems. Feel free to ask about his specific projects, tech stack, or email him at contact@sivapanyam.dev!`;
}

router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;
  
  if (!message) {
    res.status(400).json({ error: 'Message payload is required.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Zero-API intelligent response
    const responseText = getIntelligentHeuristicResponse(message);
    res.json({ response: responseText });
    return;
  }

  try {
    const dynamicContext = getContextForQuery(message);
    const systemInstruction = buildSystemInstruction(dynamicContext);

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ response: response.text || getIntelligentHeuristicResponse(message) });
  } catch (error) {
    console.error('Google GenAI Error in route:', error);
    res.json({ response: getIntelligentHeuristicResponse(message) });
  }
});

export default router;

// backend/src/routes/chat.ts
import { Router } from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { getContextForQuery } from '../services/contextManager.js';
import { buildSystemInstruction } from '../services/promptBuilder.js';

const router = Router();

/**
 * Robust local fallback engine that retrieves verified factual data from the 
 * centralized portfolio database when the external LLM API is unavailable.
 */
function getFallbackResponse(message: string): string {
  const context = getContextForQuery(message);
  
  // Format the raw database chunk into a clean, readable text dump
  const cleanContext = context
    .replace('CONTEXT TELEMETRY PIN:', '')
    .replace(/={10,}/g, '')
    .replace(/-{10,}/g, '')
    .trim();

  return `[JARVIS Fallback Core - Offline Mode]
I am currently operating in localized offline telemetry mode. Here is the factual database record matching your query:

${cleanContext}

---
Note: For full conversation capabilities, please verify the network pipeline key. You can also establish a direct communication link via contact@sivapanyam.dev.`;
}

router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;
  
  if (!message) {
    res.status(400).json({ error: 'Message payload is required.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // If the API key is not configured, fall back to our local retrieval engine
    const fallbackText = getFallbackResponse(message);
    res.json({ response: fallbackText });
    return;
  }

  try {
    // 1. Semantic Retrieval: Pull dynamic context subset matching the query
    const dynamicContext = getContextForQuery(message);
    
    // 2. Prompt Compilation: Inject context into our strict system rules
    const systemInstruction = buildSystemInstruction(dynamicContext);

    // 3. Generation: Invoke the Gemini model passing the dynamic system prompt
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ response: response.text || getFallbackResponse(message) });
  } catch (error) {
    console.error('Google GenAI Error in route:', error);
    // Fall back gracefully to preserve a premium operational portfolio interface
    res.json({ response: getFallbackResponse(message) });
  }
});

export default router;

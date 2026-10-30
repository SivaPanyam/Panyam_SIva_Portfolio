// frontend/src/hooks/useChat.ts
import { useState } from 'react';
import { getPseudoAIResponse } from '../utils/aiEngine';

type Message = { role: 'user' | 'ai'; content: string };

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string): Promise<void> => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    return new Promise<void>(async (resolve) => {
      let responseText = '';

      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        const res = await fetch(`${apiBase}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          responseText = data.response;
        }
      } catch {
        // Inactive backend or offline fallback
      }

      // If backend didn't respond or returned a raw fallback error string, use smart heuristic AI
      if (!responseText || responseText.includes('[JARVIS Fallback Core')) {
        await new Promise((r) => setTimeout(r, 260));
        responseText = getPseudoAIResponse(text);
      }

      setIsLoading(false);

      // Add empty AI message container for streaming
      setMessages((prev) => [...prev, { role: 'ai', content: '' }]);

      const words = responseText.split(' ');
      let currentText = '';
      let wordIdx = 0;

      const streamTimer = setInterval(() => {
        if (wordIdx < words.length) {
          currentText += (wordIdx === 0 ? '' : ' ') + words[wordIdx];
          setMessages((prev) => {
            const next = [...prev];
            if (next.length > 0) {
              next[next.length - 1] = { role: 'ai', content: currentText };
            }
            return next;
          });
          wordIdx++;
        } else {
          clearInterval(streamTimer);
          resolve();
        }
      }, 20); // Smooth, realistic token stream
    });
  };

  return { messages, sendMessage, isLoading };
};

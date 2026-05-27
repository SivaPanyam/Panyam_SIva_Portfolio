// frontend/src/hooks/useChat.ts
import { useState } from 'react';

type Message = { role: 'user' | 'ai'; content: string };

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string): Promise<void> => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    return new Promise<void>(async (resolve) => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        const res = await fetch(`${apiBase}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        const responseText = data.response || 'No data telemetry resolved.';

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
        }, 30); // Cinematic 30ms word timing

      } catch (e) {
        console.error('Chat error:', e);
        setIsLoading(false);
        setMessages((prev) => [...prev, { role: 'ai', content: 'Error connecting to neural net.' }]);
        resolve();
      }
    });
  };

  return { messages, sendMessage, isLoading };
};

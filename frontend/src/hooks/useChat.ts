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
      console.error('Chat error:', e);
      setMessages((prev) => [...prev, { role: 'ai', content: 'Error connecting to neural net.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};

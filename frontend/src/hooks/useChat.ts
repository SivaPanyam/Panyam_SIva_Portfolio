// frontend/src/hooks/useChat.ts
import { useState } from 'react';
import { generateAIResponseWithTelemetry, type TelemetryLog } from '../utils/aiEngine';

export type Message = { 
  role: 'user' | 'ai'; 
  content: string;
  telemetry?: TelemetryLog;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTelemetry, setActiveTelemetry] = useState<TelemetryLog | null>(null);

  const sendMessage = async (text: string): Promise<void> => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    return new Promise<void>(async (resolve) => {
      // Simulate natural neural computation time (250-320ms)
      await new Promise((r) => setTimeout(r, 280));

      const { text: responseText, telemetry } = generateAIResponseWithTelemetry(text);
      setActiveTelemetry(telemetry);
      setIsLoading(false);

      // Add empty AI message container for streaming
      setMessages((prev) => [...prev, { role: 'ai', content: '', telemetry }]);

      const words = responseText.split(' ');
      let currentText = '';
      let wordIdx = 0;

      const streamTimer = setInterval(() => {
        if (wordIdx < words.length) {
          currentText += (wordIdx === 0 ? '' : ' ') + words[wordIdx];
          setMessages((prev) => {
            const next = [...prev];
            if (next.length > 0) {
              next[next.length - 1] = { role: 'ai', content: currentText, telemetry };
            }
            return next;
          });
          wordIdx++;
        } else {
          clearInterval(streamTimer);
          resolve();
        }
      }, 20); // Smooth typewriter stream
    });
  };

  return { messages, sendMessage, isLoading, activeTelemetry };
};

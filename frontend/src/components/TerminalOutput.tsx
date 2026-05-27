// frontend/src/components/TerminalOutput.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OutputProps {
  content: string | React.ReactNode;
  onComplete?: () => void;
}

export default function TerminalOutput({ content, onComplete }: OutputProps) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const isString = typeof content === 'string';

  useEffect(() => {
    if (!isString) {
      // If it is a rich React component, call complete instantly and let it mount
      if (onComplete) onComplete();
      return;
    }

    const rawText = content as string;
    
    // Split the text into lines
    const lines = rawText.split('\n');
    let currentLineIdx = 0;
    let accumulatedText = '';

    // Fast progressive line-by-line streaming (extremely cinematic and performant)
    const streamInterval = setInterval(() => {
      if (currentLineIdx >= lines.length) {
        clearInterval(streamInterval);
        if (onComplete) onComplete();
        return;
      }

      accumulatedText += lines[currentLineIdx] + '\n';
      setDisplayedText(accumulatedText);
      currentLineIdx++;
    }, 15); // Fast 15ms stream pacing

    return () => clearInterval(streamInterval);
  }, [content, isString, onComplete]);

  if (!isString) {
    // Wrap rich interactive React elements in a clean Framer Motion entrance fade
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="font-mono"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <pre className="whitespace-pre-wrap font-mono text-zinc-300 text-xs md:text-sm leading-relaxed select-text">
      {displayedText}
    </pre>
  );
}

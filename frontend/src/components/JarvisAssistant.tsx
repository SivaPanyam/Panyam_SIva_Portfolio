// frontend/src/components/JarvisAssistant.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import { transitions, variants } from '../utils/motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

const RECRUITER_QUICKS = [
  { label: '🚀 Core Tech Stack', text: 'What is Siva\'s main technology stack and expertise?' },
  { label: '📂 Top 3 Projects', text: 'Tell me about Siva\'s top 3 featured engineering projects.' },
  { label: '💼 Availability & Role', text: 'Is Siva open to full-time remote or hybrid positions?' },
  { label: '⚡ Hackathons & Lab', text: 'What experimental work has Siva built in his Lab?' },
];

// Pulsing Neural Loading Skeleton
const SkeletonLoader: React.FC = () => (
  <div className="flex gap-2.5 animate-pulse" data-testid="jarvis-skeleton">
    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
      <Bot className="w-4 h-4 text-zinc-600 animate-pulse" />
    </div>
    <div className="flex-1 space-y-2 bg-zinc-900/30 border border-zinc-900/50 p-3.5 rounded-2xl rounded-tl-none max-w-[80%]">
      <div className="h-2 bg-zinc-850 rounded w-5/6" />
      <div className="h-2 bg-zinc-900 rounded w-full" />
      <div className="h-2 bg-zinc-850 rounded w-2/3" />
      <div className="text-[7px] text-zinc-600 font-mono tracking-tighter uppercase mt-1 select-none animate-pulse">
        JARVIS: SYNAPSE CONNECTION CALCULATING...
      </div>
    </div>
  </div>
);

const JarvisAssistant: React.FC = () => {
  const { isJarvisOpen: isOpen } = useUIStore();
  const setIsOpen = (val: boolean) => {
    useUIStore.getState().setJarvisOpen(val);
  };
  const [inputVal, setInputVal] = useState('');
  const { messages, sendMessage, isLoading } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Time-aware Contextual Greeting
  const contextualGreeting = useMemo(() => {
    const hr = new Date().getHours();
    let welcome = 'Greetings!';
    if (hr < 12) {
      welcome = 'Good morning!';
    } else if (hr < 17) {
      welcome = 'Good afternoon!';
    } else {
      welcome = 'Good evening!';
    }
    return `${welcome} I am **Jarvis**, Siva's autonomous portfolio agent. Ask me about his software projects, engineering stack, or schedule an interview!`;
  }, []);

  useEffect(() => {
    // Scroll to bottom on message updates
    if (chatEndRef.current && typeof chatEndRef.current.scrollIntoView === 'function') {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setInputVal('');
    await sendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputVal);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono">
      <AnimatePresence>
        {/* Toggleable Chat Console */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={transitions.springPremium}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[420px] h-[520px] bg-zinc-950/85 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Console Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute inset-0" />
                  <div className="w-2 h-2 bg-green-400 rounded-full relative" />
                </div>
                <span className="text-xs font-bold tracking-widest text-zinc-300 uppercase flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-white" /> JARVIS v1.2
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs md:text-sm scrollbar-thin scrollbar-thumb-zinc-800">
              {/* Initial Jarvis greeting */}
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/60 px-3 py-2.5 rounded-2xl rounded-tl-none text-zinc-300 max-w-[80%] leading-relaxed">
                  {contextualGreeting}
                </div>
              </div>

              {/* Message List */}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`px-3 py-2.5 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-white text-black rounded-tr-none font-sans font-medium'
                      : 'bg-zinc-900/50 border border-zinc-800/60 text-zinc-300 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Advanced Loading Skeleton */}
              {isLoading && <SkeletonLoader />}
              <div ref={chatEndRef} />
            </div>

            {/* Recruiter Quick actions */}
            <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/20">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-zinc-400" /> Recruiter Speed Access
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
                {RECRUITER_QUICKS.map((btn, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.04, borderColor: '#ffffff', color: '#ffffff', boxShadow: '0 0 10px rgba(255,255,255,0.06)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={transitions.springHover}
                    onClick={() => handleSend(btn.text)}
                    disabled={isLoading}
                    className="px-2.5 py-1.5 text-[10px] bg-zinc-900/40 backdrop-blur-md border border-zinc-800 text-zinc-400 rounded-full transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {btn.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input field */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-950 flex items-center gap-2">
              <textarea
                rows={1}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Jarvis a question..."
                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 px-3 text-xs md:text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-600 resize-none font-mono"
              />
              <button
                onClick={() => handleSend(inputVal)}
                disabled={isLoading || !inputVal.trim()}
                className="w-8.5 h-8.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:hover:bg-white active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        variants={variants.jarvisOrb}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="jarvis-toggle"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center cursor-pointer shadow-2xl relative border border-white/20 select-none z-50 focus:outline-none"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <Bot className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
        )}
        {/* Concentric glowing pulse rings */}
        {!isOpen && (
          <>
            <div className={`absolute inset-0 rounded-full border border-white/10 animate-ping opacity-60 pointer-events-none ${isLoading ? 'scale-[1.4] duration-750' : 'scale-125'}`} />
            <div className={`absolute inset-0 rounded-full border border-white/5 animate-pulse opacity-40 pointer-events-none ${isLoading ? 'scale-[1.7] duration-500' : 'scale-150'}`} />
            {isLoading && (
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-400 animate-spin opacity-45 scale-110 pointer-events-none" style={{ animationDuration: '4s' }} />
            )}
          </>
        )}
      </motion.button>
    </div>
  );
};

export default JarvisAssistant;

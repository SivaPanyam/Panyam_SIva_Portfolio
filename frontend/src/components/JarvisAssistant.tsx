// frontend/src/components/JarvisAssistant.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import { transitions } from '../utils/motion';
import { Send, X, Sparkles, Activity, Cpu, Database, ChevronRight, Mic } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

const RECRUITER_QUICKS = [
  { label: '🚀 Core Tech Stack', text: 'What is Siva\'s main technology stack and expertise?' },
  { label: '📂 Top Projects', text: 'Tell me about Siva\'s top featured engineering projects.' },
  { label: '💼 Availability & Role', text: 'Is Siva open to full-time remote or hybrid positions?' },
  { label: '⚡ Career Timeline', text: 'Where has Siva worked and what were his key achievements?' },
];

/**
 * Pulsing Quantum Reactive Orb:
 * State-driven dynamic canvas/SVG core with reactive harmonic waves
 */
const ReactiveOrb: React.FC<{ isThinking: boolean; isListening: boolean; isStreaming: boolean }> = ({
  isThinking,
  isListening,
  isStreaming
}) => {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Outer ambient glow field */}
      <div 
        className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
          isThinking 
            ? 'bg-amber-500/40 scale-125' 
            : isListening 
            ? 'bg-red-500/40 scale-125' 
            : isStreaming 
            ? 'bg-cyan-400/50 scale-135' 
            : 'bg-green-500/25 scale-100 group-hover:scale-115'
        }`} 
      />

      {/* Rotating geometric orbital rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: isStreaming ? 3 : 10, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-[-4px] rounded-full border border-dashed transition-colors duration-300 pointer-events-none ${
          isThinking ? 'border-amber-400/60' : isStreaming ? 'border-cyan-400/70' : 'border-zinc-700/60'
        }`}
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: isStreaming ? 4 : 14, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-[-9px] rounded-full border border-dotted transition-colors duration-300 pointer-events-none ${
          isThinking ? 'border-amber-500/40' : isStreaming ? 'border-cyan-300/50' : 'border-zinc-800/50'
        }`}
      />

      {/* Core Plasma Sphere */}
      <div 
        className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 shadow-inner ${
          isThinking 
            ? 'bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border-amber-300 shadow-amber-500/50' 
            : isListening 
            ? 'bg-gradient-to-tr from-red-600 via-rose-500 to-pink-300 border-rose-300 shadow-rose-500/50 animate-pulse' 
            : isStreaming
            ? 'bg-gradient-to-tr from-cyan-600 via-teal-400 to-emerald-200 border-cyan-200 shadow-cyan-400/50'
            : 'bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700 border-zinc-600 shadow-black'
        }`}
      >
        {/* Harmonic Waveform Bars */}
        <div className="flex items-center gap-[2.5px] h-4">
          {[0.5, 0.9, 0.6, 1.0, 0.7].map((height, i) => (
            <motion.span
              key={i}
              animate={{
                scaleY: isStreaming || isThinking ? [0.3, height, 0.4] : [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: isStreaming ? 0.35 : 1.2,
                repeat: Infinity,
                delay: i * 0.08,
                ease: 'easeInOut'
              }}
              className={`w-[2.5px] rounded-full ${
                isThinking 
                  ? 'bg-amber-950' 
                  : isStreaming 
                  ? 'bg-zinc-950 font-bold' 
                  : 'bg-green-400'
              }`}
              style={{ height: '100%' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const JarvisAssistant: React.FC = () => {
  const { isJarvisOpen: isOpen } = useUIStore();
  const setIsOpen = (val: boolean) => {
    useUIStore.getState().setJarvisOpen(val);
  };

  const [inputVal, setInputVal] = useState('');
  const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { messages, sendMessage, isLoading, activeTelemetry } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isStreaming = useMemo(() => {
    if (messages.length === 0) return false;
    const last = messages[messages.length - 1];
    return last.role === 'ai' && isLoading;
  }, [messages, isLoading]);

  // Contextual greeting
  const contextualGreeting = useMemo(() => {
    const hr = new Date().getHours();
    const timeOfDay = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
    return `${timeOfDay}! I am **JARVIS**, Siva's autonomous portfolio agent. Ask me about his software projects, engineering stack, or schedule an interview!`;
  }, []);

  useEffect(() => {
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

  // Optional Voice Input Handler (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition || 
                              (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser window. Please type your query!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={transitions.springPremium}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[480px] h-[560px] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-zinc-900/70 border-b border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute inset-0 opacity-75" />
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full relative" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-zinc-200 uppercase flex items-center gap-1.5">
                    JARVIS // NEURAL CORE v1.2
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono">
                    Zero-API Sub-40ms Heuristic Intelligence
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Observability Pipeline Toggle */}
                <button
                  onClick={() => setShowTelemetryDrawer(!showTelemetryDrawer)}
                  className={`p-1.5 rounded-lg border text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer ${
                    showTelemetryDrawer
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                      : 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                  title="Toggle RAG Observability Pipeline"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pipeline HUD</span>
                </button>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Observability HUD Telemetry Drawer */}
            <AnimatePresence>
              {showTelemetryDrawer && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-black/90 border-b border-cyan-500/30 p-3 text-[10px] space-y-2 overflow-hidden font-mono"
                >
                  <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-cyan-500/20 pb-1">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> OBSERVABILITY TELEMETRY
                    </span>
                    <span className="text-[9px] text-zinc-400">
                      {activeTelemetry ? `${activeTelemetry.latencyMs}ms Latency` : 'Idle Node'}
                    </span>
                  </div>

                  {activeTelemetry ? (
                    <div className="space-y-1.5 text-zinc-400">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Query Intent:</span>
                        <span className="text-cyan-300 font-semibold">{activeTelemetry.detectedIntent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Model Engine:</span>
                        <span className="text-emerald-400">{activeTelemetry.modelEngine}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-zinc-500 flex items-center gap-1">
                          <Database className="w-2.5 h-2.5" /> Retrieved Context Chunks:
                        </span>
                        <div className="pl-3 space-y-0.5 text-[9px] text-zinc-300">
                          {activeTelemetry.contextChunks.map((chunk, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <ChevronRight className="w-2.5 h-2.5 text-cyan-400" />
                              <span className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800">{chunk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-zinc-600 text-center py-2">
                      Send a message to view live intent routing and retrieved RAG context chunks.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs md:text-sm custom-scrollbar">
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 px-3.5 py-2.5 rounded-2xl rounded-tl-none text-zinc-300 max-w-[85%] leading-relaxed">
                  {contextualGreeting}
                </div>
              </div>

              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  )}
                  <div className={`px-3.5 py-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-100 text-black rounded-tr-none font-sans font-medium'
                      : 'bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 rounded-tl-none whitespace-pre-line'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 animate-pulse">
                  <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-2xl rounded-tl-none text-zinc-500 text-[11px] font-mono">
                    JARVIS: Synthesizing neural response telemetry...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Recruiter Quick Actions */}
            <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-950/40">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Recruiter Speed Access
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
                {RECRUITER_QUICKS.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(btn.text)}
                    disabled={isLoading}
                    className="px-2.5 py-1 text-[10px] bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 rounded-full transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-zinc-900 bg-zinc-950 flex items-center gap-2">
              <button
                onClick={toggleSpeechRecognition}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title={isListening ? "Listening... click to stop" : "Voice input (Speak to JARVIS)"}
              >
                <Mic className="w-4 h-4" />
              </button>

              <textarea
                rows={1}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask JARVIS about projects, stack, or availability..."
                className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-lg py-2 px-3 text-xs md:text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-zinc-600 resize-none font-mono"
              />

              <button
                onClick={() => handleSend(inputVal)}
                disabled={isLoading || !inputVal.trim()}
                className="w-9 h-9 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:hover:bg-white active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reactive Floating Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="jarvis-toggle"
        className="group relative cursor-pointer focus:outline-none select-none"
        title="Toggle JARVIS Autonomous Assistant"
      >
        <ReactiveOrb 
          isThinking={isLoading} 
          isListening={isListening} 
          isStreaming={isStreaming} 
        />
      </button>
    </div>
  );
};

export default JarvisAssistant;

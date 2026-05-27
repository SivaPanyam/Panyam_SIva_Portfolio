// frontend/src/components/Terminal.tsx
import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';
import { commandRegistry, getAutocompleteSuggestion } from '../utils/commandRegistry';
import AsciiHeader from './AsciiHeader';
import TerminalOutput from './TerminalOutput';
import { X, Terminal as TermIcon } from 'lucide-react';

interface LogEntry {
  id: string;
  input: string;
  output: string | React.ReactNode;
  time: string;
}

export default function Terminal() {
  const { isTerminalOpen, toggleTerminal } = useUIStore();
  
  const [inputVal, setInputVal] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport size to scale UI elements dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textMeasurerRef = useRef<HTMLSpanElement>(null);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  // Calculate inline completion prefix
  useEffect(() => {
    if (inputVal.trim() === '') {
      setSuggestion('');
      return;
    }
    const suffix = getAutocompleteSuggestion(inputVal);
    setSuggestion(suffix);
  }, [inputVal]);

  // Auto-scroll logs to bottom container
  const scrollToBottom = () => {
    if (logsEndRef.current && typeof logsEndRef.current.scrollIntoView === 'function') {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, isTyping]);

  // Handle Command Submission
  const handleCommand = async (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to history list
    const newHistory = [...history, trimmed];
    setHistory(newHistory);
    setHistoryIdx(-1);

    const logId = Math.random().toString(36).substring(7);
    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Execute matching script
    const command = commandRegistry[cmdName];
    let output: string | React.ReactNode = '';

    setIsTyping(true);

    if (cmdName === 'clear') {
      setLogs([]);
      setInputVal('');
      setSuggestion('');
      setIsTyping(false);
      return;
    }

    if (command) {
      try {
        output = await command.execute(args);
      } catch (err) {
        output = `[SYSTEM_ERROR] Failed to execute pipeline operation: ${err}`;
      }
    } else {
      output = `[ERROR] Command "${cmdName}" not resolved in prompt registers. Type "help" to view directories.`;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: logId,
        input: trimmed,
        output,
        time: currentTime,
      },
    ]);

    setInputVal('');
    setSuggestion('');
  };

  // Keyboard navigation & Shortcuts listeners
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } 
    
    // Complete autocompletion suffix on Tab or Right Arrow
    else if (e.key === 'Tab' || (e.key === 'ArrowRight' && suggestion)) {
      e.preventDefault();
      if (suggestion) {
        setInputVal((prev) => prev + suggestion);
        setSuggestion('');
      }
    } 
    
    // Command history traversal (Up Arrow)
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
    } 
    
    // Command history traversal (Down Arrow)
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputVal('');
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    }
  };

  // Escape closes console window
  useEffect(() => {
    const checkEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isTerminalOpen) {
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', checkEscape);
    return () => window.removeEventListener('keydown', checkEscape);
  }, [isTerminalOpen, toggleTerminal]);

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md ${
            isMobile ? 'p-0' : 'p-4 md:p-6'
          }`}
        >
          {/* Main console outer shell */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.95, y: 15 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.95, y: 15 }}
            transition={isMobile ? { type: 'tween', duration: 0.3 } : { type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => {
              if (e.target instanceof HTMLButtonElement || (e.target as HTMLElement).closest('button')) return;
              inputRef.current?.focus();
            }}
            className={`bg-black/95 w-full flex flex-col font-mono text-zinc-300 overflow-hidden glass-panel-heavy scanlines-overlay relative ${
              isMobile 
                ? 'h-full rounded-none border-none' 
                : 'border border-zinc-800 max-w-4xl rounded-2xl shadow-2xl h-[75vh]'
            }`}
          >
            
            {/* Holographic Header Bar */}
            <div className="flex justify-between items-center px-5 py-3.5 border-b border-zinc-900 bg-zinc-950/80 z-20">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/60" />
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 font-bold uppercase tracking-wider text-[10px] ml-2">
                  <TermIcon className="w-3.5 h-3.5" />
                  <span>NEURAL OS DEVELOPER SHELL</span>
                </div>
              </div>
              <button 
                onClick={toggleTerminal} 
                className="p-1.5 border border-zinc-900 hover:border-zinc-700 bg-zinc-950 text-zinc-500 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Logs Console workspace */}
            <div 
              className={`flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 font-mono z-10 ${
                isMobile ? 'p-4' : 'p-6'
              }`}
              onClick={() => inputRef.current?.focus()}
            >
              {/* ASCII Header Banner */}
              <AsciiHeader />

              {/* Shell Log Records */}
              {logs.map((log) => (
                <div key={log.id} className="space-y-2.5">
                  {/* Typed Command Prompt */}
                  <div className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm">
                    <span className="text-zinc-600">❯ guest@sivapanyam:~$</span>
                    <span className="text-zinc-200 font-bold">{log.input}</span>
                    <span className="text-[9px] text-zinc-700 ml-auto select-none">{log.time}</span>
                  </div>

                  {/* Progressive Output Streaming */}
                  <div className="pl-4 border-l border-zinc-900/60">
                    <TerminalOutput 
                      content={log.output} 
                      onComplete={() => setIsTyping(false)} 
                    />
                  </div>
                </div>
              ))}

              <div ref={logsEndRef} />
            </div>

            {/* Active Bottom Input Prompt */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-950/80 z-20">
              <div className="flex items-center relative pl-2">
                <span className="mr-2 text-zinc-500 text-xs md:text-sm select-none font-bold">❯</span>
                
                {/* Overlay Text Prediction Sandbox */}
                <div className="absolute left-[20px] right-4 flex items-center pointer-events-none text-xs md:text-sm font-mono leading-none select-none">
                  {/* Invisible span mirroring typed characters to find pixel boundaries */}
                  <span 
                    ref={textMeasurerRef} 
                    className="text-transparent whitespace-pre overflow-hidden"
                  >
                    {inputVal}
                  </span>
                  
                  {/* Autocomplete Dim Suggestion */}
                  {suggestion && (
                    <span className="text-zinc-700 whitespace-pre">
                      {suggestion}
                    </span>
                  )}
                </div>

                {/* Primary Interactive input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command (e.g. about, skills, clear)..."
                  className="w-full bg-transparent outline-none border-none text-zinc-100 placeholder:text-zinc-800 text-xs md:text-sm font-mono focus:ring-0 leading-none relative z-10"
                  autoFocus
                />

                {/* Custom glowing terminal cursor block - Hidden on mobile for clutter-free touch input */}
                {!isMobile && (
                  <div className="absolute right-4 text-[9px] text-zinc-600 bg-zinc-950 border border-zinc-900 rounded px-1.5 py-0.5 select-none uppercase font-mono tracking-tighter">
                    Tab to complete
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

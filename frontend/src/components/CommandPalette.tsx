// frontend/src/components/CommandPalette.tsx
import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useUIStore } from '../store/uiStore';
import { portfolioProjects } from '../utils/projectData';
import { Search, Navigation, Terminal, Cpu, FileText, ArrowRight } from 'lucide-react';

interface PaletteAction {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Commands' | 'Projects';
  shortcut?: string;
  action: () => void;
}

interface PaletteProps {
  onSelectProject: (projectId: string) => void;
}

export default function CommandPalette({ onSelectProject }: PaletteProps) {
  const { 
    isCommandPaletteOpen, toggleCommandPalette, 
    toggleTerminal, toggleDevMode 
  } = useUIStore();

  const [query, setQuery] = useState('');
  const [focusedIdx, setFocusedIdx] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when palette opens
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setFocusedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  // Escape key closes palette
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        toggleCommandPalette();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isCommandPaletteOpen, toggleCommandPalette]);

  // Build the list of available actions
  const actions: PaletteAction[] = [
    // 1. Navigation Actions
    {
      id: 'nav-home',
      title: 'Navigate: Home Section',
      subtitle: 'Jump to the top terminal landing deck.',
      category: 'Navigation',
      action: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },
    {
      id: 'nav-about',
      title: 'Navigate: About Siva',
      subtitle: 'Scroll to Siva\'s profile diagnostics.',
      category: 'Navigation',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },
    {
      id: 'nav-projects',
      title: 'Navigate: Projects Inventory',
      subtitle: 'Browse featured architectural systems.',
      category: 'Navigation',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },
    {
      id: 'nav-skills',
      title: 'Navigate: Capability Grid',
      subtitle: 'Access the core technical skill inventory.',
      category: 'Navigation',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },
    {
      id: 'nav-experience',
      title: 'Navigate: Career Telemetry',
      subtitle: 'Jump to Siva\'s timeline and employment records.',
      category: 'Navigation',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },
    {
      id: 'nav-lab',
      title: 'Navigate: Experimental Lab',
      subtitle: 'Explore the sandbox hackathons and R&D systems.',
      category: 'Navigation',
      action: () => {
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },
    {
      id: 'nav-contact',
      title: 'Navigate: Secure Communication',
      subtitle: 'Establish synapse link and send message forms.',
      category: 'Navigation',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        toggleCommandPalette();
      }
    },

    // 2. Command Shell Shortcuts
    {
      id: 'cmd-terminal',
      title: 'Command: Toggle Developer Shell',
      subtitle: 'Open the retro-terminal console interface directly.',
      category: 'Commands',
      shortcut: '`',
      action: () => {
        toggleCommandPalette();
        toggleTerminal();
      }
    },
    {
      id: 'cmd-devmode',
      title: 'Command: Trigger Developer Matrix Mode',
      subtitle: 'Swap color themes and cascade canvas code rains.',
      category: 'Commands',
      shortcut: '↑↑↓↓',
      action: () => {
        toggleCommandPalette();
        toggleDevMode();
      }
    },
    {
      id: 'cmd-brand',
      title: 'Command: Brand Identity & Style Guide',
      subtitle: 'Open the visual brand manual, interactive canvas, and download logo SVGs.',
      category: 'Commands',
      action: () => {
        toggleCommandPalette();
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'cmd-resume',
      title: 'Link: Open Verified Resume (PDF)',
      subtitle: 'Fetch secure resume payload document in a new tab.',
      category: 'Commands',
      action: () => {
        window.open('https://sivapanyam.dev/assets/cv_payload.pdf', '_blank');
        toggleCommandPalette();
      }
    },
    {
      id: 'cmd-linkedin',
      title: 'Link: Route LinkedIn Synapse',
      subtitle: 'Open Siva\'s professional social profile.',
      category: 'Commands',
      action: () => {
        window.open('https://linkedin.com/in/sivapanyam', '_blank');
        toggleCommandPalette();
      }
    },

    // 3. Project Direct Invocations
    ...portfolioProjects.map(p => ({
      id: `project-${p.id}`,
      title: `System: Launch ${p.title}`,
      subtitle: `Open detailed architectural modal for ${p.title} (${p.status}).`,
      category: 'Projects' as const,
      action: () => {
        toggleCommandPalette();
        onSelectProject(p.id);
      }
    }))
  ];

  // Perform casing-friendly substring fuzzy matching
  const filtered = actions.filter(
    a => 
      a.title.toLowerCase().includes(query.toLowerCase()) || 
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  // Recalculate and bound index coordinates
  useEffect(() => {
    setFocusedIdx(0);
  }, [query]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx((prev) => (filtered.length === 0 ? 0 : (prev + 1) % filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx((prev) => (filtered.length === 0 ? 0 : (prev - 1 + filtered.length) % filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[focusedIdx];
      if (target) {
        target.action();
      }
    }
  };

  const shouldReduceMotion = useReducedMotion();
  const paletteVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { duration: 0.15 } 
        },
        exit: { 
          opacity: 0, 
          transition: { duration: 0.1 } 
        }
      }
    : {
        hidden: { opacity: 0, y: -15, scale: 0.98 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { type: 'spring' as const, stiffness: 350, damping: 28 } 
        },
        exit: { 
          opacity: 0, 
          y: -15, 
          scale: 0.98, 
          transition: { duration: 0.15 } 
        }
      };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          
          {/* Faded overlay glass backing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCommandPalette}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Central Monospace Prompt deck */}
          <motion.div
            variants={paletteVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden glass-panel z-10 scanlines-overlay font-mono outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="System Command Palette"
          >
            
            {/* Command Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-900 bg-zinc-950/60">
              <Search className="w-4 h-4 text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search systems, actions, or jump to..."
                className="w-full bg-transparent outline-none border-none text-zinc-200 placeholder:text-zinc-700 text-xs md:text-sm font-mono focus:ring-0 p-0 leading-none"
                role="combobox"
                aria-expanded={isCommandPaletteOpen}
                aria-autocomplete="list"
                aria-controls="palette-options"
                aria-activedescendant={filtered[focusedIdx] ? `palette-option-${filtered[focusedIdx].id}` : undefined}
              />
              <div className="text-[9px] text-zinc-600 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 select-none font-sans shrink-0">
                ESC to close
              </div>
            </div>

            {/* Filtered Actions List */}
            <div 
              ref={listRef}
              id="palette-options"
              role="listbox"
              aria-label="Available command and section actions"
              className="max-h-[320px] overflow-y-auto custom-scrollbar p-2 space-y-0.5"
            >
              {filtered.length > 0 ? (
                filtered.map((action, idx) => {
                  const isFocused = idx === focusedIdx;
                  
                  // Lucide category resolver icons
                  let CategoryIcon = Navigation;
                  if (action.category === 'Commands') CategoryIcon = Terminal;
                  else if (action.category === 'Projects') CategoryIcon = Cpu;

                  return (
                    <button
                      key={action.id}
                      id={`palette-option-${action.id}`}
                      role="option"
                      aria-selected={isFocused}
                      tabIndex={isFocused ? 0 : -1}
                      onClick={action.action}
                      onMouseEnter={() => setFocusedIdx(idx)}
                      className={`w-full text-left p-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer transition-all duration-150 ${
                        isFocused 
                          ? 'bg-zinc-900 border border-zinc-800/80 text-white shadow-md' 
                          : 'border border-transparent text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-md ${
                          isFocused ? 'bg-zinc-800 text-white' : 'bg-zinc-950/40 text-zinc-600'
                        }`}>
                          <CategoryIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-xs font-bold truncate ${isFocused ? 'text-zinc-100' : 'text-zinc-400'}`}>
                            {action.title}
                          </h4>
                          <p className="text-[10px] text-zinc-500 truncate leading-relaxed mt-0.5 font-sans">
                            {action.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 select-none">
                        {action.shortcut && (
                          <span className="text-[8px] bg-zinc-950 border border-zinc-800/60 rounded px-1.5 py-0.5 text-zinc-600 font-bold uppercase">
                            {action.shortcut}
                          </span>
                        )}
                        {isFocused && (
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-10 text-center flex flex-col items-center justify-center text-zinc-600 text-xs gap-1.5">
                  <FileText className="w-5 h-5 text-zinc-700 animate-bounce" />
                  <span>No matching system directories found.</span>
                </div>
              )}
            </div>

            {/* Command Palette Footer */}
            <div className="px-4 py-2 bg-zinc-950/90 border-t border-zinc-900 flex justify-between items-center text-[8px] text-zinc-600 select-none">
              <div className="flex gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div>
                <span>NEURAL_OS COMMAND PALETTE</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

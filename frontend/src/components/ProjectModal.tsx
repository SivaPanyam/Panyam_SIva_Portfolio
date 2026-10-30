// frontend/src/components/ProjectModal.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  X, Cpu, Terminal, GitBranch, Play, FileText, ChevronRight, 
  HelpCircle, CheckSquare, Layers, Copy, Check 
} from 'lucide-react';
import type { ProjectData } from '../utils/projectData';
import ArchitectureVisualizer from './ArchitectureVisualizer';
import ApiFlowSimulator from './ApiFlowSimulator';
import ProjectLabSandbox from './ProjectLabSandbox';

interface ModalProps {
  project: ProjectData;
  onClose: () => void;
}

const themeStyles: Record<string, {
  text: string;
  bg: string;
  border: string;
  pillBg: string;
  pillText: string;
  tabActive: string;
  accentHex: string;
}> = {
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-950/20',
    border: 'border-amber-500/20',
    pillBg: 'bg-amber-500/10 border-amber-500/20',
    pillText: 'text-amber-400',
    tabActive: 'border-amber-500 text-amber-400 bg-amber-500/5',
    accentHex: '#f59e0b',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/20',
    border: 'border-emerald-500/20',
    pillBg: 'bg-emerald-500/10 border-emerald-500/20',
    pillText: 'text-emerald-400',
    tabActive: 'border-emerald-500 text-emerald-400 bg-emerald-500/5',
    accentHex: '#10b981',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-950/20',
    border: 'border-cyan-500/20',
    pillBg: 'bg-cyan-500/10 border-cyan-500/20',
    pillText: 'text-cyan-400',
    tabActive: 'border-cyan-500 text-cyan-400 bg-cyan-500/5',
    accentHex: '#06b6d4',
  },
  violet: {
    text: 'text-violet-400',
    bg: 'bg-violet-950/20',
    border: 'border-violet-500/20',
    pillBg: 'bg-violet-500/10 border-violet-500/20',
    pillText: 'text-violet-400',
    tabActive: 'border-violet-500 text-violet-400 bg-violet-500/5',
    accentHex: '#8b5cf6',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-950/20',
    border: 'border-rose-500/20',
    pillBg: 'bg-rose-500/10 border-rose-500/20',
    pillText: 'text-rose-400',
    tabActive: 'border-rose-500 text-rose-400 bg-rose-500/5',
    accentHex: '#f43f5e',
  },
};

type TabType = 'overview' | 'architecture' | 'api' | 'sandbox' | 'config';

export default function ProjectModal({ project, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copied, setCopied] = useState(false);
  const style = themeStyles[project.themeColor] || themeStyles.cyan;
  const modalRef = useRef<HTMLDivElement>(null);
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

  // Auto-focus container on mount for immediate a11y keyboard interaction
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is active
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const copyConfig = () => {
    navigator.clipboard.writeText(project.deployment.rawConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shouldReduceMotion = useReducedMotion();
  const modalVariants: any = isMobile
    ? {
        hidden: { y: '100%' },
        visible: { 
          y: 0, 
          transition: { type: 'tween', duration: 0.3 } 
        },
        exit: { 
          y: '100%', 
          transition: { type: 'tween', duration: 0.2 } 
        }
      }
    : shouldReduceMotion
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
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
        },
        exit: { 
          opacity: 0, 
          scale: 0.95,
          transition: { duration: 0.2, ease: 'easeIn' as const }
        }
      };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
      isMobile ? 'p-0' : 'p-4 md:p-6'
    }`}>
      
      {/* Black ambient background glass overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Primary Dashboard Container */}
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`bg-zinc-950/95 shadow-2xl relative z-10 flex flex-col overflow-hidden glass-panel-heavy scanlines-overlay outline-none ${
          isMobile 
            ? 'w-full h-full rounded-none border-none' 
            : 'w-full max-w-5xl h-[88vh] border border-zinc-800 rounded-2xl'
        }`}
      >
        
        {/* Cinematic ambient spotlight color base */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-28 opacity-10 blur-3xl rounded-full pointer-events-none"
          style={{ backgroundColor: style.accentHex }}
        />

        {/* Modal Header Panel */}
        <header className={`${isMobile ? 'p-4' : 'p-6'} border-b border-zinc-900 relative z-20 flex justify-between items-start gap-4`}>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded border font-bold ${style.pillBg} ${style.pillText}`}>
                {project.status}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {project.category === 'featured' ? 'Featured architecture' : 'Experimental R&D Sandbox'}
              </span>
            </div>
            
            <h2 id="modal-title" className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight select-text mt-1.5">
              {project.title}
            </h2>
            
            <p id="modal-description" className="text-zinc-400 font-sans text-xs md:text-sm max-w-2xl select-text leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 border border-zinc-800 hover:border-zinc-500 rounded-lg text-zinc-500 hover:text-white bg-zinc-900/40 hover:bg-zinc-950 transition-all cursor-pointer group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </header>

        {/* Dynamic Mission Tabs Navigator */}
        <div 
          role="tablist"
          aria-label="Project details and simulation modes"
          className={`${isMobile ? 'px-4' : 'px-6'} border-b border-zinc-900 bg-zinc-950/50 flex overflow-x-auto scrollbar-none gap-2 font-mono text-[10px] uppercase`}
        >
          {[
            { id: 'overview', label: '01 // Summary', icon: FileText },
            { id: 'architecture', label: '02 // Node Map', icon: Layers },
            { id: 'api', label: '03 // API Sequence', icon: Terminal },
            { id: 'sandbox', label: '04 // Telemetry Run', icon: Play },
            { id: 'config', label: '05 // Deploy Config', icon: GitBranch },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const active = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-3.5 border-b-2 font-bold cursor-pointer whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  active 
                    ? style.tabActive 
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Dashboard Deck Content */}
        <div 
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className={`flex-1 overflow-y-auto custom-scrollbar min-h-0 select-text outline-none ${
            isMobile ? 'p-4' : 'p-6'
          }`}
        >
          
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Problem Statement Alert Panel */}
                <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-red-400 font-bold font-mono text-xs uppercase">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>01 // Problem Statement</span>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                {/* Solution Architecture Block */}
                <div className="p-5 border border-zinc-900 bg-zinc-950/40 rounded-xl">
                  <h4 className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-2">
                    <Cpu className="w-4 h-4 text-zinc-400" /> 02 // Solution Architecture
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {project.solutionArchitecture}
                  </p>
                </div>

                {/* Key Features Checkgrid */}
                <div>
                  <h4 className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-3.5">
                    <CheckSquare className="w-4 h-4 text-zinc-400" /> 03 // Key System Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3.5 font-sans text-xs md:text-sm">
                    {project.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="p-3 border border-zinc-900 bg-zinc-950/20 rounded-lg flex items-start gap-3">
                        <div className={`p-1 bg-zinc-900 rounded border ${style.border} ${style.text} shrink-0 mt-0.5`}>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                        <span className="text-zinc-400 leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Stack Inventory Grid */}
                <div>
                  <h4 className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-3">
                    <Layers className="w-4 h-4 text-zinc-400" /> 04 // Core Technical Inventory
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {['Frontend', 'Backend', 'AI/ML', 'Infrastructure'].map((cat) => {
                      const items = project.techStack.filter(i => i.category === cat);
                      if (items.length === 0) return null;
                      return (
                        <div key={cat} className="p-4 border border-zinc-900 bg-zinc-950/60 rounded-xl flex flex-col">
                          <span className="text-[10px] text-zinc-500 font-bold font-mono uppercase border-b border-zinc-900 pb-1.5 mb-2.5">{cat}</span>
                          <div className="flex flex-col gap-1.5 font-mono text-[10px] text-zinc-400">
                            {items.map((it, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span className={`w-1 h-1 rounded-full bg-zinc-600`} />
                                <span>{it.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* System Visuals & Mockups */}
                <div className="border-t border-zinc-900 pt-6">
                  <h4 className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-4">
                    <Terminal className="w-4 h-4 text-zinc-400" /> 05 // System Visuals & Interface Mockups
                  </h4>
                  
                  {/* CSS-based high-tech browser/terminal window mockup */}
                  <div className="w-full bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl relative">
                    <div className="bg-black/80 px-4 py-2.5 border-b border-zinc-900 flex justify-between items-center font-mono text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/20" />
                        <span className="text-zinc-500 ml-2 font-mono">interface_blueprint_wireframe.sh</span>
                      </div>
                      <span className="text-zinc-600">SYS_VIEW: ONLINE</span>
                    </div>
                    
                    <div className="p-6 aspect-[16/9] sm:aspect-[21/9] bg-zinc-950 flex flex-col justify-center items-center relative overflow-hidden font-mono text-center select-none pointer-events-none">
                      {/* Technical mesh pattern background */}
                      <div className="absolute inset-0 neural-grid-lines opacity-10" />
                      
                      {/* Spotlight glow effect */}
                      <div 
                        className="absolute w-56 h-56 rounded-full opacity-[0.06] blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                        style={{ backgroundColor: style.accentHex }}
                      />
                      
                      {/* Content resolver depending on project ID */}
                      {project.id === 'tuneaura' && (
                        <div className="space-y-4 w-full max-w-md relative z-10 animate-fade-in">
                          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">[BIOMETRIC ACOUSTICS OSCILLOSCOPE]</div>
                          <div className="flex justify-center items-end gap-1.5 h-16">
                            {[0.3, 0.7, 0.45, 0.9, 0.6, 0.85, 0.4, 0.75, 0.5, 0.95, 0.35, 0.65].map((val, i) => (
                              <motion.div 
                                key={i}
                                animate={{ height: [`${val * 100}%`, `${(val > 0.5 ? val - 0.2 : val + 0.2) * 100}%`, `${val * 100}%`] }}
                                transition={{ repeat: Infinity, duration: 1.5 + i * 0.15, ease: 'easeInOut' }}
                                className="w-1.5 bg-amber-500/35 rounded-t"
                              />
                            ))}
                          </div>
                          <div className="text-[9px] text-zinc-500">DYNAMIC SYNAPSE PATTERN: ALPHA WAVES (10.5Hz) ACTIVE</div>
                        </div>
                      )}
                      
                      {project.id === 'studybuddy' && (
                        <div className="space-y-3 w-full max-w-md relative z-10 animate-fade-in">
                          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">[MULTI-MODAL VECTOR MEMORY SEGMENTS]</div>
                          <div className="border border-emerald-950/60 bg-emerald-950/10 p-3 rounded-lg text-left text-[9px] text-zinc-400 space-y-1.5">
                            <div className="flex justify-between text-zinc-600 font-mono text-[8px]">
                              <span>CHUNK_ID: #8F9E_CS101</span>
                              <span>COSINE_SIMILARITY: 0.942</span>
                            </div>
                            <p className="line-clamp-2 text-zinc-300 font-sans leading-relaxed">
                              "The SuperMemo SM-2 spaced repetition algorithm calculates the interval between reviews based on a user's target response quality factor..."
                            </p>
                            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                              <motion.div 
                                animate={{ width: ['0%', '94%', '94%'] }}
                                transition={{ duration: 2, ease: 'easeOut' }}
                                className="h-full bg-emerald-500" 
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {project.id === 'kubeassist' && (
                        <div className="space-y-4 w-full max-w-sm relative z-10 animate-fade-in text-[10px]">
                          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1">[LOCAL-LLM TELEMETRY POD ORBIT]</div>
                          <div className="grid grid-cols-4 gap-2">
                            {['api', 'auth', 'db', 'cache', 'proxy', 'worker', 'cron', 'queue'].map((pod, i) => (
                              <div key={pod} className="p-2 border border-zinc-900 bg-zinc-950/80 rounded flex flex-col items-center gap-1.5">
                                <motion.span 
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ repeat: Infinity, duration: 1.5 + i * 0.25, ease: 'easeInOut' }}
                                  className={`w-1.5 h-1.5 rounded-full ${i === 3 ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`}
                                />
                                <span className="text-[8px] text-zinc-500 font-bold uppercase font-mono">{pod}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-[8px] text-red-400 uppercase font-mono tracking-tighter">Event Detected: auth-service-23a (Exit 137 OOMKilled)</div>
                        </div>
                      )}
                      
                      {project.id === 'rivalrise' && (
                        <div className="space-y-4 w-full max-w-sm relative z-10 animate-fade-in text-[9px]">
                          <div className="text-[10px] text-violet-400 font-bold uppercase tracking-widest mb-1">[GAME-THEORETIC NASH STRATEGY MATRIX]</div>
                          <div className="grid grid-cols-3 gap-1.5 border border-zinc-900/60 p-2 bg-zinc-950/40 rounded-lg font-mono">
                            <div className="text-zinc-600">Equilibrium</div>
                            <div className="text-zinc-500 font-bold">Move A</div>
                            <div className="text-zinc-500 font-bold">Move B</div>
                            <div className="text-zinc-500 font-bold">User Strategy</div>
                            <div className="bg-violet-950/20 border border-violet-900/50 text-violet-400 p-1.5 rounded font-bold">Nash: (12, -4)</div>
                            <div className="bg-zinc-900/30 border border-zinc-900/20 text-zinc-500 p-1.5 rounded">Option: (4, 8)</div>
                            <div className="text-zinc-500 font-bold">Competitor</div>
                            <div className="bg-zinc-900/30 border border-zinc-900/20 text-zinc-500 p-1.5 rounded">Option: (-2, 10)</div>
                            <div className="bg-zinc-900/30 border border-zinc-900/20 text-zinc-500 p-1.5 rounded">Option: (0, 0)</div>
                          </div>
                          <div className="text-[8px] text-zinc-500">SIMULATION STEP: COMPETING FORCE COEFFICIENTS COMPUTED</div>
                        </div>
                      )}
                      
                      {project.id === 'airestaurant' && (
                        <div className="space-y-3 w-full max-w-xs relative z-10 animate-fade-in">
                          <div className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1">[GEOSPATIAL ROUTING SYNAPSE]</div>
                          <div className="relative border border-zinc-900 bg-zinc-950/60 p-3 rounded-lg flex flex-col gap-2 font-mono text-[9px] text-left">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]" />
                              <span className="text-zinc-300">Stop 1: Bella Cucina (Italian) // 20:00</span>
                            </div>
                            <div className="h-4 border-l border-dashed border-zinc-800 ml-[2.5px]" />
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                              <span className="text-zinc-500">Stop 2: Caffe Nero (Dessert) // 8 min walk</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Fallback mock blueprint wireframe */}
                      {project.id !== 'tuneaura' && project.id !== 'studybuddy' && project.id !== 'kubeassist' && project.id !== 'rivalrise' && project.id !== 'airestaurant' && (
                        <div className="space-y-2 relative z-10 animate-fade-in text-[10px]">
                          <Cpu className={`w-8 h-8 ${style.text} mx-auto mb-1 animate-spin`} style={{ animationDuration: '6s' }} />
                          <div className="text-white font-bold uppercase tracking-widest">{project.title} Interface Blueprint</div>
                          <div className="text-zinc-500">Visual mockup coordinates resolved. Telemetry streaming active.</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* R&D Development Notes & Storytelling */}
                {project.developmentNotes && (
                  <div className="border-t border-zinc-900 pt-6 animate-fade-in">
                    <h4 className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-4">
                      <Terminal className="w-4 h-4 text-zinc-400" /> 06 // R&D Development Notes & Storytelling
                    </h4>
                    <div className="relative p-6 border border-zinc-900 bg-zinc-950/40 rounded-xl overflow-hidden glass-panel-heavy">
                      {/* Monospaced large quotation mark backing */}
                      <span className="absolute -top-4 -left-2 text-8xl font-mono text-zinc-800/10 pointer-events-none select-none">“</span>
                      
                      <div className="relative z-10 flex gap-4">
                        <div className={`text-4xl font-mono leading-none ${style.text} select-none`}>“</div>
                        <p className="font-sans text-xs md:text-sm text-zinc-300 italic leading-relaxed select-text self-center">
                          {project.developmentNotes}
                        </p>
                      </div>
                      
                      {/* Sub-label showing engineer authorization metadata */}
                      <div className="mt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500 border-t border-zinc-900/80 pt-3">
                        <span>ORCHESTRATOR PATHWAY: authorization_siva.key</span>
                        <span className="uppercase text-zinc-600 font-bold">Verified Narrative</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* SYSTEM ARCHITECTURE TAB */}
            {activeTab === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="space-y-2 mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">Telemetry Node Map</span>
                  <p className="text-xs text-zinc-400 font-sans">
                    Inspect the spatial layout of active database connections, gateways, and AI compute pools below.
                  </p>
                </div>

                <ArchitectureVisualizer 
                  nodes={project.architecture.nodes} 
                  connections={project.architecture.connections} 
                  themeColor={project.themeColor} 
                />
              </motion.div>
            )}

            {/* API & OPTIMIZATION TAB */}
            {activeTab === 'api' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* API Request Sequences */}
                <ApiFlowSimulator 
                  steps={project.apiFlow} 
                  themeColor={project.themeColor} 
                />

                {/* Performance Optimizations and Metrics */}
                <div className="grid sm:grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
                  {project.optimizations.map((opt, idx) => (
                    <div key={idx} className="p-4 border border-zinc-900 bg-zinc-950/60 rounded-xl flex flex-col justify-between">
                      <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-2">{opt.metric}</span>
                      <div className={`text-2xl font-black ${style.text} tracking-tight font-mono mb-2`}>
                        {opt.value}
                      </div>
                      <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Challenges Faced Case Studies */}
                <div className="space-y-4 border-t border-zinc-900 pt-6">
                  <h4 className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase">
                    <HelpCircle className="w-4 h-4 text-zinc-400" /> 05 // Engineering Challenges & Solves
                  </h4>
                  <div className="space-y-4">
                    {project.challenges.map((chal, idx) => (
                      <div key={idx} className="p-5 border border-zinc-900 bg-zinc-950/40 rounded-xl grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-widest text-red-500 font-bold block">CHALLENGE 0{idx + 1} // {chal.title}</span>
                          <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">{chal.desc}</p>
                        </div>
                        <div className="space-y-1 border-t md:border-t-0 md:border-l border-zinc-900 pt-3.5 md:pt-0 md:pl-5">
                          <span className="text-[8px] uppercase tracking-widest text-green-500 font-bold block">SOLUTION TELEMETRY</span>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{chal.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* INTERACTIVE SANDBOX TAB */}
            {activeTab === 'sandbox' && (
              <motion.div
                key="sandbox"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1 mb-2 font-sans text-xs">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono block">Simulated Operations Console</span>
                  <p className="text-zinc-400">
                    Interact directly with active calculations, visualizers, or ledgers representing {project.title} telemetry interfaces.
                  </p>
                </div>

                <ProjectLabSandbox 
                  projectId={project.id} 
                  themeColor={project.themeColor} 
                />
              </motion.div>
            )}

            {/* DEPLOYMENT & ROADMAP CONFIG TAB */}
            {activeTab === 'config' && (
              <motion.div
                key="config"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-5 gap-6"
              >
                
                {/* Left Side: Deployment Specs & Future Roadmap */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Deployment summary */}
                  <div className="p-4 border border-zinc-900 bg-zinc-950/60 rounded-xl space-y-4 font-mono text-[10px]">
                    <span className="text-[9px] text-zinc-500 uppercase block border-b border-zinc-900 pb-1">Deployment Telemetry</span>
                    <div className="space-y-2">
                      <div>
                        <span className="text-zinc-600 block">PLATFORM GATEWAY:</span>
                        <span className="text-white font-bold block mt-0.5">{project.deployment.platform}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block">CI/CD INTEGRATION:</span>
                        <span className="text-white font-bold block mt-0.5">{project.deployment.cicd}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block">METRIC MONITORING:</span>
                        <span className="text-white font-bold block mt-0.5">{project.deployment.telemetry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Future Roadmap timelines */}
                  <div className="space-y-3">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Future Roadmap Milestones</span>
                    <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-900">
                      {project.roadmap.map((point, idx) => (
                        <div key={idx} className="relative pl-6 text-[10px]">
                          <div className={`absolute left-[5px] top-[5px] w-2 h-2 rounded-full bg-zinc-950 border border-${project.themeColor}-500/50`} />
                          <span className="text-zinc-300 font-sans leading-relaxed block">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Shell Code Block Terminal */}
                <div className="lg:col-span-3 flex flex-col bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden min-h-[300px]">
                  <div className="flex justify-between items-center bg-black/90 px-4 py-2 border-b border-zinc-900 font-mono text-[10px]">
                    <span className="text-zinc-500">manifest_config.yaml</span>
                    
                    <button 
                      onClick={copyConfig}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-[8px] text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[8px]">Copy Specs</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto max-h-[350px] custom-scrollbar bg-black/95 font-mono text-[10px] leading-tight select-text text-cyan-500/80 scrollbar-thin">
                    <pre className="whitespace-pre">{project.deployment.rawConfig}</pre>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </motion.div>
    </div>
  );
}

// frontend/src/components/BootSequence.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface BootSequenceProps {
  onComplete: () => void;
}

type BootPhase = 'wakeup' | 'neural' | 'diagnostics' | 'network' | 'jarvis' | 'loading';

const BOOT_LOGS = [
  { text: 'SYSTEM WAKEUP: NEURAL OS v1.0.4', delay: 200 },
  { text: 'LOADING HYPERVISOR DRIVERS... DONE', delay: 450 },
  { text: 'INITIALIZING COGNITIVE INTERFACE LAYER...', delay: 750 },
  { text: 'ALLOCATING NEURAL MEMORY (16.4 TFLOPs)... SUCCESS', delay: 1050 },
  { text: 'DIAGNOSTICS: CORE MODULES AUDITED', delay: 1350 },
  { text: 'DIAGNOSTICS COMPLETED. COGNITIVE REGISTERS SECURE.', delay: 1650 },
  { text: 'ESTABLISHING SECURE PORTFOLIO SYNAPSE...', delay: 1950 },
  { text: 'NETWORK LATENCY: 12ms (BANGALORE EDGE LINKED)', delay: 2250 },
  { text: 'AI COPROCESSOR "JARVIS" STATUS: ONLINE', delay: 2550 },
  { text: 'SYNCHRONIZING CORE CONTEXT MATRIX...', delay: 2850 },
  { text: 'RESOLVING INTERACTION & BRAND SCHEMAS...', delay: 3150 },
  { text: 'GATEWAY READY. COMPILING PORTFOLIO ENVIRONMENT...', delay: 3450 },
];

// 1. System Wakeup Sub-Widget
const WakeupWidget = () => (
  <div className="flex flex-col items-center justify-center" data-testid="widget-wakeup">
    <div className="relative w-20 h-20 flex items-center justify-center border border-zinc-900 rounded-full bg-zinc-950/20">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-3 h-3 bg-white rounded-full"
      />
      <span className="absolute text-[7px] text-zinc-600 tracking-tighter uppercase font-mono bottom-2 select-none">SYS_INIT</span>
    </div>
    <div className="mt-6 flex items-center gap-1 font-mono">
      <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">System Wakeup</span>
      <motion.span 
        animate={{ opacity: [1, 0, 1] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3 bg-white ml-0.5"
      />
    </div>
  </div>
);

// 2. Neural Initialization Sub-Widget
const NeuralWidget = () => (
  <div className="flex flex-col items-center justify-center" data-testid="widget-neural">
    <div className="relative w-44 h-44 flex items-center justify-center">
      {/* Blueprint concentric orbiting lines */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute inset-0 border border-dashed border-zinc-800 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="absolute inset-4 border border-zinc-900/80 rounded-full"
      />
      <motion.div 
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.45, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute inset-8 border border-zinc-800 rounded-full"
      />
      
      {/* Node pulse center */}
      <div className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
      </div>
      <span className="absolute text-[8px] text-zinc-600 uppercase tracking-widest font-bold bottom-10">SYNAPSE_GRID</span>
    </div>
    <div className="mt-6 flex flex-col items-center font-mono">
      <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest animate-pulse">Neural Initialization</span>
      <span className="text-[9px] text-zinc-600 mt-1.5 uppercase tracking-wide">Mapping lattice coordinate matrix...</span>
    </div>
  </div>
);

// 3. AI Diagnostics Sub-Widget (Rotating HUD sectors)
const DiagnosticsWidget = () => {
  const [diagVal, setDiagVal] = useState(0.00);
  
  useEffect(() => {
    const int = setInterval(() => {
      setDiagVal(parseFloat((Math.random() * 45 + 10).toFixed(2)));
    }, 70);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center" data-testid="widget-diagnostics">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full absolute inset-0 text-zinc-900" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 3" fill="none" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="white" 
            strokeWidth="0.75" 
            strokeDasharray="20 120"
            fill="none" 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px', filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))' }}
          />
        </svg>
        <div className="flex flex-col items-center justify-center z-10 font-mono">
          <span className="text-xl font-bold text-white tracking-widest">{diagVal} <span className="text-[9px] text-zinc-500">TF</span></span>
          <span className="text-[8px] text-zinc-600 uppercase tracking-widest mt-1">Diagnostic Sweep</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center font-mono">
        <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">AI Diagnostics</span>
        <span className="text-[9px] text-green-500 mt-1.5 uppercase font-bold border border-green-950 bg-green-950/15 px-2.5 py-0.5 rounded tracking-tighter">COGNITIVE_MEM: PASS</span>
      </div>
    </div>
  );
};

// 4. Network Synchronization Sub-Widget (Pulsing node coordinates)
const NetworkWidget = () => (
  <div className="flex flex-col items-center justify-center" data-testid="widget-network">
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg className="w-full h-full absolute inset-0 text-zinc-900" viewBox="0 0 100 100">
        <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="0.5" />
        <line x1="80" y1="30" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
        <line x1="50" y1="80" x2="20" y2="30" stroke="currentColor" strokeWidth="0.5" />
        <line x1="50" y1="80" x2="50" y2="47" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Signal pulses */}
        <motion.line 
          x1="20" y1="30" x2="80" y2="30" 
          stroke="white" strokeWidth="0.75" 
          strokeDasharray="4 20"
          animate={{ strokeDashoffset: [-24, 24] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        />
        <motion.line 
          x1="80" y1="30" x2="50" y2="80" 
          stroke="white" strokeWidth="0.75" 
          strokeDasharray="4 20"
          animate={{ strokeDashoffset: [-24, 24] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        />
        
        <circle cx="20" cy="30" r="2.5" fill="white" />
        <circle cx="80" cy="30" r="2.5" fill="white" />
        <circle cx="50" cy="80" r="2.5" fill="white" />
        
        <circle cx="50" cy="47" r="3.5" fill="white" />
        <motion.circle 
          cx="50" cy="47" r="7" 
          stroke="white" strokeWidth="0.5" fill="none"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
      </svg>
      <span className="absolute text-[8px] text-zinc-600 uppercase tracking-widest font-bold bottom-10">EDGE_TUNNEL</span>
    </div>
    <div className="mt-6 flex flex-col items-center font-mono">
      <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">Network Synchronization</span>
      <span className="text-[9px] text-zinc-500 mt-1.5 uppercase">BGLR Node Secured // TLS Active</span>
    </div>
  </div>
);

// 5. Jarvis Activation Sub-Widget (Immersive voice assistant frequency orb)
const JarvisWidget = () => (
  <div className="flex flex-col items-center justify-center" data-testid="widget-jarvis">
    <div className="relative w-44 h-44 flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="absolute w-36 h-36 border border-zinc-800 rounded-full"
      />
      <motion.div 
        animate={{ scale: [1.12, 0.9, 1.12], opacity: [0.08, 0.28, 0.08] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute w-40 h-40 border border-zinc-900 rounded-full"
      />
      
      {/* Interactive voice core */}
      <div className="relative w-24 h-24 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.08)]">
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 0.9, 1.15, 1],
            opacity: [0.6, 0.95, 0.5, 0.85, 0.6]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full bg-white blur-[2.5px] shadow-[0_0_20px_rgba(255,255,255,0.85)]"
        />
        <span className="absolute text-[8px] text-zinc-500 font-bold tracking-widest uppercase">JARVIS</span>
      </div>
    </div>
    <div className="mt-6 flex flex-col items-center font-mono">
      <span className="text-[11px] text-white font-bold uppercase tracking-widest">Jarvis Activation</span>
      <span className="text-[9px] text-zinc-500 mt-1.5 uppercase">Cognitive Co-Pilot Gateway Online</span>
    </div>
  </div>
);

// 6. Environment Loading Sub-Widget (Polished logo fade in)
const EnvironmentWidget = () => (
  <div className="flex flex-col items-center justify-center" data-testid="widget-loading">
    <div className="relative w-44 h-44 flex items-center justify-center">
      <Logo variant="icon" size={110} interactive={false} className="filter drop-shadow-[0_0_25px_rgba(255,255,255,0.12)] animate-pulse" />
    </div>
    <div className="mt-6 flex flex-col items-center font-mono">
      <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">Environment Loading</span>
      <span className="text-[9px] text-zinc-500 mt-1.5 uppercase font-bold tracking-wider">Compiling Portfolio Workspace...</span>
    </div>
  </div>
);

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [bootPhase, setBootPhase] = useState<BootPhase>('wakeup');

  useEffect(() => {
    // Check if user has booted in this session/visit before
    const hasBooted = localStorage.getItem('siva_portfolio_booted');
    if (hasBooted) {
      onComplete();
      setIsSkipped(true);
      return;
    }

    let currentPercent = 0;
    let timer: ReturnType<typeof setTimeout>;

    // Simulation loops pacing to feel premium and realistic
    const runTimer = () => {
      let increment = 1;
      let nextDelay = 35;

      if (currentPercent < 15) {
        setBootPhase('wakeup');
        increment = 1.6;
        nextDelay = 20; // Quick wakeup
      } else if (currentPercent >= 15 && currentPercent < 35) {
        setBootPhase('neural');
        increment = 0.8;
        nextDelay = 45; // Slow neural pathing
      } else if (currentPercent >= 35 && currentPercent < 55) {
        setBootPhase('diagnostics');
        increment = 2.8;
        nextDelay = 15; // Fast diagnostics
      } else if (currentPercent >= 55 && currentPercent < 75) {
        setBootPhase('network');
        increment = 0.6;
        nextDelay = 65; // Network delay checking
      } else if (currentPercent >= 75 && currentPercent < 90) {
        setBootPhase('jarvis');
        increment = 1.4;
        nextDelay = 30; // Jarvis sync
      } else {
        setBootPhase('loading');
        increment = 2.2;
        nextDelay = 20; // Fast end loaded
      }

      currentPercent = Math.min(currentPercent + increment, 100);
      setPercent(Math.round(currentPercent));

      if (currentPercent < 100) {
        timer = setTimeout(runTimer, nextDelay);
      } else {
        setTimeout(() => {
          handleFinish();
        }, 800);
      }
    };

    timer = setTimeout(runTimer, 100);

    // Boot logs timing trigger mapping
    const logTimers = BOOT_LOGS.map((log) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    // ESC key binder for diagnostic skipping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      logTimers.forEach((t) => clearTimeout(t));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFinish = () => {
    localStorage.setItem('siva_portfolio_booted', 'true');
    onComplete();
  };

  const skipBoot = () => {
    handleFinish();
  };

  if (isSkipped) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white font-mono flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden">
      {/* CRT overlay vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)] z-10" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-20"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)`,
          backgroundSize: '100% 4px',
        }}
      />

      {/* Top Header Section */}
      <div className="flex justify-between items-center z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white animate-pulse rounded-full" />
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Siva Panyam / Neural OS v1.0.4</span>
        </div>
        <button 
          onClick={skipBoot}
          className="px-4 py-2 border border-zinc-800 hover:border-white bg-zinc-950/60 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 rounded text-[9px] md:text-xs uppercase tracking-widest cursor-pointer active:scale-95 z-40 flex items-center gap-2 font-bold font-mono"
        >
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          Skip Diagnostics [ESC]
        </button>
      </div>

      {/* Central Morphing Diagnostic Widgets Container */}
      <div className="flex-1 my-6 flex flex-col justify-between overflow-hidden max-w-4xl mx-auto w-full z-30">
        <div className="flex-1 flex items-center justify-center my-auto py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={bootPhase}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center"
            >
              {bootPhase === 'wakeup' && <WakeupWidget />}
              {bootPhase === 'neural' && <NeuralWidget />}
              {bootPhase === 'diagnostics' && <DiagnosticsWidget />}
              {bootPhase === 'network' && <NetworkWidget />}
              {bootPhase === 'jarvis' && <JarvisWidget />}
              {bootPhase === 'loading' && <EnvironmentWidget />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Real-time Streaming Command Console Logs */}
        <div className="space-y-1.5 font-mono text-[9px] md:text-[10px] select-text selection:bg-white selection:text-black border-t border-zinc-900/60 pt-4 max-h-[140px] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2"
              >
                <span className="text-zinc-600 select-none">❯</span>
                <span className={idx === logs.length - 1 ? 'text-white' : 'text-zinc-500'}>
                  {log}
                </span>
                {idx === logs.length - 1 && (
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1 h-3 bg-white"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Metrics Section */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-3 z-30">
        <div className="flex justify-between text-[10px] md:text-xs tracking-widest text-zinc-400 font-mono">
          <span>COGNITIVE ARRAY SYNC: {percent}%</span>
          <span>STATION: 12.9716° N / 77.5946° E</span>
        </div>
        <div className="w-full h-[3px] bg-zinc-900 rounded-full relative overflow-visible">
          <motion.div 
            className="h-full bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_4px_#ffffff]" 
            style={{ width: `${percent}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-[8px] md:text-[9px] text-zinc-600 uppercase font-mono tracking-tighter">
          <span>Warning: Establish neural synapse interface connection</span>
          <span>Gateway: Secured // SSL-256 Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;

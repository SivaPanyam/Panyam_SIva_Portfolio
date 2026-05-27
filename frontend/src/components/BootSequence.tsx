// frontend/src/components/BootSequence.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: 'SYSTEM WAKEUP: NEURAL OS v1.0.4', delay: 200 },
  { text: 'LOADING HYPERVISOR DRIVERS... DONE', delay: 400 },
  { text: 'INITIALIZING COGNITIVE INTERFACE LAYER...', delay: 600 },
  { text: 'ALLOCATING NEURAL MEMORY (16.4 TFLOPs)... SUCCESS', delay: 900 },
  { text: 'ESTABLISHING SECURE PORTFOLIO SYNAPSE...', delay: 1100 },
  { text: 'DIAGNOSTICS: CORE MODULES STABLE', delay: 1400 },
  { text: 'NETWORK LATENCY TEST: 12ms (BANGALORE EDGE)', delay: 1700 },
  { text: 'AI COPROCESSOR "JARVIS" STATUS: ONLINE', delay: 2000 },
  { text: 'SYNCHRONIZING PORTFOLIO ASSETS...', delay: 2300 },
  { text: 'DIAGNOSTICS COMPLETED. BOOTING PORTFOLIO ENVIRONMENT...', delay: 2700 },
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check if user has booted in this session/visit before
    const hasBooted = localStorage.getItem('siva_portfolio_booted');
    if (hasBooted) {
      onComplete();
      setIsSkipped(true);
      return;
    }

    // Percentage counter animation (0 to 100 over ~3.2s)
    const totalDuration = 3200;
    const intervalTime = 32;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const percentInterval = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setPercent(progress);
      if (progress >= 100) {
        clearInterval(percentInterval);
        setTimeout(() => {
          handleFinish();
        }, 600);
      }
    }, intervalTime);

    // Boot logs typing animation
    const logTimers = BOOT_LOGS.map((log) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    return () => {
      clearInterval(percentInterval);
      logTimers.forEach((timer) => clearTimeout(timer));
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
      {/* Visual Glitch/CRT scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(18,18,18,0)_0%,rgba(0,0,0,0.8)_100%)] z-10" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-20"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)`,
          backgroundSize: '100% 4px',
        }}
      />

      {/* Top bar */}
      <div className="flex justify-between items-center z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-white animate-pulse rounded-full" />
          <span className="text-xs uppercase tracking-widest text-zinc-400">Siva Panyam / Neural OS v1.0.4</span>
        </div>
        <button 
          onClick={skipBoot}
          className="px-4 py-2 border border-zinc-800 bg-zinc-950 hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded text-xs uppercase tracking-widest cursor-pointer active:scale-95"
        >
          Skip Diagnostics [ESC]
        </button>
      </div>

      {/* Middle Terminal Log Stream & Central Core Logo */}
      <div className="flex-1 my-6 flex flex-col justify-between overflow-hidden max-w-4xl mx-auto w-full z-30">
        <div className="flex flex-col items-center justify-center my-auto py-6">
          <Logo variant="icon" size={130} interactive={false} className="mb-3 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[9px] tracking-[0.25em] text-zinc-500 uppercase font-mono"
          >
            SYS_GATEWAY: Synchronizing Core Lattice
          </motion.span>
        </div>
        
        <div className="space-y-2 md:space-y-2.5 font-mono text-[10px] md:text-[11px] select-text selection:bg-white selection:text-black border-t border-zinc-900/60 pt-4 max-h-[160px] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2"
              >
                <span className="text-zinc-600">❯</span>
                <span className={idx === logs.length - 1 ? 'text-white' : 'text-zinc-500'}>
                  {log}
                </span>
                {idx === logs.length - 1 && (
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1.5 h-3.5 bg-white"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Diagnostics Progress Bar */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-4 z-30">
        <div className="flex justify-between text-xs tracking-widest text-zinc-400">
          <span>COGNITIVE ARRAY SYNC: {percent}%</span>
          <span>STATION: 12.9716° N / 77.5946° E</span>
        </div>
        <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full" 
            style={{ width: `${percent}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-zinc-600 uppercase">
          <span>Warning: Do not disrupt neural interface setup</span>
          <span>Secure Connection / Encrypted SSL-256</span>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;

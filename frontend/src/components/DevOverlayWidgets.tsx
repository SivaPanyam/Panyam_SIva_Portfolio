// frontend/src/components/DevOverlayWidgets.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, ShieldAlert, Wifi } from 'lucide-react';

export default function DevOverlayWidgets() {
  const [compilerLogs, setCompilerLogs] = useState<string[]>([
    '[INIT] Dev Mode engaged.',
    '[NPM] Scanning dependency locks...',
    '[NPM] Audited 311 packages successfully.'
  ]);

  const [sysMetrics, setSysMetrics] = useState({
    cpu: '12.4',
    ram: '38.2',
    network: '8'
  });

  // 1. Compiler Output Streamer
  useEffect(() => {
    const mockLogs = [
      '[LINT] Auditing App.tsx imports... OK',
      '[VITE] Hot Module Replacement active',
      '[COMPILER] Bundling matrix configurations...',
      '[VECTOR] Fetching local Pinecone context grids...',
      '[VECTOR] Index resolved. 104 keys read.',
      '[WEBAUDIO] Telemetry oscillator buffers set',
      '[RAFT] Consensus ledger leader syncing: Node_1',
      '[NET] WebRTC signaling channels synchronized',
      '[SYSTEM] Port 3000 listening successfully',
      '[SYSTEM] Port 8080 telemetry database active'
    ];

    const interval = setInterval(() => {
      const nextLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const currentTime = new Date().toLocaleTimeString([], { hour12: false });
      setCompilerLogs((prev) => {
        const nextList = [...prev, `[${currentTime}] ${nextLog}`];
        return nextList.slice(-5); // Keep the last 5 logs
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 2. CPU Core Load & RAM telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setSysMetrics({
        cpu: (Math.random() * 15 + 8).toFixed(1),
        ram: (Math.random() * 2 + 38).toFixed(1),
        network: (Math.random() * 4 + 6).toFixed(0)
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none font-mono text-[9px] text-green-400 select-none">
      
      {/* 1. TOP LEFT - Compiler Output */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.7, x: 0 }}
        className="absolute top-6 left-6 w-72 p-3 bg-black/90 border border-green-500/20 rounded-lg shadow-lg shadow-green-500/5 hidden md:block"
      >
        <div className="flex items-center gap-1.5 border-b border-green-500/10 pb-1.5 mb-2 font-bold uppercase tracking-wider text-[8px] text-green-500">
          <Terminal className="w-3 h-3 animate-pulse" />
          <span>Vite Compiler Stdout</span>
        </div>
        <div className="space-y-1 text-green-400/80 leading-tight">
          {compilerLogs.map((log, i) => (
            <div key={i} className="truncate">{log}</div>
          ))}
        </div>
      </motion.div>

      {/* 2. TOP RIGHT - CPU Core Load & RAM */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.7, x: 0 }}
        className="absolute top-6 right-6 w-56 p-3 bg-black/90 border border-green-500/20 rounded-lg shadow-lg shadow-green-500/5 hidden md:block"
      >
        <div className="flex items-center gap-1.5 border-b border-green-500/10 pb-1.5 mb-2 font-bold uppercase tracking-wider text-[8px] text-green-500">
          <Cpu className="w-3 h-3" />
          <span>Core Telemetry Dashboard</span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 text-green-400/80">
          <div>CPU LOAD:</div>
          <div className="text-right font-bold text-white">{sysMetrics.cpu}%</div>
          
          <div>RAM USED:</div>
          <div className="text-right font-bold text-white">{sysMetrics.ram}%</div>
          
          <div>WORKERS:</div>
          <div className="text-right font-bold text-white">8 threads</div>
        </div>
      </motion.div>

      {/* 3. BOTTOM LEFT - Latency Streams */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        className="absolute bottom-6 left-6 p-3 bg-black/90 border border-green-500/20 rounded-lg hidden lg:block"
      >
        <div className="flex items-center gap-1.5 text-green-500 font-bold uppercase tracking-wider text-[8px] mb-1">
          <Wifi className="w-3 h-3 animate-pulse" />
          <span>Gateway Network Node</span>
        </div>
        <div className="text-green-400/80">
          LATENCY: <span className="text-white font-bold">{sysMetrics.network}ms</span> // INDIRANAGAR_EDGE
        </div>
      </motion.div>

      {/* 4. BOTTOM RIGHT - Security Outlines */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        className="absolute bottom-6 right-6 p-3 bg-black/90 border border-green-500/20 rounded-lg hidden lg:block"
      >
        <div className="flex items-center gap-1.5 text-green-500 font-bold uppercase tracking-wider text-[8px] mb-1">
          <ShieldAlert className="w-3 h-3" />
          <span>Secure Synapse</span>
        </div>
        <div className="text-green-400/80">
          OS_SECURITY: <span className="text-white font-bold">GUEST_SUDO</span> // COMPILER_STABLE
        </div>
      </motion.div>

    </div>
  );
}

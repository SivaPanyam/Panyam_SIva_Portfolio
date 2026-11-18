// frontend/src/components/SystemTelemetryInspector.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Layers, Terminal as TermIcon, Palette, X, HardDrive, Wifi } from 'lucide-react';
import { useUIStore, type GlobalAccentTheme } from '../store/uiStore';

export const SystemTelemetryInspector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTheme, setActiveTheme, toggleTerminal } = useUIStore();
  const [fps, setFps] = useState(60);
  const [memoryMB, setMemoryMB] = useState(42);
  const [latency, setLatency] = useState(14);

  // Monitor live framerate & simulate memory ticks
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(Math.round((frameCount * 1000) / (now - lastTime)), 60));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);

    const memInterval = setInterval(() => {
      if ((performance as any).memory) {
        setMemoryMB(Math.round((performance as any).memory.usedJSHeapSize / 1048576));
      } else {
        setMemoryMB(Math.floor(38 + Math.random() * 8));
      }
      setLatency(Math.floor(11 + Math.random() * 6));
    }, 2000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(memInterval);
    };
  }, []);

  const themes: { id: GlobalAccentTheme; label: string; hex: string }[] = [
    { id: 'default', label: 'Monochrome', hex: '#ffffff' },
    { id: 'cyan', label: 'Cyan', hex: '#06b6d4' },
    { id: 'matrix', label: 'Matrix', hex: '#39ff14' },
    { id: 'amber', label: 'Amber', hex: '#f59e0b' },
    { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
    { id: 'rose', label: 'Rose', hex: '#f43f5e' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 w-80 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-2xl p-4 text-xs space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-[11px] uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Runtime Telemetry Inspector</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-500 hover:text-white rounded transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-zinc-900/60 border border-zinc-800/80 rounded-lg">
                <span className="text-[9px] text-zinc-500 uppercase block">Engine FPS</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{fps}</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-800/80 rounded-lg">
                <span className="text-[9px] text-zinc-500 uppercase block">JS Heap</span>
                <span className="text-sm font-bold text-white font-mono">{memoryMB} MB</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-800/80 rounded-lg">
                <span className="text-[9px] text-zinc-500 uppercase block">Link Ping</span>
                <span className="text-sm font-bold text-cyan-400 font-mono">{latency}ms</span>
              </div>
            </div>

            {/* Technical Node Details */}
            <div className="space-y-1.5 text-[10px] text-zinc-400 border border-zinc-900 bg-zinc-900/30 p-2.5 rounded-lg font-mono">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5" /> Client Engine:
                </span>
                <span className="text-zinc-200">React 19 + Three.js WebGL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Layers className="w-2.5 h-2.5" /> Spatial Vertices:
                </span>
                <span className="text-zinc-200">3,500 Starfield + Neural Lattice</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <HardDrive className="w-2.5 h-2.5" /> Query Subsystem:
                </span>
                <span className="text-emerald-400 font-bold">Zero-API In-Memory BM25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5" /> Station Node:
                </span>
                <span className="text-zinc-200">Bangalore, IN [Edge Active]</span>
              </div>
            </div>

            {/* Accent Theme Switcher */}
            <div className="space-y-1.5">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1">
                <Palette className="w-2.5 h-2.5 text-zinc-400" /> System Accent Color
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTheme(t.id)}
                    className={`h-7 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                      activeTheme === t.id
                        ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                        : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/60'
                    }`}
                    title={t.label}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Terminal Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                toggleTerminal();
              }}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <TermIcon className="w-3 h-3 text-emerald-400" /> Open Developer Shell (` ~ )
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <motion.button
        data-testid="telemetry-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3.5 py-2 rounded-full glass-panel-heavy border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 flex items-center gap-2 cursor-pointer shadow-xl transition-all font-mono text-[11px]"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold tracking-wider uppercase text-[10px]">Telemetry</span>
        <span className="text-[9px] text-zinc-500 bg-zinc-900/80 px-1.5 py-0.5 rounded border border-zinc-800">
          {fps} FPS
        </span>
      </motion.button>
    </div>
  );
};

export default SystemTelemetryInspector;

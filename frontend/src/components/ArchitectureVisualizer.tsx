// frontend/src/components/ArchitectureVisualizer.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Shield, Cpu, Server, Database, Zap, Sparkles, RefreshCw, 
  HelpCircle, CornerDownRight 
} from 'lucide-react';
import type { DiagramNode, DiagramConnection } from '../utils/projectData';

interface VisualizerProps {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  themeColor: string; // 'amber' | 'emerald' | 'cyan' | 'violet' | 'rose'
}

// Map node types to Lucide Icons
const iconMap: Record<DiagramNode['type'], React.ComponentType<any>> = {
  client: Laptop,
  gateway: Shield,
  orchestrator: Cpu,
  service: Server,
  db: Database,
  cache: Zap,
  queue: RefreshCw,
  ai: Sparkles,
};

// Map themes to class styles
const themeClasses: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  amber: {
    bg: 'bg-amber-950/20',
    border: 'border-amber-500/30 hover:border-amber-400',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    text: 'text-amber-400',
  },
  emerald: {
    bg: 'bg-emerald-950/20',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-950/20',
    border: 'border-cyan-500/30 hover:border-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    text: 'text-cyan-400',
  },
  violet: {
    bg: 'bg-violet-950/20',
    border: 'border-violet-500/30 hover:border-violet-400',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    text: 'text-violet-400',
  },
  rose: {
    bg: 'bg-rose-950/20',
    border: 'border-rose-500/30 hover:border-rose-400',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]',
    text: 'text-rose-400',
  },
};

const nodeTypeLabels: Record<DiagramNode['type'], string> = {
  client: 'User Client Interface',
  gateway: 'Security Edge Gateway',
  orchestrator: 'Dynamic Agent / Broker',
  service: 'Microservice Daemon',
  db: 'Persistent Cluster DB',
  cache: 'In-Memory Cache Layer',
  queue: 'Message Buffer Queue',
  ai: 'Neural Network / LLM',
};

const nodeTechExamples: Record<DiagramNode['type'], string> = {
  client: 'Web/Mobile Client (Web Audio, Canvas API, WebRTC)',
  gateway: 'Nginx, Socket.io Signaling, Cloudflare Rules',
  orchestrator: 'LangChain Orchestrator, CrewAI Swarm, Raft Leader',
  service: 'FastAPI, Rust-WASM engine, Go Daemon Core',
  db: 'PostgreSQL Vector (PGVector), Pinecone Vector Indexes',
  cache: 'Redis KV, In-Memory Ring Buffer, Local Cache',
  queue: 'Redis Streams, RabbitMQ Channels, Kafka Pub-Sub',
  ai: 'Ollama local core, Gemini API, PyTorch Model, TFLite',
};

export default function ArchitectureVisualizer({ nodes, connections, themeColor }: VisualizerProps) {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  const theme = themeClasses[themeColor] || themeClasses.cyan;

  // Render SVG connections with smooth quadratic bezier curves
  const renderConnection = (conn: DiagramConnection, idx: number) => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return null;

    // Convert 0-100 percentage coordinates into an 800 x 400 SVG coordinate system
    const startX = (fromNode.x / 100) * 800;
    const startY = (fromNode.y / 100) * 400;
    const endX = (toNode.x / 100) * 800;
    const endY = (toNode.y / 100) * 400;

    // Draw control point for curve: find midpoint and apply vertical offset
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const isLoopback = fromNode.id === toNode.id;

    let pathData = '';
    if (isLoopback) {
      // Loopback curve
      pathData = `M ${startX - 20} ${startY} C ${startX - 50} ${startY - 50}, ${startX + 50} ${startY - 50}, ${startX + 20} ${startY}`;
    } else {
      // Standard curve - curve slightly depending on directness
      const controlY = midY - (startX - endX !== 0 ? 30 : 0);
      pathData = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
    }

    return (
      <g key={idx} className="group/path">
        {/* Transparent thick line for hover support */}
        <path
          d={pathData}
          fill="none"
          stroke="transparent"
          strokeWidth="12"
          className="cursor-pointer"
        />
        {/* Background connection line */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(63, 63, 70, 0.4)"
          strokeWidth="2"
          className="group-hover/path:stroke-zinc-600 transition-colors"
        />
        {/* Glowing data packets running forward */}
        <path
          d={pathData}
          fill="none"
          stroke={`url(#glowGradient-${themeColor})`}
          strokeWidth="2.5"
          strokeDasharray="8 30"
          className="animate-[dash_6s_linear_infinite]"
          style={{
            strokeDashoffset: idx * 40,
          }}
        />
        {/* Label display */}
        {conn.label && (
          <foreignObject
            x={midX - 70}
            y={midY - 22}
            width="140"
            height="18"
            className="pointer-events-none"
          >
            <div className="text-[9px] font-mono text-zinc-500 bg-black/90 border border-zinc-900 rounded py-0.5 text-center truncate">
              {conn.label}
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 font-mono select-none">
      {/* Dynamic Graph Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[300px] border border-zinc-900 rounded-xl bg-zinc-950/80 overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Ambient background lines */}
        <div className="absolute inset-0 neural-grid-lines pointer-events-none" />
        
        {/* SVG Drawing Layer */}
        <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full z-10">
          <defs>
            {/* Theme Gradients */}
            <linearGradient id="glowGradient-amber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="glowGradient-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="glowGradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="glowGradient-violet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="glowGradient-rose" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="1" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Draw Paths */}
          {connections.map((c, i) => renderConnection(c, i))}
        </svg>

        {/* Nodes overlay (DOM elements for high-quality mouse tracking/animations) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {nodes.map((node) => {
            const Icon = iconMap[node.type] || HelpCircle;
            const isSelected = selectedNode?.id === node.id;
            
            return (
              <motion.button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`absolute pointer-events-auto flex items-center justify-center p-3 rounded-lg border bg-black/90 cursor-pointer focus:outline-none transition-all duration-300 ${
                  isSelected 
                    ? `border-${themeColor}-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-${themeColor}-500/50` 
                    : 'border-zinc-800 hover:border-zinc-500 shadow-md'
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon className={`w-5 h-5 ${isSelected ? theme.text : 'text-zinc-400'}`} />
                  <span className={`text-[8px] font-bold tracking-tight px-1 py-0.5 rounded ${
                    isSelected ? `${theme.bg} ${theme.text}` : 'text-zinc-500'
                  }`}>
                    {node.label}
                  </span>
                </div>
                {isSelected && (
                  <span className={`absolute -inset-[2px] rounded-lg border border-${themeColor}-500/50 animate-ping opacity-30`} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic canvas control instructions */}
        <div className="absolute bottom-3 right-4 z-20 text-[9px] text-zinc-500 select-none flex items-center gap-1.5 bg-black/80 border border-zinc-900/60 rounded px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>Active Telemetry Streams. Click nodes to query details.</span>
        </div>
      </div>

      {/* Selected Node Details Panel */}
      <div className="min-h-[110px]">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-xl border ${theme.bg} ${theme.border} backdrop-blur-md relative`}
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs uppercase tracking-widest px-2 py-0.5 bg-black border border-zinc-800 rounded font-bold ${theme.text}`}>
                      {selectedNode.type}
                    </span>
                    <h4 className="text-sm font-bold text-white uppercase">{selectedNode.label} Node</h4>
                  </div>
                  <span className="text-[10px] text-zinc-500">{nodeTypeLabels[selectedNode.type]}</span>
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-zinc-500 hover:text-white text-xs cursor-pointer px-2 py-1 bg-black/50 hover:bg-black border border-zinc-900 rounded"
                >
                  Clear Diagnostics
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-3 text-xs pt-3 border-t border-zinc-900">
                <div className="space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase">Core Framework / Technology</div>
                  <div className="text-zinc-300 font-sans flex items-center gap-1.5">
                    <CornerDownRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    {nodeTechExamples[selectedNode.type]}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase">Interactive Node Vector</div>
                  <div className="text-zinc-400 font-mono text-[10px]">
                    X: {selectedNode.x}% / Y: {selectedNode.y}% | Node ID: <span className="text-zinc-300 font-bold">{selectedNode.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[110px] flex flex-col items-center justify-center border border-zinc-900 border-dashed rounded-xl bg-zinc-950/20 text-center"
            >
              <HelpCircle className="w-5 h-5 text-zinc-600 mb-2 animate-bounce" />
              <span className="text-xs text-zinc-500">Click a node in the telemetry diagram to query structural interfaces.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Animation stylesheet override */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -400;
          }
        }
      `}</style>
    </div>
  );
}

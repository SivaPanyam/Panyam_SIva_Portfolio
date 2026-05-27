// frontend/src/components/ProjectCard.tsx
import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Music, BookOpen, Terminal as TermIcon, Target, Utensils, 
  Leaf, Sparkles, BarChart2, Wallet, ArrowUpRight, Cpu 
} from 'lucide-react';
import type { ProjectData } from '../utils/projectData';
import { transitions } from '../utils/motion';

interface CardProps {
  project: ProjectData;
  onClick: () => void;
}

// Icon Resolver map
const iconMap: Record<string, React.ComponentType<any>> = {
  Music,
  BookOpen,
  Terminal: TermIcon,
  Target,
  Utensils,
  Leaf,
  Sparkles,
  BarChart2,
  Wallet,
};

// Map themes to Tailwind classes
const themeStyles: Record<string, {
  border: string;
  glow: string;
  badge: string;
  pillBg: string;
  pillText: string;
  text: string;
  accent: string;
}> = {
  amber: {
    border: 'hover:border-amber-500/50',
    glow: 'glow-amber',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    pillBg: 'bg-amber-950/20 border-amber-900/30 hover:border-amber-500/40',
    pillText: 'text-amber-400/80 hover:text-white',
    text: 'text-amber-400',
    accent: '#f59e0b',
  },
  emerald: {
    border: 'hover:border-emerald-500/50',
    glow: 'glow-emerald',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pillBg: 'bg-emerald-950/20 border-emerald-900/30 hover:border-emerald-500/40',
    pillText: 'text-emerald-400/80 hover:text-white',
    text: 'text-emerald-400',
    accent: '#10b981',
  },
  cyan: {
    border: 'hover:border-cyan-500/50',
    glow: 'glow-cyan',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    pillBg: 'bg-cyan-950/20 border-cyan-900/30 hover:border-cyan-500/40',
    pillText: 'text-cyan-400/80 hover:text-white',
    text: 'text-cyan-400',
    accent: '#06b6d4',
  },
  violet: {
    border: 'hover:border-violet-500/50',
    glow: 'glow-violet',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    pillBg: 'bg-violet-950/20 border-violet-900/30 hover:border-violet-500/40',
    pillText: 'text-violet-400/80 hover:text-white',
    text: 'text-violet-400',
    accent: '#8b5cf6',
  },
  rose: {
    border: 'hover:border-rose-500/50',
    glow: 'glow-rose',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    pillBg: 'bg-rose-950/20 border-rose-900/30 hover:border-rose-500/40',
    pillText: 'text-rose-400/80 hover:text-white',
    text: 'text-rose-400',
    accent: '#f43f5e',
  },
};

export default function ProjectCard({ project, onClick }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to track absolute mouse coordinate displacements
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spotlight Coordinates
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  // Smooth springs to filter rapid coordinate spikes
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), transitions.springHover);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), transitions.springHover);

  const style = themeStyles[project.themeColor] || themeStyles.cyan;
  const Icon = iconMap[project.iconName] || Cpu;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates between 0 and width
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    // Normalize coordinates to a range of -0.5 to 0.5
    const normalizedX = (relativeX / rect.width) - 0.5;
    const normalizedY = (relativeY / rect.height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);

    // Set spotlight exact coordinates
    spotlightX.set(relativeX);
    spotlightY.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Return springs to default centering
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-1000 w-full"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={`w-full group h-full cursor-pointer relative rounded-2xl glass-panel border border-zinc-800/80 p-6 flex flex-col justify-between preserve-3d transition-all duration-500 overflow-hidden ${style.border} ${style.glow}`}
      >
        
        {/* Spotlight dynamic hover background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([latestX, latestY]) => 
                `radial-gradient(450px circle at ${latestX}px ${latestY}px, ${style.accent}15, transparent 80%)`
            ),
          }}
        />

        {/* Dynamic scanlines texture for engineering atmosphere */}
        <div className="absolute inset-0 scanlines-overlay opacity-10 pointer-events-none" />
        
        {/* Parallax elements layout container */}
        <div className="preserve-3d flex flex-col justify-between h-full relative z-20">
          
          {/* Card Header Area */}
          <div className="flex justify-between items-start mb-6 preserve-3d translate-z-20">
            {/* Project Accent Icon with backing container */}
            <div className={`p-3 bg-zinc-950 border border-zinc-900 rounded-xl relative group-hover:scale-105 transition-transform duration-300`}>
              <Icon className={`w-6 h-6 ${style.text}`} />
              <span className={`absolute -inset-[1px] rounded-xl border border-${project.themeColor}-500/20 opacity-30 animate-pulse`} />
            </div>

            {/* Launch vector tag and indicator */}
            <div className="flex items-center gap-2">
              <span className={`text-[8px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold shrink-0 ${style.badge}`}>
                {project.status}
              </span>
              <div className="p-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-white group-hover:border-zinc-500 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card Body Area */}
          <div className="mb-6 preserve-3d translate-z-40">
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono mb-1 block">
              {project.category === 'featured' ? '01 // FEATURED PRODUCT' : '02 // EXPERIMENTAL LAB'}
            </span>
            <h3 className="text-xl font-black text-white uppercase group-hover:text-zinc-200 tracking-tight transition-colors mb-2">
              {project.title}
            </h3>
            <p className="text-zinc-400 font-sans text-xs md:text-sm leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Card Footer Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 preserve-3d translate-z-60 mt-auto pt-4 border-t border-zinc-900">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <motion.span 
                key={idx} 
                whileHover={{ y: -2 }}
                className={`px-2.5 py-1 text-[8px] font-mono font-bold rounded uppercase border ${style.pillBg} ${style.pillText}`}
              >
                {tech.name}
              </motion.span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[8px] font-mono font-bold rounded uppercase border border-zinc-900 bg-zinc-950 text-zinc-600">
                +{project.techStack.length - 4} MORE
              </span>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}

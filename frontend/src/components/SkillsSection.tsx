// frontend/src/components/SkillsSection.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Monitor, Server, Cloud, Database, Wrench, ChevronRight, Sparkles } from 'lucide-react';
import { skillCategories } from '../utils/profileData';
import { transitions, variants } from '../utils/motion';

const iconMap = {
  Brain,
  Monitor,
  Server,
  Cloud,
  Database,
  Wrench,
};

const themeStyles: Record<string, {
  border: string;
  glow: string;
  badge: string;
  barBg: string;
  barFill: string;
  text: string;
  accent: string;
}> = {
  amber: {
    border: 'hover:border-amber-500/40',
    glow: 'glow-amber',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    barBg: 'bg-amber-950/20 border-amber-900/30',
    barFill: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
    text: 'text-amber-400',
    accent: '#f59e0b',
  },
  emerald: {
    border: 'hover:border-emerald-500/40',
    glow: 'glow-emerald',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    barBg: 'bg-emerald-950/20 border-emerald-900/30',
    barFill: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
    text: 'text-emerald-400',
    accent: '#10b981',
  },
  cyan: {
    border: 'hover:border-cyan-500/40',
    glow: 'glow-cyan',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    barBg: 'bg-cyan-950/20 border-cyan-900/30',
    barFill: 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]',
    text: 'text-cyan-400',
    accent: '#06b6d4',
  },
  violet: {
    border: 'hover:border-violet-500/40',
    glow: 'glow-violet',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    barBg: 'bg-violet-950/20 border-violet-900/30',
    barFill: 'bg-violet-500 shadow-[0_0_8px_#8b5cf6]',
    text: 'text-violet-400',
    accent: '#8b5cf6',
  },
  rose: {
    border: 'hover:border-rose-500/40',
    glow: 'glow-rose',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    barBg: 'bg-rose-950/20 border-rose-900/30',
    barFill: 'bg-rose-500 shadow-[0_0_8px_#f43f5e]',
    text: 'text-rose-400',
    accent: '#f43f5e',
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-start font-mono text-[10px] uppercase">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 font-bold ${
            activeCategory === null
              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
              : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 bg-zinc-950/20'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Show All Stack</span>
        </button>
        {skillCategories.map((cat) => {
          const style = themeStyles[cat.themeColor] || themeStyles.cyan;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 font-bold ${
                isActive
                  ? `bg-zinc-950 text-white ${style.border} ${style.glow} border-zinc-700`
                  : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 bg-zinc-950/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.barFill}`} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Skill Categories */}
      <motion.div
        variants={variants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories
          .filter((cat) => activeCategory === null || cat.id === activeCategory)
          .map((cat) => {
            const style = themeStyles[cat.themeColor] || themeStyles.cyan;
            const Icon = iconMap[cat.iconName] || Brain;

            return (
              <motion.div
                key={cat.id}
                variants={variants.slideUpFade}
                whileHover={{ y: -4 }}
                transition={transitions.springHover}
                className={`p-6 border border-zinc-800 bg-zinc-950/40 rounded-2xl relative group flex flex-col justify-between h-full overflow-hidden transition-all duration-500 ${style.border} ${style.glow}`}
              >
                {/* Tech blueprint corner brackets */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-800 group-hover:border-${cat.themeColor}-500/40 transition-colors duration-300 pointer-events-none rounded-tl`} />
                <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-800 group-hover:border-${cat.themeColor}-500/40 transition-colors duration-300 pointer-events-none rounded-tr`} />
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-800 group-hover:border-${cat.themeColor}-500/40 transition-colors duration-300 pointer-events-none rounded-bl`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-800 group-hover:border-${cat.themeColor}-500/40 transition-colors duration-300 pointer-events-none rounded-br`} />

                <div>
                  {/* Category Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl relative group-hover:scale-105 transition-transform duration-300">
                      <Icon className={`w-5.5 h-5.5 ${style.text}`} />
                    </div>
                    <span className={`text-[8px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold ${style.badge}`}>
                      {cat.subtitle}
                    </span>
                  </div>

                  <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-6 group-hover:text-zinc-200 transition-colors font-mono">
                    {cat.title}
                  </h3>

                  {/* Skills List with depth indicators */}
                  <div className="space-y-4 font-mono text-[10px]">
                    {cat.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-2 group/skill">
                        <div className="flex justify-between items-center text-zinc-400 group-hover/skill:text-white transition-colors">
                          <span className="font-semibold text-zinc-300">{skill.name}</span>
                          <span className="text-[9px] text-zinc-500 font-bold">{skill.depth}% Depth</span>
                        </div>

                        {/* Engineering-style progress bar */}
                        <div className={`w-full h-1 bg-zinc-900/60 rounded-full border border-zinc-900 overflow-hidden relative`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.depth}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className={`h-full rounded-full ${style.barFill}`}
                          />
                        </div>

                        {/* Real-world telemetry metric log */}
                        {skill.metrics && (
                          <div className="text-[8px] text-zinc-600 flex items-center gap-1 group-hover/skill:text-zinc-400 transition-colors leading-none">
                            <ChevronRight className="w-2.5 h-2.5 shrink-0" />
                            <span>Telemetry Log: {skill.metrics}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
}

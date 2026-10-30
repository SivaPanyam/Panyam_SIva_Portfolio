// frontend/src/components/ExperienceTimeline.tsx
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Cpu, ChevronRight, Zap } from 'lucide-react';
import { experienceTimeline } from '../utils/profileData';

const iconMap = {
  professional: Briefcase,
  internship: GraduationCap,
  hackathon: Trophy,
  workshop: Cpu,
};

const themeStyles: Record<string, {
  border: string;
  glow: string;
  badge: string;
  bullet: string;
  metricBorder: string;
  metricText: string;
  text: string;
  accent: string;
}> = {
  amber: {
    border: 'hover:border-amber-500/40 border-amber-950/20 bg-amber-950/5',
    glow: 'glow-amber',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    bullet: 'bg-amber-500 shadow-[0_0_10px_#f59e0b] border-amber-400/50',
    metricBorder: 'border-amber-950/50 bg-amber-950/10',
    metricText: 'text-amber-400',
    text: 'text-amber-400',
    accent: '#f59e0b',
  },
  emerald: {
    border: 'hover:border-emerald-500/40 border-emerald-950/20 bg-emerald-950/5',
    glow: 'glow-emerald',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bullet: 'bg-emerald-500 shadow-[0_0_10px_#10b981] border-emerald-400/50',
    metricBorder: 'border-emerald-950/50 bg-emerald-950/10',
    metricText: 'text-emerald-400',
    text: 'text-emerald-400',
    accent: '#10b981',
  },
  cyan: {
    border: 'hover:border-cyan-500/40 border-cyan-950/20 bg-cyan-950/5',
    glow: 'glow-cyan',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    bullet: 'bg-cyan-500 shadow-[0_0_10px_#06b6d4] border-cyan-400/50',
    metricBorder: 'border-cyan-950/50 bg-cyan-950/10',
    metricText: 'text-cyan-400',
    text: 'text-cyan-400',
    accent: '#06b6d4',
  },
  violet: {
    border: 'hover:border-violet-500/40 border-violet-950/20 bg-violet-950/5',
    glow: 'glow-violet',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    bullet: 'bg-violet-500 shadow-[0_0_10px_#8b5cf6] border-violet-400/50',
    metricBorder: 'border-violet-950/50 bg-violet-950/10',
    metricText: 'text-violet-400',
    text: 'text-violet-400',
    accent: '#8b5cf6',
  },
  rose: {
    border: 'hover:border-rose-500/40 border-rose-950/20 bg-rose-950/5',
    glow: 'glow-rose',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    bullet: 'bg-rose-500 shadow-[0_0_10px_#f43f5e] border-rose-400/50',
    metricBorder: 'border-rose-950/50 bg-rose-950/10',
    metricText: 'text-rose-400',
    text: 'text-rose-400',
    accent: '#f43f5e',
  },
};

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* High-fidelity vertical timeline center track */}
      <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 pointer-events-none -translate-x-1/2" />

      {/* Timeline items list */}
      <div className="space-y-16">
        {experienceTimeline.map((item, idx) => {
          const style = themeStyles[item.themeColor] || themeStyles.cyan;
          const Icon = iconMap[item.category] || Briefcase;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={item.id}
              className={`relative flex flex-col sm:flex-row justify-between items-start sm:items-center w-full group`}
            >
              {/* Pulsing Timeline Anchor Node point */}
              <div 
                className={`absolute left-4 sm:left-1/2 top-1.5 sm:top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 z-20 -translate-x-1/2 ${style.bullet}`}
              />

              {/* Staggered dynamic cards layout grid */}
              <div className={`w-full sm:w-[46%] ${
                isEven ? 'sm:order-1 sm:text-right sm:items-end' : 'sm:order-2 sm:text-left sm:items-start'
              } pl-10 sm:pl-0 flex flex-col gap-1.5`}>
                <span className="text-[10px] text-zinc-500 font-bold tracking-widest font-mono uppercase">
                  {item.period}
                </span>
                <span className={`text-[9px] px-2.5 py-0.5 border rounded-full uppercase tracking-wider block font-bold w-fit ${style.badge} ${
                  isEven ? 'sm:ml-auto' : 'sm:mr-auto'
                }`}>
                  {item.category === 'professional' ? '💼 Professional Career' :
                   item.category === 'internship' ? '🎓 Design Internship' :
                   item.category === 'hackathon' ? '🏆 48H Hack Sprint' : '⚙️ Technical R&D Workshop'}
                </span>
              </div>

              {/* Main Cinematic Card Segment */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ type: 'spring', stiffness: 260, damping: 28, delay: idx * 0.15 }}
                className={`w-full sm:w-[46%] pl-10 sm:pl-0 ${
                  isEven ? 'sm:order-2' : 'sm:order-1'
                }`}
              >
                <div className={`p-6 border border-zinc-800 bg-zinc-950/40 rounded-2xl relative group/card flex flex-col justify-between overflow-hidden transition-all duration-500 ${style.border} ${style.glow}`}>
                  
                  {/* Blueprint corner brackets on experience card */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-tl" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-tr" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-bl" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-br" />

                  {/* Header Title Grid */}
                  <div className="flex items-center gap-3.5 mb-4 border-b border-zinc-900/60 pb-3">
                    <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-xl relative">
                      <Icon className={`w-5 h-5 ${style.text}`} />
                    </div>
                    <div className="text-left font-mono">
                      <h3 className="font-bold text-white text-sm md:text-base tracking-tight uppercase group-hover/card:text-zinc-200 transition-colors">
                        {item.role}
                      </h3>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase block mt-0.5">
                        {item.company} // <span className="text-[9px] text-zinc-600 font-normal">{item.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet story list */}
                  <ul className="space-y-2.5 font-sans text-xs md:text-sm text-zinc-400 text-left leading-relaxed mb-6">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 group/highlight">
                        <div className={`p-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-500 mt-1 shrink-0`}>
                          <ChevronRight className="w-2.5 h-2.5" />
                        </div>
                        <span className="group-hover/highlight:text-zinc-300 transition-colors">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Dual metrics dashboard segment */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-5 font-mono text-[9px]">
                      {item.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className={`p-3 rounded-xl border flex flex-col justify-between text-left ${style.metricBorder}`}
                        >
                          <span className="text-zinc-500 uppercase tracking-wide block mb-1">{metric.label}</span>
                          <span className={`text-base font-black tracking-tight ${style.metricText}`}>
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technical Exposure chip tags row */}
                  <div className="flex flex-wrap gap-1.5 border-t border-zinc-900/60 pt-4 mt-auto">
                    <span className="text-[8px] font-mono text-zinc-600 font-bold uppercase mr-1 self-center flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5 text-zinc-600" /> STACK:
                    </span>
                    {item.technicalExposure.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[8px] font-mono font-bold rounded bg-zinc-900 border border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

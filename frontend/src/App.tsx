import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from './store/uiStore';
import { transitions, variants } from './utils/motion';
import BootSequence from './components/BootSequence';
import DockNavbar from './components/DockNavbar';
import JarvisAssistant from './components/JarvisAssistant';
import Logo from './components/Logo';
import BrandShowcase from './components/BrandShowcase';
import { Sparkles, ArrowDown, ChevronRight, Terminal as TermIcon, FileText, Mail, Bot } from 'lucide-react';
import { portfolioProjects } from './utils/projectData';
import type { ProjectData } from './utils/projectData';
import ProjectCard from './components/ProjectCard';
import MatrixRain from './components/MatrixRain';
import DevOverlayWidgets from './components/DevOverlayWidgets';
import ScrollReveal from './components/ScrollReveal';
import SkillsSection from './components/SkillsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificationsShowcase from './components/CertificationsShowcase';

// Dynamically split chunks to reduce FCP payload
const HeroScene = lazy(() => import('./components/HeroScene'));
const Terminal = lazy(() => import('./components/Terminal'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

const innovationTimeline = [
  {
    date: 'Q3 2024',
    title: 'EcoTrack-AI // Telemetry Ingestion',
    category: '⚡ 48H Hackathon Prototype',
    desc: 'Deployed quantized INT8 TensorFlow Lite models directly onto edge IoT nodes. Achieved 85% CPU power reductions for time-series carbon audits.',
    tech: ['TFLite', 'Rust', 'MQTT', 'InfluxDB'],
    color: 'emerald'
  },
  {
    date: 'Q4 2024',
    title: 'FanVersi AI // Semantic Lore Engine',
    category: '🧪 Creative NLP Research',
    desc: 'Engineered a lore-anchored CrewAI co-authoring sandbox. Combined semantic Milvus vector lookups with strict character relationship checking rules.',
    tech: ['CrewAI', 'SlateJS', 'Milvus', 'FastAPI'],
    color: 'violet'
  },
  {
    date: 'Q1 2025',
    title: 'Election Journey // Demographic Grid',
    category: '🎲 Game-Theoretic Simulation',
    desc: 'Simulated swing-state voters by mapping demographic matrices to probability shifts. Optimized massive arrays by offloading loops to NumPy vectors.',
    tech: ['NumPy', 'D3.js', 'React', 'SQLite'],
    color: 'cyan'
  },
  {
    date: 'Q2 2025',
    title: 'Bank Management System // Raft Consensus',
    category: '💼 Distributed Ledger Sandbox',
    desc: 'Built a double-entry transaction auditor in Rust. Modeled split-replica withdrawals securely using Raft Leader WAL replication.',
    tech: ['Rust-WASM', 'Raft WAL', 'SQLite', 'Redis'],
    color: 'rose'
  }
];


function App() {
  const { 
    toggleTerminal, 
    toggleCommandPalette, 
    isDevModeActive, 
    toggleDevMode,
    toggleJarvis,
    activeTheme
  } = useUIStore();
  const [isBooting, setIsBooting] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);


  // Styled Console Greetings on boot
  useEffect(() => {
    console.log(
      "%c" +
      "  _   _                      _  ____  ____  \n" +
      " | \\ | | ___ _   _ _ __ __ _| |/  __\\/  __\\ \n" +
      " |  \\| |/ _ \\ | | | '__/ _` | | ||  \\/||  \\/| \n" +
      " | |\\  |  __/ |_| | | | (_| | | ||  /\\||  /\\| \n" +
      " |_| \\_|\\___|\\__,_|_|  \\__,_|_|_|\\____/\\____/ \n",
      "color: #39ff14; font-weight: bold; text-shadow: 0 0 5px rgba(57, 255, 20, 0.4);"
    );
    console.log(
      "%c[NEURAL OS] SYSTEM GATEWAY ONLINE v1.0.4", 
      "color: #ffffff; background: #000; border: 1px solid #39ff14; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-family: monospace;"
    );
    console.log("%cEdge nodes Bengaluru resolved. developer console active.", "color: #71717a; font-size: 10px; font-family: monospace;");
    console.log("%c[R&D ACCESS] Press Backtick (`) for developer shell. Press Ctrl+K for search command directory.", "color: #71717a; font-size: 10px; font-family: monospace;");
    console.log("%c[KONAMI SYSTEM] Sequence ArrowKeys [Up, Up, Down, Down] toggles HUD Dev Mode.", "color: #e4e4e7; font-size: 10px; font-family: monospace; font-weight: bold;");
  }, []);

  useEffect(() => {
    if (isDevModeActive) {
      console.log("%c[NEURAL OS] DEVELOPER OVERLAY SECTIONS ENGAGED", "color: #39ff14; font-weight: bold; font-family: monospace;");
      console.log("%cLive compiler pipelines streaming... 60fps canvas overlays resolved.", "color: #8b5cf6; font-size: 10px; font-family: monospace;");
    } else {
      console.log("%c[NEURAL OS] DEVELOPER OVERLAY SECTIONS UNMOUNTED", "color: #71717a; font-family: monospace;");
    }
  }, [isDevModeActive]);

  useEffect(() => {
    // Check if booted previously
    const hasBooted = localStorage.getItem('siva_portfolio_booted');
    if (hasBooted) {
      setIsBooting(false);
    }

    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    let typedSequence: string[] = [];

    // Keyboard Event Routing
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K opens the fuzzy finder Command Palette!
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      // Backtick triggers the console developer shell!
      if (e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }

      // Keep track of arrow sequences for Dev Mode!
      typedSequence.push(e.key);
      typedSequence = typedSequence.slice(-konami.length);
      if (typedSequence.join(',') === konami.join(',')) {
        toggleDevMode();
        typedSequence = []; // Reset queue
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal, toggleCommandPalette, toggleDevMode]);

  return (
    <div className={`bg-black text-zinc-100 min-h-screen relative font-mono overflow-x-hidden selection:bg-white selection:text-black transition-colors duration-700 theme-${activeTheme} ${isDevModeActive ? "dev-mode-active" : ""}`}>
      {/* Cinematic CRT Scanlines and ambient vignetting */}
      <div className="fixed inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)]" />
      
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            {/* Immersive 3D Starry Background with Neural System */}
            <Suspense fallback={<div className="fixed inset-0 -z-10 bg-black" />}>
              <HeroScene />
            </Suspense>

            {/* Matrix rain Canvas backdrop */}
            {isDevModeActive && <MatrixRain />}

            {/* Floating diagnostic overlay widgets */}
            {isDevModeActive && <DevOverlayWidgets />}

            {/* FLOATING NAVIGATION DOCK */}
            <DockNavbar />

            {/* JARVIS AI ASSISTANT ORB */}
            <JarvisAssistant />

            {/* SECTIONS */}
            <main className="max-w-6xl mx-auto px-6 relative z-10">
              
              {/* 1. HOME / HERO SECTION */}
              <section id="home" className="h-screen flex flex-col justify-center items-center text-center relative pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...transitions.easeCinematic, delay: 0.2 }}
                  className="flex items-center gap-2 border border-zinc-800 bg-zinc-950/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-zinc-400 mb-6 pointer-events-auto cursor-default hover:border-zinc-500 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Neural OS v1.0.4 Online</span>
                </motion.div>

                <h1 className="sr-only">Siva Panyam - AI Engineer &amp; Full Stack Architect</h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...transitions.easeCinematic, delay: 0.3 }}
                  className="w-full max-w-[90vw] md:max-w-2xl lg:max-w-3xl mb-6 pointer-events-auto filter drop-shadow-[0_0_35px_rgba(255,255,255,0.05)] active:scale-[0.99] transition-transform duration-300"
                >
                  <Logo variant="full" size={130} className="w-full" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitions.easeCinematic, delay: 0.5 }}
                  className="max-w-xl text-zinc-500 text-xs md:text-sm leading-relaxed mb-12 tracking-wide font-sans select-text pointer-events-auto"
                >
                  "I build AI-powered applications, scalable web platforms, and developer-focused systems with a strong focus on real-world problem solving."
                </motion.p>

                {/* Primary/Secondary Call To Actions */}
                <motion.div 
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitions.easeCinematic, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 pointer-events-auto z-10 animate-fade-in"
                >
                  <motion.button 
                    whileHover={{ scale: 1.04, y: -2.5, boxShadow: '0 0 25px rgba(255, 255, 255, 0.18)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={transitions.springHover}
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer flex items-center gap-1"
                  >
                    View Projects <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.04, y: -2.5, borderColor: '#ffffff', color: '#ffffff', boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={transitions.springHover}
                    onClick={toggleJarvis}
                    className="px-8 py-3.5 border border-zinc-800 bg-zinc-950/60 text-zinc-300 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5 animate-pulse text-zinc-400" /> Talk to Jarvis
                  </motion.button>
                </motion.div>

                {/* Quick Actions Row */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitions.easeCinematic, delay: 0.7 }}
                  className="mt-8 flex flex-wrap justify-center gap-4 text-[10px] md:text-xs text-zinc-500 pointer-events-auto z-10"
                >
                  <motion.a 
                    whileHover={{ scale: 1.04, borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.02)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={transitions.springHover}
                    href="#resume-placeholder" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950/40 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> Download Resume
                  </motion.a>
                  <motion.button 
                    whileHover={{ scale: 1.04, borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.02)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={transitions.springHover}
                    onClick={toggleTerminal}
                    className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950/40 px-3 py-1.5 rounded-md cursor-pointer transition-colors"
                  >
                    <TermIcon className="w-3.5 h-3.5" /> Open Terminal
                  </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute bottom-10 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-[10px] uppercase text-zinc-600 tracking-widest">Scroll to explore</span>
                  <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
                </motion.div>
              </section>

              {/* 2. ABOUT SECTION */}
              <section id="about" className="py-24 border-t border-zinc-900 flex flex-col justify-center select-text">
                <ScrollReveal delay={0.1}>
                  <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div>
                      <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-4">01 // ABOUT SIVA</h2>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Profile Diagnostics</span>
                    </div>
                    <div className="md:col-span-2 space-y-6 font-sans text-sm md:text-base text-zinc-400 leading-relaxed">
                      <p>
                        Based in Bangalore, India, I specialize in crafting full-stack architectures integrated with modern AI models. I bridge the gap between complex artificial intelligence algorithms and delightful, highly interactive frontends.
                      </p>
                      <p>
                        My core expertise centers on engineering highly-optimized developer workflows, constructing reliable systems, and bringing complex datasets to life using robust visualization models.
                      </p>
                      <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
                        <a 
                          href="#resume-placeholder"
                          className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-500 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" /> Download Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </section>

              {/* 3. PROJECTS SECTION */}
              <section id="projects" className="py-24 border-t border-zinc-900 select-text">
                <ScrollReveal delay={0.15}>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">02 // CHRONICLED PROJECTS</h2>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Featured Architectures</span>
                  </div>
                  
                  {/* Cinematic grid of featured project cards */}
                  <motion.div 
                    variants={variants.staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10% 0px -15% 0px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {portfolioProjects
                      .filter((p) => p.category === 'featured')
                      .map((project) => (
                        <motion.div key={project.id} variants={variants.slideUpFade}>
                          <ProjectCard
                            project={project}
                            onClick={() => setSelectedProject(project)}
                          />
                        </motion.div>
                      ))}
                  </motion.div>
                </ScrollReveal>
              </section>

              {/* 4. SKILLS SECTION */}
              <section id="skills" className="py-24 border-t border-zinc-900 select-text">
                <ScrollReveal delay={0.1}>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">03 // CORE SKILL INVENTORY</h2>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Technical Capabilities</span>
                  </div>
                  <SkillsSection />
                </ScrollReveal>
              </section>

              {/* 5. EXPERIENCE SECTION */}
              <section id="experience" className="py-24 border-t border-zinc-900 select-text">
                <ScrollReveal delay={0.15}>
                  <div className="mb-12 text-center sm:text-left">
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">04 // EXPERIENCE TIMELINE</h2>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Career Telemetry</span>
                  </div>
                  <ExperienceTimeline />
                </ScrollReveal>
              </section>

              {/* 6. CERTIFICATIONS SECTION */}
              <section id="certifications" className="py-24 border-t border-zinc-900 select-text">
                <ScrollReveal delay={0.1}>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">05 // VERIFIED CREDENTIALS</h2>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Certifications</span>
                  </div>
                  <CertificationsShowcase />
                </ScrollReveal>
              </section>

              {/* 7. EXPERIMENTAL LAB */}
              <section id="lab" className="py-24 border-t border-zinc-900 select-text">
                <ScrollReveal delay={0.15}>
                  <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">06 // EXPERIMENTAL LAB</h2>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Hackathons &amp; R&D Sandbox</span>
                    </div>
                    <span className="text-[9px] border border-zinc-800 bg-zinc-950 px-3 py-1 rounded text-zinc-500 uppercase tracking-widest font-mono select-none pointer-events-none">Interactive Design System Active</span>
                  </div>
                  
                  {/* Visual Brand Identity Showcase */}
                  <div className="mb-14 pointer-events-auto">
                    <BrandShowcase />
                  </div>

                  {/* Innovation Timeline */}
                  <div className="mb-16 border-t border-zinc-900/60 pt-10">
                    <div className="mb-8">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">06 // INNOVATION R&amp;D TIMELINE</span>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6 font-mono text-left">
                      {innovationTimeline.map((item, idx) => {
                        const style = item.color === 'emerald' ? 'border-emerald-500/25 text-emerald-400 bg-emerald-950/15' : 
                                      item.color === 'violet' ? 'border-violet-500/25 text-violet-400 bg-violet-950/15' : 
                                      item.color === 'cyan' ? 'border-cyan-500/25 text-cyan-400 bg-cyan-950/15' : 
                                      'border-rose-500/25 text-rose-400 bg-rose-950/15';
                        const dotColor = item.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 
                                         item.color === 'violet' ? 'bg-violet-500 shadow-[0_0_8px_#8b5cf6]' : 
                                         item.color === 'cyan' ? 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]' : 
                                         'bg-rose-500 shadow-[0_0_8px_#f43f5e]';
                        return (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...transitions.easeCinematic, delay: idx * 0.12 }}
                            className="p-5 border border-zinc-900 bg-zinc-950/40 rounded-xl relative group flex flex-col justify-between h-full hover:border-zinc-700/50 transition-colors"
                          >
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-white font-bold text-xs uppercase tracking-widest">{item.date}</span>
                                <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                              </div>
                              <span className={`text-[8px] px-2 py-0.5 border rounded-full uppercase tracking-wider block w-fit font-bold mb-3 ${style}`}>
                                {item.category}
                              </span>
                              <h4 className="text-white text-[11px] font-bold uppercase mb-2 group-hover:text-zinc-200 transition-colors">{item.title}</h4>
                              <p className="text-[10px] text-zinc-500 font-sans leading-relaxed mb-4">{item.desc}</p>
                            </div>
                            <div className="flex flex-wrap gap-1 border-t border-zinc-900 pt-3 mt-auto">
                              {item.tech.map((t) => (
                                <span key={t} className="text-[8px] bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-400 uppercase tracking-tighter">{t}</span>
                              ))}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Sandbox Operations &amp; Codebases</span>
                  </div>
                  
                  {/* Dynamic grid for R&D items */}
                  <motion.div 
                    variants={variants.staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10% 0px -15% 0px" }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {portfolioProjects
                      .filter((p) => p.category === 'lab')
                      .map((project) => (
                        <motion.div key={project.id} variants={variants.slideUpFade}>
                          <ProjectCard
                            project={project}
                            onClick={() => setSelectedProject(project)}
                          />
                        </motion.div>
                      ))}
                  </motion.div>
                </ScrollReveal>
              </section>

              {/* 8. CONTACT SECTION */}
              <section id="contact" className="py-24 border-t border-zinc-900 pb-36 select-text text-center">
                <ScrollReveal delay={0.2}>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">07 // SECURE COMMUNICATION</h2>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Establish Synapse Connection</span>
                  </div>
                  <div className="max-w-md mx-auto text-xs space-y-4">
                    <p className="text-zinc-500 font-sans mb-8">
                      Feel free to reach out to collaborate on high-fidelity web projects, generative AI applications, or server architectures.
                    </p>
                    <div className="flex flex-col gap-4 font-mono">
                      <a 
                        href="mailto:contact@sivapanyam.dev"
                        className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 rounded-full font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" /> Send Synapse Message
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </section>

            </main>

            {/* Static System info footer overlay */}
            <div className="fixed bottom-6 left-6 z-30 hidden lg:block font-mono text-[9px] text-zinc-600 uppercase tracking-tighter select-none pointer-events-none">
              <div>Neural OS v1.0.4</div>
              <div>Secure synapse: stable</div>
              <div>Bangalore edge network</div>
            </div>

            {/* Global CLI overlay modal */}
            <Suspense fallback={null}>
              <Terminal />
            </Suspense>

            {/* Premium Project Details Modal overlay */}
            <AnimatePresence>
              {selectedProject && (
                <Suspense fallback={null}>
                  <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                  />
                </Suspense>
              )}
            </AnimatePresence>

            {/* Monospace Command Palette search dialog */}
            <Suspense fallback={null}>
              <CommandPalette 
                onSelectProject={(id) => {
                  const project = portfolioProjects.find(p => p.id === id);
                  if (project) {
                    setSelectedProject(project);
                  }
                }}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

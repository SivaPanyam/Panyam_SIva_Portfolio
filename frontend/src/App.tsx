import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from './store/uiStore';
import { transitions } from './utils/motion';
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

// Dynamically split chunks to reduce FCP payload
const HeroScene = lazy(() => import('./components/HeroScene'));
const Terminal = lazy(() => import('./components/Terminal'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));


function App() {
  const { 
    toggleTerminal, 
    toggleCommandPalette, 
    isDevModeActive, 
    toggleDevMode,
    toggleJarvis
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
    <div className={`bg-black text-zinc-100 min-h-screen relative font-mono overflow-x-hidden selection:bg-white selection:text-black transition-colors duration-500 ${isDevModeActive ? 'dev-mode-active' : ''}`}>
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
                  <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3.5 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer flex items-center gap-1"
                  >
                    View Projects <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={toggleJarvis}
                    className="px-8 py-3.5 border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5 hover:border-zinc-400 hover:text-white"
                  >
                    <Bot className="w-3.5 h-3.5 animate-pulse" /> Talk to Jarvis
                  </button>
                </motion.div>

                {/* Quick Actions Row */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitions.easeCinematic, delay: 0.7 }}
                  className="mt-8 flex flex-wrap justify-center gap-4 text-[10px] md:text-xs text-zinc-500 pointer-events-auto z-10"
                >
                  <a 
                    href="#resume-placeholder" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 hover:text-white transition-colors border border-zinc-900 bg-zinc-950/40 px-3 py-1.5 rounded-md hover:border-zinc-800"
                  >
                    <FileText className="w-3.5 h-3.5" /> Download Resume
                  </a>
                  <button 
                    onClick={toggleTerminal}
                    className="flex items-center gap-1.5 hover:text-white transition-colors border border-zinc-900 bg-zinc-950/40 px-3 py-1.5 rounded-md hover:border-zinc-800 cursor-pointer"
                  >
                    <TermIcon className="w-3.5 h-3.5" /> Open Terminal
                  </button>
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
              </section>

              {/* 3. PROJECTS SECTION */}
              <section id="projects" className="py-24 border-t border-zinc-900 select-text">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">02 // CHRONICLED PROJECTS</h2>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Featured Architectures</span>
                </div>
                
                {/* Cinematic grid of featured project cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioProjects
                    .filter((p) => p.category === 'featured')
                    .map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                </div>
              </section>

              {/* 4. SKILLS SECTION */}
              <section id="skills" className="py-24 border-t border-zinc-900 select-text">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">03 // CORE SKILL INVENTORY</h2>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Technical Capabilities</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-zinc-400">
                  {[
                    { category: 'AI / MODELING', list: ['Gemini / OpenAI API', 'LangChain', 'Vector Search', 'Prompt Engineering'] },
                    { category: 'FRONTEND STACK', list: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'Three.js / R3F'] },
                    { category: 'BACKEND SERVICES', list: ['Node.js / Express', 'PostgreSQL', 'GraphQL', 'REST APIs'] },
                    { category: 'ENGINEERING WORK', list: ['Docker / Git', 'Vitest / Jest', 'CI/CD Pipelines', 'Linux Console'] },
                  ].map((cat, idx) => (
                    <div key={idx} className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5">
                      <div className="text-white font-bold mb-3 border-b border-zinc-900 pb-2 text-[10px] tracking-wider">{cat.category}</div>
                      <ul className="space-y-1.5 text-[11px] text-zinc-500">
                        {cat.list.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-zinc-700 rounded-full" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. EXPERIENCE SECTION */}
              <section id="experience" className="py-24 border-t border-zinc-900 select-text">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">04 // EXPERIENCE TIMELINE</h2>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Career Telemetry</span>
                </div>
                <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-900">
                  {[
                    { role: 'Lead Architect', company: 'AI Synthesis Labs', time: '2024 - Present', desc: 'Orchestrating production systems incorporating dynamic LLM logic and interactive developer consoles.' },
                    { role: 'Full Stack Engineer', company: 'DataSync Corp', time: '2022 - 2024', desc: 'Built high-throughput real-time APIs using Express, GraphQL, and complex visualization frontends.' },
                  ].map((exp, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute left-[9px] top-[7px] w-2.5 h-2.5 bg-zinc-950 border border-zinc-500 rounded-full" />
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 mb-2">
                        <h3 className="font-bold text-white text-sm md:text-base">{exp.role} @ <span className="text-zinc-400">{exp.company}</span></h3>
                        <span className="text-[10px] text-zinc-500 uppercase">{exp.time}</span>
                      </div>
                      <p className="text-zinc-500 text-xs md:text-sm font-sans leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. CERTIFICATIONS SECTION */}
              <section id="certifications" className="py-24 border-t border-zinc-900 select-text">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">05 // VERIFIED CREDENTIALS</h2>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Certifications</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Google Cloud Certified Professional Cloud Architect', issuer: 'Google Cloud' },
                    { name: 'TensorFlow Developer Certificate', issuer: 'DeepLearning.AI' },
                  ].map((c, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg flex items-center justify-between text-xs text-zinc-400 hover:border-zinc-800 transition-colors">
                      <span className="font-bold text-zinc-300">{c.name}</span>
                      <span className="text-[9px] text-zinc-600 uppercase shrink-0">{c.issuer}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. EXPERIMENTAL LAB */}
              <section id="lab" className="py-24 border-t border-zinc-900 select-text">
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

                <div className="mb-6">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Sandbox Operations &amp; Codebases</span>
                </div>
                
                {/* Dynamic grid for R&D items */}
                <div className="grid md:grid-cols-2 gap-6">
                  {portfolioProjects
                    .filter((p) => p.category === 'lab')
                    .map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                </div>
              </section>

              {/* 8. CONTACT SECTION */}
              <section id="contact" className="py-24 border-t border-zinc-900 pb-36 select-text text-center">
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

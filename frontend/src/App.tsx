// frontend/src/App.tsx
import React, { useEffect } from 'react';
import Terminal from './components/Terminal';
import HeroScene from './components/HeroScene';
import { useUIStore } from './store/uiStore';

function App() {
  const { toggleTerminal } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleTerminal();
      }
      // Toggle terminal on Backtick (~)
      if (e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden bg-black">
      <HeroScene />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-screen pointer-events-none px-4 text-center">
        <motion_h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter uppercase"
        >
          Siva Panyam
        </motion_h1>
        
        <motion_p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 font-mono tracking-widest uppercase"
        >
          AI Engineer & Full Stack Architect
        </motion_p>
        
        <div className="flex flex-col md:flex-row gap-4 pointer-events-auto">
          <button 
            className="px-8 py-4 border border-white/20 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 font-mono text-sm tracking-widest uppercase backdrop-blur-md"
          >
            Explore Projects
          </button>
          <button 
            onClick={toggleTerminal}
            className="px-8 py-4 border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-400 rounded-full transition-all duration-300 font-mono text-sm tracking-widest uppercase backdrop-blur-md"
          >
            [ Cmd+K ] Initialize Terminal
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 z-10 hidden md:block">
        <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-tighter">
          <div>System: Neural OS v1.0.4</div>
          <div>Status: Online</div>
          <div>Location: 12.9716° N, 77.5946° E</div>
        </div>
      </div>

      <Terminal />
    </div>
  );
}

// Simple motion component wrappers since I didn't import motion above
const motion_h1 = (props: any) => (
  <div {...props} style={{ ...props.style, opacity: 1, transform: 'none' }}>{props.children}</div>
);
const motion_p = (props: any) => (
  <div {...props} style={{ ...props.style, opacity: 1, transform: 'none' }}>{props.children}</div>
);

export default App;

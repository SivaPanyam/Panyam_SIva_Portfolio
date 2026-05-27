// frontend/src/components/AsciiHeader.tsx
import { motion } from 'framer-motion';

export default function AsciiHeader() {
  const asciiArt = `
    _   __                      __   ____  _____
   / | / /___  __  ___________ _/ /  / __ \\/ ___/
  /  |/ / __ \\/ / / / ___/ __ \`/ /  / / / /\\__ \\ 
 / /|  / /_/ / /_/ / /  / /_/ / /  / /_/ /___/ / 
/_/ |_/\\____/\\__,_/_/   \\__,_/_/   \\____//____/  
`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-zinc-500 font-mono text-[9px] md:text-[10px] leading-tight select-none border-b border-zinc-900 pb-5 mb-5"
    >
      <pre className="whitespace-pre overflow-x-auto text-zinc-400 font-bold font-mono">
        {asciiArt}
      </pre>
      <div className="grid sm:grid-cols-3 gap-2 mt-4 text-zinc-500 uppercase tracking-widest text-[8px] md:text-[9px]">
        <div>
          <span className="text-zinc-600 font-bold block">SYSTEM COGNITIVE:</span>
          <span className="text-zinc-400 block mt-0.5">NeuralOS v1.0.4 Online</span>
        </div>
        <div>
          <span className="text-zinc-600 font-bold block">PORTFOLIO NODE:</span>
          <span className="text-zinc-400 block mt-0.5">sivapanyam.dev // edge</span>
        </div>
        <div>
          <span className="text-zinc-600 font-bold block">SECURE SIGN-IN:</span>
          <span className="text-zinc-400 block mt-0.5">guest_session: active</span>
        </div>
      </div>
      <div className="mt-3.5 text-zinc-600 text-[8px]">
        [TIP] Establish synapse connection by typing commands. Run "help" for instruction modules.
      </div>
    </motion.div>
  );
}

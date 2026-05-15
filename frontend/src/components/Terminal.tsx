// frontend/src/components/Terminal.tsx
import React from 'react';
import { useUIStore } from '../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
  const { isTerminalOpen, toggleTerminal } = useUIStore();
  
  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="bg-gray-900 border border-gray-700 w-full max-w-3xl rounded-lg shadow-2xl flex flex-col h-[60vh] font-mono text-green-400 overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800">
              <span className="text-xs uppercase tracking-widest text-gray-400">Neural Console v1.0</span>
              <button onClick={toggleTerminal} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto text-sm">
              <div className="mb-2 text-white">Welcome to sivapanyam.dev operating system.</div>
              <div className="mb-2">Type 'help' to see available commands.</div>
              <div className="flex items-center">
                <span className="mr-2">guest@sivapanyam:~$</span>
                <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
              </div>
            </div>
            <div className="p-3 border-t border-gray-700 bg-gray-950">
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">❯</span>
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Type a command..." 
                  className="w-full bg-transparent outline-none text-green-400 placeholder:text-gray-700" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;

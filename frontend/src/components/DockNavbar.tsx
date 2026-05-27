// frontend/src/components/DockNavbar.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';
import { transitions } from '../utils/motion';
import { 
  Home, User, Briefcase, Code, History, Award, 
  FlaskConical, Mail, Terminal as TerminalIcon 
} from 'lucide-react';

interface DockItem {
  name: string;
  icon: React.ComponentType<any>;
  targetId: string;
  isAction?: boolean;
  action?: () => void;
}

const DockNavbar: React.FC = () => {
  const { toggleTerminal } = useUIStore();
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const navigationItems: DockItem[] = [
    { name: 'Home', icon: Home, targetId: 'home' },
    { name: 'About', icon: User, targetId: 'about' },
    { name: 'Projects', icon: Briefcase, targetId: 'projects' },
    { name: 'Skills', icon: Code, targetId: 'skills' },
    { name: 'Experience', icon: History, targetId: 'experience' },
    { name: 'Certifications', icon: Award, targetId: 'certifications' },
    { name: 'Lab', icon: FlaskConical, targetId: 'lab' },
    { name: 'Contact', icon: Mail, targetId: 'contact' },
    { 
      name: 'Terminal', 
      icon: TerminalIcon, 
      targetId: 'terminal',
      isAction: true,
      action: toggleTerminal 
    },
  ];

  // Viewport Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = navigationItems
      .filter(item => !item.isAction)
      .map(item => document.getElementById(item.targetId));

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focused in the middle-upper window
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  const handleItemClick = (item: DockItem) => {
    if (item.isAction && item.action) {
      item.action();
      return;
    }

    const element = document.getElementById(item.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(item.targetId);
    }
  };

  // MacOS Magnification helper
  const getScale = (idx: number) => {
    if (isTouch || hoveredIdx === null) return 1;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return 1.28;
    if (dist === 1) return 1.14;
    return 1;
  };

  const getYOffset = (idx: number) => {
    if (isTouch || hoveredIdx === null) return 0;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return -8;
    if (dist === 1) return -4;
    return 0;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] md:max-w-none font-mono select-none">
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="bg-zinc-950/75 backdrop-blur-xl border border-zinc-800 px-3 md:px-4 py-2.5 rounded-full flex items-center gap-2.5 md:gap-3.5 shadow-2xl relative"
        onMouseLeave={() => !isTouch && setHoveredIdx(null)}
      >
        {navigationItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.targetId && !item.isAction;
          
          return (
            <div
              key={item.name}
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => !isTouch && setHoveredIdx(idx)}
              onClick={() => handleItemClick(item)}
            >
              {/* Proximity Mac Scale & Shift animation */}
              <motion.div
                animate={{
                  scale: getScale(idx),
                  y: getYOffset(idx)
                }}
                transition={transitions.springDock}
                className={`p-2.5 md:p-3 rounded-full flex items-center justify-center transition-colors relative ${
                  isActive 
                    ? 'bg-white text-black' 
                    : item.isAction
                      ? 'bg-zinc-900 border border-green-500/20 text-green-400 hover:bg-green-500/10'
                      : 'bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 shrink-0" />
                
                {/* Active Glowing Dot */}
                {isActive && (
                  <motion.span 
                    layoutId="dockActiveDot"
                    className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                    transition={transitions.springDock}
                  />
                )}

                {/* Hotkeys indicator for Terminal Action button */}
                {item.isAction && (
                  <span className="absolute -top-6 bg-zinc-950 border border-zinc-800 text-green-400 text-[8px] px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase">
                    Ctrl+K
                  </span>
                )}
              </motion.div>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -42, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bg-zinc-950 border border-zinc-800 text-zinc-300 text-[10px] tracking-wider uppercase px-2 py-1 rounded shadow-xl pointer-events-none whitespace-nowrap"
                  >
                    {item.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default DockNavbar;

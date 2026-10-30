// frontend/src/components/ScrollReveal.tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { transitions } from '../utils/motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -15% 0px' });

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 35 };
      case 'down': return { y: -35 };
      case 'left': return { x: 35 };
      case 'right': return { x: -35 };
      default: return { y: 35 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        ...offset
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{
        ...transitions.easeCinematic,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

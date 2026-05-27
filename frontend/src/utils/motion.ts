// frontend/src/utils/motion.ts
import type { Variants } from 'framer-motion';

/**
 * Reusable animation curve configurations for consistent physics across components.
 */
export const transitions = {
  // Cinematic, high-end spring for UI overlays
  springPremium: {
    type: 'spring',
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
  // Smooth, lingering spring for floating navigation docks
  springDock: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    mass: 0.6,
  },
  // Soft hover springs
  springHover: {
    type: 'spring',
    stiffness: 400,
    damping: 18,
  },
  // Cinematic slow easing curve (Apple/Zinc style)
  easeCinematic: {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1], // cubic-bezier
    duration: 0.8,
  },
  // Easing curve for rapid entries (dropdowns, tooltips)
  easeSnappy: {
    type: 'tween',
    ease: [0.25, 1, 0.5, 1],
    duration: 0.4,
  },
} as const;

/**
 * Reusable Framer Motion variants.
 */
export const variants: Record<string, Variants> = {
  // Fade in and out
  fadeInOut: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  },
  
  // Cinematic slide up and fade
  slideUpFade: {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...transitions.easeCinematic,
        delay: customDelay,
      }
    }),
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      }
    }
  },

  // Slide down fade (for boot logger or notifications)
  slideDownFade: {
    hidden: { opacity: 0, y: -20 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...transitions.easeCinematic,
        delay: customDelay,
      }
    }),
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      }
    }
  },

  // MacOS dock expansion/hover effect (simulated dynamic size)
  dockItem: {
    idle: { scale: 1 },
    hovered: { 
      scale: 1.25,
      y: -10,
      transition: transitions.springHover,
    },
    neighbor: {
      scale: 1.1,
      y: -4,
      transition: transitions.springHover,
    }
  },

  // Staggered list container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: (staggerChildren = 0.1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: 0.1,
      }
    })
  },

  // Jarvis assistant orb pulse and glide
  jarvisOrb: {
    idle: {
      scale: 1,
      y: [0, -6, 0],
      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.15))',
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        filter: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }
      }
    },
    hover: {
      scale: 1.08,
      y: -2,
      filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))',
      transition: transitions.springHover,
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }
};


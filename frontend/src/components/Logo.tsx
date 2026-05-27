import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'icon' | 'full' | 'blueprint';
  size?: number; // Sizing for the icon-only and blueprint variants (width/height square)
  width?: number; // Specific width (useful for full horizontal lockup)
  height?: number; // Specific height
  animated?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean; // Toggles hover expansions
  style?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'icon',
  size = 64,
  width,
  animated = true,
  className = '',
  onClick,
  interactive = true,
  style,
}) => {
  // Dimension calculators
  const calculatedWidth = width || (variant === 'full' ? size * 4 : size);

  // Framer Motion Animation Variants
  const outerOrbitRotation: any = {
    animate: {
      rotate: animated ? 360 : 0,
      transition: {
        repeat: Infinity,
        duration: 35,
        ease: 'linear',
      },
    },
    hover: {
      rotate: animated ? 360 : 0,
      scale: interactive ? 1.04 : 1,
      transition: {
        repeat: Infinity,
        duration: 12, // Spin faster on hover!
        ease: 'linear',
      },
    },
  };

  const innerOrbitRotation: any = {
    animate: {
      rotate: animated ? -360 : 0,
      transition: {
        repeat: Infinity,
        duration: 18,
        ease: 'linear',
      },
    },
    hover: {
      rotate: animated ? -360 : 0,
      scale: interactive ? 0.96 : 1,
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: 'linear',
      },
    },
  };

  const coreBreathing: any = {
    animate: {
      scale: animated ? [1, 1.15, 1] : 1,
      opacity: animated ? [0.8, 1, 0.8] : 0.9,
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
    hover: {
      scale: interactive ? 1.3 : 1.1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const meshPulsing: any = {
    animate: {
      opacity: animated ? [0.65, 0.95, 0.65] : 0.8,
      scale: animated ? [0.98, 1.02, 0.98] : 1,
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: 'easeInOut',
      },
    },
  };

  if (variant === 'blueprint') {
    return (
      <div 
        className={`relative inline-block ${className}`}
        style={{ 
          width: '100%', 
          maxWidth: calculatedWidth, 
          aspectRatio: '1/1', 
          height: 'auto', 
          ...style 
        }}
        onClick={onClick}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 512 512" 
          width="100%" 
          height="100%" 
          fill="none" 
          className="brand-blueprint w-full h-full text-zinc-500 hover:text-white transition-colors duration-300"
        >
          <style>{`
            .brand-blueprint {
              --wireframe-color: currentColor;
              --highlight-color: var(--accent, #ffffff);
              --laser-color: rgba(255,255,255,0.4);
              --font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            }
            .blueprint-text { font-family: var(--font-family); font-size: 10px; fill: var(--wireframe-color); letter-spacing: 1px; }
            .blueprint-bold { fill: var(--highlight-color); font-weight: bold; }
            .blueprint-line { stroke: var(--wireframe-color); stroke-width: 0.5px; }
            .blueprint-axis { stroke: var(--wireframe-color); stroke-width: 0.5px; stroke-dasharray: 2 6; }
            :global(.dev-mode-active) .brand-blueprint {
              --wireframe-color: #166534;
              --highlight-color: #39FF14;
            }
          `}</style>
          <g opacity="0.4">
            <path d="M 0,64 L 512,64 M 0,128 L 512,128 M 0,192 L 512,192 M 0,256 L 512,256 M 0,320 L 512,320 M 0,384 L 512,384 M 0,448 L 512,448" stroke="var(--wireframe-color)" stroke-width="0.25" stroke-dasharray="1 9" />
            <path d="M 64,0 L 64,512 M 128,0 L 128,512 M 192,0 L 192,512 M 256,0 L 256,512 M 320,0 L 320,512 M 384,0 L 384,512 M 448,0 L 448,512" stroke="var(--wireframe-color)" stroke-width="0.25" stroke-dasharray="1 9" />
            <rect x="16" y="16" width="480" height="480" stroke="var(--wireframe-color)" stroke-width="0.5" stroke-dasharray="6 6" />
            <circle cx="256" cy="256" r="240" stroke="var(--wireframe-color)" stroke-width="0.25" />
          </g>
          <g opacity="0.7">
            <line x1="16" y1="32" x2="16" y2="480" stroke="var(--wireframe-color)" stroke-width="0.5" />
            <path d="M 12,38 L 16,32 L 20,38 M 12,474 L 16,480 L 20,474" stroke="var(--wireframe-color)" stroke-width="0.5" fill="none" />
            <text x="24" y="260" className="blueprint-text" transform="rotate(-90 24 260)">H: 512.00px</text>
            <line x1="32" y1="16" x2="480" y2="16" stroke="var(--wireframe-color)" stroke-width="0.5" />
            <path d="M 38,12 L 32,16 L 38,20 M 474,12 L 480,16 L 474,20" stroke="var(--wireframe-color)" stroke-width="0.5" fill="none" />
            <text x="220" y="28" className="blueprint-text">W: 512.00px</text>
            <path d="M 256,196 A 60,60 0 0,1 308,226" stroke="var(--wireframe-color)" stroke-width="0.5" fill="none" stroke-dasharray="2 2" />
            <text x="296" y="210" className="blueprint-text">θ = 60°</text>
          </g>
          <g className="annotations">
            <text x="32" y="48" className="blueprint-text"><tspan className="blueprint-bold">[NEURAL INFRASTRUCTURE]</tspan></text>
            <text x="32" y="64" className="blueprint-text">MODEL: SYNAPSE-LATTICE-v1.0</text>
            <text x="32" y="80" className="blueprint-text">SCALE: 1.000 (VECTORS RESOLVED)</text>
            <text x="330" y="450" className="blueprint-text">ORIGIN: (256, 256)</text>
            <text x="330" y="466" className="blueprint-text">LATENT SPAN: R=224px</text>
            <text x="330" y="482" className="blueprint-text">NODE COUNT: N=12</text>
          </g>
          <line x1="256" y1="32" x2="256" y2="480" className="blueprint-axis" />
          <line x1="32" y1="256" x2="480" y2="256" className="blueprint-axis" />
          <circle cx="256" cy="256" r="224" className="blueprint-line" />
          <circle cx="256" cy="256" r="192" className="blueprint-line" stroke-dasharray="2 8" />
          <circle cx="256" cy="256" r="160" className="blueprint-line" stroke-dasharray="4 4" />
          <circle cx="256" cy="256" r="224" stroke="var(--highlight-color)" stroke-width="1" stroke-dasharray="180 80 40 40" />
          <polygon points="256,96 394,336 118,336" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <polygon points="256,416 394,176 118,176" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <polygon points="256,96 394,176 394,336 256,416 118,336 118,176" stroke="var(--highlight-color)" stroke-width="1.5" />
          <line x1="256" y1="96" x2="256" y2="256" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <line x1="394" y1="176" x2="256" y2="256" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <line x1="394" y1="336" x2="256" y2="256" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <line x1="256" y1="416" x2="256" y2="256" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <line x1="118" y1="336" x2="256" y2="256" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <line x1="118" y1="176" x2="256" y2="256" stroke="var(--wireframe-color)" stroke-width="0.5" />
          <g fill="var(--highlight-color)" stroke="var(--wireframe-color)" stroke-width="1">
            <circle cx="256" cy="96" r="4" />
            <circle cx="394" cy="176" r="4" />
            <circle cx="394" cy="336" r="4" />
            <circle cx="256" cy="416" r="4" />
            <circle cx="118" cy="336" r="4" />
            <circle cx="118" cy="176" r="4" />
          </g>
          <g className="core">
            <circle cx="256" cy="256" r="28" stroke="var(--highlight-color)" stroke-width="0.5" stroke-dasharray="4 2" />
            <circle cx="256" cy="256" r="16" stroke="var(--wireframe-color)" stroke-width="0.5" />
            <circle cx="256" cy="256" r="4" fill="var(--highlight-color)" />
            <path d="M 236,256 L 276,256 M 256,236 L 256,276" stroke="var(--highlight-color)" stroke-width="0.5" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      whileHover="hover"
      className={`relative inline-block select-none cursor-pointer ${className}`}
      style={{ 
        width: '100%', 
        maxWidth: calculatedWidth, 
        aspectRatio: variant === 'full' ? '4/1' : '1/1', 
        height: 'auto', 
        ...style 
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={variant === 'full' ? '0 0 1200 300' : '0 0 512 512'}
        width="100%"
        height="100%"
        fill="none"
        className="brand-logo-svg w-full h-full"
      >
        <defs>
          <radialGradient id="logo-core-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--glow-color, #FFFFFF)" stop-opacity="1" />
            <stop offset="40%" stop-color="var(--glow-color, #FFFFFF)" stop-opacity="0.8" />
            <stop offset="70%" stop-color="var(--glow-color, #FFFFFF)" stop-opacity="0.2" />
            <stop offset="100%" stop-color="var(--glow-color, #FFFFFF)" stop-opacity="0" />
          </radialGradient>
        </defs>

        <style>{`
          .brand-logo-svg {
            --primary: var(--accent, #FFFFFF);
            --secondary: var(--text-muted, #71717A);
            --tertiary: #09090B;
            --glow-color: #FFFFFF;
            --text-main: #FFFFFF;
            --text-sub: #71717A;
            --line-width: 1.5px;
          }

          .text-lockup-title {
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-weight: 900;
            font-size: 76px;
            fill: var(--text-main);
            letter-spacing: -2px;
            text-transform: uppercase;
          }
          .text-lockup-dot {
            fill: var(--primary);
            font-weight: 900;
          }
          .text-lockup-sub {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 16px;
            font-weight: 600;
            fill: var(--text-sub);
            letter-spacing: 12px;
            text-transform: uppercase;
          }

          :global(.dev-mode-active) .brand-logo-svg {
            --primary: #39FF14 !important;
            --secondary: #15803D !important;
            --tertiary: #022c22 !important;
            --glow-color: #39FF14 !important;
            --text-main: #FFFFFF !important;
            --text-sub: #39FF14 !important;
          }
        `}</style>

        {/* HORIZONTAL FULL LOCKUP RENDER */}
        {variant === 'full' && (
          <g>
            {/* Standard structural lines in background */}
            <g opacity="0.12">
              <line x1="150" y1="20" x2="150" y2="280" stroke="var(--secondary)" stroke-width="0.5" stroke-dasharray="2 4" />
              <line x1="20" y1="150" x2="280" y2="150" stroke="var(--secondary)" stroke-width="0.5" stroke-dasharray="2 4" />
              <circle cx="150" cy="150" r="120" stroke="var(--secondary)" stroke-width="0.5" />
            </g>

            {/* Left Area: Icon symbol group */}
            <g transform="translate(0,0)">
              {/* Outer Orbit */}
              <motion.circle 
                variants={outerOrbitRotation}
                animate="animate"
                cx="150" 
                cy="150" 
                r="110" 
                stroke="var(--primary)" 
                stroke-width="var(--line-width)" 
                stroke-dasharray="80 40 20 20 50 20" 
                stroke-linecap="round" 
              />
              <motion.circle 
                variants={innerOrbitRotation}
                animate="animate"
                cx="150" 
                cy="150" 
                r="95" 
                stroke="var(--secondary)" 
                stroke-width="1" 
                stroke-dasharray="10 20" 
                stroke-linecap="round" 
                opacity="0.45" 
              />

              {/* Lattice Grid */}
              <motion.g variants={meshPulsing} animate="animate" opacity="0.85">
                <polygon points="150,55 232,102 232,198 150,245 68,198 68,102" stroke="var(--primary)" stroke-width="var(--line-width)" stroke-linejoin="round" />
                <polygon points="150,55 232,198 68,198" stroke="var(--primary)" stroke-width="0.5" opacity="0.3" />
                <polygon points="150,245 232,102 68,102" stroke="var(--primary)" stroke-width="0.5" opacity="0.3" />

                <line x1="150" y1="55" x2="150" y2="150" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
                <line x1="232" y1="102" x2="150" y2="150" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
                <line x1="232" y1="198" x2="150" y2="150" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
                <line x1="150" y1="245" x2="150" y2="150" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
                <line x1="68" y1="198" x2="150" y2="150" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
                <line x1="68" y1="102" x2="150" y2="150" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />

                <circle cx="150" cy="55" r="4.5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="1.5" />
                <circle cx="232" cy="102" r="4.5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="1.5" />
                <circle cx="232" cy="198" r="4.5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="1.5" />
                <circle cx="150" cy="245" r="4.5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="1.5" />
                <circle cx="68" cy="198" r="4.5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="1.5" />
                <circle cx="68" cy="102" r="4.5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="1.5" />
              </motion.g>

              {/* Glowing Singularity Core */}
              <motion.g variants={coreBreathing} animate="animate">
                <circle cx="150" cy="150" r="22" fill="url(#logo-core-glow-grad)" opacity="0.6" style={{ mixBlendMode: 'screen' }} />
                <circle cx="150" cy="150" r="10" stroke="var(--primary)" stroke-width="1.2" fill="var(--tertiary)" />
                <circle cx="150" cy="150" r="5" fill="var(--primary)" />
              </motion.g>
            </g>

            {/* Right Area: Typographic lockup */}
            <g transform="translate(320, 0)">
              <text x="0" y="145" className="text-lockup-title">
                Siva Panyam<tspan className="text-lockup-dot">.dev</tspan>
              </text>
              <text x="5" y="195" className="text-lockup-sub">
                AI Engineer &amp; Full Stack Developer
              </text>
              
              {/* Decorative grid indices under the logo */}
              <line x1="0" y1="230" x2="680" y2="230" stroke="var(--secondary)" stroke-width="0.5" opacity="0.25" />
              <circle cx="10" cy="230" r="1.5" fill="var(--primary)" />
              <circle cx="670" cy="230" r="1.5" fill="var(--primary)" />
              <text x="24" y="244" className="blueprint-text" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '8px', fill: 'var(--secondary)', letterSpacing: '2px', opacity: 0.5 }}>SYS_GATEWAY_STABLE: Bangalore/Bengaluru Node</text>
            </g>
          </g>
        )}

        {/* ICON ONLY RENDER (CENTERED AT 256, 256) */}
        {variant === 'icon' && (
          <g>
            {/* Ambient Blueprint Guide Lines */}
            <g opacity="0.12">
              <line x1="256" y1="32" x2="256" y2="480" stroke="var(--secondary)" stroke-width="0.5" stroke-dasharray="2 4" />
              <line x1="32" y1="256" x2="480" y2="256" stroke="var(--secondary)" stroke-width="0.5" stroke-dasharray="2 4" />
              <circle cx="256" cy="256" r="224" stroke="var(--secondary)" stroke-width="0.5" />
            </g>

            {/* Outer Orbit Rings */}
            <motion.circle
              variants={outerOrbitRotation}
              animate="animate"
              cx="256"
              cy="256"
              r="224"
              stroke="var(--primary)"
              stroke-width="var(--line-width)"
              stroke-dasharray="160 80 40 40 100 40"
              stroke-linecap="round"
            />
            <motion.circle
              variants={innerOrbitRotation}
              animate="animate"
              cx="256"
              cy="256"
              r="192"
              stroke="var(--secondary)"
              stroke-width="1"
              stroke-dasharray="20 40 80 40"
              stroke-linecap="round"
              opacity="0.5"
            />

            {/* Outer Floating Core Dots */}
            <motion.g variants={outerOrbitRotation} animate="animate">
              <circle cx="256" cy="32" r="3.5" fill="var(--primary)" />
              <circle cx="480" cy="256" r="3.5" fill="var(--primary)" />
              <circle cx="256" cy="480" r="3.5" fill="var(--primary)" />
              <circle cx="32" cy="256" r="3.5" fill="var(--primary)" />
            </motion.g>

            {/* Neural Lattice Mesh */}
            <motion.g variants={meshPulsing} animate="animate">
              <polygon points="256,96 394,176 394,336 256,416 118,336 118,176" stroke="var(--primary)" stroke-width="var(--line-width)" stroke-linejoin="round" opacity="0.85" />
              <polygon points="256,160 339,208 339,304 256,352 173,304 173,208" stroke="var(--secondary)" stroke-width="1" stroke-linejoin="round" opacity="0.4" />

              <polygon points="256,96 394,336 118,336" stroke="var(--primary)" stroke-width="0.75" opacity="0.3" />
              <polygon points="256,416 394,176 118,176" stroke="var(--primary)" stroke-width="0.75" opacity="0.3" />

              <line x1="256" y1="96" x2="256" y2="256" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
              <line x1="394" y1="176" x2="256" y2="256" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
              <line x1="394" y1="336" x2="256" y2="256" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
              <line x1="256" y1="416" x2="256" y2="256" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
              <line x1="118" y1="336" x2="256" y2="256" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
              <line x1="118" y1="176" x2="256" y2="256" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />

              <circle cx="256" cy="96" r="5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="2" />
              <circle cx="394" cy="176" r="5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="2" />
              <circle cx="394" cy="336" r="5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="2" />
              <circle cx="256" cy="416" r="5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="2" />
              <circle cx="118" cy="336" r="5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="2" />
              <circle cx="118" cy="176" r="5" fill="var(--primary)" stroke="var(--tertiary)" stroke-width="2" />
            </motion.g>

            {/* Centered Core Singularity */}
            <motion.g variants={coreBreathing} animate="animate">
              <circle cx="256" cy="256" r="44" fill="url(#logo-core-glow-grad)" opacity="0.65" style={{ mixBlendMode: 'screen' }} />
              <circle cx="256" cy="256" r="20" stroke="var(--primary)" stroke-width="1.5" fill="var(--tertiary)" opacity="0.6" />
              <circle cx="256" cy="256" r="10" fill="var(--primary)" />
              <line x1="256" y1="230" x2="256" y2="282" stroke="var(--primary)" stroke-width="0.5" />
              <line x1="230" y1="256" x2="282" y2="256" stroke="var(--primary)" stroke-width="0.5" />
            </motion.g>
          </g>
        )}
      </svg>
    </motion.div>
  );
};

export default Logo;

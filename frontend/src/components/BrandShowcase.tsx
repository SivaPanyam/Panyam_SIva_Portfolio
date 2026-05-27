import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Copy, Check, Play, Sliders, Layers, Type, Compass } from 'lucide-react';

const BRAND_COLORS = [
  { name: 'Onyx Absolute', hex: '#000000', use: 'Base Canvas Background' },
  { name: 'Carbon Zinc-950', hex: '#09090B', use: 'Primary Container Fill' },
  { name: 'Infrastructure Grey', hex: '#71717A', use: 'Muted Typography & Grid Lines' },
  { name: 'Polar Pure', hex: '#FFFFFF', use: 'Heading Typography & Primary Node Highlight' },
  { name: 'Developer Matrix Green', hex: '#39FF14', use: 'Developer Mode Primary Accent' },
  { name: 'Deep Forest', hex: '#15803D', use: 'Developer Mode Secondary Accent' }
];

const SVGS = {
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" fill="none" class="brand-neural-lattice">
  <defs>
    <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="256" cy="256" r="224" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="160 80 40 40 100 40" stroke-linecap="round" />
  <circle cx="256" cy="256" r="192" stroke="#71717A" stroke-width="1" stroke-dasharray="20 40 80 40" stroke-linecap="round" opacity="0.6" />
  <polygon points="256,96 394,176 394,336 256,416 118,336 118,176" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round" opacity="0.75" />
  <polygon points="256,96 394,336 118,336" stroke="#FFFFFF" stroke-width="0.75" opacity="0.35" />
  <polygon points="256,416 394,176 118,176" stroke="#FFFFFF" stroke-width="0.75" opacity="0.35" />
  <circle cx="256" cy="96" r="5" fill="#FFFFFF" stroke="#27272A" stroke-width="2" />
  <circle cx="394" cy="176" r="5" fill="#FFFFFF" stroke="#27272A" stroke-width="2" />
  <circle cx="394" cy="336" r="5" fill="#FFFFFF" stroke="#27272A" stroke-width="2" />
  <circle cx="256" cy="416" r="5" fill="#FFFFFF" stroke="#27272A" stroke-width="2" />
  <circle cx="118" cy="336" r="5" fill="#FFFFFF" stroke="#27272A" stroke-width="2" />
  <circle cx="118" cy="176" r="5" fill="#FFFFFF" stroke="#27272A" stroke-width="2" />
  <circle cx="256" cy="256" r="20" stroke="#FFFFFF" stroke-width="1.5" opacity="0.6" />
  <circle cx="256" cy="256" r="10" fill="#FFFFFF" />
</svg>`,
  full: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="100%" height="100%" fill="none" class="brand-full-lockup">
  <style>
    .text-title { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 76px; fill: #FFFFFF; letter-spacing: -2px; text-transform: uppercase; }
    .text-dot { fill: #FFFFFF; font-weight: 900; }
    .text-sub { font-family: monospace; font-size: 16px; font-weight: 600; fill: #71717A; letter-spacing: 12px; text-transform: uppercase; }
  </style>
  <circle cx="150" cy="150" r="110" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="80 40 20 20 50 20" stroke-linecap="round" />
  <polygon points="150,55 232,102 232,198 150,245 68,198 68,102" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round" />
  <text x="310" y="145" class="text-title">Siva Panyam<tspan class="text-dot">.dev</tspan></text>
  <text x="315" y="195" class="text-sub">Neural OS &amp; AI Infrastructure</text>
</svg>`,
  blueprint: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect x="16" y="16" width="480" height="480" stroke="#71717A" stroke-width="0.5" stroke-dasharray="6 6" />
  <circle cx="256" cy="256" r="224" stroke="#71717A" stroke-width="0.5" />
  <polygon points="256,96 394,176 394,336 256,416 118,336 118,176" stroke="#FFFFFF" stroke-width="1.5" />
  <line x1="256" y1="32" x2="256" y2="480" stroke="#71717A" stroke-width="0.5" stroke-dasharray="2 6" />
</svg>`,
  favicon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#09090B" />
  <circle cx="32" cy="32" r="26" stroke="#FFFFFF" stroke-width="2.5" stroke-dasharray="110 30" />
  <polygon points="32,14 48,23 48,41 32,50 16,41 16,23" stroke="#FFFFFF" stroke-width="2.5" />
</svg>`
};

export const BrandShowcase: React.FC = () => {
  // Brand States
  const [activeTab, setActiveTab] = useState<'logo' | 'assets' | 'typography' | 'elevation' | 'motion'>('logo');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedSvg, setCopiedSvg] = useState<string | null>(null);

  // Logo Playground States
  const [logoVariant, setLogoVariant] = useState<'icon' | 'full' | 'blueprint'>('icon');
  const [logoTheme, setLogoTheme] = useState<'default' | 'light' | 'dev'>('default');
  const [logoSize, setLogoSize] = useState<number>(140);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [glowIntensity, setGlowIntensity] = useState<number>(0.5);

  // Typography guidelines sizing multiplier
  const [fontScale, setFontScale] = useState<number>(1);

  // Motion Presets Test states
  const [animateCircle, setAnimateCircle] = useState(false);
  const [springCircle, setSpringCircle] = useState(false);

  const copyToClipboard = (text: string, identifier: string, type: 'color' | 'svg') => {
    navigator.clipboard.writeText(text);
    if (type === 'color') {
      setCopiedColor(identifier);
      setTimeout(() => setCopiedColor(null), 2000);
    } else {
      setCopiedSvg(identifier);
      setTimeout(() => setCopiedSvg(null), 2000);
    }
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden font-mono text-xs text-zinc-400 max-w-5xl mx-auto shadow-2xl relative select-none">
      
      {/* Brand system neon status bar */}
      <div className="bg-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 gap-4">
        <div>
          <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping shrink-0" />
            Sivapanyam.dev // Brand Identity System
          </h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Autonomous Design Pipeline v1.0.0</p>
        </div>
        <div className="flex gap-2">
          {(['logo', 'assets', 'typography', 'elevation', 'motion'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 border rounded uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="p-6 md:p-8 min-h-[480px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LOGO PLAYGROUND */}
          {activeTab === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-3 gap-8 items-stretch"
            >
              {/* Controls Column */}
              <div className="md:col-span-1 bg-zinc-950 border border-zinc-900 p-5 rounded-xl flex flex-col justify-between gap-6">
                <div>
                  <h4 className="text-white font-bold uppercase border-b border-zinc-900 pb-2 mb-4 tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-zinc-400" /> Playground Controls
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Variant Picker */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase">Silhouette Variant</span>
                      <div className="grid grid-cols-3 gap-1">
                        {(['icon', 'full', 'blueprint'] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setLogoVariant(v)}
                            className={`py-1 border text-[9px] uppercase tracking-wider rounded transition-colors cursor-pointer ${
                              logoVariant === v 
                                ? 'bg-zinc-800 border-zinc-600 text-white font-bold' 
                                : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Theme Selector */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase">Theme Styling</span>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'default', label: 'Dark Mono' },
                          { id: 'light', label: 'Light Mono' },
                          { id: 'dev', label: 'Dev Neon' }
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setLogoTheme(t.id as any)}
                            className={`py-1 border text-[9px] uppercase tracking-wider rounded transition-colors cursor-pointer ${
                              logoTheme === t.id 
                                ? 'bg-zinc-800 border-zinc-600 text-white font-bold' 
                                : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sizing Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-zinc-500 uppercase">Grid Size Bounds</span>
                        <span className="text-white font-bold">{logoSize}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="64" 
                        max="240" 
                        value={logoSize} 
                        onChange={(e) => setLogoSize(Number(e.target.value))}
                        className="accent-white cursor-pointer"
                      />
                    </div>

                    {/* Animation speed slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-zinc-500 uppercase">Spin Compilation Velocity</span>
                        <span className="text-white font-bold">{rotationSpeed}x</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="3" 
                        step="0.1"
                        value={rotationSpeed} 
                        onChange={(e) => setRotationSpeed(Number(e.target.value))}
                        className="accent-white cursor-pointer"
                      />
                    </div>

                    {/* Glow intensity slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-zinc-500 uppercase">Ambient Singularity Glow</span>
                        <span className="text-white font-bold">{Math.round(glowIntensity * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={glowIntensity} 
                        onChange={(e) => setGlowIntensity(Number(e.target.value))}
                        className="accent-white cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[9px] text-zinc-500 bg-zinc-900/30 border border-zinc-900/80 p-3 rounded leading-relaxed">
                  <span className="text-zinc-400 font-bold block mb-1">INTERACTIVE INSTRUCTIONS</span>
                  Hover cursor over the canvas in the playground to accelerate neural orbits and activate dynamic focal scale vectors.
                </div>
              </div>

              {/* Render Canvas Column */}
              <div className={`md:col-span-2 border border-zinc-900 rounded-xl flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
                logoTheme === 'light' ? 'bg-white text-zinc-900' : 'bg-black text-white'
              }`}>
                {/* Visual diagnostic alignment grids in canvas */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Diagonal lines crossing behind */}
                <div className={`absolute w-full h-[0.5px] opacity-[0.08] transform rotate-12 ${logoTheme === 'light' ? 'bg-black' : 'bg-white'}`} />
                <div className={`absolute w-full h-[0.5px] opacity-[0.08] transform -rotate-12 ${logoTheme === 'light' ? 'bg-black' : 'bg-white'}`} />

                {/* Main Logo Container */}
                <div 
                  className="flex items-center justify-center p-12 transition-all duration-300 relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 ${glowIntensity * 40}px ${
                      logoTheme === 'dev' 
                        ? 'rgba(57,255,20,0.4)' 
                        : logoTheme === 'light'
                          ? 'rgba(0,0,0,0.1)'
                          : 'rgba(255,255,255,0.15)'
                    })`
                  }}
                >
                  <Logo 
                    variant={logoVariant} 
                    size={logoSize}
                    animated={rotationSpeed > 0} 
                    className={`transition-colors duration-500 ${
                      logoTheme === 'dev' ? 'dev-mode' : ''
                    }`}
                    style={{
                      // Manipulate rotate cycles externally if speed !== 1
                      animationDuration: `${30 / Math.max(rotationSpeed, 0.01)}s`
                    } as any}
                  />
                </div>

                {/* Technical status tags in canvas corners */}
                <div className="absolute top-4 left-4 text-[8px] uppercase tracking-widest opacity-60">
                  BOUNDS: {logoVariant === 'full' ? `${logoSize * 4}x${logoSize}px` : `${logoSize}x${logoSize}px`}
                </div>
                <div className="absolute bottom-4 right-4 text-[8px] uppercase tracking-widest opacity-60">
                  GATEWAY: Banglore Node Resolved
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: BRAND ASSETS */}
          {activeTab === 'assets' && (
            <motion.div
              key="assets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'icon', name: 'logo-icon.svg', desc: 'Core Neural Lattice Symbol', size: 512, code: SVGS.icon },
                  { key: 'full', name: 'logo-full.svg', desc: 'Typographic Brand Lockup', size: '1200x300', code: SVGS.full },
                  { key: 'blueprint', name: 'logo-blueprint.svg', desc: 'Technical Engineering Blueprint', size: 512, code: SVGS.blueprint },
                  { key: 'favicon', name: 'favicon.svg', desc: 'Simplified High-Contrast Favicon', size: 64, code: SVGS.favicon }
                ].map((asset) => (
                  <div key={asset.key} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex flex-col justify-between gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-zinc-500 uppercase">{asset.desc}</span>
                      <span className="text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-1 py-0.5 rounded">{asset.size}px</span>
                    </div>

                    {/* Small static asset preview box */}
                    <div className="h-32 bg-zinc-900/30 border border-zinc-900 rounded-lg flex items-center justify-center p-3 text-white overflow-hidden relative">
                      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                      <div className="w-full h-full max-w-[100px] flex items-center justify-center">
                        <Logo variant={asset.key as any} size={64} animated={false} interactive={false} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[9px] text-white font-bold tracking-tight truncate">{asset.name}</div>
                      <button
                        onClick={() => copyToClipboard(asset.code, asset.key, 'svg')}
                        className="w-full py-1.5 border border-zinc-800 bg-zinc-950 hover:bg-white hover:text-black hover:border-white transition-all text-[9px] uppercase tracking-wider rounded font-bold cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        {copiedSvg === asset.key ? (
                          <>
                            <Check className="w-3 h-3" /> Copied Code!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy SVG Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color swatches card */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
                <h4 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-400" /> Cohesive Color Swatch System
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {BRAND_COLORS.map((color) => (
                    <div 
                      key={color.name} 
                      onClick={() => copyToClipboard(color.hex, color.name, 'color')}
                      className="bg-zinc-900/20 border border-zinc-900 hover:border-zinc-600 transition-colors p-3 rounded-lg flex flex-col justify-between gap-3 cursor-pointer relative"
                    >
                      <div 
                        className="w-full h-12 rounded-md shadow-inner border border-white/5 relative"
                        style={{ backgroundColor: color.hex }}
                      >
                        <AnimatePresence>
                          {copiedColor === color.name && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute inset-0 bg-black/80 flex items-center justify-center text-[8px] text-white font-bold uppercase rounded"
                            >
                              Copied!
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <div className="text-[9px] text-white font-bold leading-tight">{color.name}</div>
                        <div className="text-[8px] text-zinc-500 uppercase mt-1 leading-normal">{color.hex}</div>
                        <div className="text-[8px] text-zinc-600 uppercase mt-1.5 leading-relaxed">{color.use}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: TYPOGRAPHY GUIDELINE */}
          {activeTab === 'typography' && (
            <motion.div
              key="typography"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              {/* Sizing scale multiplier column */}
              <div className="md:col-span-1 bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-5">
                <h4 className="text-white font-bold uppercase border-b border-zinc-900 pb-2 mb-3 tracking-wider flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-zinc-400" /> Type Architect
                </h4>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-zinc-500 uppercase">Guideline Sizing Scale</span>
                    <span className="text-white font-bold">{Math.round(fontScale * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="1.5" 
                    step="0.05"
                    value={fontScale} 
                    onChange={(e) => setFontScale(Number(e.target.value))}
                    className="accent-white cursor-pointer"
                  />
                </div>
                <div className="space-y-3 font-sans text-xs text-zinc-500 leading-relaxed">
                  <p>
                    <strong className="text-white font-mono text-[10px] block mb-1">PRIMARY SANS: OUTFIT</strong>
                    Outfit is a gorgeous geometric, high-tech, and futuristic typeface. Ideal for high-profile software headings, branding components, and dynamic typographic layouts. We keep tracking extremely compressed for titles, and expanded for metrics.
                  </p>
                  <p>
                    <strong className="text-white font-mono text-[10px] block mb-1">MONOSPACE: JETBRAINS MONO</strong>
                    Our default developer font. Precise, easily readable at small micro-displays, and highly cohesive with coding overlays.
                  </p>
                </div>
              </div>

              {/* Visual typography scale demonstration */}
              <div className="md:col-span-2 border border-zinc-900 p-6 rounded-xl space-y-6">
                {/* Heading 1 */}
                <div className="border-b border-zinc-900/60 pb-5">
                  <div className="flex justify-between text-[8px] text-zinc-600 uppercase mb-2">
                    <span>H1 Title Hero Block // Outfit Bold</span>
                    <span>Size: {Math.round(56 * fontScale)}px</span>
                  </div>
                  <h1 
                    className="text-white font-black leading-none select-text tracking-tighter"
                    style={{ fontSize: `${56 * fontScale}px`, fontFamily: "'Outfit', sans-serif" }}
                  >
                    SIVA PANYAM
                  </h1>
                </div>

                {/* Section Title */}
                <div className="border-b border-zinc-900/60 pb-5">
                  <div className="flex justify-between text-[8px] text-zinc-600 uppercase mb-2">
                    <span>H2 Section Title // Outfit Regular</span>
                    <span>Size: {Math.round(24 * fontScale)}px</span>
                  </div>
                  <h2 
                    className="text-white font-bold uppercase tracking-widest leading-none select-text"
                    style={{ fontSize: `${24 * fontScale}px`, fontFamily: "'Outfit', sans-serif", letterSpacing: '4px' }}
                  >
                    01 // FEATURES
                  </h2>
                </div>

                {/* Component Label */}
                <div className="border-b border-zinc-900/60 pb-5">
                  <div className="flex justify-between text-[8px] text-zinc-600 uppercase mb-2">
                    <span>Monospace Developer Label // SFMono</span>
                    <span>Size: {Math.round(11 * fontScale)}px</span>
                  </div>
                  <div 
                    className="text-white font-bold uppercase select-text"
                    style={{ fontSize: `${11 * fontScale}px`, letterSpacing: '2px' }}
                  >
                    STATUS: DIAGNOSTICS_COMPLETED [OK]
                  </div>
                </div>

                {/* Standard Code block */}
                <div>
                  <div className="flex justify-between text-[8px] text-zinc-600 uppercase mb-2">
                    <span>Code Snippet block // JetBrains Mono</span>
                    <span>Size: {Math.round(13 * fontScale)}px</span>
                  </div>
                  <code 
                    className="block text-zinc-400 select-text leading-relaxed border border-zinc-900 p-3 rounded bg-zinc-950"
                    style={{ fontSize: `${13 * fontScale}px` }}
                  >
                    const nodeInstance = new CoreLattice('Bangalore');<br/>
                    await nodeInstance.synchronize(AuthMethod.Synapse);
                  </code>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: UI ELEVATION */}
          {activeTab === 'elevation' && (
            <motion.div
              key="elevation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Elevation 1 */}
                <div className="perspective-1000">
                  <motion.div 
                    whileHover={{ rotateY: -8, rotateX: 6, z: 20 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="bg-zinc-950/40 border border-zinc-900/80 p-5 rounded-xl h-60 flex flex-col justify-between preserve-3d"
                  >
                    <div>
                      <span className="text-[8px] text-zinc-600 uppercase tracking-widest block mb-1">ELEVATION 01 // FLAT CARDS</span>
                      <h5 className="text-white font-bold uppercase tracking-wider text-[10px]">Canvas Base Card</h5>
                    </div>
                    
                    <div className="text-[10px] text-zinc-500 leading-relaxed translate-z-20 font-sans">
                      Used for basic data grids, portfolio grids, and secondary layout surfaces.
                    </div>

                    <div className="border-t border-zinc-900/60 pt-3 flex justify-between items-center text-[8px] text-zinc-500 uppercase">
                      <span>bg-zinc-950/40</span>
                      <span>border-zinc-900</span>
                    </div>
                  </motion.div>
                </div>

                {/* Elevation 2 */}
                <div className="perspective-1000">
                  <motion.div 
                    whileHover={{ rotateY: -8, rotateX: 6, z: 20 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="glass-panel p-5 rounded-xl h-60 flex flex-col justify-between preserve-3d shadow-xl"
                  >
                    <div>
                      <span className="text-[8px] text-zinc-600 uppercase tracking-widest block mb-1">ELEVATION 02 // DOCK &amp; INTERACTIVE PANELS</span>
                      <h5 className="text-white font-bold uppercase tracking-wider text-[10px] text-glow-cyan">Interactive Panel</h5>
                    </div>
                    
                    <div className="text-[10px] text-zinc-400 leading-relaxed translate-z-40 font-sans">
                      Used for persistent widgets, the floating dock navigation bar, and overlay tooltips. Incorporates backdrop blur and subtle glowing shadows.
                    </div>

                    <div className="border-t border-zinc-800 pt-3 flex justify-between items-center text-[8px] text-zinc-400 uppercase">
                      <span>glass-panel</span>
                      <span>backdrop-blur-xl</span>
                    </div>
                  </motion.div>
                </div>

                {/* Elevation 3 */}
                <div className="perspective-1000">
                  <motion.div 
                    whileHover={{ rotateY: -8, rotateX: 6, z: 20 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="glass-panel-heavy p-5 rounded-xl h-60 flex flex-col justify-between preserve-3d shadow-2xl"
                  >
                    <div>
                      <span className="text-[8px] stroke-red-500 text-zinc-500 uppercase tracking-widest block mb-1">ELEVATION 03 // MODALS &amp; SHELLS</span>
                      <h5 className="text-white font-bold uppercase tracking-wider text-[10px]">Focus Modal Overlay</h5>
                    </div>
                    
                    <div className="text-[10px] text-zinc-300 leading-relaxed translate-z-60 font-sans">
                      Used for project modular overlays and critical developer shell overlays. Maximum contrast, dark fills, and bold borders.
                    </div>

                    <div className="border-t border-zinc-700 pt-3 flex justify-between items-center text-[8px] text-zinc-300 uppercase">
                      <span>glass-panel-heavy</span>
                      <span>backdrop-blur-2xl</span>
                    </div>
                  </motion.div>
                </div>

              </div>

              <div className="text-[9px] text-zinc-500 bg-zinc-900/20 border border-zinc-900 p-4 rounded text-center uppercase tracking-wider">
                Hover over the cards to inspect 3D parallax layers and real-time physical elevation highlights.
              </div>
            </motion.div>
          )}

          {/* TAB 5: MOTION TESTING */}
          {activeTab === 'motion' && (
            <motion.div
              key="motion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Cinematic Ease Sandbox */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl flex flex-col justify-between gap-6">
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-zinc-400" /> Cinematic Transition Easing
                  </h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">
                    TIMING: 800ms | Easing: cubic-bezier(0.16, 1, 0.3, 1)
                  </p>
                </div>

                <div className="h-40 bg-zinc-900/30 border border-zinc-900 rounded-lg flex items-center justify-start p-6 overflow-hidden relative">
                  <motion.div
                    animate={{ x: animateCircle ? 240 : 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-black font-black"
                  >
                    OS
                  </motion.div>
                </div>

                <button
                  onClick={() => setAnimateCircle(!animateCircle)}
                  className="py-2 bg-white text-black font-bold uppercase tracking-widest rounded cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-black" /> Trigger Cinematic Shift
                </button>
              </div>

              {/* Snappy Spring Sandbox */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl flex flex-col justify-between gap-6">
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-zinc-400" /> Snappy Spring Physics
                  </h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">
                    TIMING: Spring | Stiffness: 400 | Damping: 28
                  </p>
                </div>

                <div className="h-40 bg-zinc-900/30 border border-zinc-900 rounded-lg flex items-center justify-start p-6 overflow-hidden relative">
                  <motion.div
                    animate={{ x: springCircle ? 240 : 0, rotate: springCircle ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className="w-12 h-12 bg-zinc-900 border border-zinc-800 text-white rounded-full shadow-lg flex items-center justify-center font-bold"
                  >
                    AI
                  </motion.div>
                </div>

                <button
                  onClick={() => setSpringCircle(!springCircle)}
                  className="py-2 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-white font-bold uppercase tracking-widest rounded cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Trigger Spring Snap
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Brand system console info bar */}
      <div className="bg-zinc-900/60 border-t border-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between text-[10px] text-zinc-500 uppercase gap-2 font-mono">
        <div>CORE PIPELINE: STABLE / Edge nodes active</div>
        <div>STATION: BENGALURU, KARNATAKA, IND</div>
      </div>

    </div>
  );
};

export default BrandShowcase;

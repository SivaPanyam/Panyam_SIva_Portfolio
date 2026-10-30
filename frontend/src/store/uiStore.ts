// frontend/src/store/uiStore.ts
import { create } from 'zustand';

export type GlobalAccentTheme = 'default' | 'cyan' | 'matrix' | 'amber' | 'violet' | 'rose';

export interface ThemeConfig {
  id: GlobalAccentTheme;
  name: string;
  hex: string;
  glow: string;
  pulseColor: string;
  lineColor: string;
  pointColor: string;
}

export const THEME_CONFIGS: Record<GlobalAccentTheme, ThemeConfig> = {
  default: {
    id: 'default',
    name: 'Monochrome Polar',
    hex: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.4)',
    pulseColor: '#22d3ee',
    lineColor: '#3f3f46',
    pointColor: '#ffffff',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    hex: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.5)',
    pulseColor: '#22d3ee',
    lineColor: '#0e7490',
    pointColor: '#67e8f9',
  },
  matrix: {
    id: 'matrix',
    name: 'Developer Matrix',
    hex: '#39ff14',
    glow: 'rgba(57, 255, 20, 0.5)',
    pulseColor: '#39ff14',
    lineColor: '#166534',
    pointColor: '#4ade80',
  },
  amber: {
    id: 'amber',
    name: 'Quantum Amber',
    hex: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.5)',
    pulseColor: '#fbbf24',
    lineColor: '#78350f',
    pointColor: '#fde68a',
  },
  violet: {
    id: 'violet',
    name: 'Neural Violet',
    hex: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.5)',
    pulseColor: '#c084fc',
    lineColor: '#581c87',
    pointColor: '#ddd6fe',
  },
  rose: {
    id: 'rose',
    name: 'Raft Rose',
    hex: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.5)',
    pulseColor: '#fb7185',
    lineColor: '#881337',
    pointColor: '#fecdd3',
  },
};

interface UIState {
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
  isCommandPaletteOpen: boolean;
  toggleCommandPalette: () => void;
  isDevModeActive: boolean;
  toggleDevMode: () => void;
  isJarvisOpen: boolean;
  toggleJarvis: () => void;
  setJarvisOpen: (open: boolean) => void;
  activeTheme: GlobalAccentTheme;
  setActiveTheme: (theme: GlobalAccentTheme) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  isCommandPaletteOpen: false,
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  isDevModeActive: false,
  toggleDevMode: () => set((state) => ({ isDevModeActive: !state.isDevModeActive })),
  isJarvisOpen: false,
  toggleJarvis: () => set((state) => ({ isJarvisOpen: !state.isJarvisOpen })),
  setJarvisOpen: (open) => set({ isJarvisOpen: open }),
  activeTheme: 'default',
  setActiveTheme: (theme: GlobalAccentTheme) => {
    // Update CSS custom properties on root
    const config = THEME_CONFIGS[theme] || THEME_CONFIGS.default;
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent-glow', config.glow);
      document.documentElement.style.setProperty('--accent-color', config.hex);
    }
    set({ activeTheme: theme });
  },
}));

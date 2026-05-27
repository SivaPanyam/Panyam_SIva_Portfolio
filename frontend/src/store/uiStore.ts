// frontend/src/store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
  isCommandPaletteOpen: boolean;
  toggleCommandPalette: () => void;
  isDevModeActive: boolean;
  toggleDevMode: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  isCommandPaletteOpen: false,
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  isDevModeActive: false,
  toggleDevMode: () => set((state) => ({ isDevModeActive: !state.isDevModeActive })),
}));

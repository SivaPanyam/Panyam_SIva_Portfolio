// frontend/src/store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
}));

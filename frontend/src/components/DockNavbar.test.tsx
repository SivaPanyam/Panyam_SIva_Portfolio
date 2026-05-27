// frontend/src/components/DockNavbar.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DockNavbar from './DockNavbar';
import { useUIStore } from '../store/uiStore';
import '@testing-library/jest-dom';

describe('DockNavbar Component', () => {
  it('renders the dock navigation bar container', () => {
    const { container } = render(<DockNavbar />);
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
  });

  it('toggles terminal when Terminal icon is clicked', () => {
    const toggleTerminalSpy = vi.spyOn(useUIStore.getState(), 'toggleTerminal');
    const { container } = render(<DockNavbar />);
    
    // Query by the Lucide terminal icon inside the button
    const terminalSvg = container.querySelector('.lucide-terminal');
    expect(terminalSvg).toBeInTheDocument();
    
    const terminalBtn = terminalSvg?.closest('div');
    expect(terminalBtn).toBeInTheDocument();
    
    if (terminalBtn) {
      fireEvent.click(terminalBtn);
    }
    
    expect(toggleTerminalSpy).toHaveBeenCalled();
  });
});

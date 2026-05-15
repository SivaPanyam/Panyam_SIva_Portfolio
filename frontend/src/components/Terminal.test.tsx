// frontend/src/components/Terminal.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Terminal from './Terminal';
import { useUIStore } from '../store/uiStore';
import '@testing-library/jest-dom';

describe('Terminal Component', () => {
  it('should render when terminal is open', () => {
    useUIStore.setState({ isTerminalOpen: true });
    render(<Terminal />);
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
  });

  it('should not render when terminal is closed', () => {
    useUIStore.setState({ isTerminalOpen: false });
    const { container } = render(<Terminal />);
    expect(container.firstChild).toBeNull();
  });
});

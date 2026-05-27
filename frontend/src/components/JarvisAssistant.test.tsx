// frontend/src/components/JarvisAssistant.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JarvisAssistant from './JarvisAssistant';
import '@testing-library/jest-dom';

// Mock chat hook
vi.mock('../hooks/useChat', () => ({
  useChat: () => ({
    messages: [],
    sendMessage: vi.fn(),
    isLoading: false,
  }),
}));

describe('JarvisAssistant Component', () => {
  it('renders the floating orb trigger button', () => {
    render(<JarvisAssistant />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('expands conversational panel when clicked', () => {
    render(<JarvisAssistant />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText(/Greetings! I am \*\*Jarvis\*\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask Jarvis a question.../i)).toBeInTheDocument();
  });
});

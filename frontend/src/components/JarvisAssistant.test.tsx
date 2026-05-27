// frontend/src/components/JarvisAssistant.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JarvisAssistant from './JarvisAssistant';
import '@testing-library/jest-dom';

// Setup mock for hook state triggers
const useChatMock = vi.fn().mockReturnValue({
  messages: [],
  sendMessage: vi.fn(),
  isLoading: false,
});

vi.mock('../hooks/useChat', () => ({
  useChat: () => useChatMock(),
}));

describe('JarvisAssistant Component', () => {
  it('renders the floating orb trigger button', () => {
    render(<JarvisAssistant />);
    const button = screen.getByTestId('jarvis-toggle');
    expect(button).toBeInTheDocument();
  });

  it('expands conversational panel when clicked', () => {
    render(<JarvisAssistant />);
    const button = screen.getByTestId('jarvis-toggle');
    fireEvent.click(button);
    
    expect(screen.getByText(/(Greetings|Good morning|Good afternoon|Good evening)! I am \*\*Jarvis\*\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask Jarvis a question.../i)).toBeInTheDocument();
  });

  it('displays neural skeletal loaders in calculated loading states', () => {
    // Force mock loading condition
    useChatMock.mockReturnValueOnce({
      messages: [],
      sendMessage: vi.fn(),
      isLoading: true,
    });

    render(<JarvisAssistant />);
    
    // Open chat drawer
    const button = screen.getByTestId('jarvis-toggle');
    fireEvent.click(button);

    // Verify diagnostic loading skeleton mounts
    expect(screen.getByTestId('jarvis-skeleton')).toBeInTheDocument();
  });
});

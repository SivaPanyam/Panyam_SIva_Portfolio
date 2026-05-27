// frontend/src/hooks/useChat.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useChat } from './useChat';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

describe('useChat hook', () => {
  it('should send message and receive response', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'AI processing: hello' })
    });

    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('hello');
    });

    expect(result.current.messages).toContainEqual({ role: 'ai', content: 'AI processing: hello' });
  });

  it('should handle errors gracefully', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('hello');
    });

    expect(result.current.messages).toContainEqual({ role: 'ai', content: 'Error connecting to neural net.' });
  });
});

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver for testing components that track viewport focus
class MockIntersectionObserver {
  callback: any;
  options: any;
  constructor(callback: any, options: any) {
    this.callback = callback;
    this.options = options;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver;

// frontend/src/components/HeroScene.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroScene from './HeroScene';

// Mock Canvas and Drei components as they're hard to test Three.js in JSDOM
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-canvas">{children}</div>,
  useThree: () => ({
    size: { width: 1024, height: 768 },
    viewport: { width: 10, height: 10 },
  }),
  useFrame: () => {},
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Stars: () => <div data-testid="stars" />,
}));

describe('HeroScene', () => {
  it('renders canvas container', () => {
    const { getByTestId } = render(<HeroScene />);
    expect(getByTestId('mock-canvas')).toBeInTheDocument();
  });
});

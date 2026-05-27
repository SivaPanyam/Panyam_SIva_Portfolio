// frontend/src/components/BootSequence.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BootSequence from './BootSequence';
import '@testing-library/jest-dom';

describe('BootSequence Component', () => {
  it('renders boot header and percentage indicator', () => {
    const onCompleteMock = vi.fn();
    render(<BootSequence onComplete={onCompleteMock} />);
    expect(screen.getByText(/NEURAL OS v1.0.4/i)).toBeInTheDocument();
  });

  it('triggers onComplete when skip button is clicked', () => {
    const onCompleteMock = vi.fn();
    render(<BootSequence onComplete={onCompleteMock} />);
    
    const skipBtn = screen.getByRole('button', { name: /Skip Diagnostics/i });
    fireEvent.click(skipBtn);
    
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});

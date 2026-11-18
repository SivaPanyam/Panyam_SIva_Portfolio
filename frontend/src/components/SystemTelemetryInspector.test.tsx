// frontend/src/components/SystemTelemetryInspector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SystemTelemetryInspector from './SystemTelemetryInspector';
import '@testing-library/jest-dom';

describe('SystemTelemetryInspector Component', () => {
  it('renders the floating telemetry pill trigger', () => {
    render(<SystemTelemetryInspector />);
    const pill = screen.getByTestId('telemetry-toggle');
    expect(pill).toBeInTheDocument();
    expect(screen.getByText(/Telemetry/i)).toBeInTheDocument();
  });

  it('expands telemetry inspector card when clicked', () => {
    render(<SystemTelemetryInspector />);
    const pill = screen.getByTestId('telemetry-toggle');
    fireEvent.click(pill);

    expect(screen.getByText(/Runtime Telemetry Inspector/i)).toBeInTheDocument();
    expect(screen.getByText(/Engine FPS/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero-API In-Memory BM25/i)).toBeInTheDocument();
  });
});

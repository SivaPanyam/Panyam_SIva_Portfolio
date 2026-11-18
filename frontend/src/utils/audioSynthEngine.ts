// frontend/src/utils/audioSynthEngine.ts
/**
 * Procedural In-Browser Ambient Audio Synthesizer Engine
 * Generates low-frequency cyberpunk focus waves and harmonic resonance in Web Audio API
 */

class AmbientSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;

  public start() {
    if (this.isRunning) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      // Gentle fade in to avoid clicking
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // Low-pass filter for smooth ambient tone
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Sub-bass tone (55Hz / A1)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.osc1.connect(this.filter);

      // Binaural wave shift (55Hz + 7.83Hz Schumann resonance)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(62.83, this.ctx.currentTime);
      this.osc2.connect(this.filter);

      this.osc1.start();
      this.osc2.start();
      this.isRunning = true;
    } catch (e) {
      console.warn('AudioContext initialization deferred:', e);
    }
  }

  public stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    try {
      // Smooth fade out
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.ctx?.close();
        } catch (e) {}
        this.isRunning = false;
        this.ctx = null;
      }, 850);
    } catch (e) {
      this.isRunning = false;
    }
  }

  public triggerChirp(freq = 440) {
    if (!this.ctx || !this.isRunning) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }
}

export const ambientSynth = new AmbientSynthEngine();

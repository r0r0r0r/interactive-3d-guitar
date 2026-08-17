/**
 * Web Audio API Guitar Tone Synthesizer & Audio Engine
 * Generates realistic acoustic and electric guitar tones in real-time without external asset dependencies.
 */

class GuitarAudioEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Plays a synthesized guitar chord tone based on pickup position & mode
   * @param tonePreset 'clean' | 'crunch' | 'lead' | 'acoustic' | 'jazz'
   * @param pickup 'neck' | 'middle' | 'bridge'
   */
  public playTone(tonePreset: "clean" | "crunch" | "lead" | "acoustic" | "jazz" = "clean", pickup: "neck" | "middle" | "bridge" = "bridge") {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Base frequencies for a lush E-major 9th / E-minor 9th chord voicing
    const chordFreqs = tonePreset === "jazz"
      ? [82.41, 123.47, 164.81, 196.00, 246.94, 329.63] // Em9 / Jazz voicing
      : [82.41, 123.47, 164.81, 207.65, 246.94, 329.63]; // E9 / Bright voicing

    // Adjust timbre based on pickup selection
    const pickupFilterFreq = pickup === "neck" ? 1200 : pickup === "middle" ? 2400 : 4200;

    chordFreqs.forEach((freq, index) => {
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Stagger strum timing (30ms per string)
      const strumDelay = index * 0.035;
      const startTime = now + strumDelay;

      // Oscillator wave shape based on tone preset
      if (tonePreset === "lead" || tonePreset === "crunch") {
        osc.type = "sawtooth";
      } else if (tonePreset === "acoustic") {
        osc.type = "triangle";
      } else {
        osc.type = "sine";
      }

      osc.frequency.setValueAtTime(freq, startTime);

      // Body Filter (simulate tonewood resonance)
      filter.type = tonePreset === "acoustic" ? "bandpass" : "lowpass";
      filter.frequency.setValueAtTime(pickupFilterFreq, startTime);
      filter.Q.setValueAtTime(tonePreset === "lead" ? 4 : 1.5, startTime);

      // Volume envelope (Pluck attack -> exponential decay)
      const peakGain = 0.18 / (index * 0.1 + 1);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + (tonePreset === "acoustic" ? 1.8 : 2.5));

      // Distortion stage for Crunch and Lead
      if (tonePreset === "crunch" || tonePreset === "lead") {
        const waveshaper = this.ctx.createWaveShaper();
        waveshaper.curve = this.makeDistortionCurve(tonePreset === "lead" ? 35 : 15);
        osc.connect(waveshaper);
        waveshaper.connect(filter);
      } else {
        osc.connect(filter);
      }

      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 2.6);
    });
  }

  private makeDistortionCurve(amount: number) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const audioEngine = new GuitarAudioEngine();

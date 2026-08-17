"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, X, Music, Radio, Disc } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  instrumentName?: string;
};

const PRESETS = [
  { id: "clean", label: "Clean Velvet", desc: "Warm, uncompressed tube clarity with bell-like highs." },
  { id: "crunch", label: "Plexi Crunch", desc: "Vintage 1968 British stack edge-of-breakup saturation." },
  { id: "lead", label: "Liquid Lead", desc: "Sustained high-gain harmonic overdrive for soaring solos." },
  { id: "acoustic", label: "Acoustic Shimmer", desc: "Crisp resonance with natural chamber air frequency." },
  { id: "jazz", label: "Warm Jazz", desc: "Dark mahogany warmth with smooth flat-wound response." },
] as const;

export function ToneSamplerModal({ isOpen, onClose, instrumentName = "AURIC Instrument" }: Props) {
  const [activePreset, setActivePreset] = useState<"clean" | "crunch" | "lead" | "acoustic" | "jazz">("clean");
  const [activePickup, setActivePickup] = useState<"neck" | "middle" | "bridge">("bridge");
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    audioEngine.playTone(activePreset, activePickup);
    setTimeout(() => setIsPlaying(false), 2600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl p-8 overflow-hidden rounded-2xl bg-surface border border-line shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{instrumentName} Tone Sampler</h3>
                  <p className="text-xs text-muted font-mono">Web Audio Real-Time Studio Synthesizer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted hover:text-foreground hover:bg-surface-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="py-6 space-y-6">
              {/* Pickup Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-gold" /> Pickup Position
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["neck", "middle", "bridge"] as const).map((pickup) => (
                    <button
                      key={pickup}
                      onClick={() => setActivePickup(pickup)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                        activePickup === pickup
                          ? "bg-gold text-background font-bold border-gold shadow-lg shadow-gold/20"
                          : "bg-surface-2 text-muted border-line hover:border-gold/40 hover:text-foreground"
                      }`}
                    >
                      {pickup} Pickup
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-gold" /> Tone Profile
                </label>
                <div className="space-y-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePreset(p.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                        activePreset === p.id
                          ? "bg-gold/10 border-gold/60 text-foreground"
                          : "bg-surface-2/60 border-line hover:border-line-strong text-muted hover:text-foreground"
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold flex items-center gap-2">
                          <Disc className={`w-3.5 h-3.5 ${activePreset === p.id ? "text-gold" : "text-faint"}`} />
                          {p.label}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{p.desc}</p>
                      </div>
                      {activePreset === p.id && (
                        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Wave Visualizer Simulation */}
              <div className="h-14 rounded-xl bg-surface-2 border border-line p-3 flex items-center justify-center gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? {
                            height: [8, Math.random() * 36 + 6, 8],
                          }
                        : { height: 6 }
                    }
                    transition={{
                      repeat: isPlaying ? Infinity : 0,
                      duration: 0.35 + (i % 5) * 0.08,
                      ease: "easeInOut",
                    }}
                    className={`w-1 rounded-full ${isPlaying ? "bg-gold" : "bg-faint/30"}`}
                  />
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-line flex justify-end gap-3">
              <button
                onClick={handlePlay}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-background font-display font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4" /> Strum {PRESETS.find((p) => p.id === activePreset)?.label} Chord
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

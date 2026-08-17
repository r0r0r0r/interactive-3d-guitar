"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Volume2, ShieldCheck, Sparkles, Check, Download, ShoppingBag, Send } from "lucide-react";
import { CustomShop3D } from "./CustomShop3D";
import { audioEngine } from "@/lib/audioEngine";
import { useCart } from "@/lib/store";
import { products } from "@/lib/products";

export function CustomShopClient() {
  const [finish, setFinish] = useState<"sunburst" | "obsidian" | "gold" | "emerald" | "crimson">("sunburst");
  const [wood, setWood] = useState<"maple" | "mahogany" | "ebony">("maple");
  const [pickups, setPickups] = useState<"hss" | "hh" | "p90">("hh");
  const [hardware, setHardware] = useState<"gold" | "chrome" | "black">("gold");
  const [engravingText, setEngravingText] = useState("AURIC ATELIER #001");
  const [submitted, setSubmitted] = useState(false);

  const add = useCart((s) => s.add);

  // Price Calculation Logic
  const basePrice = 450000; // $4,500.00
  const woodExtra = wood === "ebony" ? 40000 : wood === "mahogany" ? 25000 : 0;
  const finishExtra = finish === "gold" || finish === "emerald" ? 35000 : 0;
  const pickupExtra = pickups === "hss" ? 20000 : 0;
  const totalPrice = basePrice + woodExtra + finishExtra + pickupExtra;

  const handleTestAudio = () => {
    const tonePreset = finish === "obsidian" ? "lead" : finish === "gold" ? "jazz" : "clean";
    audioEngine.playTone(tonePreset, "bridge");
  };

  const handleAddToCart = () => {
    const customProduct = products[6]; // Custom One-of-One
    add(customProduct, customProduct.finishes[0]?.id || "bespoke");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Header Title */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Bespoke 3D Custom Studio
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground mt-3">
          Build Your <span className="text-gradient-gold">Masterpiece</span>
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto mt-2">
          Handcraft your signature instrument in 3D. Every tonewood, pickup winding, and custom engraving is forged by master luthiers.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 3D Interactive Viewport (7 Cols) */}
        <div className="lg:col-span-7 h-[500px] sm:h-[620px] rounded-3xl bg-surface border border-line overflow-hidden relative shadow-2xl flex flex-col justify-between p-6">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
            <button
              onClick={handleTestAudio}
              className="px-4 py-2 rounded-xl bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-gold hover:text-background transition-all shadow-lg"
            >
              <Volume2 className="w-4 h-4" /> Strum Tone Sampler
            </button>
          </div>

          <div className="absolute top-6 right-6 z-10 bg-surface-2/80 backdrop-blur-md border border-line px-3 py-1.5 rounded-lg text-xs font-mono text-muted">
            Drag to Rotate • Scroll to Zoom
          </div>

          {/* 3D Canvas */}
          <CustomShop3D
            finish={finish}
            wood={wood}
            pickups={pickups}
            hardware={hardware}
            engravingText={engravingText}
          />

          {/* Bottom Controls Indicator */}
          <div className="relative z-10 flex items-center justify-between border-t border-line/60 pt-4 text-xs font-mono text-muted">
            <span>Model: AURIC Custom 1-of-1</span>
            <span className="text-gold font-bold">24k Gold Hardware Edition</span>
          </div>
        </div>

        {/* Studio Control Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Sliders className="w-5 h-5 text-gold" /> Customization Studio
            </h3>
            <span className="font-mono text-2xl font-bold text-gold">
              ${(totalPrice / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* 1. Body Finish */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3">
              1. Body Finish & Lacquer
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: "sunburst", label: "Sunburst", color: "#e8a448" },
                { id: "obsidian", label: "Obsidian", color: "#1b1b21" },
                { id: "gold", label: "Auric Gold", color: "#d4af37" },
                { id: "emerald", label: "Emerald", color: "#2d7a52" },
                { id: "crimson", label: "Crimson", color: "#9e2a2b" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinish(f.id as typeof finish)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    finish === f.id ? "border-gold bg-gold/10" : "border-line bg-surface-2 hover:border-line-strong"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full shadow-inner border border-white/20" style={{ backgroundColor: f.color }} />
                  <span className="text-[10px] font-mono text-muted">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Fingerboard Tonewood */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3">
              2. Fingerboard & Neck Wood
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "maple", name: "Flame Maple", note: "Standard" },
                { id: "mahogany", name: "Honduran Mahog.", note: "+$250" },
                { id: "ebony", name: "Gabon Ebony", note: "+$400" },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWood(w.id as typeof wood)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    wood === w.id ? "border-gold bg-gold/10 text-foreground" : "border-line bg-surface-2 text-muted hover:text-foreground"
                  }`}
                >
                  <div className="text-xs font-semibold">{w.name}</div>
                  <div className="text-[10px] font-mono text-gold">{w.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pickups Configuration */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3">
              3. Hand-Wound Pickups
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "hh", name: "Dual Humbucker (HH)" },
                { id: "hss", name: "HSS Custom Alnico" },
                { id: "p90", name: "Vintage P90 Rails" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPickups(p.id as typeof pickups)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    pickups === p.id ? "border-gold bg-gold/10 text-foreground" : "border-line bg-surface-2 text-muted hover:text-foreground"
                  }`}
                >
                  <div className="text-xs font-semibold">{p.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Hardware Finish */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-3">
              4. Tuners & Bridge Hardware
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "gold", name: "24k Gold Plated" },
                { id: "chrome", name: "High-Gloss Chrome" },
                { id: "black", name: "Matte Black Nickel" },
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => setHardware(h.id as typeof hardware)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    hardware === h.id ? "border-gold bg-gold/10 text-foreground" : "border-line bg-surface-2 text-muted hover:text-foreground"
                  }`}
                >
                  <div className="text-xs font-semibold">{h.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Custom Neck Plate Engraving */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
              5. Custom Neck-Plate Engraving
            </label>
            <input
              type="text"
              maxLength={26}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
              placeholder="YOUR NAME OR SERIAL NO."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-line font-mono text-xs text-foreground uppercase tracking-widest focus:outline-none focus:border-gold"
            />
          </div>

          {/* Actions & Ordering */}
          <div className="pt-4 border-t border-line space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold text-background font-display font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-gold/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <Check className="w-5 h-5 text-background" /> Added to Bespoke Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Reserve Bespoke Build — ${(totalPrice / 100).toLocaleString()}
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-muted font-mono pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold" /> Transferable Lifetime Warranty
            </span>
            <span>Est. Build: 8–10 Weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

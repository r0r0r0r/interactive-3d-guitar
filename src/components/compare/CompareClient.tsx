"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Volume2, ShoppingBag, Check, Plus, Trash2, ArrowRight } from "lucide-react";
import { products, Product } from "@/lib/products";
import { audioEngine } from "@/lib/audioEngine";
import { useCart } from "@/lib/store";

export function CompareClient() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    "aurora-solstice",
    "nocturne-eclipse",
    "heritage-1959",
  ]);

  const add = useCart((s) => s.add);

  const selectedProducts = selectedSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  const availableProducts = products.filter((p) => !selectedSlugs.includes(p.slug));

  const handleAddInstrument = (slug: string) => {
    if (selectedSlugs.length < 4) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const handleRemoveInstrument = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5" /> Spec Matrix Comparison
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mt-3">
            Compare <span className="text-gradient-gold">Instruments</span>
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto mt-2">
            Side-by-side technical evaluation of tonewoods, humbucker windings, scale length, and atelier craftsmanship.
          </p>
        </div>

        {/* Selection Bar */}
        {selectedSlugs.length < 4 && availableProducts.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-surface border border-line flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-muted uppercase tracking-wider">
              Add instrument to matrix ({selectedSlugs.length}/4 selected):
            </span>
            <div className="flex flex-wrap gap-2">
              {availableProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleAddInstrument(p.slug)}
                  className="px-3 py-1.5 rounded-lg bg-surface-2 border border-line hover:border-gold text-xs font-mono text-foreground flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-gold" /> {p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Grid Matrix */}
        <div className="overflow-x-auto">
          <div className="min-w-[760px] bg-surface border border-line rounded-3xl overflow-hidden shadow-2xl">
            {/* Header Row: Products */}
            <div className="grid grid-cols-5 border-b border-line bg-surface-2/40 divide-x divide-line">
              <div className="p-6 font-display font-bold text-sm text-muted uppercase tracking-wider flex items-center">
                Specification
              </div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-6 relative space-y-3">
                  <button
                    onClick={() => handleRemoveInstrument(p.slug)}
                    className="absolute top-4 right-4 p-1 text-faint hover:text-rose-400 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-xs font-mono text-gold uppercase tracking-widest">{p.category}</div>
                  <h3 className="font-display font-bold text-lg text-foreground">{p.name}</h3>
                  <div className="font-mono text-xl font-bold text-gradient-gold">
                    ${(p.price / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => audioEngine.playTone("clean", "bridge")}
                      className="w-full py-2 px-3 rounded-xl bg-gold/10 border border-gold/30 text-gold font-mono text-xs flex items-center justify-center gap-2 hover:bg-gold hover:text-background transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Sample Tone
                    </button>
                    <button
                      onClick={() => add(p, p.finishes[0]?.id || "default")}
                      className="w-full py-2 px-3 rounded-xl bg-gold text-background font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-gold/20 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec Row 1: Body Wood */}
            <div className="grid grid-cols-5 border-b border-line divide-x divide-line text-sm">
              <div className="p-4 font-mono text-xs uppercase text-muted bg-surface-2/20">Body & Top Wood</div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-4 text-foreground font-medium">
                  {p.specs.find((s) => s.label === "Body" || s.label === "Top")?.value || "Mahogany"}
                </div>
              ))}
            </div>

            {/* Spec Row 2: Fingerboard */}
            <div className="grid grid-cols-5 border-b border-line divide-x divide-line text-sm bg-surface-2/10">
              <div className="p-4 font-mono text-xs uppercase text-muted bg-surface-2/20">Fingerboard</div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-4 text-foreground font-medium">
                  {p.specs.find((s) => s.label === "Fingerboard" || s.label === "Back & sides")?.value || "Gabon Ebony"}
                </div>
              ))}
            </div>

            {/* Spec Row 3: Pickups */}
            <div className="grid grid-cols-5 border-b border-line divide-x divide-line text-sm">
              <div className="p-4 font-mono text-xs uppercase text-muted bg-surface-2/20">Pickups & Voicing</div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-4 text-foreground font-medium">
                  {p.specs.find((s) => s.label === "Pickups" || s.label === "Electronics")?.value || "Hand-wound Alnico V"}
                </div>
              ))}
            </div>

            {/* Spec Row 4: Scale Length */}
            <div className="grid grid-cols-5 border-b border-line divide-x divide-line text-sm bg-surface-2/10">
              <div className="p-4 font-mono text-xs uppercase text-muted bg-surface-2/20">Scale Length</div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-4 text-foreground font-medium">
                  {p.specs.find((s) => s.label === "Scale")?.value || "24.75\" / 628 mm"}
                </div>
              ))}
            </div>

            {/* Spec Row 5: Weight */}
            <div className="grid grid-cols-5 border-b border-line divide-x divide-line text-sm">
              <div className="p-4 font-mono text-xs uppercase text-muted bg-surface-2/20">Instrument Weight</div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-4 text-foreground font-medium">
                  {p.specs.find((s) => s.label === "Weight")?.value || "3.8 kg"}
                </div>
              ))}
            </div>

            {/* Spec Row 6: Case Included */}
            <div className="grid grid-cols-5 divide-x divide-line text-sm bg-surface-2/10">
              <div className="p-4 font-mono text-xs uppercase text-muted bg-surface-2/20">Case Included</div>
              {selectedProducts.map((p) => (
                <div key={p.id} className="p-4 text-gold font-mono text-xs flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-gold" />
                  {p.specs.find((s) => s.label === "Case")?.value || "Flight case included"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

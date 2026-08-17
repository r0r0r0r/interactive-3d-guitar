"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 250);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.collection.includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
  }, [query]);

  const suggestions = ["Electric", "Acoustic", "Nocturne", "Limited", "Heritage"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-label="Search"
        >
          <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-6 pt-24 pb-12">
            <div className="flex items-center justify-between">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs uppercase tracking-[0.35em] text-muted"
              >
                Search the atelier
              </motion.p>
              <button
                onClick={onClose}
                aria-label="Close search"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex items-center gap-4 border-b-2 border-line-strong pb-4 focus-within:border-gold"
            >
              <Search className="h-6 w-6 shrink-0 text-gold" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Guitars, collections, moods…"
                className="w-full bg-transparent font-display text-2xl font-bold outline-none placeholder:text-faint sm:text-4xl"
                aria-label="Search products"
              />
            </motion.div>

            {!query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-line px-5 py-2 text-sm text-muted transition-all hover:border-gold hover:text-gold"
                  >
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            )}

            <div className="mt-8 space-y-2">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-5 rounded-2xl border border-transparent p-4 transition-all hover:border-line hover:bg-surface-2"
                    >
                      <div className="flex h-20 w-12 items-center justify-center">
                        <GuitarIllustration shape={p.shape} finish={p.finishes[0]} id={`search-${p.id}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-lg font-bold transition-colors group-hover:text-gold">
                          {p.name}
                        </p>
                        <p className="text-sm text-muted">{p.tagline}</p>
                      </div>
                      <span className="text-gold">{formatPrice(p.price)}</span>
                      <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
              {query && results.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-muted"
                >
                  Nothing found for &ldquo;{query}&rdquo; — try &ldquo;electric&rdquo; or &ldquo;acoustic&rdquo;.
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products, categories, collections } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal, SectionLabel, SplitWords } from "@/components/ui/Reveal";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sorts: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "rating", label: "Top Rated" },
];

function ShopContent() {
  const params = useSearchParams();
  const [category, setCategory] = useState<string>(params.get("category") ?? "all");
  const [collection, setCollection] = useState<string>(params.get("collection") ?? "all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let l = [...products];
    if (category !== "all") l = l.filter((p) => p.category === category);
    if (collection !== "all") l = l.filter((p) => p.collection === collection);
    switch (sort) {
      case "price-asc": l.sort((a, b) => a.price - b.price); break;
      case "price-desc": l.sort((a, b) => b.price - a.price); break;
      case "rating": l.sort((a, b) => b.rating - a.rating); break;
      default:
        l.sort((a, b) => Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false));
    }
    return l;
  }, [category, collection, sort]);

  const activeFilters = (category !== "all" ? 1 : 0) + (collection !== "all" ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
      {/* Header */}
      <div className="mb-4">
        <SectionLabel>The Collection</SectionLabel>
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl">
          <SplitWords text="EVERY GUITAR" as="span" />
          <br />
          <SplitWords text="HAS A SOUL" as="span" wordClassName="text-gradient-gold" delay={0.15} />
        </h1>
        <Reveal delay={0.3}>
          <p className="font-serif-accent mt-5 max-w-lg text-lg italic text-muted">
            {products.length} instruments, four collections, one obsession.
            Filter by feel — or scroll until one finds you.
          </p>
        </Reveal>
      </div>

      {/* Toolbar */}
      <Reveal delay={0.35}>
        <div className="sticky top-20 z-30 -mx-2 mt-10 lg:top-24">
          <div className="glass flex flex-wrap items-center gap-3 rounded-2xl p-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                filtersOpen || activeFilters > 0
                  ? "border-gold text-gold"
                  : "border-line-strong text-muted hover:border-gold hover:text-gold"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-[#09090b]">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Quick category pills */}
            <div className="hidden gap-1.5 sm:flex" role="group" aria-label="Category filter">
              <Pill active={category === "all"} onClick={() => setCategory("all")}>All</Pill>
              {categories.map((c) => (
                <Pill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                  {c.name}
                </Pill>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="text-xs uppercase tracking-wider text-muted">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-line-strong bg-surface px-4 py-2 text-sm outline-none transition-colors focus:border-gold"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="glass mt-2 space-y-5 rounded-2xl p-5">
                  <div className="sm:hidden">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-muted">Category</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Pill active={category === "all"} onClick={() => setCategory("all")}>All</Pill>
                      {categories.map((c) => (
                        <Pill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                          {c.name} ({c.count})
                        </Pill>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-muted">Collection</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Pill active={collection === "all"} onClick={() => setCollection("all")}>All</Pill>
                      {collections.map((c) => (
                        <Pill key={c.id} active={collection === c.id} onClick={() => setCollection(c.id)}>
                          {c.name}
                        </Pill>
                      ))}
                    </div>
                  </div>
                  {activeFilters > 0 && (
                    <button
                      onClick={() => { setCategory("all"); setCollection("all"); }}
                      className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ember"
                    >
                      <X className="h-3.5 w-3.5" /> Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-2xl font-bold">No instruments match</p>
          <p className="mt-2 text-muted">Try clearing a filter — your guitar is here somewhere.</p>
        </div>
      )}
    </div>
  );
}

function Pill({
  children, active, onClick,
}: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all",
        active
          ? "border-gold bg-gold text-[#09090b]"
          : "border-line-strong text-muted hover:border-gold hover:text-gold"
      )}
    >
      {children}
    </button>
  );
}

export function ShopClient() {
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <ShopContent />
    </Suspense>
  );
}

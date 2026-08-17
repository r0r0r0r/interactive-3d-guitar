"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, CreditCard,
  Play, Pause, ChevronDown, MessageCircleQuestion, Sparkles,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Button, MagneticButton } from "@/components/ui/Button";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "./ProductCard";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";

/* ─────────────────────── Sound sample player ─────────────────────── */

function SoundPlayer({ product }: { product: Product }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);
  const samples = [
    { name: "Clean · Neck pickup", dur: "0:34" },
    { name: "Crunch · Bridge pickup", dur: "0:41" },
    { name: "Ambient · Split coils", dur: "0:52" },
  ];

  useEffect(() => {
    if (playing === null) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = ((t - start) / 30000) % 1;
      setProgress(p);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  return (
    <div className="rounded-3xl border border-line bg-surface p-6">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
        <Sparkles className="h-3.5 w-3.5" /> Hear the {product.name}
      </p>
      <div className="mt-4 space-y-2">
        {samples.map((s, i) => (
          <div
            key={s.name}
            className={cn(
              "flex items-center gap-4 rounded-2xl border p-3 transition-colors",
              playing === i ? "border-gold/50 bg-gold/5" : "border-line hover:border-line-strong"
            )}
          >
            <button
              onClick={() => setPlaying(playing === i ? null : i)}
              aria-label={playing === i ? `Pause ${s.name}` : `Play ${s.name}`}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all",
                playing === i
                  ? "bg-gold text-[#09090b]"
                  : "border border-line-strong text-muted hover:border-gold hover:text-gold"
              )}
            >
              {playing === i ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{s.name}</p>
              {/* Waveform */}
              <div className="mt-1.5 flex h-6 items-center gap-[3px]" aria-hidden>
                {Array.from({ length: 36 }).map((_, b) => {
                  const h = 20 + Math.abs(Math.sin(b * 1.7 + i * 5)) * 80;
                  const active = playing === i && b / 36 <= progress;
                  return (
                    <motion.span
                      key={b}
                      className={cn("w-[3px] rounded-full", active ? "bg-gold" : "bg-line-strong")}
                      style={{ height: `${h}%` }}
                      animate={playing === i && active ? { scaleY: [1, 1.4, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity, delay: b * 0.03 }}
                    />
                  );
                })}
              </div>
            </div>
            <span className="shrink-0 text-xs tabular-nums text-muted">{s.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Interactive hotspots ─────────────────────── */

function Hotspots({ product }: { product: Product }) {
  const [active, setActive] = useState<number | null>(null);
  const spots = [
    { x: 50, y: 8, label: "Headstock", note: product.specs[1]?.value ?? "Hand-carved neck" },
    { x: 50, y: 38, label: "Fingerboard", note: product.specs[2]?.value ?? "Premium fingerboard" },
    { x: 42, y: 62, label: product.shape === "acoustic" ? "Soundhole" : "Pickups", note: product.specs[4]?.value ?? "Hand-wound pickups" },
    { x: 55, y: 78, label: "Bridge", note: product.specs[5]?.value ?? "Precision hardware" },
  ];

  return (
    <div className="relative mx-auto h-[30rem] max-w-xs">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: `radial-gradient(ellipse, ${product.finishes[0].via}26, transparent 70%)` }}
      />
      <GuitarIllustration shape={product.shape} finish={product.finishes[0]} id={`hotspot-${product.id}`} />
      {spots.map((s, i) => (
        <div key={i} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <motion.button
            onClick={() => setActive(active === i ? null : i)}
            aria-label={`${s.label} details`}
            aria-expanded={active === i}
            className={cn(
              "relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-bold transition-colors",
              active === i
                ? "border-gold bg-gold text-[#09090b]"
                : "border-gold/60 bg-background/70 text-gold backdrop-blur"
            )}
            whileTap={{ scale: 0.9 }}
          >
            +
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-gold/60"
              animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.button>
          <AnimatePresence>
            {active === i && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                className="glass absolute left-1/2 top-5 z-10 w-52 -translate-x-1/2 rounded-2xl p-4"
              >
                <p className="font-display text-sm font-bold text-gold">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{s.note}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── Reviews & Q&A ─────────────────────── */

const sampleReviews = [
  { name: "Daniel K.", rating: 5, date: "June 2026", title: "Worth every penny", body: "Three months in and I still find excuses to walk past the stand just to look at it. Plays even better than it looks — the neck is the most comfortable I've owned in 20 years." },
  { name: "Priya S.", rating: 5, date: "May 2026", title: "The setup out of the box is perfect", body: "Arrived humidified, in tune, and intonated. First guitar I've never had to take to a tech. The finish photographs cannot do it justice." },
  { name: "Marco T.", rating: 4, date: "April 2026", title: "Stunning, one nitpick", body: "Gorgeous instrument, huge dynamic range. Only wish the case had a bit more storage. The guitar itself? Flawless." },
];

const sampleQA = [
  { q: "Does it ship with a hardshell case?", a: "Yes — every instrument includes the case listed in its specs, plus a humidity pack and signed build card." },
  { q: "Can I choose a left-handed version?", a: "Absolutely. Every model is available left-handed at no extra charge — select it at checkout or contact the atelier." },
  { q: "What strings does it ship with?", a: "Our house-blend nickel .010–.046 set (electric) or phosphor bronze .012–.053 (acoustic). We'll happily set it up for your preferred gauge before shipping." },
];

function ReviewsAndQA({ product }: { product: Product }) {
  const [tab, setTab] = useState<"reviews" | "qa">("reviews");
  const [openQ, setOpenQ] = useState<number | null>(0);

  return (
    <div>
      <div className="flex gap-2" role="tablist" aria-label="Reviews and questions">
        {([["reviews", `Reviews (${product.reviews})`], ["qa", "Questions & Answers"]] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm transition-colors",
              tab === key ? "text-[#09090b]" : "text-muted hover:text-foreground"
            )}
          >
            {tab === key && (
              <motion.span layoutId="pdp-tab" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "reviews" ? (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-6 space-y-4"
          >
            {/* Summary */}
            <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-line bg-surface p-6">
              <div className="text-center">
                <p className="font-display text-5xl font-extrabold text-gold">{product.rating}</p>
                <div className="mt-1 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-line-strong")} />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted">{product.reviews} reviews</p>
              </div>
              <div className="min-w-48 flex-1 space-y-1.5">
                {[92, 6, 2, 0, 0].map((pct, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="w-3 text-muted">{5 - i}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                      <motion.div
                        className="h-full rounded-full bg-gold"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                      />
                    </div>
                    <span className="w-8 text-right tabular-nums text-faint">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            {sampleReviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06}>
                <div className="rounded-3xl border border-line bg-surface p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-bold text-gold">
                        {r.name[0]}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-faint">Verified owner · {r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={cn("h-3.5 w-3.5", s < r.rating ? "fill-gold text-gold" : "text-line-strong")} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 font-display font-bold">{r.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="qa"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-6 space-y-3"
          >
            {sampleQA.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors",
                  openQ === i ? "border-gold/40 bg-surface" : "border-line bg-surface/50"
                )}
              >
                <button
                  onClick={() => setOpenQ(openQ === i ? null : i)}
                  aria-expanded={openQ === i}
                  className="flex w-full items-center gap-3 p-5 text-left"
                >
                  <MessageCircleQuestion className="h-5 w-5 shrink-0 text-gold" />
                  <span className={cn("flex-1 font-medium", openQ === i && "text-gold")}>{item.q}</span>
                  <motion.span animate={{ rotate: openQ === i ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4 text-muted" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────── Main PDP ─────────────────────── */

export function ProductDetail({ product }: { product: Product }) {
  const [finishIdx, setFinishIdx] = useState(0);
  const [qty, setQtyLocal] = useState(1);
  const finish = product.finishes[finishIdx];

  const add = useCart((s) => s.add);
  const wishIds = useWishlist((s) => s.ids);
  const toggleWish = useWishlist((s) => s.toggle);
  const { toast } = useToast();
  const wished = wishIds.includes(product.id);

  const related = products.filter((p) => p.id !== product.id && (p.collection === product.collection || p.category === product.category)).slice(0, 3);

  const addToCart = () => {
    for (let i = 0; i < qty; i++) add(product, finish.id);
    toast(`${product.name} added to cart`, "cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-gold">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/shop" className="transition-colors hover:text-gold">Shop</Link>
        <span aria-hidden>/</span>
        <Link href={`/shop?category=${product.category}`} className="capitalize transition-colors hover:text-gold">
          {product.category.replace("-", " ")}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} finish={finish} />

        {/* Buy column */}
        <div className="space-y-8">
          <Reveal y={24}>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
              {product.collection} collection · {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="font-serif-accent mt-2 text-xl italic text-muted">{product.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-line-strong")} />
                  ))}
                </div>
                <span className="text-sm text-muted">{product.rating} · {product.reviews} reviews</span>
              </div>
              <span className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
                product.stock === "in-stock" && "border-emerald-400/30 text-emerald-400",
                product.stock === "low-stock" && "border-amber-400/30 text-amber-400",
                product.stock === "made-to-order" && "border-sky-400/30 text-sky-400",
              )}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {product.stock === "in-stock" ? "In stock — ships in 48h" : product.stock === "low-stock" ? "Low stock" : "Made to order · 8–12 weeks"}
              </span>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.08}>
            <p className="leading-relaxed text-muted">{product.description}</p>
          </Reveal>

          {/* Price */}
          <Reveal y={20} delay={0.12}>
            <div className="flex items-end gap-3">
              <motion.span
                key={product.price}
                className="font-display text-4xl font-extrabold text-gold"
              >
                {formatPrice(product.price)}
              </motion.span>
              {product.compareAt && (
                <span className="pb-1 text-lg text-faint line-through">{formatPrice(product.compareAt)}</span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted">
              or {formatPrice(Math.round(product.price / 24))}/mo with 0% financing · 24 months
            </p>
          </Reveal>

          {/* Finish selector */}
          <Reveal y={20} delay={0.16}>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted">
              Finish — <span className="text-foreground">{finish.name}</span>
            </p>
            <div className="flex gap-3" role="radiogroup" aria-label="Finish">
              {product.finishes.map((f, i) => (
                <button
                  key={f.id}
                  role="radio"
                  aria-checked={i === finishIdx}
                  aria-label={f.name}
                  onClick={() => setFinishIdx(i)}
                  className={cn(
                    "group relative h-12 w-12 rounded-full border-2 transition-all",
                    i === finishIdx ? "scale-110 border-gold shadow-[0_0_20px_-4px_var(--glow)]" : "border-line-strong hover:scale-105"
                  )}
                  style={{ background: `linear-gradient(135deg, ${f.from} 0%, ${f.via} 55%, ${f.to} 100%)` }}
                >
                  {i === finishIdx && (
                    <motion.span
                      layoutId="finish-ring"
                      className="absolute -inset-1.5 rounded-full border border-gold/40"
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Qty + CTA */}
          <Reveal y={20} delay={0.2}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-line-strong">
                <button
                  onClick={() => setQtyLocal(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-14 w-12 items-center justify-center transition-colors hover:text-gold"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-lg font-bold tabular-nums">{qty}</span>
                <button
                  onClick={() => setQtyLocal(Math.min(5, qty + 1))}
                  aria-label="Increase quantity"
                  className="flex h-14 w-12 items-center justify-center transition-colors hover:text-gold"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <MagneticButton size="lg" className="flex-1" onClick={addToCart}>
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </MagneticButton>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  toggleWish(product.id);
                  toast(wished ? "Removed from wishlist" : "Saved to wishlist", "heart");
                }}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                className={cn("!px-5", wished && "border-gold text-gold")}
              >
                <Heart className={cn("h-5 w-5", wished && "fill-current")} />
              </Button>
            </div>
          </Reveal>

          {/* Trust rows */}
          <Reveal y={20} delay={0.24}>
            <div className="grid gap-3 rounded-3xl border border-line bg-surface p-5 sm:grid-cols-3">
              {[
                { Icon: Truck, t: "Free insured shipping", s: "Climate-controlled freight" },
                { Icon: ShieldCheck, t: "Lifetime warranty", s: "Transferable, no fine print" },
                { Icon: CreditCard, t: "0% financing", s: "12–36 months available" },
              ].map(({ Icon, t, s }) => (
                <div key={t} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-muted">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Sound samples */}
          <Reveal y={20} delay={0.28}>
            <SoundPlayer product={product} />
          </Reveal>
        </div>
      </div>

      {/* Story band */}
      <section className="mt-28 grid items-center gap-12 lg:grid-cols-2" aria-label="The story">
        <div>
          <SectionLabel>The Story</SectionLabel>
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Anatomy of{" "}
              <span className="font-serif-accent italic text-gold">obsession.</span>
            </h2>
            <p className="font-serif-accent mt-6 max-w-lg text-xl italic leading-relaxed text-muted">
              &ldquo;{product.story}&rdquo;
            </p>
          </Reveal>
          {/* Materials */}
          <div className="mt-8 space-y-3">
            {product.materials.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 font-display text-sm font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted">{m.part} — {m.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15}>
          <Hotspots product={product} />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-muted">
            Tap the hotspots to explore
          </p>
        </Reveal>
      </section>

      {/* Specs */}
      <section className="mt-28" aria-label="Specifications">
        <SectionLabel>Specifications</SectionLabel>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {product.specs.map((s, i) => (
            <Reveal key={s.label} delay={(i % 4) * 0.06} className="bg-surface p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">{s.label}</p>
              <p className="mt-2 font-medium">{s.value}</p>
            </Reveal>
          ))}
        </div>
        {/* Features */}
        <div className="mt-6 flex flex-wrap gap-2">
          {product.features.map((f) => (
            <span key={f} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Reviews / QA */}
      <section className="mt-28" aria-label="Reviews and questions">
        <SectionLabel>From the Community</SectionLabel>
        <ReviewsAndQA product={product} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-28" aria-label="Related products">
          <SectionLabel>You May Also Resonate With</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 30 }}
        className="glass fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-4 rounded-2xl p-3 pl-5 lg:hidden"
      >
        <div>
          <p className="text-sm font-medium">{product.name}</p>
          <p className="font-display font-bold text-gold">{formatPrice(product.price)}</p>
        </div>
        <Button onClick={addToCart}>
          <ShoppingBag className="h-4 w-4" /> Add
        </Button>
      </motion.div>
    </div>
  );
}

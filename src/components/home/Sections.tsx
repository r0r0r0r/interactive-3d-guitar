"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Quote, Sparkles, TreePine, Wrench, Music4 } from "lucide-react";
import { products, collections, testimonials, artists, faqs } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";
import { Reveal, SectionLabel, SplitWords } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { MagneticButton } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── Marquee ───────────────────────── */

export function Marquee() {
  const words = ["Handcrafted", "Lifetime Warranty", "Master Luthiers", "Since 2009", "FSC Certified", "One-of-One Commissions"];
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-line bg-surface py-6">
      <div className="mask-fade-x flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl font-bold uppercase tracking-wide text-foreground/70">{w}</span>
            <Sparkles className="h-5 w-5 text-gold" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── New arrivals & best sellers ─────────────────── */

export function ProductShowcase() {
  const [tab, setTab] = useState<"new" | "best">("new");
  const list = tab === "new"
    ? products.filter((p) => p.isNew)
    : products.filter((p) => p.bestSeller);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32" aria-label="New arrivals and best sellers">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel number="02">The Latest &amp; The Loved</SectionLabel>
          <Reveal>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              {tab === "new" ? "New Arrivals" : "Best Sellers"}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="glass flex rounded-full p-1" role="tablist" aria-label="Product filter">
            {([["new", "New Arrivals"], ["best", "Best Sellers"]] as const).map(([key, label]) => (
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
                  <motion.span
                    layoutId="showcase-tab"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────────── Categories ───────────────────────── */

export function Categories() {
  const cats = [
    { id: "electric", name: "Electric", desc: "Voltage with a soul", span: "lg:col-span-3 lg:row-span-2", product: products[0] },
    { id: "acoustic", name: "Acoustic", desc: "The room is the amplifier", span: "lg:col-span-3", product: products[4] },
    { id: "bass", name: "Bass", desc: "Gravity, amplified", span: "lg:col-span-2", product: products[5] },
    { id: "custom-shop", name: "Custom Shop", desc: "Yours. Only yours.", span: "lg:col-span-1", product: products[6] },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8" aria-label="Categories">
      <SectionLabel number="03">Find Your Voice</SectionLabel>
      <Reveal>
        <h2 className="max-w-xl font-display text-4xl font-bold sm:text-5xl">
          Every player has a{" "}
          <span className="font-serif-accent italic text-gold">frequency.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
        {cats.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.08} className={cn("group", c.span)}>
            <Link
              href={`/shop?category=${c.id}`}
              className="relative flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-gold/50"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105"
                style={{
                  background: `radial-gradient(ellipse 70% 70% at 70% 20%, ${c.product.finishes[0].via}38, transparent 70%)`,
                }}
              />
              <div
                aria-hidden
                className="absolute -right-6 -top-4 h-[125%] rotate-[18deg] opacity-25 transition-all duration-700 group-hover:rotate-[10deg] group-hover:opacity-60"
              >
                <GuitarIllustration shape={c.product.shape} finish={c.product.finishes[0]} id={`cat-${c.id}`} />
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-gold">{c.name}</h3>
                <p className="font-serif-accent mt-1 italic text-muted">{c.desc}</p>
                <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:text-gold">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── Limited edition pinned reveal ─────────────────── */

export function LimitedEdition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const guitarY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const guitarRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const eclipse = products[1];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-line bg-[#060608] py-28 lg:py-40"
      aria-label="Limited edition"
    >
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 68% 50%, rgba(138,99,201,0.16), transparent 65%), radial-gradient(ellipse 40% 50% at 25% 60%, rgba(201,168,107,0.08), transparent 60%)",
          }}
        />
      </motion.div>
      {/* Star specks */}
      <div aria-hidden className="absolute inset-0">
        {[[8, 15], [22, 70], [45, 25], [68, 80], [85, 30], [92, 60], [15, 45], [55, 65]].map(([l, t], i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-light"
            style={{ left: `${l}%`, top: `${t}%` }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.6, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.45 }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionLabel number="04">Limited Edition</SectionLabel>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
            <SplitWords text="NOCTURNE" as="span" />
            <br />
            <SplitWords text="ECLIPSE" as="span" wordClassName="text-shimmer" delay={0.2} />
          </h2>
          <Reveal delay={0.3}>
            <p className="font-serif-accent mt-6 max-w-md text-xl italic leading-relaxed text-muted">
              &ldquo;{eclipse.story.split(".")[1]}.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Edition</p>
              <p className="font-display text-2xl font-bold text-gold">88 made</p>
            </div>
            <div className="h-10 w-px bg-line-strong" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Remaining</p>
              <p className="font-display text-2xl font-bold">17</p>
            </div>
            <div className="h-10 w-px bg-line-strong" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Price</p>
              <p className="font-display text-2xl font-bold">{formatPrice(eclipse.price)}</p>
            </div>
          </Reveal>
          <Reveal delay={0.5} className="mt-10">
            <Link href={`/product/${eclipse.slug}`}>
              <MagneticButton size="lg">
                Claim Yours <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </Reveal>
        </div>

        <motion.div
          style={{ y: guitarY, rotate: guitarRotate }}
          className="relative mx-auto h-[28rem] sm:h-[34rem]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(138,99,201,0.28), transparent 70%)" }}
          />
          <GuitarIllustration shape={eclipse.shape} finish={eclipse.finishes[1]} id="limited" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── Craftsmanship story steps ─────────────────── */

const craftSteps = [
  {
    icon: TreePine,
    title: "The Wood Remembers",
    text: "Every build begins in our vault of air-dried tonewoods — some resting for over a decade. We tap, listen, and let the wood tell us what it wants to become.",
  },
  {
    icon: Wrench,
    title: "One Luthier, Start to Finish",
    text: "No assembly lines. A single master luthier shapes your instrument through all 214 steps, signing the heel plate when — and only when — it sings.",
  },
  {
    icon: Music4,
    title: "Voiced by Ear",
    text: "Machines measure; ears decide. Each pickup is wound and each top is tuned to the instrument in front of us, not a spec sheet.",
  },
];

export function Craftsmanship() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36" aria-label="Craftsmanship">
      <div className="grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-32">
            <SectionLabel number="05">Why AURIC</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                Built the{" "}
                <span className="font-serif-accent italic text-gold">slow way,</span>
                <br /> on purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm leading-relaxed text-muted">
                214 steps. 40+ hours of handwork. Zero shortcuts. This is what a
                lifetime instrument requires — and why we guarantee every AURIC
                for exactly that long.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 grid grid-cols-3 gap-6">
              {[["214", "build steps"], ["40h", "of handwork"], ["∞", "warranty"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-extrabold text-gold">{n}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-3">
          {/* progress line */}
          <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-line">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-gold-light to-gold-deep"
              style={{ scaleY: lineScale, height: "100%" }}
            />
          </div>
          <div className="space-y-14 pl-20">
            {craftSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[4.55rem] flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-surface text-gold">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-24 lg:py-32" aria-label="Testimonials">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,168,107,0.08), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionLabel className="justify-center" number="06">Player Stories</SectionLabel>
        <Quote className="mx-auto h-10 w-10 rotate-180 text-gold/40" aria-hidden />
        <div className="relative mt-8 min-h-44 sm:min-h-36">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif-accent text-2xl italic leading-relaxed sm:text-3xl">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-display font-bold text-gold">{testimonials[active].name}</p>
                <p className="mt-1 text-sm text-muted">{testimonials[active].role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === active ? "w-10 bg-gold" : "w-3 bg-line-strong hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Artists ───────────────────────── */

export function Artists() {
  return (
    <section className="py-24 lg:py-32" aria-label="Artists">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="07">On Stage With</SectionLabel>
        <Reveal>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            In the hands of{" "}
            <span className="font-serif-accent italic text-gold">the obsessed.</span>
          </h2>
        </Reveal>
      </div>
      <div className="mask-fade-x mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee-reverse gap-5 px-6 hover:[animation-play-state:paused]">
          {[...artists, ...artists].map((a, i) => (
            <div
              key={`${a.name}-${i}`}
              className="group w-64 shrink-0 rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-gold/50"
            >
              <div
                className="flex h-32 items-end justify-between rounded-2xl border border-line bg-surface-2 p-4"
                style={{
                  background: `radial-gradient(ellipse 90% 90% at 30% 20%, rgba(201,168,107,0.12), var(--surface-2) 70%)`,
                }}
              >
                <span className="font-display text-4xl font-extrabold text-foreground/10 transition-colors duration-500 group-hover:text-gold/25">
                  {a.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <Music4 className="h-5 w-5 text-gold/50" aria-hidden />
              </div>
              <p className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-gold">{a.name}</p>
              <p className="text-sm text-muted">{a.genre}</p>
              <p className="mt-2 text-xs text-faint">Plays the {a.instrument}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Sustainability ───────────────────────── */

export function Sustainability() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8" aria-label="Sustainability">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-surface p-10 lg:p-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 80% at 85% 20%, rgba(80,140,90,0.12), transparent 60%)" }}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel number="08">Forest Forward</SectionLabel>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                Every guitar plants{" "}
                <span className="font-serif-accent italic text-gold">one hundred trees.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                Tonewood is a gift from a previous century. Through our Forest Forward
                program, every instrument sold funds 100 new trees in the Appalachian
                watersheds our maple comes from — 1.2 million planted since 2019.
              </p>
              <div className="mt-8 flex gap-8">
                {[["1.2M", "trees planted"], ["100%", "FSC woods"], ["0", "waste to landfill"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-2xl font-extrabold text-gold">{n}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div aria-hidden className="relative hidden h-72 lg:block">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 origin-bottom"
                  style={{ left: `${12 + i * 19}%` }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TreePine
                    className="text-gold/40"
                    style={{ width: 48 + (i % 3) * 22, height: 90 + (i % 3) * 40 }}
                    strokeWidth={1}
                  />
                </motion.div>
              ))}
              <div className="absolute bottom-0 h-px w-full bg-line-strong" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32" aria-label="Frequently asked questions">
      <SectionLabel className="justify-center" number="09">Questions</SectionLabel>
      <Reveal>
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          Before you{" "}
          <span className="font-serif-accent italic text-gold">commit.</span>
        </h2>
      </Reveal>
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors duration-300",
                open === i ? "border-gold/40 bg-surface" : "border-line bg-surface/50 hover:border-line-strong"
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className={cn("font-medium transition-colors", open === i && "text-gold")}>
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-lg leading-none"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-5 pb-5 leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

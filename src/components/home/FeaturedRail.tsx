"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";
import { SectionLabel, Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontally-scrolling featured rail, pinned while the user scrolls vertically.
 */
export function FeaturedRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const featured = products.filter((p) => p.bestSeller || p.limited).slice(0, 4);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const getDistance = () => track.scrollWidth - wrap.offsetWidth;
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section aria-label="Featured guitars" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
        <SectionLabel number="01">Featured Instruments</SectionLabel>
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Four guitars.{" "}
            <span className="font-serif-accent italic text-gold">Four ways to disappear</span>{" "}
            into the music.
          </h2>
        </Reveal>
      </div>

      <div ref={wrapRef} className="mt-8 flex items-center overflow-hidden lg:h-svh">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 py-10 lg:flex-row lg:gap-10 lg:px-[8vw] lg:will-change-transform"
        >
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} product={p} index={i} />
          ))}
          {/* End card */}
          <Link
            href="/shop"
            className="group flex min-h-72 shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-line-strong px-10 transition-colors hover:border-gold lg:w-[26rem]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:text-gold">
              <ArrowRight className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-bold transition-colors group-hover:text-gold">
              View all instruments
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const finish = product.finishes[0];
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 hover:border-gold/50 lg:h-[72vh] lg:w-[34rem]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 65% at 50% 40%, ${finish.via}30, transparent 70%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute right-6 top-5 font-display text-7xl font-extrabold text-foreground/[0.05] transition-colors duration-500 group-hover:text-gold/10"
      >
        0{index + 1}
      </span>

      <div className="relative flex h-72 flex-1 items-center justify-center p-8 lg:h-auto">
        <div className="h-full max-h-[26rem] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-rotate-3">
          <GuitarIllustration shape={product.shape} finish={finish} id={`feat-${product.id}`} />
        </div>
      </div>

      <div className="relative border-t border-line p-6 lg:p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
          {product.collection} · {product.category.replace("-", " ")}
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold lg:text-3xl">{product.name}</h3>
            <p className="font-serif-accent mt-1 italic text-muted">{product.tagline}</p>
          </div>
          <span className="whitespace-nowrap font-display text-xl font-bold text-gold">
            {formatPrice(product.price)}
          </span>
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-gold">
          Discover
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}

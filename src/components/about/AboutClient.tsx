"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Hammer, HeartHandshake, Sparkles } from "lucide-react";
import { Reveal, SectionLabel, SplitWords } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/Button";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";
import { products } from "@/lib/products";

const milestones = [
  { year: "2009", title: "A garage in Nashville", text: "One bench, two chisels, and a stubborn belief that instruments should outlive their makers." },
  { year: "2013", title: "The first hundred", text: "Our hundredth guitar ships. Every one signed, every owner known by name. That never changed." },
  { year: "2017", title: "The atelier opens", text: "A converted 1920s printing house becomes home — 14 luthiers, one shared standard: no instrument leaves until it sings." },
  { year: "2019", title: "Forest Forward", text: "We commit to planting 100 trees per instrument sold. The forests that gave us our voice deserve one too." },
  { year: "2023", title: "One-of-One program", text: "Fully bespoke commissions open. Ten months, one master builder, one unrepeatable instrument." },
  { year: "2026", title: "Today", text: "8,400 instruments in the world. Each one still built the slow way — by one pair of hands, start to finish." },
];

const values = [
  { Icon: Hammer, title: "Craft over volume", text: "We build fewer than 900 instruments a year. The waiting list is the point." },
  { Icon: HeartHandshake, title: "Known by name", text: "Every owner gets the builder's direct line. Lifetime warranty means lifetime relationship." },
  { Icon: Sparkles, title: "Voiced by ear", text: "Spec sheets describe. Ears decide. No instrument ships until it moves the person who built it." },
  { Icon: Award, title: "Heirloom standard", text: "Designed to be inherited. Our oldest instruments sound better today than the day they shipped." },
];

export function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[85svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(201,168,107,0.12), transparent 65%)" }}
        />
        <div aria-hidden className="noise absolute inset-0 overflow-hidden" />
        <motion.div style={{ y, opacity }} className="relative mx-auto max-w-5xl px-6 pt-28 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-gold">The AURIC Atelier · Nashville</p>
          <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-extrabold leading-[0.95]">
            <SplitWords text="WE BUILD THE" as="span" />
            <br />
            <SplitWords text="SLOW WAY" as="span" wordClassName="text-gradient-gold" delay={0.3} />
          </h1>
          <Reveal delay={0.6}>
            <p className="font-serif-accent mx-auto mt-8 max-w-xl text-xl italic text-muted">
              Seventeen years, 8,400 instruments, one unbroken rule: a single pair
              of hands builds your guitar from first cut to final chord.
            </p>
          </Reveal>
        </motion.div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01">What We Believe</SectionLabel>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-gold/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <v.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold transition-colors group-hover:text-gold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto mt-28 max-w-4xl px-6">
        <SectionLabel number="02">The Journey</SectionLabel>
        <Reveal>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Seventeen years of{" "}
            <span className="font-serif-accent italic text-gold">stubbornness.</span>
          </h2>
        </Reveal>
        <div className="relative mt-14">
          <div aria-hidden className="absolute left-[4.35rem] top-0 hidden h-full w-px bg-line sm:block" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
                  <span className="relative shrink-0 font-display text-2xl font-extrabold text-gold sm:w-24 sm:text-right">
                    {m.year}
                    <span aria-hidden className="absolute -right-[1.53rem] top-2.5 hidden h-3 w-3 rounded-full border-2 border-gold bg-background sm:block" />
                  </span>
                  <div className="rounded-3xl border border-line bg-surface p-6 sm:flex-1">
                    <h3 className="font-display text-xl font-bold">{m.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-surface px-8 py-16 text-center lg:py-24">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 55% 70% at 50% 100%, rgba(201,168,107,0.14), transparent 65%)" }}
            />
            <div aria-hidden className="absolute -left-8 top-1/2 hidden h-[130%] -translate-y-1/2 -rotate-12 opacity-15 lg:block">
              <GuitarIllustration shape={products[0].shape} finish={products[0].finishes[0]} id="about-l" />
            </div>
            <div aria-hidden className="absolute -right-8 top-1/2 hidden h-[130%] -translate-y-1/2 rotate-12 opacity-15 lg:block">
              <GuitarIllustration shape={products[1].shape} finish={products[1].finishes[0]} id="about-r" />
            </div>
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Your instrument is already{" "}
                <span className="font-serif-accent italic text-gold">in the wood.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-muted">
                We just carve until we find it. Explore the collection, or commission
                something that exists only once.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/shop">
                  <MagneticButton size="lg">
                    Explore Instruments <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </Link>
                <Link href="/product/custom-one-of-one">
                  <MagneticButton size="lg" variant="outline">Commission a One-of-One</MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

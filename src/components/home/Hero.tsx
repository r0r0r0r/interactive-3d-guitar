"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { MagneticButton } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/Reveal";

const Hero3D = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  // Mount the WebGL canvas only on the client, after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        mouse.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        };
      }}
      aria-label="Hero"
    >
      {/* Cinematic backdrop */}
      <div aria-hidden className="absolute inset-0">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: "url('/images/pexels-lachlan-ross-6510335.jpg')" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 65% at 50% 38%, rgba(10,9,8,0.4), var(--background) 95%), radial-gradient(ellipse 70% 55% at 50% 38%, rgba(212,175,55,0.18), transparent 65%)",
          }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Vertical light beams */}
        {[18, 50, 82].map((left, i) => (
          <motion.div
            key={left}
            className="absolute top-0 h-full w-px"
            style={{
              left: `${left}%`,
              background:
                "linear-gradient(to bottom, transparent, rgba(201,168,107,0.25) 30%, rgba(201,168,107,0.05) 70%, transparent)",
            }}
            animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [0.9, 1, 0.9] }}
            transition={{ duration: 5 + i * 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}
        <div className="noise absolute inset-0 overflow-hidden" />
      </div>

      {/* 3D canvas */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: canvasScale, opacity: canvasOpacity }}
      >
        {mounted && (
          <Suspense fallback={null}>
            <Hero3D mouse={mouse} />
          </Suspense>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className="pointer-events-none relative z-10 mx-auto max-w-7xl px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-gold"
        >
          Handcrafted in Nashville · Est. 2009
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] font-extrabold leading-[0.9] tracking-tight">
          <SplitWords text="INSTRUMENTS" delay={0.4} as="span" />
          <br />
          <SplitWords
            text="OF LIGHT"
            delay={0.75}
            as="span"
            wordClassName="text-gradient-gold"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="font-serif-accent mx-auto mt-8 max-w-xl text-lg italic text-muted sm:text-xl"
        >
          Where a century of lutherie meets tomorrow&apos;s stage — every guitar a
          signature, every note an heirloom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.9 }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/shop">
            <MagneticButton size="lg">Explore the Collection</MagneticButton>
          </Link>
          <Link href="/about">
            <MagneticButton size="lg" variant="outline">
              <Play className="h-4 w-4" /> Our Story
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <ArrowDown className="h-4 w-4 text-gold" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

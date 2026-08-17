"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 40%, rgba(201,168,107,0.1), transparent 65%)" }}
      />
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(6rem,25vw,16rem)] font-extrabold leading-none text-foreground/[0.06]"
        aria-hidden
      >
        404
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="relative -mt-10"
      >
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          A string <span className="text-gradient-gold">out of tune.</span>
        </h1>
        <p className="font-serif-accent mx-auto mt-4 max-w-md text-lg italic text-muted">
          This page doesn&apos;t exist — but every great solo has a bent note.
          Let&apos;s get you back in key.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <MagneticButton size="lg">Back Home</MagneticButton>
          </Link>
          <Link href="/shop">
            <MagneticButton size="lg" variant="outline">Browse Guitars</MagneticButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

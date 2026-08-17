"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, Mail, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/Button";

export function ConfirmationClient() {
  return (
    <div className="relative mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center px-6 pt-20 text-center">
      {/* Celebratory particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${8 + ((i * 37) % 88)}%`,
              top: "45%",
              background: i % 3 === 0 ? "var(--gold-light)" : i % 3 === 1 ? "var(--gold)" : "var(--ember)",
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -120 - (i % 5) * 40],
              x: [(i % 2 ? 1 : -1) * ((i * 13) % 60)],
              scale: [0, 1, 0.4],
            }}
            transition={{ duration: 2.2, delay: 0.4 + i * 0.07, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gold text-[#09090b] shadow-[0_0_60px_-10px_var(--glow)]"
      >
        <Check className="h-11 w-11" strokeWidth={3} />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-gold"
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 1.6, repeat: 3, delay: 0.5 }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="mt-8 font-display text-4xl font-extrabold sm:text-5xl"
      >
        The music is <span className="text-gradient-gold">on its way.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-serif-accent mt-4 max-w-md text-lg italic text-muted"
      >
        Order <span className="not-italic font-medium text-gold">#AUR-{String(Date.now()).slice(-6)}</span> confirmed.
        Your instrument is being prepared, humidified and cased by the atelier team.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="mt-10 grid w-full gap-3 sm:grid-cols-2"
      >
        {[
          { Icon: Mail, t: "Confirmation email", s: "Receipt & build card sent" },
          { Icon: Package, t: "Ships within 48h", s: "Tracking follows by email" },
        ].map(({ Icon, t, s }) => (
          <div key={t} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left">
            <Icon className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium">{t}</p>
              <p className="text-xs text-muted">{s}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-10 flex flex-wrap justify-center gap-4 pb-16"
      >
        <Link href="/shop">
          <MagneticButton size="lg">
            Keep Exploring <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </Link>
        <Link href="/account">
          <MagneticButton size="lg" variant="outline">View Order History</MagneticButton>
        </Link>
      </motion.div>
    </div>
  );
}

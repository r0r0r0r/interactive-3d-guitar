"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into view on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered word-by-word reveal for headlines. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "110%", rotateX: -30 },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: { duration: 0.8, ease },
    },
  };
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            variants={word}
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Section label with animated rule line. */
export function SectionLabel({
  children,
  className,
  number,
}: {
  children: ReactNode;
  className?: string;
  number?: string;
}) {
  return (
    <Reveal className={cn("mb-6 flex items-center gap-4", className)} y={16}>
      {number && (
        <span className="font-display text-xs text-gold">{number}</span>
      )}
      <motion.span
        className="h-px w-10 origin-left bg-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      />
      <span className="text-xs uppercase tracking-[0.35em] text-muted">
        {children}
      </span>
    </Reveal>
  );
}

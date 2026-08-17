"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ZoomIn, Play, Box, X } from "lucide-react";
import type { Product, Finish } from "@/lib/products";
import { cn } from "@/lib/utils";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";

type Mode = "gallery" | "spin" | "video" | "ar";

/**
 * Immersive PDP gallery: drag-to-spin 360 view, zoom lens,
 * finish-reactive lighting, video and AR placeholders.
 */
export function ProductGallery({
  product,
  finish,
}: {
  product: Product;
  finish: Finish;
}) {
  const [mode, setMode] = useState<Mode>("gallery");
  const [zoomed, setZoomed] = useState(false);
  const [lens, setLens] = useState({ x: 50, y: 50 });
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const onSpinMove = useCallback((clientX: number) => {
    if (!dragging.current) return;
    setAngle((a) => a + (clientX - lastX.current) * 0.6);
    lastX.current = clientX;
  }, []);

  // Fake perspective from rotation angle: scaleX narrows as guitar "turns"
  const rad = (angle * Math.PI) / 180;
  const scaleX = Math.abs(Math.cos(rad)) * 0.75 + 0.25;
  const flipped = Math.cos(rad) < 0;

  const modes: { key: Mode; label: string; icon: React.ReactNode }[] = [
    { key: "gallery", label: "Gallery", icon: <ZoomIn className="h-3.5 w-3.5" /> },
    { key: "spin", label: "360°", icon: <RotateCcw className="h-3.5 w-3.5" /> },
    { key: "video", label: "Video", icon: <Play className="h-3.5 w-3.5" /> },
    { key: "ar", label: "AR", icon: <Box className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="lg:sticky lg:top-28">
      {/* Stage */}
      <div
        ref={stageRef}
        className={cn(
          "relative h-[28rem] overflow-hidden rounded-[2rem] border border-line bg-surface sm:h-[34rem] lg:h-[38rem]",
          mode === "spin" && "cursor-grab active:cursor-grabbing",
          mode === "gallery" && "cursor-zoom-in"
        )}
        onPointerDown={(e) => {
          if (mode !== "spin") return;
          dragging.current = true;
          lastX.current = e.clientX;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (mode === "spin") onSpinMove(e.clientX);
          if (mode === "gallery" && zoomed && stageRef.current) {
            const r = stageRef.current.getBoundingClientRect();
            setLens({
              x: ((e.clientX - r.left) / r.width) * 100,
              y: ((e.clientY - r.top) / r.height) * 100,
            });
          }
        }}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
        onClick={() => mode === "gallery" && setZoomed((z) => !z)}
        role="img"
        aria-label={`${product.name} in ${finish.name}`}
      >
        {/* Finish-reactive backdrop */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(ellipse 75% 65% at 50% 42%, ${finish.via}3d, transparent 72%)`,
          }}
          transition={{ duration: 0.8 }}
        />
        <div aria-hidden className="noise absolute inset-0 overflow-hidden rounded-[2rem]" />

        {/* Light sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-40 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          animate={{ left: ["-20%", "120%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
        />

        <AnimatePresence mode="wait">
          {mode === "gallery" && (
            <motion.div
              key={`gallery-${finish.id}`}
              initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
              animate={{ opacity: 1, scale: zoomed ? 2.1 : 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center p-10"
              style={
                zoomed
                  ? { transformOrigin: `${lens.x}% ${lens.y}%` }
                  : undefined
              }
            >
              <GuitarIllustration shape={product.shape} finish={finish} id={`pdp-${product.id}`} />
            </motion.div>
          )}

          {mode === "spin" && (
            <motion.div
              key="spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-10"
            >
              <div
                className="h-full transition-transform duration-75"
                style={{ transform: `scaleX(${(flipped ? -1 : 1) * scaleX})` }}
              >
                <GuitarIllustration shape={product.shape} finish={finish} id={`spin-${product.id}`} />
              </div>
              <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted">
                ← Drag to rotate →
              </p>
            </motion.div>
          )}

          {mode === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold backdrop-blur"
                aria-label="Play product film"
              >
                <Play className="ml-1 h-8 w-8 fill-current" />
              </motion.button>
              <p className="font-serif-accent italic text-muted">
                &ldquo;{product.name}&rdquo; — the film · 2:47
              </p>
              <span
                aria-hidden
                className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
            </motion.div>
          )}

          {mode === "ar" && (
            <motion.div
              key="ar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 text-center"
            >
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-gold/50 text-gold"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Box className="h-10 w-10" strokeWidth={1.2} />
              </motion.div>
              <p className="font-display text-lg font-bold">See it in your studio</p>
              <p className="max-w-xs text-sm text-muted">
                Point your phone camera here to preview the {product.name} at
                true scale in your space. (AR experience coming soon.)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {zoomed && mode === "gallery" && (
          <button
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/80 backdrop-blur"
            onClick={(e) => { e.stopPropagation(); setZoomed(false); }}
            aria-label="Exit zoom"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mode switcher */}
      <div className="mt-4 flex gap-2" role="tablist" aria-label="Gallery view mode">
        {modes.map((m) => (
          <button
            key={m.key}
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => { setMode(m.key); setZoomed(false); }}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-2xl border py-3 text-xs uppercase tracking-wider transition-all",
              mode === m.key
                ? "border-gold bg-gold/10 text-gold"
                : "border-line text-muted hover:border-line-strong hover:text-foreground"
            )}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Thumbnail angles */}
      <div className="mt-3 grid grid-cols-4 gap-2" aria-hidden>
        {[-14, 0, 10, 22].map((rot, i) => (
          <div
            key={i}
            className="flex h-20 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-2 py-2"
          >
            <div style={{ transform: `rotate(${rot}deg)` }} className="h-full opacity-80">
              <GuitarIllustration shape={product.shape} finish={finish} id={`thumb-${i}-${product.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

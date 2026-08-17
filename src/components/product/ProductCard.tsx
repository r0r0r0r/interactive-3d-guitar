"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [finishIdx, setFinishIdx] = useState(0);
  const [quickView, setQuickView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const add = useCart((s) => s.add);
  const wishIds = useWishlist((s) => s.ids);
  const toggleWish = useWishlist((s) => s.toggle);
  const { toast } = useToast();
  const wished = wishIds.includes(product.id);
  const finish = product.finishes[finishIdx];

  // 3D tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 22 });
  const sry = useSpring(ry, { stiffness: 260, damping: 22 });
  const shadowX = useTransform(sry, [-10, 10], [18, -18]);
  const shadowY = useTransform(srx, [-10, 10], [-18, 18]);
  const glareX = useTransform(sry, [-10, 10], ["20%", "80%"]);
  const glareY = useTransform(srx, [-10, 10], ["80%", "20%"]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `${x}px ${y}px 50px -18px rgba(201,168,107,0.28), 0 24px 60px -30px rgba(0,0,0,0.7)`
  );

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };

  const stockLabel =
    product.stock === "in-stock" ? "In stock" :
    product.stock === "low-stock" ? "Low stock" : "Made to order";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="perspective-1200 group h-full"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={() => { rx.set(0); ry.set(0); }}
          style={{ rotateX: srx, rotateY: sry, boxShadow }}
          className="preserve-3d relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 group-hover:border-gold/40"
        >
          {/* Glare */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) => `radial-gradient(320px circle at ${x} ${y}, rgba(255,235,200,0.1), transparent 60%)`
              ),
            }}
          />

          {/* Badges */}
          <div className="absolute left-4 top-4 z-20 flex flex-col gap-1.5">
            {product.limited && <Badge tone="gold">Limited</Badge>}
            {product.isNew && <Badge tone="light">New</Badge>}
            {product.compareAt && <Badge tone="ember">Save {formatPrice(product.compareAt - product.price)}</Badge>}
          </div>

          {/* Hover actions */}
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
            <ActionBtn
              label={wished ? "Remove from wishlist" : "Add to wishlist"}
              active={wished}
              onClick={() => {
                toggleWish(product.id);
                toast(wished ? "Removed from wishlist" : `${product.name} saved to wishlist`, "heart");
              }}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-current")} />
            </ActionBtn>
            <ActionBtn label="Quick view" onClick={() => setQuickView(true)} className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Eye className="h-4 w-4" />
            </ActionBtn>
          </div>

          {/* Guitar visual */}
          <Link
            href={`/product/${product.slug}`}
            className="relative block h-72 overflow-hidden"
            aria-label={product.name}
          >
            <div
              aria-hidden
              className="absolute inset-0 transition-all duration-700 group-hover:scale-110"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${finish.via}33, transparent 70%)`,
              }}
            />
            {/* Reflection floor */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `linear-gradient(to top, ${finish.via}22, transparent)` }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center py-6"
              style={{ translateZ: 40 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={finish.id}
                  initial={{ opacity: 0, rotate: -4, scale: 0.94 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 4, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="h-full transition-transform duration-700 group-hover:scale-[1.06] group-hover:-rotate-2"
                >
                  <GuitarIllustration shape={product.shape} finish={finish} id={`card-${product.id}`} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Info */}
          <div className="relative z-10 flex flex-1 flex-col gap-3 border-t border-line p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-display text-lg font-bold leading-tight transition-colors hover:text-gold">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-0.5 text-xs text-muted">{product.tagline}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                {product.rating}
                <span className="text-faint">({product.reviews})</span>
              </div>
            </div>

            {/* Finishes */}
            <div className="flex items-center gap-2" role="group" aria-label="Finish options">
              {product.finishes.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setFinishIdx(i)}
                  aria-label={f.name}
                  aria-pressed={i === finishIdx}
                  className={cn(
                    "h-5 w-5 rounded-full border-2 transition-all",
                    i === finishIdx ? "scale-110 border-gold" : "border-transparent hover:scale-105"
                  )}
                  style={{ background: `linear-gradient(135deg, ${f.from}, ${f.to})` }}
                />
              ))}
              <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted">
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  product.stock === "in-stock" ? "bg-emerald-400" :
                  product.stock === "low-stock" ? "bg-amber-400" : "bg-sky-400"
                )} />
                {stockLabel}
              </span>
            </div>

            <div className="mt-auto flex items-center justify-between pt-1">
              <div>
                <span className="font-display text-xl font-bold text-gold">
                  {formatPrice(product.price)}
                </span>
                {product.compareAt && (
                  <span className="ml-2 text-sm text-faint line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  add(product, finish.id);
                  toast(`${product.name} added to cart`, "cart");
                }}
                aria-label={`Add ${product.name} to cart`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[#09090b]"
              >
                <ShoppingBag className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick view modal */}
      <AnimatePresence>
        {quickView && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickView(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-1/2 z-[71] mx-auto max-w-3xl -translate-y-1/2 overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl"
              initial={{ opacity: 0, y: "-42%", scale: 0.94 }}
              animate={{ opacity: 1, y: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: "-46%", scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              role="dialog"
              aria-label={`Quick view: ${product.name}`}
            >
              <button
                onClick={() => setQuickView(false)}
                aria-label="Close quick view"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/80 backdrop-blur transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid sm:grid-cols-2">
                <div
                  className="relative flex h-72 items-center justify-center p-8 sm:h-auto"
                  style={{ background: `radial-gradient(ellipse at 50% 45%, ${finish.via}2e, transparent 75%)` }}
                >
                  <div className="h-64 sm:h-80">
                    <GuitarIllustration shape={product.shape} finish={finish} id={`qv-${product.id}`} />
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6 sm:p-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{product.collection} collection</p>
                    <h3 className="mt-1 font-display text-2xl font-bold">{product.name}</h3>
                    <p className="font-serif-accent mt-1 italic text-muted">{product.tagline}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{product.description}</p>
                  <div className="flex items-center gap-2">
                    {product.finishes.map((f, i) => (
                      <button
                        key={f.id}
                        onClick={() => setFinishIdx(i)}
                        aria-label={f.name}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 transition-all",
                          i === finishIdx ? "scale-110 border-gold" : "border-transparent"
                        )}
                        style={{ background: `linear-gradient(135deg, ${f.from}, ${f.to})` }}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted">{finish.name}</span>
                  </div>
                  <div className="mt-auto space-y-3 pt-2">
                    <p className="font-display text-2xl font-bold text-gold">{formatPrice(product.price)}</p>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          add(product, finish.id);
                          toast(`${product.name} added to cart`, "cart");
                          setQuickView(false);
                        }}
                      >
                        <ShoppingBag className="h-4 w-4" /> Add to Cart
                      </Button>
                      <Link href={`/product/${product.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full">Full Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "gold" | "light" | "ember" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur",
        tone === "gold" && "bg-gold text-[#09090b]",
        tone === "light" && "bg-foreground/90 text-background",
        tone === "ember" && "bg-ember/90 text-white"
      )}
    >
      {children}
    </span>
  );
}

function ActionBtn({
  children, label, onClick, active, className,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 backdrop-blur transition-colors hover:border-gold hover:text-gold",
        active && "border-gold bg-gold text-[#09090b] hover:text-[#09090b]",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

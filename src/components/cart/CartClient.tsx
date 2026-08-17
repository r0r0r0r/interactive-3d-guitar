"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, Truck } from "lucide-react";
import { useCart, cartTotal } from "@/lib/store";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";
import { Button, MagneticButton } from "@/components/ui/Button";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";

export function CartClient() {
  const { items, setQty, remove } = useCart();
  const total = cartTotal(items);
  const suggestions = products.filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
      <SectionLabel>Your Selection</SectionLabel>
      <Reveal>
        <h1 className="font-display text-5xl font-extrabold sm:text-6xl">
          The <span className="text-gradient-gold">Cart</span>
        </h1>
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center gap-6 rounded-[2.5rem] border border-dashed border-line-strong py-24 text-center">
            <motion.span
              animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-line text-muted"
            >
              <ShoppingBag className="h-10 w-10" strokeWidth={1.2} />
            </motion.span>
            <div>
              <p className="font-display text-2xl font-bold">Silence, for now</p>
              <p className="mt-2 max-w-sm text-muted">
                Your cart is empty — but somewhere in the atelier, a guitar is waiting to meet you.
              </p>
            </div>
            <Link href="/shop">
              <MagneticButton size="lg">
                Browse Instruments <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                const finish = product?.finishes.find((f) => f.id === item.finishId) ?? product?.finishes[0];
                return (
                  <motion.div
                    key={`${item.productId}-${item.finishId}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 80, transition: { duration: 0.3 } }}
                    className="group flex gap-6 rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-gold/30 sm:p-6"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      className="flex h-36 w-20 shrink-0 items-center justify-center rounded-2xl bg-surface-2 p-2 sm:h-44 sm:w-24"
                      style={{
                        background: finish
                          ? `radial-gradient(ellipse at 50% 40%, ${finish.via}26, var(--surface-2) 75%)`
                          : undefined,
                      }}
                    >
                      {product && finish && (
                        <GuitarIllustration shape={product.shape} finish={finish} id={`cartpg-${item.productId}`} />
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/product/${item.slug}`} className="font-display text-xl font-bold transition-colors hover:text-gold">
                            {item.name}
                          </Link>
                          <p className="mt-0.5 text-sm text-muted">Finish: {item.finishName}</p>
                        </div>
                        <button
                          onClick={() => remove(item.productId, item.finishId)}
                          aria-label={`Remove ${item.name}`}
                          className="text-faint transition-colors hover:text-ember"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                        <div className="flex items-center rounded-full border border-line-strong">
                          <button
                            onClick={() => setQty(item.productId, item.finishId, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-10 w-10 items-center justify-center transition-colors hover:text-gold"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center font-medium tabular-nums">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.productId, item.finishId, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-10 w-10 items-center justify-center transition-colors hover:text-gold"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-display text-xl font-bold text-gold">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-line bg-surface p-7">
                <h2 className="font-display text-xl font-bold">Summary</h2>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className="text-gold">Free · insured</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Setup &amp; humidification</span>
                    <span className="text-gold">Included</span>
                  </div>
                  <div className="my-4 h-px bg-line" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      className="font-display text-2xl font-bold text-gold"
                    >
                      {formatPrice(total)}
                    </motion.span>
                  </div>
                  <p className="text-xs text-faint">
                    or {formatPrice(Math.round(total / 24))}/mo · 0% APR over 24 months
                  </p>
                </div>
                <Link href="/checkout" className="mt-6 block">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="mt-5 space-y-2 text-xs text-muted">
                  <p className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-gold" /> Climate-controlled delivery, fully insured</p>
                  <p className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> 30-day returns · lifetime warranty</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <section className="mt-24" aria-label="You might also like">
          <SectionLabel>Complete the Rig</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

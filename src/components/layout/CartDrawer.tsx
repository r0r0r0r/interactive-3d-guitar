"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { useCart, cartTotal } from "@/lib/store";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { GuitarIllustration } from "@/components/guitar/GuitarIllustration";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart();
  const total = cartTotal(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-surface shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line p-6">
              <h2 className="font-display text-xl font-bold">
                Your Cart{" "}
                <span className="text-sm font-normal text-muted">
                  ({items.reduce((n, i) => n + i.qty, 0)})
                </span>
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-line text-muted"
                >
                  <ShoppingBag className="h-8 w-8" />
                </motion.div>
                <p className="font-display text-lg font-bold">Your cart is empty</p>
                <p className="max-w-[26ch] text-sm text-muted">
                  The stage is waiting. Find the instrument that finds you.
                </p>
                <Button onClick={close} className="mt-2">
                  <Link href="/shop">Explore Guitars</Link>
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto p-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const product = products.find((p) => p.id === item.productId);
                      const finish =
                        product?.finishes.find((f) => f.id === item.finishId) ??
                        product?.finishes[0];
                      return (
                        <motion.li
                          key={`${item.productId}-${item.finishId}`}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
                          className="flex gap-4 rounded-2xl border border-line bg-surface-2 p-4"
                        >
                          <div className="flex h-24 w-14 shrink-0 items-center justify-center rounded-xl bg-background/60 p-1">
                            {product && finish && (
                              <GuitarIllustration
                                shape={product.shape}
                                finish={finish}
                                id={`cart-${item.productId}`}
                              />
                            )}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={close}
                              className="truncate font-medium transition-colors hover:text-gold"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-muted">{item.finishName}</p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center gap-1 rounded-full border border-line">
                                <QtyBtn
                                  label="Decrease quantity"
                                  onClick={() => setQty(item.productId, item.finishId, item.qty - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </QtyBtn>
                                <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                                <QtyBtn
                                  label="Increase quantity"
                                  onClick={() => setQty(item.productId, item.finishId, item.qty + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </QtyBtn>
                              </div>
                              <span className="text-sm font-medium text-gold">
                                {formatPrice(item.price * item.qty)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => remove(item.productId, item.finishId)}
                            aria-label={`Remove ${item.name}`}
                            className="self-start text-faint transition-colors hover:text-ember"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <div className="space-y-4 border-t border-line p-6">
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>Shipping</span>
                    <span className="text-gold">Free · insured</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.15, color: "var(--gold-light)" }}
                      animate={{ scale: 1, color: "var(--gold)" }}
                      className="font-display text-2xl font-bold"
                    >
                      {formatPrice(total)}
                    </motion.span>
                  </div>
                  <Link href="/checkout" onClick={close} className="block">
                    <Button size="lg" className="w-full">
                      Checkout <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={close}
                    className="block text-center text-sm text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function QtyBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-surface-3 hover:text-gold"
    >
      {children}
    </button>
  );
}

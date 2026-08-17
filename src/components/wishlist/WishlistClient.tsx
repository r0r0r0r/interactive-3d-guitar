"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/store";
import { products } from "@/lib/products";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";

export function WishlistClient() {
  const ids = useWishlist((s) => s.ids);
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
      <SectionLabel>Saved for Later</SectionLabel>
      <Reveal>
        <h1 className="font-display text-5xl font-extrabold sm:text-6xl">
          The <span className="text-gradient-gold">Wishlist</span>
        </h1>
      </Reveal>

      {list.length === 0 ? (
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center gap-6 rounded-[2.5rem] border border-dashed border-line-strong py-24 text-center">
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-line text-muted"
            >
              <Heart className="h-10 w-10" strokeWidth={1.2} />
            </motion.span>
            <div>
              <p className="font-display text-2xl font-bold">No favourites yet</p>
              <p className="mt-2 max-w-sm text-muted">
                Tap the heart on any instrument to keep it here — dreams need a shelf too.
              </p>
            </div>
            <Link href="/shop">
              <MagneticButton size="lg">
                Find Something to Love <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, Heart, ShoppingBag, User, Menu, X, ChevronRight, Sun, Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, useWishlist, cartCount } from "@/lib/store";
import { collections, categories, products } from "@/lib/products";
import { useTheme } from "@/components/providers/ThemeProvider";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";

const links = [
  { href: "/shop", label: "Shop", mega: true },
  { href: "/custom-shop", label: "Custom Shop (3D)" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "Atelier" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const wishIds = useWishlist((s) => s.ids);
  const { theme, toggle } = useTheme();
  const count = cartCount(items);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 500 && y > lastY.current && !megaOpen);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter] duration-500",
          scrolled || megaOpen
            ? "glass border-b border-line"
            : "border-b border-transparent bg-transparent"
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-2" aria-label="AURIC home">
            <motion.span
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold text-gold"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v18M8 7c0 2 8 2 8 4s-8 2-8 4 8 2 8 4" strokeLinecap="round" />
              </svg>
            </motion.span>
            <span className="font-display text-lg font-bold tracking-[0.25em]">
              AURIC
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <div
                key={l.href}
                onMouseEnter={() => setMegaOpen(!!l.mega)}
              >
                <Link
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors hover:text-gold",
                    pathname === l.href ? "text-gold" : "text-foreground/80"
                  )}
                >
                  {l.label}
                  {pathname === l.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </IconBtn>
            <IconBtn label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`} onClick={toggle}>
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </IconBtn>
            <Link href="/wishlist" className="relative hidden sm:block">
              <IconBtn label="Wishlist" asSpan>
                <Heart className="h-[18px] w-[18px]" />
                {wishIds.length > 0 && <Dot count={wishIds.length} />}
              </IconBtn>
            </Link>
            <Link href="/account" className="hidden sm:block">
              <IconBtn label="Account" asSpan>
                <User className="h-[18px] w-[18px]" />
              </IconBtn>
            </Link>
            <IconBtn label="Cart" onClick={openCart}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && <Dot count={count} />}
            </IconBtn>
            <IconBtn label="Menu" onClick={() => setMobileOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </IconBtn>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="hidden border-t border-line lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-8 py-10">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Categories</p>
                  <ul className="space-y-2.5">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/shop?category=${c.id}`}
                          className="group flex items-center justify-between text-sm text-foreground/80 transition-colors hover:text-gold"
                        >
                          <span>{c.name}</span>
                          <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Collections</p>
                  <ul className="space-y-2.5">
                    {collections.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/shop?collection=${c.id}`}
                          className="group block text-sm transition-colors hover:text-gold"
                        >
                          <span className="text-foreground/80 group-hover:text-gold">{c.name}</span>
                          <span className="block text-xs text-faint">{c.line}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/product/${products[1].slug}`}
                  className="group relative col-span-2 flex items-center gap-6 overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 transition-colors hover:border-gold/40"
                >
                  <div
                    className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
                    style={{
                      background:
                        "radial-gradient(ellipse at 80% 20%, rgba(201,168,107,0.25), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-gold">Limited · 88 made</p>
                    <p className="font-display text-xl font-bold">Nocturne Eclipse</p>
                    <p className="mt-1 text-sm text-muted">Darkness, engineered. Explore the flagship →</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[61] flex w-[85%] max-w-sm flex-col bg-surface p-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-bold tracking-[0.25em]">AURIC</span>
                <IconBtn label="Close menu" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </IconBtn>
              </div>
              <nav className="flex flex-col gap-1">
                {[
                  { href: "/", label: "Home" },
                  ...links.map(({ href, label }) => ({ href, label })),
                  { href: "/wishlist", label: "Wishlist" },
                  { href: "/account", label: "Account" },
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      className="block rounded-xl px-4 py-3 font-display text-2xl font-bold transition-colors hover:bg-surface-2 hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto border-t border-line pt-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Collections</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?collection=${c.id}`}
                      className="rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  className,
  asSpan,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  asSpan?: boolean;
}) {
  const cls = cn(
    "relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-all hover:bg-surface-2 hover:text-gold",
    className
  );
  if (asSpan) {
    return (
      <span className={cls} aria-label={label}>
        {children}
      </span>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={label}>
      {children}
    </button>
  );
}

function Dot({ count }: { count: number }) {
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-[#09090b]"
    >
      {count}
    </motion.span>
  );
}

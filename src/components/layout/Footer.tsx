"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail,
  ArrowRight, Award, ShieldCheck, Leaf, CreditCard, Check,
} from "lucide-react";

/* Brand icons (removed from lucide-react) as inline SVGs */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
import { Reveal } from "@/components/ui/Reveal";
import { collections, categories } from "@/lib/products";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/* Animated background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--gold) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Sound-wave strings */}
        <svg className="absolute bottom-0 left-0 w-full opacity-[0.07]" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.path
              key={i}
              d={`M0 ${60 + i * 22} Q 360 ${30 + i * 22}, 720 ${60 + i * 22} T 1440 ${60 + i * 22}`}
              stroke="var(--gold)"
              strokeWidth="1"
              animate={{ d: [
                `M0 ${60 + i * 22} Q 360 ${30 + i * 22}, 720 ${60 + i * 22} T 1440 ${60 + i * 22}`,
                `M0 ${60 + i * 22} Q 360 ${85 + i * 22}, 720 ${60 + i * 22} T 1440 ${60 + i * 22}`,
                `M0 ${60 + i * 22} Q 360 ${30 + i * 22}, 720 ${60 + i * 22} T 1440 ${60 + i * 22}`,
              ] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Newsletter band */}
        <div className="border-b border-line py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">The Auric Letter</p>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                First chords, first looks,{" "}
                <span className="text-gradient-gold">first access.</span>
              </h2>
              <p className="mt-3 max-w-md text-muted">
                New instruments, atelier stories and limited drops — once a month, never noise.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSubscribed(true);
                }}
                className="relative"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  disabled={subscribed}
                  className="h-16 w-full rounded-full border border-line-strong bg-background/60 pl-7 pr-40 text-sm outline-none backdrop-blur transition-colors placeholder:text-faint focus:border-gold disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  disabled={subscribed}
                  whileTap={{ scale: 0.96 }}
                  className="absolute right-2 top-2 flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium uppercase tracking-wider text-[#09090b] transition-colors hover:bg-gold-light"
                >
                  {subscribed ? (
                    <>
                      <Check className="h-4 w-4" /> Joined
                    </>
                  ) : (
                    <>
                      Subscribe <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 pl-6 text-sm text-gold"
                >
                  Welcome to the atelier. Your first letter arrives soon.
                </motion.p>
              )}
            </Reveal>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <Reveal className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18M8 7c0 2 8 2 8 4s-8 2-8 4 8 2 8 4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-display text-xl font-bold tracking-[0.25em]">AURIC</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Since 2009, our atelier has built instruments for players who believe
              tone is a place you arrive at, not a setting you dial in. Every guitar
              is one luthier&apos;s signature, start to finish.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: YoutubeIcon, label: "YouTube" },
                { Icon: TwitterIcon, label: "Twitter" },
                { Icon: FacebookIcon, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
            {/* Awards */}
            <div className="mt-8 flex flex-wrap gap-4">
              {["Awwwards SOTD", "FWA of the Day", "CSSDA Kudos"].map((a) => (
                <span key={a} className="flex items-center gap-1.5 text-xs text-faint">
                  <Award className="h-3.5 w-3.5 text-gold" /> {a}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <FooterCol title="Shop">
              {categories.map((c) => (
                <FooterLink key={c.id} href={`/shop?category=${c.id}`}>
                  {c.name}
                </FooterLink>
              ))}
              <FooterLink href="/shop">All Instruments</FooterLink>
            </FooterCol>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <FooterCol title="Collections">
              {collections.map((c) => (
                <FooterLink key={c.id} href={`/shop?collection=${c.id}`}>
                  {c.name}
                </FooterLink>
              ))}
            </FooterCol>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-2">
            <FooterCol title="Company">
              <FooterLink href="/about">Our Atelier</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/account">Account</FooterLink>
              <FooterLink href="/wishlist">Wishlist</FooterLink>
            </FooterCol>
          </Reveal>

          <Reveal delay={0.25} className="lg:col-span-2">
            <FooterCol title="Visit">
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                12 Lutherie Lane
                <br />
                Nashville, TN 37203
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0 text-gold" /> +1 (615) 555-0142
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Mail className="h-4 w-4 shrink-0 text-gold" /> hello@auric.example
              </li>
              {/* Stylized map */}
              <li className="mt-3 overflow-hidden rounded-xl border border-line">
                <div className="relative h-24 bg-surface-2">
                  <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 100">
                    <path d="M0 30 H200 M0 60 H200 M0 85 H200 M40 0 V100 M90 0 V100 M150 0 V100" stroke="var(--muted)" strokeWidth="0.5" />
                    <path d="M20 100 Q 60 60 90 62 T 200 40" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
                  </svg>
                  <motion.span
                    className="absolute left-[45%] top-[55%] block h-3 w-3 rounded-full bg-gold"
                    animate={{ boxShadow: ["0 0 0 0 rgba(201,168,107,0.5)", "0 0 0 12px rgba(201,168,107,0)"] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </div>
              </li>
            </FooterCol>
          </Reveal>
        </div>

        {/* Trust bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-line py-8 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-faint">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold" /> Lifetime warranty
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-gold" /> FSC-certified woods
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-gold" /> Visa · MC · Amex · PayPal · Klarna
            </span>
          </div>
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} AURIC Instruments. Crafted with obsession.
          </p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none relative select-none overflow-hidden">
        <motion.p
          initial={{ y: "35%", opacity: 0 }}
          whileInView={{ y: "12%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display text-[22vw] font-bold leading-[0.75] tracking-tight text-foreground/[0.04]"
        >
          AURIC
        </motion.p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">{title}</p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group relative inline-block text-sm text-muted transition-colors hover:text-gold"
      >
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
      </Link>
    </li>
  );
}

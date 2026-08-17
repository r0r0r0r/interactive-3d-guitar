"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, SectionLabel, SplitWords } from "@/components/ui/Reveal";

export function ContactClient() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "General inquiry", message: "" });

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
      <SectionLabel>Get in Touch</SectionLabel>
      <h1 className="font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl">
        <SplitWords text="TALK TO THE" as="span" />
        <br />
        <SplitWords text="ATELIER" as="span" wordClassName="text-gradient-gold" delay={0.15} />
      </h1>
      <Reveal delay={0.3}>
        <p className="font-serif-accent mt-5 max-w-lg text-lg italic text-muted">
          Commission questions, setup advice, or just want to talk tonewoods —
          a real luthier answers every message.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <Reveal delay={0.35} className="lg:col-span-3">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full min-h-96 flex-col items-center justify-center gap-5 rounded-[2rem] border border-gold/30 bg-surface p-10 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
                className="flex h-18 w-18 items-center justify-center rounded-full bg-gold p-5 text-[#09090b]"
              >
                <Check className="h-8 w-8" strokeWidth={3} />
              </motion.span>
              <h2 className="font-display text-2xl font-bold">Message received</h2>
              <p className="max-w-sm text-muted">
                Thanks, {form.name || "friend"} — a luthier will reply within one
                business day. Meanwhile, the workshop hums on.
              </p>
              <Button variant="outline" onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "General inquiry", message: "" }); }}>
                Send another
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-5 rounded-[2rem] border border-line bg-surface p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">Name</label>
                  <input
                    id="c-name" required value={form.name} placeholder="Jamie Rivers" autoComplete="name"
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-2xl border border-line-strong bg-background/50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">Email</label>
                  <input
                    id="c-email" type="email" required value={form.email} placeholder="you@studio.com" autoComplete="email"
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-2xl border border-line-strong bg-background/50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="c-topic" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">Topic</label>
                <select
                  id="c-topic" value={form.topic}
                  onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                  className="w-full rounded-2xl border border-line-strong bg-background/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold"
                >
                  {["General inquiry", "Custom Shop commission", "Order support", "Warranty & setup", "Press & partnerships"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">Message</label>
                <textarea
                  id="c-msg" required rows={6} value={form.message}
                  placeholder="Tell us about the sound you're chasing…"
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-none rounded-2xl border border-line-strong bg-background/50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-gold"
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send Message <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </Reveal>

        {/* Info */}
        <div className="space-y-5 lg:col-span-2">
          {[
            { Icon: MapPin, t: "The Atelier", lines: ["12 Lutherie Lane", "Nashville, TN 37203"] },
            { Icon: Clock, t: "Workshop Hours", lines: ["Tue–Sat · 10:00–18:00", "Visits by appointment"] },
            { Icon: Phone, t: "Phone", lines: ["+1 (615) 555-0142"] },
            { Icon: Mail, t: "Email", lines: ["hello@auric.example"] },
          ].map(({ Icon, t, lines }, i) => (
            <Reveal key={t} delay={0.4 + i * 0.07}>
              <div className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-bold">{t}</p>
                  {lines.map((l) => (
                    <p key={l} className="mt-0.5 text-sm text-muted">{l}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          {/* Map */}
          <Reveal delay={0.7}>
            <div className="relative h-52 overflow-hidden rounded-3xl border border-line bg-surface-2">
              <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 200" aria-hidden>
                <path d="M0 60 H400 M0 120 H400 M0 170 H400 M80 0 V200 M180 0 V200 M300 0 V200" stroke="var(--muted)" strokeWidth="0.6" />
                <path d="M40 200 Q 120 120 180 124 T 400 80" stroke="var(--gold)" strokeWidth="2" fill="none" />
                <path d="M0 100 Q 90 80 180 124" stroke="var(--gold-deep)" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>
              <motion.span
                className="absolute left-[45%] top-[58%] block h-4 w-4 rounded-full bg-gold"
                animate={{ boxShadow: ["0 0 0 0 rgba(201,168,107,0.5)", "0 0 0 16px rgba(201,168,107,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.3em] text-muted">
                Music Row · Nashville
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

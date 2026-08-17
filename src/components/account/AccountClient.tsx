"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, LogIn, Mail, Package, Sparkles, User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";
import { useToast } from "@/components/ui/Toast";

export function AccountClient() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPw, setShowPw] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedIn(true);
    toast(mode === "signin" ? "Welcome back to the atelier" : "Account created — welcome");
  };

  if (signedIn) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 lg:pt-36">
        <SectionLabel>Your Atelier</SectionLabel>
        <Reveal>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Welcome, <span className="text-gradient-gold">{form.name || "Player"}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-muted">{form.email || "you@studio.com"}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[
            { Icon: Package, t: "Order History", s: "No orders yet — your first build awaits.", },
            { Icon: Sparkles, t: "Atelier Perks", s: "Free annual setups at any AURIC atelier.", },
            { Icon: User, t: "Profile", s: "Manage shipping addresses and preferences.", },
            { Icon: Lock, t: "Security", s: "Password, sessions and sign-in devices.", },
          ].map(({ Icon, t, s }, i) => (
            <Reveal key={t} delay={0.15 + i * 0.07}>
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-gold/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-bold transition-colors group-hover:text-gold">{t}</p>
                  <p className="mt-1 text-sm text-muted">{s}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4} className="mt-10">
          <Button variant="outline" onClick={() => setSignedIn(false)}>Sign out</Button>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-svh max-w-md flex-col justify-center px-6 pb-16 pt-28">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(201,168,107,0.08), transparent 65%)" }}
      />

      <Reveal>
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3v18M8 7c0 2 8 2 8 4s-8 2-8 4 8 2 8 4" strokeLinecap="round" />
            </svg>
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold">
            {mode === "signin" ? "Welcome back" : "Join the atelier"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {mode === "signin"
              ? "Your instruments, orders and perks await."
              : "Create an account to track builds and unlock perks."}
          </p>
        </div>
      </Reveal>

      {/* Mode switch */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 flex w-fit rounded-full border border-line p-1" role="tablist">
          {([["signin", "Sign In", LogIn], ["signup", "Sign Up", UserPlus]] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              role="tab"
              aria-selected={mode === key}
              onClick={() => setMode(key)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm transition-colors",
                mode === key ? "text-[#09090b]" : "text-muted hover:text-foreground"
              )}
            >
              {mode === key && (
                <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 space-y-4"
        >
          {mode === "signup" && (
            <AuthField
              id="name" label="Full name" icon={<User className="h-4 w-4" />}
              value={form.name} placeholder="Jamie Rivers" autoComplete="name"
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          )}
          <AuthField
            id="email" label="Email" type="email" icon={<Mail className="h-4 w-4" />}
            value={form.email} placeholder="you@studio.com" autoComplete="email" required
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <div className="relative">
            <AuthField
              id="password" label="Password" type={showPw ? "text" : "password"}
              icon={<Lock className="h-4 w-4" />}
              value={form.password} placeholder="••••••••" required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute bottom-3.5 right-4 text-muted transition-colors hover:text-gold"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {mode === "signin" && (
            <div className="text-right">
              <button type="button" className="text-xs text-muted underline-offset-4 transition-colors hover:text-gold hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>

          <p className="text-center text-xs text-faint">
            Demo authentication — no credentials are stored or verified.
          </p>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

function AuthField({
  id, label, icon, ...props
}: { id: string; label: string; icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">{icon}</span>
        <input
          id={id}
          {...props}
          className="w-full rounded-2xl border border-line-strong bg-surface/60 py-3.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-gold"
        />
      </div>
    </div>
  );
}

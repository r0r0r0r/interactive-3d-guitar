"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, MapPin, Package, User } from "lucide-react";
import { useCart, cartTotal } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const steps = [
  { id: 0, label: "Contact", icon: User },
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
];

export function CheckoutClient() {
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const { items, clear } = useCart();
  const total = cartTotal(items);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "", name: "", address: "", city: "", zip: "", country: "United States",
    card: "", expiry: "", cvc: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const canNext =
    step === 0 ? form.email.includes("@") && form.name.length > 1 :
    step === 1 ? form.address.length > 3 && form.city.length > 1 && form.zip.length > 2 :
    form.card.replace(/\s/g, "").length >= 15 && form.expiry.length >= 4 && form.cvc.length >= 3;

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      clear();
      router.push("/checkout/confirmation");
    }, 1800);
  };

  if (items.length === 0 && !placing) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center gap-6 px-6 pt-28 text-center">
        <Package className="h-14 w-14 text-muted" strokeWidth={1.2} />
        <h1 className="font-display text-3xl font-bold">Nothing to check out — yet</h1>
        <p className="text-muted">Your cart is empty. The instruments await.</p>
        <Link href="/shop">
          <Button size="lg">Browse the Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
      <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>

      <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
        Secure <span className="text-gradient-gold">Checkout</span>
      </h1>

      {/* Stepper */}
      <div className="mt-10 flex items-center gap-2 sm:gap-4" role="list" aria-label="Checkout progress">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-2 sm:gap-4" role="listitem">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-all",
                i === step && "border-gold bg-gold/10 text-gold",
                i < step && "border-emerald-400/40 text-emerald-400",
                i > step && "border-line text-faint"
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className="relative h-px flex-1 bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  animate={{ width: i < step ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 rounded-3xl border border-line bg-surface p-7 sm:p-8"
            >
              {step === 0 && (
                <>
                  <h2 className="font-display text-xl font-bold">Contact details</h2>
                  <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Jamie Rivers" autoComplete="name" />
                  <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="jamie@studio.com" autoComplete="email" />
                  <p className="text-xs text-faint">Order updates and your digital build card will be sent here.</p>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="font-display text-xl font-bold">Shipping address</h2>
                  <Field label="Street address" value={form.address} onChange={set("address")} placeholder="12 Melody Ave" autoComplete="street-address" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="City" value={form.city} onChange={set("city")} placeholder="Nashville" autoComplete="address-level2" />
                    <Field label="ZIP / Postcode" value={form.zip} onChange={set("zip")} placeholder="37203" autoComplete="postal-code" />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">Country</label>
                    <select
                      id="country"
                      value={form.country}
                      onChange={set("country")}
                      className="h-13 w-full rounded-2xl border border-line-strong bg-background/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold"
                    >
                      {["United States", "Canada", "United Kingdom", "Germany", "Japan", "Australia"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-gold/25 bg-gold/5 p-4 text-sm text-gold">
                    <Package className="h-4 w-4 shrink-0" />
                    Instruments ship in climate-controlled, fully insured freight — free.
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                    Payment <Lock className="h-4 w-4 text-gold" />
                  </h2>
                  <Field
                    label="Card number" value={form.card} placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number"
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
                      setForm((f) => ({ ...f, card: v }));
                    }}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Expiry" value={form.expiry} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp"
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                        setForm((f) => ({ ...f, expiry: v }));
                      }}
                    />
                    <Field
                      label="CVC" value={form.cvc} placeholder="123" inputMode="numeric" autoComplete="cc-csc"
                      onChange={(e) => setForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    />
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-faint">
                    <Lock className="h-3 w-3" /> Demo checkout — no real payment is processed.
                  </p>
                </>
              )}

              <div className="flex justify-between pt-2">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                ) : <span />}
                {step < 2 ? (
                  <Button disabled={!canNext} onClick={() => setStep(step + 1)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button disabled={!canNext || placing} onClick={placeOrder} size="lg">
                    {placing ? (
                      <>
                        <motion.span
                          className="h-4 w-4 rounded-full border-2 border-[#09090b]/30 border-t-[#09090b]"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Placing order…
                      </>
                    ) : (
                      <>Place Order · {formatPrice(total)}</>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="h-fit lg:sticky lg:top-28 lg:col-span-2">
          <div className="rounded-3xl border border-line bg-surface p-7">
            <h2 className="font-display text-lg font-bold">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map((i) => (
                <li key={`${i.productId}-${i.finishId}`} className="flex justify-between gap-3 text-sm">
                  <span className="text-muted">
                    {i.name} <span className="text-faint">× {i.qty}</span>
                    <span className="block text-xs text-faint">{i.finishName}</span>
                  </span>
                  <span className="shrink-0">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="my-5 h-px bg-line" />
            <div className="flex justify-between">
              <span className="font-display font-bold">Total</span>
              <span className="font-display text-xl font-bold text-gold">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/\W+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-2xl border border-line-strong bg-background/50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-gold"
      />
    </div>
  );
}

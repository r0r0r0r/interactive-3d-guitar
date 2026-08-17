"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Heart, ShoppingBag } from "lucide-react";

type Toast = { id: number; message: string; icon?: "cart" | "heart" | "check" };
type ToastCtx = { toast: (message: string, icon?: Toast["icon"]) => void };

const Ctx = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, icon?: Toast["icon"]) => {
    const id = ++nextId;
    setToasts((t) => [...t.slice(-2), { id, message, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.9, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="glass pointer-events-auto flex items-center gap-3 rounded-full py-3 pl-4 pr-5 text-sm shadow-2xl"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-[#09090b]">
                {t.icon === "heart" ? (
                  <Heart className="h-3.5 w-3.5" />
                ) : t.icon === "cart" ? (
                  <ShoppingBag className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </span>
              {t.message}
              <button
                onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
                className="ml-1 text-muted transition-colors hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

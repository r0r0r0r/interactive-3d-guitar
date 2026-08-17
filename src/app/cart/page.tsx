import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected AURIC instruments before checkout.",
  robots: { index: false },
};

export default function CartPage() {
  return <CartClient />;
}

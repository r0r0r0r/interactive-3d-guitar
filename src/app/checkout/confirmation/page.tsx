import type { Metadata } from "next";
import { ConfirmationClient } from "@/components/checkout/ConfirmationClient";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your AURIC order is confirmed.",
  robots: { index: false },
};

export default function ConfirmationPage() {
  return <ConfirmationClient />;
}

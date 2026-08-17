import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";

export const metadata: Metadata = {
  title: "Compare Instruments — AURIC Atelier",
  description:
    "Compare technical specifications, tonewoods, pickups, scale length, fretwire, and pricing side-by-side across the AURIC collection.",
};

export default function ComparePage() {
  return <CompareClient />;
}

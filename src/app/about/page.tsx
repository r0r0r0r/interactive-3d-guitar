import type { Metadata } from "next";
import { AboutClient } from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "Our Atelier — The AURIC Story",
  description:
    "Seventeen years, 8,400 instruments, one rule: a single pair of hands builds your guitar from first cut to final chord. Discover the AURIC atelier.",
};

export default function AboutPage() {
  return <AboutClient />;
}

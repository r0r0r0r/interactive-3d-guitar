import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedRail } from "@/components/home/FeaturedRail";
import {
  Marquee,
  ProductShowcase,
  Categories,
  LimitedEdition,
  Craftsmanship,
  Testimonials,
  Artists,
  Sustainability,
  FAQ,
} from "@/components/home/Sections";

export const metadata: Metadata = {
  title: "AURIC — Instruments of Light | Premium Handcrafted Guitars",
  description:
    "Explore handcrafted premium guitars from the AURIC atelier — electric, acoustic, bass and bespoke custom-shop instruments built by master luthiers.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedRail />
      <ProductShowcase />
      <Categories />
      <LimitedEdition />
      <Craftsmanship />
      <Testimonials />
      <Artists />
      <Sustainability />
      <FAQ />
    </>
  );
}

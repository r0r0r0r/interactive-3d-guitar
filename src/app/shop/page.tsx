import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Instruments",
  description:
    "Browse the full AURIC collection — handcrafted electric, acoustic, bass and custom-shop guitars. Filter by category, collection and price.",
};

export default function ShopPage() {
  return <ShopClient />;
}

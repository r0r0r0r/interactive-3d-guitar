import type { Metadata } from "next";
import { CustomShopClient } from "@/components/custom-shop/CustomShopClient";

export const metadata: Metadata = {
  title: "Bespoke Custom Shop 3D Studio — AURIC Instruments",
  description:
    "Design your dream instrument in real-time 3D. Custom finishes, hand-selected tonewoods, pickup voicings, hardware, custom neck plate engraving, and audio tone previews.",
};

export default function CustomShopPage() {
  return <CustomShopClient />;
}

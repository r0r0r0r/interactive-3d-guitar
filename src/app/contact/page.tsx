import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact the Atelier",
  description:
    "Commission questions, setup advice, or tonewood talk — a real luthier answers every message. Contact AURIC Instruments.",
};

export default function ContactPage() {
  return <ContactClient />;
}

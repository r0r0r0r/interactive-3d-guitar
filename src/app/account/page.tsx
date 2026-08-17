import type { Metadata } from "next";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to your AURIC account to track orders and unlock atelier perks.",
  robots: { index: false },
};

export default function AccountPage() {
  return <AccountClient />;
}

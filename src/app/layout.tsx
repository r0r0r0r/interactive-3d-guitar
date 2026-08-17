import type { Metadata, Viewport } from "next";
import { Syne, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  fallback: ["Georgia", "serif"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auric.example.com"),
  title: {
    default: "AURIC — Instruments of Light | Premium Handcrafted Guitars",
    template: "%s | AURIC Instruments",
  },
  description:
    "Handcrafted premium guitars from the AURIC atelier. Electric, acoustic, bass and bespoke custom-shop instruments — built by master luthiers, guaranteed for life.",
  keywords: [
    "premium guitars", "handcrafted guitars", "custom shop guitar",
    "boutique electric guitar", "luxury acoustic guitar",
  ],
  openGraph: {
    title: "AURIC — Instruments of Light",
    description: "Handcrafted premium guitars from the AURIC atelier.",
    type: "website",
    siteName: "AURIC Instruments",
  },
  twitter: { card: "summary_large_image", title: "AURIC — Instruments of Light" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ToastProvider>
            <SmoothScroll>
              <CustomCursor />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScroll>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

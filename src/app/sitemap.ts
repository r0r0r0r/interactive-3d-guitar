import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const base = "https://auric.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/shop", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...productPages];
}

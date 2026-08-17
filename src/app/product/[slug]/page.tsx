import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductDetail } from "@/components/product/ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AURIC Instruments`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            brand: { "@type": "Brand", name: "AURIC Instruments" },
            offers: {
              "@type": "Offer",
              price: (product.price / 100).toFixed(2),
              priceCurrency: "USD",
              availability:
                product.stock === "in-stock"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          }),
        }}
      />
      <ProductDetail product={product} />
    </>
  );
}

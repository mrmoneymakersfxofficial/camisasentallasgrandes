import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { products } = await import("@/data/products");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: `${product.name} - Camisa Plus Size`,
    description: `${product.description}. Tallas ${product.sizes.join(", ")}. ${product.material}. Compra ahora en Algodón Peruano.`,
    openGraph: {
      title: `${product.name} | Algodón Peruano`,
      description: product.description,
      images: [{ url: product.image, width: 864, height: 1152, alt: product.name }],
      type: "website",
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Algodón Peruano`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: `${product.name} - Camisa Plus Size`,
    description: `${product.description}. Tallas ${product.sizes.replace(/[\[\]"]/g, "")}. ${product.material}. Compra ahora en Algodón Peruano.`,
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
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) {
    notFound();
  }

  // Get related products (same category, different product)
  const relatedProducts = await db.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    take: 4,
    orderBy: { createdAt: "asc" },
  });

  const parsedRelated = relatedProducts.map((p) => ({
    ...p,
    sizes: JSON.parse(p.sizes),
  }));

  const parsedProduct = {
    ...product,
    sizes: JSON.parse(product.sizes),
  };

  return (
    <ProductDetailClient
      product={parsedProduct}
      relatedProducts={parsedRelated}
    />
  );
}

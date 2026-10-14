import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog & Guías de Estilo | CTG Camisas en Tallas Grandes",
  description:
    "Artículos, guías de medidas, consejos de lavado y recomendaciones de estilo para vestir camisas de hombre en tallas grandes (2XL a 6XL).",
  openGraph: {
    title: "Blog & Guías de Estilo | CTG Camisas en Tallas Grandes",
    description:
      "Consejos expertos para lucir con elegancia y confort en tallas plus size.",
  },
};

export default function BlogPage() {
  return <BlogIndexClient />;
}

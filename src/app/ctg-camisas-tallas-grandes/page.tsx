import type { Metadata } from "next";
import CTGPageClient from "./CTGPageClient";

export const metadata: Metadata = {
  title: "CTG | Camisas Tallas Grandes para Hombre en Perú",
  description:
    "Descubre CTG, Camisas Tallas Grandes de Antobelly en algodón peruano. Tallas 18.5 a 22.5 (2XL a 6XL), atención en Miraflores y envíos a todo el Perú.",
  keywords: [
    "CTG Camisas Tallas Grandes",
    "CTG Perú",
    "CTG Antobelly",
    "Camisas Tallas Grandes Perú",
    "Camisas Tallas Grandes para hombre",
    "Camisas XXL para hombre",
    "Camisas 2XL para hombre en Perú",
    "Camisas 3XL para hombre en Lima",
    "Camisas 4XL para hombre en Perú",
    "Camisas 5XL para hombre en Lima",
    "Camisas 6XL para hombre en Lima",
    "Camisas para hombres de espalda ancha",
    "Camisas para hombres con barriga",
    "Tienda de camisas tallas grandes en Miraflores",
    "Dónde comprar camisas tallas grandes en Perú",
  ],
  alternates: {
    canonical: "https://www.camisasentallasgrandes.com/ctg-camisas-tallas-grandes",
  },
  openGraph: {
    title: "CTG | Camisas Tallas Grandes para Hombre en Perú",
    description:
      "Línea especializada de Antobelly en camisas de vestir de algodón peruano tallas 18.5 a 22.5 (2XL a 6XL).",
    url: "https://www.camisasentallasgrandes.com/ctg-camisas-tallas-grandes",
    siteName: "CTG Camisas en Tallas Grandes",
    locale: "es_PE",
    type: "website",
  },
};

export default function CTGPage() {
  return <CTGPageClient />;
}

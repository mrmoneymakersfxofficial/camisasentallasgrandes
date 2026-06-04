import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Camisas Plus Size",
  description:
    "Explora nuestra colección completa de camisas premium para hombre en tallas 2XL a 6XL. Modelos casuales y de vestir en 100% algodón peruano.",
  openGraph: {
    title: "Catálogo | Algodón Peruano",
    description: "Colección completa de camisas premium 100% algodón peruano. Tallas 2XL a 6XL.",
    images: [{ url: "/images/hero-shirt-1.png", width: 1200, height: 630 }],
  },
};

export default function CatalogoPage() {
  return <CatalogoClient />;
}

import CatalogoClient from "./CatalogoClient";

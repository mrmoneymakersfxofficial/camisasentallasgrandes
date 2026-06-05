import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - Nuestra Historia",
  description:
    "Conoce la historia de Algodón Peruano. Nuestra misión es crear camisas premium para hombre plus size con 100% algodón peruano de la más alta calidad.",
  openGraph: {
    title: "Nosotros | Algodón Peruano",
    description: "Conoce nuestra historia y compromiso con la calidad premium.",
    images: [{ url: "/images/hero-shirt-2.png", width: 1200, height: 630 }],
  },
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}

import NosotrosClient from "./NosotrosClient";

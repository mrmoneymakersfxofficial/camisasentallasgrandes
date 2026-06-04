import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Tallas Plus Size",
  description:
    "Descubre tu talla perfecta con nuestro asistente inteligente. Ingresa tus medidas y recibe una recomendación precisa para camisas 2XL a 6XL.",
  openGraph: {
    title: "Calcula tu Talla | Algodón Peruano",
    description: "Asistente inteligente de tallas. Encuentra tu talla perfecta en segundos.",
    images: [{ url: "/images/hero-shirt-1.png", width: 1200, height: 630 }],
  },
};

export default function TutallaPage() {
  return <TutallaClient />;
}

import TutallaClient from "./TutallaClient";

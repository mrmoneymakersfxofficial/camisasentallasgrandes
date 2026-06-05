import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos por WhatsApp, correo o visita nuestra tienda en Lima. Atención personalizada para tu compra de camisas plus size premium.",
  openGraph: {
    title: "Contacto | Algodón Peruano",
    description: "Contáctanos para atención personalizada.",
    images: [{ url: "/images/hero-shirt-1.png", width: 1200, height: 630 }],
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}

import ContactoClient from "./ContactoClient";

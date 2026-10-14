import type { Metadata } from "next";
import LibroReclamacionesClient from "./LibroReclamacionesClient";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual | CTG Camisas en Tallas Grandes",
  description:
    "Libro de Reclamaciones Virtual de Camisas Talla Grande – CTG, conforme a la Ley N.° 29571 del Código de Protección y Defensa del Consumidor en el Perú.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LibroReclamacionesPage() {
  return <LibroReclamacionesClient />;
}

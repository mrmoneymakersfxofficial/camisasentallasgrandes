import type { Metadata } from "next";
import FormasDePagoClient from "./FormasDePagoClient";

export const metadata: Metadata = {
  title: "Formas de Pago | CTG Camisas en Tallas Grandes",
  description:
    "Conoce nuestras formas de pago oficiales: Transferencia BCP, Yape, Plin y links de cobro. Razón social: Erick Alexis Chavez Rodriguez, RUC 10099179886.",
  openGraph: {
    title: "Formas de Pago Oficiales | CTG Camisas en Tallas Grandes",
    description:
      "Información bancaria de BCP, Yape, Plin y razón social para transferencias seguras.",
  },
};

export default function FormasDePagoPage() {
  return <FormasDePagoClient />;
}

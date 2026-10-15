"use client";

import Image from "next/image";
import { Shirt, Ruler, RefreshCw, Truck } from "lucide-react";

const benefits = [
  {
    icon: Shirt,
    title: "100% Algodón Peruano de Alta Calidad",
    description:
      "Nuestras camisas están confeccionadas con el mejor algodón peruano, reconocido mundialmente por su suavidad, durabilidad y frescura. Diseñadas especialmente para climas cálidos y jornadas largas.",
    image: "/images/benefit-algodon.png",
    imageAlt: "Camisa de vestir de algodón peruano",
    reverse: false,
  },
  {
    icon: Ruler,
    title: "Patronaje Especializado para Hombres de Talla Grande",
    description:
      "A diferencia de las marcas convencionales que solo agrandan proporcionalmente sus patrones, en CTG diseñamos cada prenda considerando la anatomía real: hombros caídos adecuadamente, sisa amplia, cuello cómodo y largo perfecto.",
    image: "/images/benefit-patronaje.png",
    imageAlt: "Detalle de costura y confección de camisa",
    reverse: true,
  },
  {
    icon: RefreshCw,
    title: "Garantía de Satisfacción: Cambios de Talla sin Complicaciones",
    description:
      "Sabemos que comprar camisas en tallas grandes puede generar dudas. Por eso te ofrecemos cambio de talla hasta 7 días después de tu compra. Te asesoramos por WhatsApp antes de tu pedido.",
    image: "/images/benefit-garantia.png",
    imageAlt: "Garantía de satisfacción y asesoría personalizada",
    reverse: false,
  },
  {
    icon: Truck,
    title: "Envíos Rápidos y Seguros a Todo el Perú",
    description:
      "Despachos por Shalom, Olva Courier u otra empresa de preferencia. Lima en 24-48 horas y provincias en 24-72 horas.",
    image: "/images/benefit-envios.png",
    imageAlt: "Envíos a todo el Perú",
    reverse: true,
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-28" id="beneficios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Beneficios <span className="text-gradient-gold">Principales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada detalle ha sido cuidadosamente pensado para ofrecer la mejor experiencia.
            Ya sea para el trabajo, reuniones, viajes, celebraciones o eventos especiales.
          </p>
        </div>

        {/* Benefits list */}
        <div className="space-y-16 md:space-y-24">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                benefit.reverse ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Text */}
              <div className={`${benefit.reverse ? "md:[direction:ltr]" : ""} space-y-4`}>
                <h3 className="font-heading text-2xl md:text-3xl font-bold">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {benefit.description}
                </p>
              </div>

              {/* Image */}
              <div className={`${benefit.reverse ? "md:[direction:ltr]" : ""}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-primary/10">
                  <Image
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

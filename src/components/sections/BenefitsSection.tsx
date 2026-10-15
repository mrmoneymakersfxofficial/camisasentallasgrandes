"use client";

import Image from "next/image";
import { Shirt, Ruler, Sparkles, MoveVertical, EyeOff, Truck } from "lucide-react";

const benefits = [
  {
    icon: Shirt,
    title: "100% Algodón Peruano",
    description:
      "Fresco, suave, transpirable y cómodo para usar durante todo el día. Una fibra natural reconocida mundialmente por su durabilidad y calidad insuperable.",
    image: "/images/benefit-algodon.png",
    imageAlt: "100% algodón peruano - textura premium",
    reverse: false,
  },
  {
    icon: Ruler,
    title: "Tallas Reales & Patronaje Anatómico",
    description:
      "Diseñadas especialmente para hombres de contextura grande, no solo camisas agrandadas. Tallas de cuello desde 18.5\" hasta 22.5\" (2XL a 6XL) con proporciones exactas en pecho y hombros.",
    image: "/images/benefit-tallas.png",
    imageAlt: "Camisa CTG en talla grande real",
    reverse: true,
  },
  {
    icon: Sparkles,
    title: "Cuello Cómodo sin Opresión",
    description:
      "Cuello bajo y funcional, pensado para no apretar ni incomodar la garganta. Presillas ocultas que mantienen el cuello ordenado y firme con o sin corbata.",
    image: "/images/benefit-cuello.png",
    imageAlt: "Cuello cómodo CTG sin apretar",
    reverse: false,
  },
  {
    icon: MoveVertical,
    title: "Largo Favorecedor",
    description:
      "Camisas largas por delante y detrás para una caída más limpia y favorecedora. Se mantienen dentro del pantalón durante todo el día, incluso al sentarte o agacharte.",
    image: "/images/benefit-largo.png",
    imageAlt: "Largo favorecedor de camisa CTG",
    reverse: true,
  },
  {
    icon: EyeOff,
    title: "Diseño Limpio sin Bolsillo",
    description:
      "Un acabado más moderno, elegante y minimalista. Evita generar volumen visual innecesario en la zona del pecho y estiliza la figura masculina.",
    image: "/images/benefit-sin-bolsillo.png",
    imageAlt: "Diseño limpio sin bolsillo frontal",
    reverse: false,
  },
  {
    icon: Truck,
    title: "Envíos Seguros a Todo el Perú",
    description:
      "Despachos rápidos vía Shalom, Olva Courier u otra agencia de tu preferencia. Entrega en Lima en 24-48 horas y a provincias en 24-72 horas con seguimiento en tiempo real.",
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
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3 block">
            Detalles que Marcan la Diferencia
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Beneficios <span className="text-gradient-gold">Principales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Cada detalle ha sido cuidadosamente pensado para ofrecerte el mejor calce, comodidad y distinción en todo momento.
          </p>
        </div>

        {/* Benefits list */}
        <div className="space-y-16 md:space-y-24">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                benefit.reverse ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Text */}
              <div className={`${benefit.reverse ? "md:[direction:ltr]" : ""} space-y-4`}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2">
                  <benefit.icon className="size-6" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {benefit.description}
                </p>
              </div>

              {/* Image */}
              <div className={`${benefit.reverse ? "md:[direction:ltr]" : ""}`}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-border/40 bg-secondary/10">
                  <Image
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

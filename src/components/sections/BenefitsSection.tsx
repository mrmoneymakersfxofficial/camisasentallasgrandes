"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const benefits = [
  {
    title: "100% Algodón Peruano",
    description:
      "Fresco, suave, transpirable y cómodo para usar durante todo el día. Una fibra reconocida mundialmente por su suavidad, transpirabilidad y durabilidad.",
    image: "/images/benefit-algodon.png",
    imageAlt: "100% algodón peruano - textura premium",
    reverse: false,
  },
  {
    title: "Tallas Reales",
    description:
      "Diseñadas para hombres de contextura grande, no solo camisas agrandadas. Tallas de cuello desde 18.5 hasta 22.5 pulgadas, equivalentes desde 2XL hasta 6XL.",
    image: "/images/benefit-tallas.png",
    imageAlt: "Camisa CTG en talla grande",
    reverse: true,
  },
  {
    title: "Cuello Cómodo",
    description:
      "Cuello bajo y funcional, pensado para no apretar ni incomodar. Presillas ocultas para mantener el cuello ordenado cuando se usa sin corbata.",
    image: "/images/benefit-cuello.png",
    imageAlt: "Cuello cómodo CTG sin apretar",
    reverse: false,
  },
  {
    title: "Largo Favorecedor",
    description:
      "Camisas largas por delante y detrás, para una caída más limpia y favorecedora. Se mantienen dentro del pantalón durante todo el día.",
    image: "/images/benefit-largo.png",
    imageAlt: "Largo favorecedor de camisa CTG",
    reverse: true,
  },
  {
    title: "Sin Bolsillo en el Pecho",
    description:
      "Un diseño más limpio, elegante y ordenado. Evita generar volumen visual innecesario en la zona del pecho y permite que las líneas se vean más estilizadas.",
    image: "/images/benefit-sin-bolsillo.png",
    imageAlt: "Diseño limpio sin bolsillo",
    reverse: false,
  },
  {
    title: "Envíos a Todo el Perú",
    description:
      "Despachos por Shalom, Olva Courier u otra empresa de preferencia. Lima en 24-48 horas y provincias en 24-72 horas.",
    image: "/images/benefit-envios.png",
    imageAlt: "Envíos a todo el Perú",
    reverse: true,
  },
];

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28" id="beneficios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Beneficios <span className="text-gradient-gold">Principales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada detalle ha sido cuidadosamente pensado para ofrecer la mejor experiencia.
            Ya sea para el trabajo, reuniones, viajes, celebraciones o eventos especiales.
          </p>
        </motion.div>

        {/* Benefits list */}
        <div ref={ref} className="space-y-16 md:space-y-24">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

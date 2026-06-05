"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Shirt, Users, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "+500", label: "Clientes Felices" },
  { icon: Shirt, value: "100%", label: "Algodón Peruano" },
  { icon: Star, value: "2XL-6XL", label: "Tallas Disponibles" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestra <span className="text-gradient-gold">Historia</span>
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              En <strong className="text-foreground">Algodón Peruano</strong>, creemos
              que cada hombre merece sentirse cómodo y elegante, sin importar su talla.
              Nacimos con la misión de crear camisas premium que celebren la diversidad
              de cuerpos.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Utilizamos únicamente algodón peruano de la más alta calidad, trabajado
              por artesanos locales que conocen el oficio como nadie. Cada prenda es
              una declaración de estilo y confianza.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-2">
                    <stat.icon className="size-5 text-primary" />
                  </div>
                  <p className="font-heading text-xl md:text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10">
              <Image
                src="/images/hero-shirt-2.png"
                alt="Colección Algodón Peruano"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

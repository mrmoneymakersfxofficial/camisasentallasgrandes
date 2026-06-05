"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shirt, Ruler, Truck, Smartphone } from "lucide-react";

const features = [
  {
    icon: Shirt,
    title: "Algodón Pima Premium",
    description:
      "Telas de la más alta calidad, suaves al tacto y resistentes al paso del tiempo. Orgullo peruano.",
  },
  {
    icon: Ruler,
    title: "Tallas 2XL a 6XL",
    description:
      "Entendemos tus necesidades. Cortes diseñados especialmente para hombres de talla grande.",
  },
  {
    icon: Truck,
    title: "Envío a Todo Perú",
    description:
      "Recibe tu pedido en la puerta de tu casa. Envío rápido y seguro a cualquier ciudad del país.",
  },
  {
    icon: Smartphone,
    title: "Pago Fácil Yape/Plin",
    description:
      "Paga de forma rápida y segura con Yape o Plin. Sin complicaciones, sin tarjetas.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ¿Por Qué <span className="text-gradient-gold">Elegirnos?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nos dedicamos a ofrecer lo mejor en camisas para hombre plus size,
            con calidad premium y atención personalizada.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="size-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  Wind,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "100% Algodón Peruano",
    description:
      "Utilizamos algodón Pima de la más alta calidad, cultivado en los valles de la costa norte del Perú.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Calidad",
    description:
      "Cada camisa pasa por un riguroso control de calidad. Si no estás satisfecho, te devolvemos tu dinero.",
  },
  {
    icon: Droplets,
    title: "Absorción Superior",
    description:
      "Nuestro algodón absorbe la humedad de forma natural, manteniéndote fresco todo el día.",
  },
  {
    icon: Wind,
    title: "Transpirable y Suave",
    description:
      "La fibra larga del algodón Pima garantiza una tela extremadamente suave y fresca al tacto.",
  },
];

const careInstructions = [
  "Lavar a mano o máquina en ciclo suave con agua fría",
  "No usar blanqueadores ni productos químicos fuertes",
  "Secar al aire libre, evitar la secadora directa",
  "Plancha a temperatura media del revés",
  "No retorcer la prenda al escurrir",
];

export default function QualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28" id="calidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Calidad <span className="text-gradient-gold">Garantizada</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cada detalle importa. Conoce lo que hace que nuestras camisas
              sean excepcionales.
            </p>
          </div>

          {/* Material highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                  <item.icon className="size-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Badge + Care */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* 100% Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-gold rounded-3xl p-8 md:p-12 text-center text-white"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
                <HeartHandshake className="size-10" />
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                100% Algodón Peruano
              </h3>
              <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
                Nuestro compromiso es ofrecerte prendas que combinen tradición,
                calidad y confort. Cada camisa es una obra de arte textil.
              </p>
            </motion.div>

            {/* Care instructions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-2xl p-8 border border-border/50"
            >
              <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Droplets className="size-5 text-primary" />
                Cuidados de tu Prenda
              </h3>
              <ul className="space-y-3">
                {careInstructions.map((instruction, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

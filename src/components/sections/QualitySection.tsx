"use client";

import { Droplets, HeartHandshake, Sparkles, Shield, Wind, Sun } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "Suavidad Superior",
    description: "Tacto sedoso que mejora con cada lavada. La fibra larga del algodón peruano garantiza una textura inigualable.",
  },
  {
    icon: Wind,
    title: "Transpirabilidad",
    description: "Tejido fresco que permite la circulación del aire, manteniéndote cómodo incluso en los días más calurosos.",
  },
  {
    icon: Shield,
    title: "Durabilidad",
    description: "Resistente al uso diario y lavadas frecuentes sin perder su forma ni la intensidad de su color original.",
  },
  {
    icon: Sun,
    title: "Hipoalergénico",
    description: "Ideal para pieles sensibles. Fibras 100% naturales libres de químicos agresivos.",
  },
];

const careInstructions = [
  "Lavar con agua fría o tibia (máx. 30°C)",
  "Usar detergente suave, no usar lejía",
  "Secar a la sombra para proteger el color",
  "Planchar a temperatura media con vapor",
  "No retorcer la prenda al escurrir",
];

export default function QualitySection() {
  return (
    <section className="py-20 md:py-28" id="calidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
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
            {highlights.map((item) => (
              <div
                key={item.title}
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
              </div>
            ))}
          </div>

          {/* Badge + Care */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* 100% Badge */}
            <div className="bg-gradient-gold rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 border border-primary/20 mb-6">
                  <HeartHandshake className="size-10 text-primary" />
                </div>
                <h3 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-white">
                  100% Algodón Peruano
                </h3>
                <p className="text-zinc-300 text-lg leading-relaxed max-w-md mx-auto">
                  Nuestro compromiso es ofrecerte prendas que combinen tradición,
                  calidad y confort. Cada camisa es una obra de arte textil.
                </p>
              </div>
            </div>

            {/* Care instructions */}
            <div className="bg-card rounded-2xl p-8 border border-border/50">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

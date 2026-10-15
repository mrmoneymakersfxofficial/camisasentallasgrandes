"use client";

import { Shirt, Ruler, RefreshCw, Truck, ShoppingBag, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Shirt,
    title: "100% Algodón Peruano",
    description:
      "Fresco, suave, transpirable y cómodo para usar durante todo el día. Fibras naturales de la más alta calidad.",
  },
  {
    icon: Ruler,
    title: "Tallas 2XL a 6XL",
    description:
      "Tallas de cuello desde 18.5 hasta 22.5 pulgadas. Diseñadas para hombres de contextura grande, no solo camisas agrandadas.",
  },
  {
    icon: RefreshCw,
    title: "Cambios de Talla",
    description:
      "Cambio de talla hasta 7 días después de recibir tu producto. Compra con total confianza.",
  },
  {
    icon: Truck,
    title: "Envíos a Todo el Perú",
    description:
      "Despachos por Shalom, Olva Courier u otra empresa de preferencia. Lima en 24-48 horas, provincias en 24-72 horas.",
  },
  {
    icon: ShoppingBag,
    title: "Compra Fácil",
    description:
      "Elige tu modelo, confirma tu talla y realiza el pago. Todo el proceso de forma sencilla por WhatsApp.",
  },
  {
    icon: CheckCircle2,
    title: "Cuellos 18.5 a 22.5",
    description:
      "Cuello bajo y funcional, pensado para no apretar ni incomodar. Presillas ocultas para mantener el cuello ordenado.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3 block">
            Ingeniería Textil &amp; Patronaje Exclusivo
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ¿Por Qué <span className="text-gradient-gold">Elegir CTG?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Porque una buena camisa no debería obligarte a adaptarte a ella.
            Debería estar diseñada para adaptarse a ti.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 md:p-8 rounded-2xl bg-secondary/20 hover:bg-white hover:shadow-lg hover:shadow-primary/5 border border-border/40 hover:border-primary/30 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                <feature.icon className="size-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2.5 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Award, Users, Shirt, Star } from "lucide-react";

const stats = [
  { icon: Award, value: "10+", label: "Años de Experiencia" },
  { icon: Users, value: "5,000+", label: "Clientes Satisfechos" },
  { icon: Shirt, value: "100%", label: "Algodón Peruano" },
  { icon: Star, value: "2XL-6XL", label: "Tallas Disponibles" },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestra <span className="text-gradient-gold">Historia</span>
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              En <strong className="text-foreground">CTG | Camisas en Tallas Grandes</strong>, línea especializada de Antobelly, creemos
              que cada hombre merece sentirse cómodo y elegante, sin importar su contextura.
              Nacimos con la misión de confeccionar camisas de vestir y sport que respeten las proporciones reales del cuerpo masculino.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Utilizamos 100% algodón peruano de la más alta calidad, con moldería exclusiva en cuellos desde 18.5&quot; hasta 22.5&quot; (2XL a 6XL). Atendemos en nuestro showroom exclusivo de Miraflores y enviamos con garantía a todo el país.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
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
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
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
          </div>
        </div>
      </div>
    </section>
  );
}

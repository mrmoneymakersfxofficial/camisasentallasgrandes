"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Shirt, Users, Star, Heart, Leaf, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Users, value: "+500", label: "Clientes Felices" },
  { icon: Shirt, value: "100%", label: "Algodón Peruano" },
  { icon: Star, value: "4.9/5", label: "Calificación" },
];

const values = [
  {
    icon: Heart,
    title: "Pasión por el Detaille",
    description:
      "Cada puntada, cada corte, cada acabado es pensado con dedicación para ofrecerte prendas que no solo se vean bien, sino que te hagan sentir increíble. Trabajamos con artesanos locales que comparten nuestra obsesión por la perfección.",
  },
  {
    icon: Leaf,
    title: "Materias Primas Selectas",
    description:
      "Trabajamos directamente con productores de algodón en los valles de la costa norte del Perú. Seleccionamos solo las fibras más largas y suaves, garantizando una tela que mejora con cada lavado y te acompaña por años.",
  },
  {
    icon: Award,
    title: "Compromiso con la Inclusión",
    description:
      "Nacimos porque vimos una necesidad real: hombres de tallas grandes merecen ropa de calidad sin comprometer el estilo. Cada producto es diseñado, probado y perfeccionado con cuerpos reales de tallas 2XL a 6XL.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "El Inicio",
    description: "Nace la idea de crear camisas premium para hombres plus size tras descubrir la escasez de opciones de calidad en el mercado peruano.",
  },
  {
    year: "2023",
    title: "Primera Colección",
    description: "Lanzamos nuestra primera línea de 12 modelos casuales y formales, trabajando con artesanos locales de algodón Pima peruano.",
  },
  {
    year: "2024",
    title: "Expansión Digital",
    description: "Migramos a una plataforma digital moderna para llegar a todo Perú. Implementamos el asistente de tallas inteligente.",
  },
  {
    year: "2025",
    title: "Crecimiento Continuo",
    description: "Superamos los 500 clientes satisfechos y ampliamos nuestro catálogo a más de 20 modelos con entregas a nivel nacional.",
  },
];

export default function NosotrosClient() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, oklch(0.65 0.15 50) 0px, oklch(0.65 0.15 50) 1px, transparent 1px, transparent 20px)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Nosotros</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Nuestra <span className="text-gradient-gold">Historia</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Detrás de cada camisa hay una historia de pasión, calidad y compromiso con la comodidad del hombre plus size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  Origen y <span className="text-gradient-gold">Propósito</span>
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full" />
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                En <strong className="text-foreground">Algodón Peruano</strong>, creemos que cada hombre merece sentirse cómodo y elegante, sin importar su talla. Nacimos con la misión de crear camisas premium que celebren la diversidad de cuerpos y ofrezcan una experiencia de vestir verdaderamente satisfactoria.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Nuestro fundador experimentó de primera mano la frustración de encontrar camisas que combinaran calidad, estilo y un ajuste adecuado para tallas grandes. Esa experiencia personal se transformó en la motivación para crear algo diferente: una marca que pone al hombre plus size en el centro de cada decisión de diseño.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Utilizamos únicamente algodón peruano de la más alta calidad, trabajado por artesanos locales que conocen el oficio como nadie. Cada prenda es una declaración de estilo, confianza y respeto por quien la viste.
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
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Nuestros <span className="text-gradient-gold">Valores</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="size-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Nuestra <span className="text-gradient-gold">Trayectoria</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-2 z-10 ring-4 ring-primary/10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                  <Badge variant="secondary" className="mb-2 bg-primary/5 border-primary/20 text-primary">
                    {item.year}
                  </Badge>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-gold rounded-3xl p-10 md:p-14 text-white"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para Probar la Diferencia?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Descubre por qué más de 500 hombres confían en nuestras camisas. Tu comodidad y estilo son nuestra prioridad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6 rounded-xl"
                asChild
              >
                <Link href="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl"
                asChild
              >
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

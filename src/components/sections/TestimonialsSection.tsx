"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Carlos M.",
    location: "Lima",
    text: "Por fin encontré camisas que me quedan perfectamente. La calidad del algodón es increíble, se siente premium desde el primer momento. Ya llevo 3 pedidos y siempre superan mis expectativas.",
    rating: 5,
    product: "Polo Casual Navy Premium",
  },
  {
    name: "Roberto Q.",
    location: "Arequipa",
    text: "Las camisas de Algodón Peruano cambiaron mi perspectiva. Antes era difícil encontrar tallas grandes con buen diseño. Ahora tengo estilo y comodidad. Totalmente recomendado.",
    rating: 5,
    product: "Camisa Formal Celeste",
  },
  {
    name: "Miguel A.",
    location: "Cusco",
    text: "El envío fue rápido y la comunicación por WhatsApp excelente. La talla 5XL me queda como hecha a la medida. El algodón es suave y resistente. ¡Volveré a comprar!",
    rating: 5,
    product: "Henley Negra Premium",
  },
  {
    name: "Diego R.",
    location: "Trujillo",
    text: "Me sorprendió la atención al cliente y la calidad del producto. La camisa formal blanca se ve elegante en cualquier ocasión. El precio es muy justo para lo que ofrecen.",
    rating: 5,
    product: "Camisa Formal Blanca Ejecutiva",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [api, setApiState] = useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = useState(0);

  const setApi = useCallback(
    (carouselApi: CarouselApi) => {
      setApiState(carouselApi);
    },
    []
  );

  useEffect(() => {
    if (!api) return;
    const handler = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", handler);
    return () => {
      api.off("select", handler);
    };
  }, [api]);

  // Auto-scroll
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="testimonios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Lo Que Dicen{" "}
              <span className="text-gradient-gold">Nuestros Clientes</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de
              presentación.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative max-w-3xl mx-auto px-12">
            <Carousel setApi={setApi} opts={{ loop: true }}>
              <CarouselContent>
                {testimonials.map((t, i) => (
                  <CarouselItem key={i}>
                    <div className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 text-center">
                      <Quote className="size-8 text-primary/20 mx-auto mb-4" />

                      {/* Stars */}
                      <div className="flex items-center justify-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, si) => (
                          <Star
                            key={si}
                            className="size-4 fill-primary text-primary"
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-foreground leading-relaxed text-base md:text-lg mb-6 italic">
                        &ldquo;{t.text}&rdquo;
                      </p>

                      {/* Author */}
                      <div>
                        <p className="font-heading font-semibold text-lg">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.location} · {t.product}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-14 hidden md:flex" />
              <CarouselNext className="-right-14 hidden md:flex" />
            </Carousel>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-8"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

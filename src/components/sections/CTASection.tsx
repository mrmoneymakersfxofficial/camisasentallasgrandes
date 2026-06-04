"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-dark-gold rounded-3xl overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative px-6 py-16 md:px-16 md:py-20 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 mb-6">
              <Truck className="size-7 text-primary" />
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Comienza tu Experiencia{" "}
              <span className="text-gradient-gold">Premium</span>
            </h2>

            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
              Haz tu pedido ahora y recibe camisas de la más alta calidad en la
              puerta de tu casa. Atención personalizada por WhatsApp.
            </p>

            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-8">
              <Truck className="size-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Envío gratis en tu primera compra
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#25D366] text-white hover:bg-[#20bd5a] text-base px-8 py-6 rounded-xl gap-2 shadow-lg"
                asChild
              >
                <a
                  href="https://wa.me/51999999999?text=Hola%2C%20me%20interesa%20conocer%20más%20sobre%20sus%20camisas%20plus%20size"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-5" />
                  Escríbenos por WhatsApp
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl"
                asChild
              >
                <a href="#catalogo">Ver Catálogo</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

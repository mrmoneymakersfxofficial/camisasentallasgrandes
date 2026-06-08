"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Trash2,
  MessageCircle,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavoritesStore } from "@/store/favorites";
import {
  generateFavoritesMessage,
  generateProductMessage,
  buildWhatsAppURL,
} from "@/lib/whatsapp";
import { products } from "@/data/products";
import PageScrollSpyController from "@/components/sections/PageScrollSpyController";

const colorLabels: Record<string, string> = {
  navy: "Navy",
  white: "Blanco",
  beige: "Beige",
  gray: "Gris Carbón",
  black: "Negra",
  blue: "Celeste",
  striped: "Rayada Azul",
};

export default function FavoritosPage() {
  const favItems = useFavoritesStore((s) => s.items);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  // Enrich favorites with full product data (for WhatsApp messages)
  const enrichedItems = useMemo(() => {
    return favItems.map((fav) => {
      const fullProduct = products.find((p) => p.id === fav.id);
      return {
        ...fav,
        material: fullProduct?.material || "100% Algodón Peruano",
        style: fullProduct?.style || "",
        category: fullProduct?.category || "",
      };
    });
  }, [favItems]);

  const handleConsultAllWhatsApp = () => {
    const message = generateFavoritesMessage(
      favItems.map((item) => ({
        name: item.name,
        slug: item.slug,
        price: item.price,
        color: item.color,
        sizes: item.sizes,
      }))
    );
    window.open(buildWhatsAppURL(message), "_blank");
  };

  const handleSingleWhatsApp = (item: (typeof enrichedItems)[number]) => {
    const message = generateProductMessage(item, {});
    window.open(buildWhatsAppURL(message), "_blank");
  };

  return (
    <PageScrollSpyController sections={["hero", "favoritos"]}>
      {/* Page Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden" id="hero">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, oklch(0.65 0.15 50) 0px, oklch(0.65 0.15 50) 1px, transparent 1px, transparent 20px)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-foreground font-medium">Favoritos</span>
            </nav>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Heart className="size-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Mis <span className="text-gradient-gold">Favoritos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {favItems.length === 0
                ? "Guarda tus camisas favoritas para verlas después."
                : `${favItems.length} producto${favItems.length > 1 ? "s" : ""} guardado${favItems.length > 1 ? "s" : ""}`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16" id="favoritos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {favItems.length === 0 ? (
            /* ── Empty State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-28 h-28 rounded-full bg-muted mx-auto flex items-center justify-center mb-6">
                <Heart className="size-12 text-muted-foreground/40" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-2">
                Aún no tienes favoritos
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                Explora nuestro catálogo y guarda tus productos favoritos.
                Haz clic en el corazón de cualquier camisa para agregarla aquí.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-xl gap-2"
                asChild
              >
                <Link href="/catalogo">
                  <ShoppingBag className="size-5" />
                  Explorar Catálogo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <>
              {/* ── Header Actions ── */}
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  {favItems.length} producto{favItems.length > 1 ? "s" : ""} guardado{favItems.length > 1 ? "s" : ""}
                </p>
                <Button
                  onClick={handleConsultAllWhatsApp}
                  className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-5 py-2.5 rounded-xl gap-2 text-sm"
                >
                  <MessageCircle className="size-4" />
                  Consultar Todos por WhatsApp
                </Button>
              </div>

              {/* ── Products Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {enrichedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
                    >
                      {/* Image */}
                      <Link href={`/catalogo/${item.slug}`}>
                        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Remove button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFavorite(item.id);
                            }}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                            aria-label="Quitar de favoritos"
                          >
                            <Trash2 className="size-4" />
                          </button>
                          {/* Favorite badge */}
                          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-md">
                            <Heart className="size-3 mr-1 fill-current" />
                            Favorito
                          </Badge>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5 space-y-3 flex flex-col flex-1">
                        {/* Name & Color */}
                        <div className="min-h-[56px]">
                          <Link href={`/catalogo/${item.slug}`}>
                            <h3 className="font-heading font-semibold text-base leading-tight hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {colorLabels[item.color] || item.color}
                          </Badge>
                        </div>

                        {/* Sizes */}
                        <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                          {item.sizes.map((size) => (
                            <span
                              key={size}
                              className="px-2.5 py-1 text-[11px] font-medium rounded-lg border border-border/50 text-muted-foreground"
                            >
                              {size}
                            </span>
                          ))}
                        </div>

                        {/* Price & WhatsApp */}
                        <div className="flex items-center justify-between pt-1 mt-auto">
                          <p className="text-xl font-heading font-bold text-primary">
                            S/ {item.price.toFixed(0)}
                          </p>
                          <Button
                            onClick={() => handleSingleWhatsApp(item)}
                            size="sm"
                            className="bg-[#25D366] text-white hover:bg-[#20bd5a] gap-1.5 text-xs"
                          >
                            <MessageCircle className="size-3.5" />
                            Cotizar
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12"
              >
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="size-8 text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg mb-1">
                      ¿Te interesan varios productos?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Envíanos un mensaje con todos tus favoritos y te cotizamos
                      al instante con precios especiales.
                    </p>
                  </div>
                  <Button
                    onClick={handleConsultAllWhatsApp}
                    className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-6 py-3 rounded-xl gap-2 flex-shrink-0"
                  >
                    <MessageCircle className="size-4" />
                    📲 Consultar por WhatsApp
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </PageScrollSpyController>
  );
}

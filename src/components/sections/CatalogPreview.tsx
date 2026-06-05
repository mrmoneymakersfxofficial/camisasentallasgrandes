"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  sizes: string[];
  featured: boolean;
  image: string;
  slug: string;
}

const colorLabels: Record<string, string> = {
  navy: "Navy",
  white: "Blanco",
  beige: "Beige",
  gray: "Gris Carbón",
  black: "Negra",
  blue: "Celeste",
  striped: "Rayada Azul",
};

export default function CatalogPreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products?featured=true");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.slice(0, 4));
      }
    } catch {
      console.error("Error loading featured products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product: Product) => {
    const size = selectedSize[product.id];
    if (!size) {
      toast({
        title: "Selecciona una talla",
        description: "Por favor selecciona una talla antes de agregar al carrito.",
        variant: "destructive",
      });
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      size,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} - Talla ${size}`,
    });
    setCartOpen(true);
  };

  return (
    <section className="py-20 md:py-28" id="catalogo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Productos <span className="text-gradient-gold">Destacados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra selección de camisas premium diseñadas para ti.
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-card rounded-2xl overflow-hidden border border-border/50 animate-pulse"
              >
                <div className="aspect-[3/4] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded-md w-3/4" />
                  <div className="h-4 bg-muted rounded-md w-1/2" />
                  <div className="h-9 bg-muted rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                {/* Image */}
                <Link href={`/catalogo/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.featured && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-md">
                        <Star className="size-3 mr-1" />
                        Destacado
                      </Badge>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <Link href={`/catalogo/${product.slug}`}>
                      <h3 className="font-heading font-semibold text-base leading-tight hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {colorLabels[product.color] || product.color}
                    </Badge>
                  </div>

                  {/* Size selection */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize((prev) => ({
                            ...prev,
                            [product.id]: size,
                          }))
                        }
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all ${
                          selectedSize[product.id] === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Price & Add */}
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xl font-heading font-bold text-primary">
                      S/ {product.price.toFixed(0)}
                    </p>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
                    >
                      <ShoppingCart className="size-3.5" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA to full catalog */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/5 text-base px-8 py-6 rounded-xl gap-2"
            asChild
          >
            <Link href="/catalogo">
              Ver Catálogo Completo
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  style: string;
  color: string;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  image: string;
  material: string;
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

export default function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSize, setActiveSize] = useState("all");
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      console.error("Error loading products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (activeSize !== "all" && !p.sizes.includes(activeSize)) return false;
    return true;
  });

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
            Nuestro <span className="text-gradient-gold">Catálogo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra colección exclusiva de camisas premium diseñadas
            para ti.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-secondary">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="casual">Casual</TabsTrigger>
              <TabsTrigger value="vestir">Vestir</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={activeSize} onValueChange={setActiveSize}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar talla" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las tallas</SelectItem>
              <SelectItem value="2XL">2XL</SelectItem>
              <SelectItem value="3XL">3XL</SelectItem>
              <SelectItem value="4XL">4XL</SelectItem>
              <SelectItem value="5XL">5XL</SelectItem>
              <SelectItem value="6XL">6XL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No se encontraron productos con estos filtros.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Featured badge */}
                    {product.featured && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-md">
                        <Star className="size-3 mr-1" />
                        Destacado
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-lg leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {colorLabels[product.color] || product.color}
                      </Badge>
                    </div>

                    {/* Size selection */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">
                        Selecciona talla:
                      </p>
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
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                              selectedSize[product.id] === size
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:border-primary/50 hover:bg-primary/5"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-2xl font-heading font-bold text-primary">
                        S/ {product.price.toFixed(0)}
                      </p>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
                      >
                        <ShoppingCart className="size-4" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

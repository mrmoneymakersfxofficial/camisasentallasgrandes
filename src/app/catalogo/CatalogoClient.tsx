"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageScrollSpyController from "@/components/layout/PageScrollSpyController";
import { ShoppingCart, Star, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  slug: string;
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

const colorOrder: Record<string, string> = {
  "Blanco": "blanco",
  "Negra": "negro",
  "Navy": "navy",
  "Celeste": "celeste",
  "Gris Carbón": "gris",
  "Beige": "beige",
  "Rayada Azul": "rayada",
};

export default function CatalogoClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSize, setActiveSize] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
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
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        (colorLabels[p.color] || "").toLowerCase().includes(q)
      );
    }
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
    <>
      <PageScrollSpyController sectionIds={["hero", "productos"]} />

      {/* Page Hero Banner */}
      <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-warm overflow-hidden">
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
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-primary/5 border-primary/20">
              <Star className="size-3.5 mr-1.5 text-primary" />
              Colección 2025
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Nuestro <span className="text-gradient-gold">Catálogo</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explora nuestra colección completa de camisas premium 100% algodón peruano, diseñadas exclusivamente para hombre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Content */}
      <section id="productos" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, color o estilo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="sm:hidden gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="size-4" />
              Filtros
            </Button>
          </div>

          {/* Filters Bar */}
          <div className={`space-y-4 mb-10 ${showFilters ? "block" : "hidden sm:block"}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border/50">
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-secondary">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="casual">Casual</TabsTrigger>
                  <TabsTrigger value="vestir">Vestir</TabsTrigger>
                </TabsList>
              </Tabs>

              <Select value={activeSize} onValueChange={setActiveSize}>
                <SelectTrigger className="w-[180px]">
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

            {/* Results count */}
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              {(activeCategory !== "all" || activeSize !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveSize("all");
                    setSearchQuery("");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg mb-2">
                No se encontraron productos con estos filtros.
              </p>
              <p className="text-sm text-muted-foreground">
                Intenta con otros criterios de búsqueda o{" "}
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveSize("all");
                    setSearchQuery("");
                  }}
                  className="text-primary hover:underline"
                >
                  limpia los filtros
                </button>
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
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

                        {/* Featured badge */}
                        {product.featured && (
                          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-md">
                            <Star className="size-3 mr-1" />
                            Destacado
                          </Badge>
                        )}

                        {/* Category badge */}
                        <Badge
                          variant="secondary"
                          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-xs"
                        >
                          {product.category === "casual" ? "Casual" : "Vestir"}
                        </Badge>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Link href={`/catalogo/${product.slug}`}>
                            <h3 className="font-heading font-semibold text-lg leading-tight hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {colorLabels[product.color] || product.color}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {product.style}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

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
    </>
  );
}

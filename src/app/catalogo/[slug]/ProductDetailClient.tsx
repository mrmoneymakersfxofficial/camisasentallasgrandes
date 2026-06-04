"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  style: string;
  color: string;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  image: string;
  material: string;
  care: string;
}

interface RelatedProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
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

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: RelatedProduct[];
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecciona una talla",
        description: "Por favor selecciona una talla antes de agregar al carrito.",
        variant: "destructive",
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        size: selectedSize,
        price: product.price,
        image: product.image,
      });
    }
    toast({
      title: `¡${quantity > 1 ? quantity + " unidades" : "Unidad"} agregada${quantity > 1 ? "s" : ""}!`,
      description: `${product.name} - Talla ${selectedSize}`,
    });
    setCartOpen(true);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/catalogo" className="hover:text-primary transition-colors">
              Catálogo
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] max-h-[600px] rounded-3xl overflow-hidden border-2 border-border/30 shadow-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-lg px-3 py-1.5">
                    <Check className="size-3.5 mr-1.5" />
                    Producto Destacado
                  </Badge>
                )}
              </div>
              {/* Decorative blurs */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Back */}
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="size-4" />
                Volver al catálogo
              </Link>

              {/* Category & Style */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.category === "casual" ? "Casual" : "Vestir"}</Badge>
                <Badge variant="outline">{product.style}</Badge>
                <Badge variant="outline">
                  {colorLabels[product.color] || product.color}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  S/ {product.price.toFixed(0)}
                </span>
                <span className="text-sm text-muted-foreground">PEN</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>

              <Separator />

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">
                    Selecciona tu talla
                  </h3>
                  <Link
                    href="/tutalla"
                    className="text-sm text-primary hover:underline"
                  >
                    ¿No sabes tu talla?
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Cantidad</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors text-lg font-medium"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-7 text-lg rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="size-5" />
                Agregar al Carrito
              </Button>

              {/* Quick Buy via WhatsApp */}
              <Button
                size="lg"
                className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] py-7 text-lg rounded-xl gap-2"
                asChild
              >
                <a
                  href={`https://wa.me/51999999999?text=${encodeURIComponent(
                    `Hola, me interesa:\n• ${product.name}\n• Talla: ${selectedSize || "por confirmar"}\n• Cantidad: ${quantity}\n\n¿Tienen stock disponible?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar por WhatsApp
                </a>
              </Button>

              <Separator />

              {/* Product Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{product.material}</p>
                    <p className="text-xs text-muted-foreground">Premium</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Envío a todo Perú</p>
                    <p className="text-xs text-muted-foreground">24-48h Lima</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Garantía</p>
                    <p className="text-xs text-muted-foreground">Devolución fácil</p>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="bg-muted/50 rounded-xl p-5">
                <h4 className="font-medium text-sm mb-2">Cuidados:</h4>
                <p className="text-sm text-muted-foreground">{product.care}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                Te Puede <span className="text-gradient-gold">Interesar</span>
              </h2>
              <p className="text-muted-foreground">
                Productos similares que combinan con tu selección
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/catalogo/${rp.slug}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </Link>
                  <div className="p-4 space-y-2">
                    <Link href={`/catalogo/${rp.slug}`}>
                      <h3 className="font-heading font-semibold text-sm hover:text-primary transition-colors truncate">
                        {rp.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-heading font-bold text-primary">
                      S/ {rp.price.toFixed(0)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

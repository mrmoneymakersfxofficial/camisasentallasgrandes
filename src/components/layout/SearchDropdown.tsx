"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";

interface SearchProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  image: string;
  category: string;
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

export default function SearchDropdown({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch products once on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: SearchProduct[]) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter products based on query
  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        (colorLabels[p.color] || "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        // Search by style keywords in name (Polo, Camisa, Henley, T-Shirt, Formal)
        p.name.split(" ").some((word) => word.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [query, products]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [router]);

  // Auto-focus when opened in mobile overlay
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to let animation finish
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const goToProduct = useCallback(
    (slug: string) => {
      setOpen(false);
      setQuery("");
      setActiveIndex(-1);
      router.push(`/catalogo/${slug}`);
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          goToProduct(results[activeIndex].slug);
        } else if (results.length > 0) {
          goToProduct(results[0].slug);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    },
    [activeIndex, results, goToProduct]
  );

  const showDropdown = open && query.length >= 2;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input */}
      <div
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-200 ${
          showDropdown
            ? "border-primary/50 bg-background shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-2 ring-primary/10"
            : "border-border/50 bg-secondary/40 hover:border-border hover:bg-secondary/60"
        }`}
      >
        <Search className="size-4 text-muted-foreground flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar camisas, polos, colores..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            if (!open && e.target.value.length >= 2) setOpen(true);
          }}
          onFocus={() => {
            if (query.length >= 2) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 outline-none min-w-0"
          aria-label="Buscar productos"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              inputRef.current?.focus();
            }}
            className="flex-shrink-0 p-0.5 rounded-md hover:bg-muted transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-3.5 text-muted-foreground" />
          </button>
        )}
        {/* Keyboard hint - desktop only */}
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-muted-foreground/60 bg-muted/60 rounded border border-border/30 flex-shrink-0">
          <CornerDownLeft className="size-2.5" />
        </kbd>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-background rounded-2xl border border-border/50 shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden z-[1100] origin-top"
            role="listbox"
          >
            {results.length > 0 ? (
              <ul className="py-2 max-h-[400px] overflow-y-auto">
                {results.map((product, index) => (
                  <li
                    key={product.id}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goToProduct(product.slug)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === activeIndex
                        ? "bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {/* Product Image */}
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/30">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate leading-tight">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {colorLabels[product.color] || product.color}
                        </span>
                        <span className="text-[10px] text-muted-foreground/50">|</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    {/* Price */}
                    <p className="text-sm font-heading font-bold text-primary flex-shrink-0">
                      S/ {product.price.toFixed(0)}
                    </p>
                  </li>
                ))}
                {/* View all in catalog link */}
                <li className="border-t border-border/30 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                      router.push("/catalogo");
                    }}
                    className="w-full text-center text-xs text-primary hover:text-primary/80 font-medium py-2.5 transition-colors"
                  >
                    Ver todo el catálogo →
                  </button>
                </li>
              </ul>
            ) : !loading ? (
              <div className="px-4 py-8 text-center">
                <Search className="size-6 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No encontramos productos para &quot;{query}&quot;
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Intenta con otro nombre, color o talla
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

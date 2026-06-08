"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  Home,
  ShoppingBag,
  Ruler,
  Shirt,
  Phone,
  ChevronRight,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import WhatsAppCheckout from "@/components/sections/WhatsAppCheckout";

const navLinks = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Catálogo", href: "/catalogo", icon: ShoppingBag, badge: "+20" },
  { label: "Tu Talla", href: "/tutalla", icon: Ruler },
  { label: "Nosotros", href: "/nosotros", icon: Shirt },
  { label: "Contacto", href: "/contacto", icon: Phone },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const cartOpen = useCartStore((s) => s.isOpen);
  const setCartOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    const mainEl = document.querySelector("[data-scroll-container]") as HTMLElement;
    if (!mainEl) return;
    const onScroll = () => setScrolled(mainEl.scrollTop > 20);
    mainEl.addEventListener("scroll", onScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", onScroll);
  }, []);

  // Detect if we're on the home page to decide header background
  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full flex-shrink-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-lg shadow-md border-b border-border/50"
            : isHome
            ? "bg-background/50 backdrop-blur-sm"
            : "bg-background/80 backdrop-blur-sm border-b border-border/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Algodón Peruano - Ir al inicio"
            >
              <span className="font-heading text-xl md:text-2xl font-bold tracking-wide text-gradient-gold">
                ALGODÓN PERUANO
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                    isActive(pathname, link.href)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 rounded-full ${
                      isActive(pathname, link.href) ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
                aria-label={`Carrito de compras, ${itemCount} artículos`}
              >
                <ShoppingCart className="size-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-5 flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* Mobile Menu — Luxury Drawer */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Abrir menú de navegación"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  hideClose
                  className="w-80 max-w-[85vw] bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-100 rounded-l-3xl p-0 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <SheetTitle className="font-bold tracking-widest text-gray-900 text-sm uppercase">
                      Algodón Peruano
                    </SheetTitle>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-900 active:bg-gray-100 rounded-full transition-colors"
                      aria-label="Cerrar menú"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex-1 flex flex-col px-4 py-4" aria-label="Menú móvil">
                    {navLinks.map((link, i) => {
                      const Icon = link.icon;
                      const active = isActive(pathname, link.href);
                      const animClass = [
                        "animate-menu-fade-in",
                        "animate-menu-fade-in-delay-1",
                        "animate-menu-fade-in-delay-2",
                        "animate-menu-fade-in-delay-3",
                        "animate-menu-fade-in-delay-4",
                      ][i];

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-4 px-3 rounded-xl transition-all active:scale-[0.98] ${animClass} ${
                            active
                              ? "bg-primary/5"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              active
                                ? "bg-primary/10"
                                : "bg-gray-50"
                            }`}>
                              <Icon
                                className={`size-[18px] transition-colors ${
                                  active
                                    ? "text-primary"
                                    : "text-[#b38f4f]"
                                }`}
                                strokeWidth={active ? 2 : 1.8}
                              />
                            </div>
                            <span className={`font-medium tracking-wide text-base transition-colors ${
                              active
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}>
                              {link.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Dynamic badge for Catálogo */}
                            {link.badge && (
                              <span className="ml-2 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-primary/10 text-primary">
                                {link.badge}
                              </span>
                            )}
                            <ChevronRight className={`size-4 transition-colors ${
                              active ? "text-primary" : "text-gray-300"
                            }`} />
                          </div>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Bottom Support Footer */}
                  <div className="mt-auto p-6 bg-gray-50/80 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-3 tracking-wide">
                      Atención personalizada Plus Size
                    </p>
                    <Button
                      className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] py-5 text-sm font-medium rounded-xl gap-2 active:scale-[0.98] transition-transform"
                      asChild
                    >
                      <a
                        href="https://wa.me/51999999999?text=Hola,%20necesito%20ayuda%20con%20las%20camisas"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp Directo
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Cart Drawer */}
      <WhatsAppCheckout />
    </>
  );
}

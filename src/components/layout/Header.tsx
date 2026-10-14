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
  BookOpen,
  CreditCard,
  FileText,
  Award,
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
import { WHATSAPP_DISPLAY, buildWhatsAppURL } from "@/lib/whatsapp";

const navLinks = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Catálogo", href: "/catalogo", icon: ShoppingBag, badge: "18.5 - 22.5" },
  { label: "Tu Talla", href: "/tutalla", icon: Ruler },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Nosotros", href: "/nosotros", icon: Shirt },
  { label: "Contacto", href: "/contacto", icon: Phone },
];

const secondaryLinks = [
  { label: "Formas de Pago", href: "/formas-de-pago", icon: CreditCard },
  { label: "Libro de Reclamaciones", href: "/libro-de-reclamaciones", icon: FileText },
  { label: "Especial CTG Antobelly", href: "/ctg-camisas-tallas-grandes", icon: Award },
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
              aria-label="CTG Camisas en Tallas Grandes - Ir al inicio"
            >
              <div className="flex flex-col">
                <span className="font-heading text-lg md:text-2xl font-bold tracking-wide text-gradient-gold">
                  CTG | TALLAS GRANDES
                </span>
                <span className="text-[10px] tracking-wider uppercase text-muted-foreground hidden sm:block">
                  Línea Especializada de Antobelly
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors group ${
                    isActive(pathname, link.href)
                      ? "text-primary font-semibold"
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
              {/* WhatsApp Quick Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#25D366] hover:bg-[#25D366]/10"
                asChild
              >
                <a
                  href={buildWhatsAppURL("Hola CTG, necesito asesoría sobre camisas en tallas grandes.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                >
                  <MessageCircle className="size-5" />
                </a>
              </Button>

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
                  className="w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl shadow-2xl border-l border-border rounded-l-3xl p-0 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <SheetTitle className="font-heading font-bold tracking-wider text-foreground text-sm uppercase">
                      CTG | Tallas Grandes
                    </SheetTitle>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="p-2 text-muted-foreground hover:text-foreground active:bg-secondary rounded-full transition-colors"
                      aria-label="Cerrar menú"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex-1 flex flex-col px-4 py-4 overflow-y-auto" aria-label="Menú móvil">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                      Navegación Principal
                    </p>
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(pathname, link.href);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-3 px-3 rounded-xl transition-all ${
                            active
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground hover:bg-secondary/70"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="size-4 text-primary" />
                            <span className="text-sm">{link.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {link.badge && (
                              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
                                {link.badge}
                              </span>
                            )}
                            <ChevronRight className="size-3.5 text-muted-foreground" />
                          </div>
                        </Link>
                      );
                    })}

                    <div className="my-3 border-t border-border/60 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                        Páginas Oficiales
                      </p>
                      {secondaryLinks.map((sec) => {
                        const Icon = sec.icon;
                        const active = isActive(pathname, sec.href);
                        return (
                          <Link
                            key={sec.href}
                            href={sec.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all text-xs ${
                              active
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="size-3.5 text-primary" />
                              <span>{sec.label}</span>
                            </div>
                            <ChevronRight className="size-3 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Bottom Support Footer */}
                  <div className="mt-auto p-6 bg-secondary/40 border-t border-border flex flex-col gap-3">
                    <p className="text-[11px] tracking-wider uppercase text-muted-foreground text-center font-semibold">
                      Asesoría de Tallas por WhatsApp
                    </p>
                    <Button
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 text-sm font-semibold rounded-xl shadow transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                      asChild
                    >
                      <a
                        href={buildWhatsAppURL("Hola CTG, deseo consultar disponibilidad de camisas.")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp: {WHATSAPP_DISPLAY}
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

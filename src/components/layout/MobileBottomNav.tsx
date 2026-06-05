"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Heart,
  ShoppingBag,
  MessageCircle,
  Ruler,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_NUMBER = "51999999999";

interface NavTab {
  id: string;
  label: string;
  icon: typeof Home;
  href?: string;
  action?: string;
  showBadge?: boolean;
  accentColor?: string;
}

const tabs: NavTab[] = [
  { id: "home", label: "Inicio", icon: Home, href: "/" },
  { id: "favorites", label: "Favoritos", icon: Heart, action: "favorites", showBadge: true },
  { id: "cart", label: "Carrito", icon: ShoppingBag, action: "cart", showBadge: true },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    action: "whatsapp",
    accentColor: "#25D366",
  },
  { id: "size", label: "Mi Talla", icon: Ruler, href: "/tutalla" },
];

function getWhatsAppUrl(customText?: string) {
  const text =
    customText ||
    "Hola, me interesa conocer más sobre las camisas plus size de Algodón Peruano. ¿Tienen disponibilidad?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function TabIcon({ icon: Icon, size = 22, strokeWidth = 1.8 }: { icon: typeof Home; size?: number; strokeWidth?: number }) {
  return <Icon size={size} strokeWidth={strokeWidth} />;
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [favSheetOpen, setFavSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Store subscriptions
  const cartCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const favItems = useFavoritesStore((s) => s.items);
  const favCount = useFavoritesStore((s) => s.getCount());
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  // Sync active tab with pathname
  useEffect(() => {
    if (pathname === "/") setActiveTab("home");
    else if (pathname === "/tutalla") setActiveTab("size");
    else if (pathname.startsWith("/catalogo")) setActiveTab("catalog");
    else setActiveTab(null);
  }, [pathname]);

  const handleTabClick = useCallback(
    (tab: NavTab) => {
      // Haptic-like feedback animation
      setActiveTab(tab.id);
      setTimeout(() => setActiveTab(null), 200);

      if (tab.action === "cart") {
        setCartOpen(true);
      } else if (tab.action === "favorites") {
        setFavSheetOpen(true);
      } else if (tab.action === "whatsapp") {
        window.open(getWhatsAppUrl(), "_blank");
      } else if (tab.href) {
        if (tab.href === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (pathname !== "/") {
            router.push("/");
          }
        } else {
          router.push(tab.href);
        }
      }
    },
    [setCartOpen, router, pathname]
  );

  return (
    <>
      {/* ── Bottom Navigation Bar ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        role="navigation"
        aria-label="Navegación móvil"
      >
        {/* Backdrop bar */}
        <div className="relative bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          {/* Subtle gold accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-gold opacity-40" />

          <div className="flex items-center justify-around px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {tabs.map((tab) => {
              const isCurrent =
                tab.id === "home"
                  ? pathname === "/"
                  : tab.id === "size"
                    ? pathname === "/tutalla"
                    : false;

              const badgeCount =
                tab.id === "cart"
                  ? cartCount
                  : tab.id === "favorites"
                    ? favCount
                    : 0;

              const isWhatsApp = tab.id === "whatsapp";

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 px-2 rounded-xl transition-all duration-200 active:scale-90 select-none ${
                    activeTab === tab.id ? "scale-90" : ""
                  } ${
                    isCurrent
                      ? "text-primary"
                      : isWhatsApp
                        ? "text-[#25D366]"
                        : "text-muted-foreground"
                  }`}
                  aria-label={tab.label}
                >
                  {/* Badge */}
                  <AnimatePresence>
                    {badgeCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute -top-0.5 right-1 bg-primary text-primary-foreground text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 shadow-sm"
                      >
                        {badgeCount > 99 ? "99+" : badgeCount}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active indicator dot */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative">
                    <TabIcon
                      icon={tab.icon}
                      size={22}
                      strokeWidth={isCurrent ? 2.2 : 1.8}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] leading-tight font-medium tracking-wide ${
                      isCurrent ? "text-primary font-semibold" : ""
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Favorites Sheet ── */}
      <Sheet open={favSheetOpen} onOpenChange={setFavSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="font-heading text-lg flex items-center gap-2">
              <Heart className="size-5 text-primary fill-primary" />
              Mis Favoritos
            </SheetTitle>
            <SheetDescription>
              {favItems.length === 0
                ? "Aún no tienes favoritos"
                : `${favItems.length} producto${favItems.length > 1 ? "s" : ""} guardado${favItems.length > 1 ? "s" : ""}`}
            </SheetDescription>
          </SheetHeader>

          {favItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <Heart className="size-10 text-muted-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-lg mb-1">
                  Sin Favoritos
                </p>
                <p className="text-sm text-muted-foreground">
                  Guarda tus camisas favoritas para verlas después.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/5"
                onClick={() => {
                  setFavSheetOpen(false);
                  router.push("/catalogo");
                }}
              >
                Explorar Catálogo
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              <AnimatePresence>
                {favItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100, height: 0 }}
                    className="flex gap-3 p-3 rounded-xl bg-muted/50 border border-border/30"
                  >
                    {/* Image */}
                    <Link
                      href={`/catalogo/${item.slug}`}
                      onClick={() => setFavSheetOpen(false)}
                      className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/catalogo/${item.slug}`}
                        onClick={() => setFavSheetOpen(false)}
                      >
                        <h4 className="text-sm font-medium truncate hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                      </Link>
                      <Badge variant="secondary" className="text-[10px] mt-1">
                        {item.sizes.join(", ")}
                      </Badge>
                      <p className="text-sm font-heading font-bold text-primary mt-1">
                        S/ {item.price.toFixed(0)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center hover:bg-destructive/10 text-destructive transition-colors"
                        aria-label="Quitar de favoritos"
                      >
                        <Heart className="size-4 fill-current" />
                      </button>
                      <Link
                        href={`/catalogo/${item.slug}`}
                        onClick={() => setFavSheetOpen(false)}
                        className="w-8 h-8 rounded-lg border border-primary/30 flex items-center justify-center hover:bg-primary/10 text-primary transition-colors"
                        aria-label="Ver producto"
                      >
                        <ShoppingBag className="size-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Separator className="my-4" />

              {/* WhatsApp CTA from favorites */}
              <Button
                onClick={() => {
                  const favList = favItems
                    .map((f) => `• ${f.name} - S/ ${f.price.toFixed(0)}`)
                    .join("\n");
                  const msg = `Hola, estoy interesado en estos productos:\n\n${favList}\n\n¿Tienen disponibilidad?`;
                  window.open(getWhatsAppUrl(msg), "_blank");
                  setFavSheetOpen(false);
                }}
                className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] py-5 text-sm rounded-xl gap-2"
              >
                <MessageCircle className="size-4" />
                Consultar Favoritos por WhatsApp
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Send } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";

export default function WhatsAppCheckout() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotal = useCartStore((s) => s.getTotal);

  const [name, setName] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("ap_customer_name") || "";
  });
  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("ap_customer_phone") || "";
  });
  const { toast } = useToast();

  const handleSendWhatsApp = async () => {
    if (items.length === 0) return;
    if (!name.trim()) {
      toast({ title: "Ingresa tu nombre", variant: "destructive" });
      return;
    }
    if (!phone.trim()) {
      toast({ title: "Ingresa tu teléfono", variant: "destructive" });
      return;
    }

    // Save customer info
    localStorage.setItem("ap_customer_name", name.trim());
    localStorage.setItem("ap_customer_phone", phone.trim());

    // Build message
    const orderLines = items
      .map(
        (item) =>
          `• ${item.name} (${item.size}) x${item.quantity} - S/ ${(item.price * item.quantity).toFixed(0)}`
      )
      .join("\n");

    const total = getTotal().toFixed(0);
    const message = `🛍️ *Nuevo Pedido - Algodón Peruano*\n\n` +
      `👤 *Cliente:* ${name.trim()}\n` +
      `📱 *Teléfono:* ${phone.trim()}\n\n` +
      `📋 *Productos:*\n${orderLines}\n\n` +
      `💰 *Total:* S/ ${total}\n\n` +
      `¡Gracias por tu compra! 🙏`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51999999999?text=${encoded}`;

    // Save order to database
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerPhone: phone.trim(),
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            size: i.size,
            price: i.price,
            quantity: i.quantity,
          })),
          total: parseFloat(total),
        }),
      });
    } catch {
      // Order saved silently, WhatsApp message is the primary action
    }

    window.open(whatsappUrl, "_blank");
    clearCart();
    setOpen(false);
    toast({
      title: "¡Pedido enviado!",
      description: "Se abrió WhatsApp con tu pedido. Te contactaremos pronto.",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle className="font-heading text-lg flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            Tu Carrito
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Tu carrito está vacío"
              : `${items.length} artículo${items.length > 1 ? "s" : ""} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="size-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-heading font-semibold text-lg mb-1">
                Carrito Vacío
              </p>
              <p className="text-sm text-muted-foreground">
                Explora nuestro catálogo y agrega tus camisas favoritas.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary/30 hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              Ver Catálogo
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex gap-3 p-3 rounded-xl bg-muted/50 border border-border/30"
                  >
                    {/* Item Image */}
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Talla: {item.size}
                      </p>
                      <p className="text-sm font-heading font-bold text-primary mt-1">
                        S/ {(item.price * item.quantity).toFixed(0)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 rounded-md border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 rounded-md border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="size-3" />
                        </button>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size)
                          }
                          className="w-7 h-7 rounded-md border border-destructive/30 flex items-center justify-center hover:bg-destructive/10 text-destructive transition-colors ml-auto"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 px-4 py-4 space-y-4">
              {/* Customer Info */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Datos de contacto:</p>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="cart-name" className="text-xs">
                      Nombre
                    </Label>
                    <Input
                      id="cart-name"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cart-phone" className="text-xs">
                      Teléfono
                    </Label>
                    <Input
                      id="cart-phone"
                      placeholder="Ej: 999 999 999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Total & Send */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-2xl font-heading font-bold text-primary">
                    S/ {getTotal().toFixed(0)}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendWhatsApp}
                className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] py-6 text-base rounded-xl gap-2"
              >
                <Send className="size-4" />
                Enviar Pedido por WhatsApp
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

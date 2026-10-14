"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CreditCard,
  Building2,
  Copy,
  Check,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ShieldCheck,
  QrCode,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_DISPLAY, buildWhatsAppURL } from "@/lib/whatsapp";

export default function FormasDePagoClient() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    toast({
      title: "¡Copiado con éxito!",
      description: `${label} copiado al portapapeles.`,
    });
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Formas de Pago</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-semibold gap-1.5 border-primary/20 bg-primary/10 mb-4"
            >
              <ShieldCheck className="size-3.5 text-primary" />
              Transacciones Seguras y Transparentes
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Formas de <span className="text-gradient-gold">Pago Oficiales</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              En <strong>Camisas en Tallas Grandes – CTG</strong> te brindamos facilidades para pagar de forma rápida y segura. Todos los pagos se confirman al instante con nuestro asesor vía WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Business Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="border-primary/20 bg-card shadow-sm overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 border-b border-primary/10 flex items-center gap-3">
                <Building2 className="size-5 text-primary" />
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Datos Fiscales y Razón Social del Titular
                </h2>
              </div>
              <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase font-medium tracking-wider mb-1">
                    Titular / Razón Social
                  </p>
                  <p className="font-semibold text-foreground text-base">
                    Erick Alexis Chavez Rodriguez
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase font-medium tracking-wider mb-1">
                    RUC Oficial
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-bold text-foreground text-base">
                      10099179886
                    </p>
                    <button
                      onClick={() => handleCopy("10099179886", "RUC")}
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                      title="Copiar RUC"
                    >
                      {copiedItem === "RUC" ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase font-medium tracking-wider mb-1">
                    Dirección de Tienda
                  </p>
                  <p className="text-foreground font-medium flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-primary flex-shrink-0" />
                    Av. Larco 812 Of. 201, Miraflores
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase font-medium tracking-wider mb-1">
                    Atención al Cliente
                  </p>
                  <p className="text-foreground font-medium flex items-center gap-1.5">
                    <Phone className="size-3.5 text-primary flex-shrink-0" />
                    {WHATSAPP_DISPLAY}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5 flex items-center gap-1.5">
                    <Mail className="size-3.5 text-primary flex-shrink-0" />
                    ventas@camisasentallasgrandes.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* 1. Banco de Crédito BCP */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-border/60 hover:border-primary/40 transition-all shadow-md flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="bg-[#002A8F]/10 dark:bg-[#002A8F]/20 px-6 py-5 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#002A8F] text-white font-bold flex items-center justify-center text-sm shadow">
                        BCP
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-foreground">
                          Banco de Crédito del Perú
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Transferencia directa o interbancaria (CCI)
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/40 text-primary">
                      Recomendado
                    </Badge>
                  </div>

                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Visual Card Image */}
                    <div className="relative w-full max-w-sm mx-auto h-72 rounded-2xl overflow-hidden shadow-lg border border-border/60 bg-muted">
                      <Image
                        src="/images/pagos/pago-bcp-cuenta.png"
                        alt="Cuenta BCP Oficial Erick Alexis Chavez Rodriguez"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Soles Account */}
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold">
                            Cuenta Corriente en Soles
                          </p>
                          <p className="font-mono text-lg font-bold text-foreground tracking-wide mt-0.5">
                            191-74563781-0-48
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy("19174563781048", "Cuenta BCP")}
                          className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10"
                        >
                          {copiedItem === "Cuenta BCP" ? (
                            <>
                              <Check className="size-4 text-green-600" />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" />
                              <span>Copiar</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {/* CCI */}
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold">
                            Código Interbancario (CCI)
                          </p>
                          <p className="font-mono text-base font-bold text-foreground tracking-wide mt-0.5">
                            002-191-174563781048-51
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy("00219117456378104851", "CCI BCP")}
                          className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10"
                        >
                          {copiedItem === "CCI BCP" ? (
                            <>
                              <Check className="size-4 text-green-600" />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" />
                              <span>Copiar</span>
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <span className="font-semibold text-foreground">Titular:</span> Erick Alexis Chavez Rodriguez
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>

            {/* 2. Yape / Plin */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full border-border/60 hover:border-primary/40 transition-all shadow-md flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="bg-[#742284]/10 dark:bg-[#742284]/20 px-6 py-5 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#742284] text-white font-bold flex items-center justify-center text-sm shadow">
                        YAPE
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-foreground">
                          Yape & Pagos Móviles
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Escanea el QR o envía directo al número de celular
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-purple-500/40 text-purple-600 dark:text-purple-400">
                      Inmediato
                    </Badge>
                  </div>

                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Visual QR Image */}
                    <div className="relative w-full max-w-sm mx-auto h-72 rounded-2xl overflow-hidden shadow-lg border border-border/60 bg-muted">
                      <Image
                        src="/images/pagos/pago-yape-qr.png"
                        alt="QR de Yape Erick Alexis Chavez Rodriguez"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Phone Number */}
                      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold">
                            Número Oficial de Yape
                          </p>
                          <p className="font-mono text-xl font-bold text-foreground tracking-wide mt-0.5">
                            941 458 073
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy("941458073", "Número Yape")}
                          className="gap-1.5 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                        >
                          {copiedItem === "Número Yape" ? (
                            <>
                              <Check className="size-4 text-green-600" />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" />
                              <span>Copiar</span>
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                          Titular en Yape
                        </p>
                        <p className="font-semibold text-foreground">
                          Erick Alexis Chavez Rodriguez
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <span className="font-semibold text-foreground">Plin u otros bancos:</span> Coordinamos la transferencia interbancaria al instante por WhatsApp.
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Steps for payment */}
          <div className="rounded-3xl bg-secondary/30 border border-border/50 p-8 md:p-12 mb-16">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8">
              ¿Cómo Realizar tu Compra en <span className="text-gradient-gold">3 Pasos?</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                  1
                </div>
                <h4 className="font-heading font-semibold text-lg">Elige y Confirma Talla</h4>
                <p className="text-sm text-muted-foreground">
                  Selecciona tu camisa en el catálogo o consúltanos por WhatsApp para validar tus medidas con nuestra tabla oficial.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                  2
                </div>
                <h4 className="font-heading font-semibold text-lg">Realiza la Transferencia</h4>
                <p className="text-sm text-muted-foreground">
                  Efectúa el abono a través de BCP, Yape o Plin a nombre de Erick Alexis Chavez Rodriguez.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                  3
                </div>
                <h4 className="font-heading font-semibold text-lg">Envía la Constancia</h4>
                <p className="text-sm text-muted-foreground">
                  Envíanos la captura por WhatsApp junto a tus datos de despacho (Lima o Shalom / Olva para provincias).
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-base px-8 py-6 rounded-xl shadow-lg gap-2"
                asChild
              >
                <a
                  href={buildWhatsAppURL("Hola CTG, deseo coordinar mi compra y enviar mi constancia de pago.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-5" />
                  Enviar Constancia de Pago por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

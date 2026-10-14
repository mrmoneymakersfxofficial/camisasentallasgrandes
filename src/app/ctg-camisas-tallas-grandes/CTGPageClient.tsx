"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Ruler,
  ShoppingBag,
  MapPin,
  Truck,
  Shirt,
  Award,
  HelpCircle,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buildWhatsAppURL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const ctgFaqs = [
  {
    q: "¿Qué significa CTG?",
    a: "CTG significa Camisas Tallas Grandes. Es una línea especializada de Antobelly dirigida a hombres que necesitan camisas con medidas más amplias, proporciones anatómicas y un calce adecuado sin rigidez.",
  },
  {
    q: "¿Qué tallas de camisas ofrece CTG?",
    a: "CTG ofrece camisas desde la talla de cuello 18.5 hasta 22.5 pulgadas, con equivalencias aproximadas desde 2XL hasta 6XL (18.5=2XL, 19.5=3XL, 20.5=4XL, 21.5=5XL, 22.5=6XL). La disponibilidad incluye modelos en blanco, celeste, azul, negro y estampados.",
  },
  {
    q: "¿Las camisas CTG son de algodón peruano?",
    a: "Sí. Las camisas CTG se confeccionan en 100% algodón peruano de alta calidad, elegido por su suavidad superior, frescura transpirable y durabilidad para el uso cotidiano en el clima peruano.",
  },
  {
    q: "¿Cómo puedo saber cuál es mi talla CTG?",
    a: "Debes medir principalmente el contorno del cuello, pecho, abdomen y verificar el largo. CTG cuenta con una tabla de medidas oficial, guía en video y asesoría personalizada directa por WhatsApp para ayudarte a elegir.",
  },
  {
    q: "¿Dónde puedo comprar camisas CTG?",
    a: "Puedes solicitar atención presencial en Av. Larco 812, interior / oficina 201, Miraflores, Lima, o realizar tu pedido de manera rápida a través de los canales digitales y WhatsApp de CTG.",
  },
  {
    q: "¿CTG realiza envíos a provincias?",
    a: "Sí. Realizamos envíos a Callao, Cusco, Arequipa, Trujillo, Chiclayo, Piura, Huancayo y todas las ciudades del Perú mediante agencias reconocidas como Shalom, Olva Courier o la de tu preferencia.",
  },
  {
    q: "¿Las camisas CTG sirven para matrimonios y eventos?",
    a: "Sí. Disponemos de modelos apropiados para matrimonios, graduaciones, reuniones empresariales, cenas y eventos formales. Incluso contamos con modelos de puño francés para gemelos y camisas para esmoquin.",
  },
];

export default function CTGPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema.org FAQPage for SEO Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ctgFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 bg-gradient-warm border-b border-border/40 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">CTG Camisas Tallas Grandes</span>
          </nav>

          <div className="text-center space-y-5">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-semibold gap-1.5 border-primary/20 bg-primary/10"
            >
              <Award className="size-3.5 text-primary" />
              Línea Especializada de Antobelly | Más de 15 Años de Experiencia
            </Badge>

            {/* H1 Primary SEO Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              CTG: <span className="text-gradient-gold">Camisas Tallas Grandes</span> para Hombre en Perú
            </h1>

            {/* Featured snippet for Google & AI Overview */}
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto text-left shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                <Sparkles className="size-4" />
                <span>Definición Oficial & Resumen Destacado</span>
              </div>
              <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
                <strong>CTG</strong> significa <strong>Camisas Tallas Grandes</strong>. Es una marca especializada de <strong>Antobelly</strong> que ofrece camisas de vestir para hombres desde la <strong>talla 18.5 hasta 22.5</strong>, equivalentes a <strong>2XL, 3XL, 4XL, 5XL y 6XL</strong>. Sus camisas son confeccionadas en <strong>100% algodón peruano</strong> y se comercializan en Lima con atención en Miraflores y envíos seguros a todo el Perú.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-semibold px-8 py-6 rounded-xl">
                <Link href="/catalogo">
                  <ShoppingBag className="size-5 mr-2" />
                  Ver Catálogo CTG
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 rounded-xl border-primary/30">
                <Link href="/tutalla">
                  <Ruler className="size-5 mr-2" />
                  Tabla de Medidas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main SEO Content Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
        {/* SECTION 1: ¿QUÉ ES CTG? */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-bold text-foreground border-b border-border pb-3">
            ¿Qué es CTG Camisas Tallas Grandes?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <h3 className="font-heading font-semibold text-xl text-foreground">
                Una línea especializada de Antobelly
              </h3>
              <p>
                CTG significa <strong>Camisas Tallas Grandes</strong> y nace como la línea de vanguardia de <strong>Antobelly</strong>, prestigiosa firma peruana con más de 15 años de trayectoria dedicada a la moda y sastrería masculina (ternos, camisas, guayaberas, smokings y pantalones de etiqueta).
              </p>
              <h3 className="font-heading font-semibold text-xl text-foreground pt-2">
                Camisas pensadas para hombres de contextura grande
              </h3>
              <p>
                Nuestra propuesta no consiste únicamente en fabricar una prenda más ancha o escalada artificialmente. Cada camisa CTG considera de manera armónica las proporciones reales de <strong>cuello, hombros, pecho, abdomen, espalda, mangas y largo total</strong>.
              </p>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-border bg-muted">
              <Image
                src="/images/modelos/modelo-blanca-formal.png"
                alt="Camisa de vestir blanca para hombre de talla grande CTG"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-secondary/40 border border-border/50">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Experiencia, comodidad y atención personalizada
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atendemos en Miraflores y resolvemos dudas de forma individual por WhatsApp. Ayudamos a cada cliente a validar sus medidas exactas antes del despacho para garantizar satisfacción total.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-secondary/40 border border-border/50">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Moda masculina inclusiva en el mercado peruano
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Con CTG, la talla deja de ser una limitación para vestirse con clase, modernidad y presencia ejecutiva. Nuestro objetivo es que cada hombre disfrute vestir con libertad y seguridad.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: TALLAS DE VESTIR */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-bold text-foreground border-b border-border pb-3">
            Camisas de Vestir desde la Talla 18.5 hasta 22.5
          </h2>

          <p className="text-muted-foreground text-base leading-relaxed">
            Las tiendas convencionales suelen detenerse en la talla XL. En CTG nos especializamos en medidas reales superiores desde la talla de cuello <strong>18.5 hasta 22.5 pulgadas</strong>:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { size: "18.5", eq: "2XL", neck: "48 cm" },
              { size: "19.5", eq: "3XL", neck: "50.5 cm" },
              { size: "20.5", eq: "4XL", neck: "52.5 cm" },
              { size: "21.5", eq: "5XL", neck: "54.5 cm" },
              { size: "22.5", eq: "6XL", neck: "58 cm" },
            ].map((t) => (
              <div key={t.size} className="p-4 rounded-xl bg-card border border-primary/20 text-center shadow-sm">
                <span className="text-xs text-muted-foreground uppercase font-bold block">Talla Cuello</span>
                <span className="text-2xl font-heading font-bold text-primary block mt-1">{t.size}&quot;</span>
                <span className="text-sm font-semibold text-foreground block">{t.eq}</span>
                <span className="text-[11px] text-muted-foreground mt-1 block">{t.neck}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-heading font-semibold text-xl text-foreground">
              Diseños para hombres de pecho y espalda ancha
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              El patrón de CTG brinda holgura precisa en la zona abdominal sin provocar que los hombros se deslicen hacia los brazos. Esto garantiza un aspecto ordenado y estilizado.
            </p>
            <h3 className="font-heading font-semibold text-xl text-foreground">
              Camisas formales para oficina, matrimonios y celebraciones
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              La colección incluye camisas blancas, celestes, azules y negras, así como opciones con cuello camisero y <strong>puños franceses para gemelos</strong> ideales para bodas, aniversarios y eventos de gala.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow border border-border">
              <Image
                src="/images/modelos/modelo-azul-gemelos.png"
                alt="Camisa formal con puño francés para gemelos CTG"
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <p className="font-heading font-bold text-sm">Puños Franceses para Gemelos</p>
                <p className="text-xs text-white/80">Especial para matrimonios y eventos formales</p>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow border border-border">
              <Image
                src="/images/modelos/modelo-negra-formal.png"
                alt="Camisa negra elegante en talla grande CTG"
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <p className="font-heading font-bold text-sm">Negro Elegance CTG</p>
                <p className="text-xs text-white/80">Color profundo con tinte de alta duración</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 100% ALGODÓN PERUANO */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-bold text-foreground border-b border-border pb-3">
            Camisas CTG Confeccionadas en Algodón Peruano
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/60 bg-card">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Comodidad y Frescura
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  El algodón peruano es reconocido mundialmente por su fibra larga, alta transpirabilidad y tacto sedoso sobre la piel.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Buena Caída Natural
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Su peso y tejido equilibrado garantizan una caída limpia sin generar arrugas toscas ni acumulaciones de calor.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Largo Favorecedor
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Largo extendido por delante y por detrás para que la camisa permanezca dentro del pantalón al sentarse o levantarse.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 4: COMPRA EN LIMA Y TODO EL PERÚ */}
        <section className="space-y-6">
          <h2 className="font-heading text-3xl font-bold text-foreground border-b border-border pb-3">
            Compra Camisas CTG en Lima y Todo el Perú
          </h2>

          <div className="bg-secondary/30 rounded-3xl p-6 md:p-8 border border-border space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  Atención en Miraflores, Lima
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visítanos en <strong>Av. Larco 812, Oficina / Tienda 201, Miraflores</strong> previa coordinación. Contamos con 4 cocheras cercanas para tu comodidad.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center border-t border-border pt-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Truck className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  Envíos a Todo el Perú
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Despachos diarios a Callao, Arequipa, Trujillo, Cusco, Chiclayo, Piura, Huancayo y todas las regiones mediante <strong>Shalom, Olva Courier</strong> u otra agencia de tu confianza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION (DOCUMENT 4) */}
        <section className="space-y-6 pt-6 border-t border-border">
          <div className="text-center space-y-2 mb-8">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <HelpCircle className="size-3.5 mr-1" />
              Respuestas Claras
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Preguntas Frecuentes sobre CTG
            </h2>
            <p className="text-sm text-muted-foreground">
              Todo lo que necesitas saber antes de comprar tu camisa en talla grande.
            </p>
          </div>

          <div className="space-y-3">
            {ctgFaqs.map((faq, i) => (
              <div
                key={faq.q}
                className="border border-border/70 rounded-2xl overflow-hidden bg-card transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`size-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                      openFaq === i ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-3xl bg-primary/5 border border-primary/20">
            <h3 className="font-heading text-2xl font-bold mb-2">¿Tienes preguntas sobre tu talla?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Escríbenos directamente por WhatsApp al <strong>{WHATSAPP_DISPLAY}</strong> y uno de nuestros asesores de estilo te orientará paso a paso.
            </p>
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold gap-2">
              <a
                href={buildWhatsAppURL("Hola CTG, deseo consultar sobre las camisas en tallas grandes y tabla de medidas.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-5" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </article>
    </div>
  );
}

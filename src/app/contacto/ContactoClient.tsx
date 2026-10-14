"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram,
  CheckCircle2,
  Car,
  ExternalLink,
  Video,
  Youtube,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PageScrollSpyController from "@/components/layout/PageScrollSpyController";
import {
  WHATSAPP_DISPLAY,
  STORE_EMAIL,
  STORE_ADDRESS,
  STORE_MAPS_URL,
  SOCIAL_LINKS,
  buildWhatsAppURL,
  generateContactMessage,
} from "@/lib/whatsapp";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp Oficial",
    subtitle: "Respuesta inmediata",
    value: WHATSAPP_DISPLAY,
    href: buildWhatsAppURL("Hola CTG, deseo información sobre sus camisas en tallas grandes."),
    color: "bg-[#25D366]",
    description: "El canal más rápido. Escríbenos para confirmar stock, tallas y coordinar entregas.",
  },
  {
    icon: Phone,
    title: "Atención Telefónica",
    subtitle: "Llámanos directamente",
    value: WHATSAPP_DISPLAY,
    href: "tel:+51970298099",
    color: "bg-primary/10",
    description: "Lunes a sábado de 9:00 AM a 7:00 PM. Asesoría directa y personalizada.",
  },
  {
    icon: Mail,
    title: "Correo Electrónico",
    subtitle: "Consultas institucionales",
    value: STORE_EMAIL,
    href: `mailto:${STORE_EMAIL}`,
    color: "bg-primary/10",
    description: "Cotizaciones corporativas, atención de pedidos al por mayor y proveedores.",
  },
];

const cocheras = [
  {
    name: "Cochera Calle Colón 156",
    address: "Calle Colón 156 - Miraflores",
    price: "S/. 5.00",
    mapsUrl: "https://goo.gl/maps/bvh5bw3qudR8TJYi9",
    image: "/images/cocheras/cochera-colon-156.png",
    alt: "Cochera en Calle Colón 156 Miraflores",
  },
  {
    name: "Cochera RK Parking",
    address: "Calle Colón 221 - Miraflores",
    price: "S/. 6.00 la hora",
    mapsUrl: "https://maps.app.goo.gl/tZ3B3ndruiXsNC6Q7",
    image: "/images/cocheras/cochera-playa-estacionamiento.png",
    alt: "Cochera RK Parking Calle Colón 221 Miraflores",
  },
  {
    name: "Cochera Playa Benavides",
    address: "Av. Benavides 370 - Miraflores",
    price: "S/. 5.00",
    mapsUrl: "https://maps.app.goo.gl/dCg2asrFvquR2U3R6?g_st=iw",
    image: "/images/cocheras/cochera-benavides.png",
    alt: "Cochera Playa Benavides Av Benavides 370 Miraflores",
  },
  {
    name: "Cochera Calle Alcanfores",
    address: "Calle Alcanfores 552 - Miraflores",
    price: "S/. 7.00",
    mapsUrl: "https://goo.gl/maps/NAHPd8kU55MSap2o8",
    image: "/images/cocheras/cochera-alcanfores.png",
    alt: "Cochera en Calle Alcanfores 552 Miraflores",
  },
];

const schedule = [
  { day: "Lunes a Viernes", hours: "9:00 AM - 7:00 PM" },
  { day: "Sábado", hours: "9:00 AM - 5:00 PM" },
  { day: "Domingo", hours: "Previa coordinación" },
];

export default function ContactoClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      toast({
        title: "Por favor completa los campos",
        description: "El nombre y el mensaje son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const whatsappMessage = generateContactMessage({
      name,
      email,
      phone,
      message,
    });

    window.open(buildWhatsAppURL(whatsappMessage), "_blank");
    setSubmitted(true);
    toast({
      title: "Mensaje listo para enviar",
      description: "Se abrirá WhatsApp con los datos de tu consulta.",
    });
  };

  return (
    <>
      <PageScrollSpyController sectionIds={["hero", "contacto-info", "cocheras", "formulario", "redes"]} />

      {/* Page Hero */}
      <section id="hero" className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Contacto</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-semibold gap-1.5 border-primary/20 bg-primary/10"
            >
              <MapPin className="size-3.5 text-primary" />
              Tienda en Miraflores & Envíos a Todo el Perú
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              Ponte en <span className="text-gradient-gold">Contacto</span> con CTG
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Estamos aquí para resolver cualquier duda sobre nuestras camisas, tallas, formas de pago y despachos a Lima y provincias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section id="contacto-info" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full border-border/70 hover:border-primary/40 transition-all hover:shadow-lg flex flex-col justify-between">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <method.icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-foreground">
                          {method.title}
                        </h3>
                        <p className="text-xs text-primary font-medium">{method.subtitle}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground text-base">{method.value}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {method.description}
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button
                      asChild
                      variant={i === 0 ? "default" : "outline"}
                      className={`w-full rounded-xl ${
                        i === 0 ? "bg-[#25D366] hover:bg-[#20bd5a] text-white" : ""
                      }`}
                    >
                      <a href={method.href} target="_blank" rel="noopener noreferrer">
                        Contactar ahora
                        <ExternalLink className="size-4 ml-1.5" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Store Location & Google Maps */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-10 shadow-sm mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="border-primary/30 text-primary mb-3">
                  Visítanos en Miraflores
                </Badge>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  Nuestra Tienda & Showroom
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                  Ubicados estratégicamente en el corazón de Miraflores, Lima. Atención personalizada para prueba de camisas y toma de medidas.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-foreground">Dirección:</strong>
                    <span className="text-muted-foreground">{STORE_ADDRESS}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-foreground">Horario de Atención:</strong>
                    <span className="text-muted-foreground">Lunes a Sábado: 9:00 AM - 7:00 PM (Previa coordinación)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="bg-primary text-primary-foreground gap-2">
                  <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-4" />
                    Abrir en Google Maps
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2 border-primary/30">
                  <a href={SOCIAL_LINKS.videoMedidas} target="_blank" rel="noopener noreferrer">
                    <Video className="size-4 text-red-500" />
                    Ver Video de Medidas
                  </a>
                </Button>
              </div>
            </div>

            {/* Embedded Google Maps / Visual Representation */}
            <div className="relative h-80 rounded-2xl overflow-hidden border border-border shadow-md">
              <iframe
                title="Google Maps Tienda CTG Miraflores"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.865369797371!2d-77.03080062402436!3d-12.12134598812166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8195a6ec937%3A0x6b4be91090022409!2sAv.%20Jos%C3%A9%20Larco%20812%2C%20Miraflores%2015074!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* 4 COCHERAS CERCANAS SECTION (DOCUMENT 1) */}
          <div id="cocheras" className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Car className="size-3.5 mr-1.5" />
                Estacionamientos Cercanos
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                04 Cocheras Referidas para tu Visita
              </h2>
              <p className="text-sm text-muted-foreground">
                Si vienes en vehículo a nuestra tienda en Av. Larco 812, dispones de 4 opciones seguras a pocos metros de distancia:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cocheras.map((c, idx) => (
                <Card
                  key={c.name}
                  className="border-border/70 hover:border-primary/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative h-44 w-full bg-muted overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.alt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground font-bold shadow text-xs">
                          {c.price}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-heading font-semibold text-base text-foreground">
                        {c.name}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3.5 text-primary flex-shrink-0" />
                        {c.address}
                      </p>
                    </CardContent>
                  </div>

                  <div className="p-4 pt-0">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs gap-1.5 border-primary/20 hover:bg-primary/5"
                    >
                      <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer">
                        <span>Ver en Google Maps</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CONTACT FORM & REDES SOCIALES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Form */}
            <div id="formulario" className="lg:col-span-7">
              <Card className="border-border/80 bg-card p-6 md:p-8 shadow-sm">
                <div className="mb-6 space-y-1">
                  <h3 className="font-heading text-xl md:text-2xl font-bold">
                    Envíanos un Mensaje
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Completa este formulario y coordinaremos tu respuesta directa vía WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contactName" className="text-xs font-semibold">
                      Nombre completo (*)
                    </Label>
                    <Input
                      id="contactName"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contactPhone" className="text-xs font-semibold">
                        Celular / WhatsApp
                      </Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="Ej. 970 298 099"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contactEmail" className="text-xs font-semibold">
                        Correo electrónico
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contactMsg" className="text-xs font-semibold">
                      Mensaje o consulta (*)
                    </Label>
                    <Textarea
                      id="contactMsg"
                      rows={4}
                      placeholder="Indícanos qué modelo, talla o consulta deseas realizar..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold py-6 rounded-xl gap-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="size-4" />
                    Enviar Consulta por WhatsApp
                  </Button>
                </form>
              </Card>
            </div>

            {/* Social Networks & Quick Help */}
            <div id="redes" className="lg:col-span-5 space-y-6">
              <Card className="border-border/80 bg-secondary/30 p-6 space-y-4">
                <h4 className="font-heading font-bold text-lg text-foreground">
                  Síguenos en Redes Sociales
                </h4>
                <p className="text-xs text-muted-foreground">
                  Mantente al tanto de nuevos lanzamientos, consejos de cuidado de prendas y promociones exclusivas:
                </p>

                <div className="space-y-2.5">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Instagram className="size-4 text-pink-500" />
                      @camisasentallasgrandes
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary" />
                  </a>

                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-bold text-black dark:text-white">🎵</span>
                      TikTok: @camisasgrandesperu
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary" />
                  </a>

                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-bold text-blue-600">f</span>
                      Facebook: Camisasentallasgrandes
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary" />
                  </a>

                  <a
                    href={SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs font-semibold text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Youtube className="size-4 text-red-600" />
                      YouTube: @CamisasTallasGrandes
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary" />
                  </a>
                </div>
              </Card>

              {/* Guía en video box */}
              <Card className="border-primary/20 bg-primary/5 p-6 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Video className="size-4" />
                  <span>Video Tutorial de Toma de Medidas</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aprende en menos de 2 minutos a medir una camisa extendida o directamente tu cuerpo para ordenar la talla perfecta.
                </p>
                <Button asChild size="sm" variant="outline" className="w-full text-xs border-primary/30 gap-1.5">
                  <a href={SOCIAL_LINKS.videoMedidas} target="_blank" rel="noopener noreferrer">
                    <span>Ver Tutorial en YouTube</span>
                    <ExternalLink className="size-3" />
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

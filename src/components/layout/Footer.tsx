import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { WHATSAPP_CONFIG } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/90 mt-auto border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Identity */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase block">
                Línea Especializada de Antobelly
              </span>
              <h3 className="font-heading text-2xl font-bold text-gradient-gold">
                CTG | Camisas en Tallas Grandes
              </h3>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Especialistas en camisas de vestir y sport para hombres de contextura grande
              (tallas de cuello 18.5&quot; a 22.5&quot; / 2XL a 6XL). 100% algodón peruano de máxima calidad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/camisasentallasgrandes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Instagram de CTG"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.tiktok.com/@camisasentallasgrandes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="TikTok de CTG"
              >
                TK
              </a>
              <a
                href="https://www.facebook.com/camisasentallasgrandes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Facebook de CTG"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://www.youtube.com/@camisasentallasgrandes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="YouTube de CTG"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background tracking-wide">Navegación</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Enlaces del pie de página">
              <Link href="/" className="text-sm text-background/70 hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/catalogo" className="text-sm text-background/70 hover:text-primary transition-colors">
                Catálogo de Camisas
              </Link>
              <Link href="/tutalla" className="text-sm text-background/70 hover:text-primary transition-colors">
                Guía y Calculadora de Talla
              </Link>
              <Link href="/blog" className="text-sm text-background/70 hover:text-primary transition-colors flex items-center gap-1.5">
                Blog de Moda & Consejos
                <span className="text-[10px] px-1.5 py-0.2 bg-primary/20 text-primary rounded font-semibold">Nuevo</span>
              </Link>
              <Link href="/ctg-camisas-tallas-grandes" className="text-sm text-background/70 hover:text-primary transition-colors">
                Especialistas en Tallas Grandes CTG
              </Link>
              <Link href="/nosotros" className="text-sm text-background/70 hover:text-primary transition-colors">
                Nosotros e Historia Antobelly
              </Link>
              <Link href="/contacto" className="text-sm text-background/70 hover:text-primary transition-colors">
                Showroom Miraflores & Cocheras
              </Link>
            </nav>
          </div>

          {/* Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background tracking-wide">Showroom & Atención</h4>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_CONFIG.getDirectUrl("Hola CTG, deseo información sobre las camisas en tallas grandes.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-background/70 hover:text-primary transition-colors"
              >
                <Phone className="size-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>+51 970 298 099 <span className="text-xs text-background/50 block">Atención Lun a Sáb 10:30am - 8:00pm</span></span>
              </a>
              <a
                href="mailto:ventas@camisasentallasgrandes.com"
                className="flex items-center gap-2.5 text-sm text-background/70 hover:text-primary transition-colors"
              >
                <Mail className="size-4 flex-shrink-0 text-primary" />
                <span className="truncate">ventas@camisasentallasgrandes.com</span>
              </a>
              <a
                href="https://maps.app.goo.gl/k3xH1M5yU768a4Zk8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-background/70 hover:text-primary transition-colors"
              >
                <MapPin className="size-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  Av. José Larco 812, Of. 201
                  <span className="text-xs text-background/50 block">Miraflores, Lima (a 1/2 cdra. de Av. Benavides)</span>
                </span>
              </a>
              <div className="text-xs text-background/60 bg-background/5 p-2.5 rounded-lg border border-background/10">
                🅿️ 4 playas de estacionamiento a menos de 50 metros para tu comodidad.
              </div>
            </div>
          </div>

          {/* Payment & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background tracking-wide">Seguridad & Pagos</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Enlaces legales y de pago">
              <Link
                href="/formas-de-pago"
                className="text-sm text-background/70 hover:text-primary transition-colors flex items-center justify-between p-2 rounded-lg bg-background/5 hover:bg-background/10 border border-background/10"
              >
                <span>💳 Ver Cuentas BCP & Yape</span>
                <span className="text-xs text-primary font-semibold">Oficial</span>
              </Link>

              {/* Libro de Reclamaciones Banner */}
              <Link
                href="/libro-de-reclamaciones"
                className="group block p-3 rounded-xl bg-background/5 hover:bg-background/10 border border-background/15 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform flex-shrink-0">
                    <ShieldCheck className="size-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-background group-hover:text-primary transition-colors block">
                      LIBRO DE RECLAMACIONES
                    </span>
                    <span className="text-[11px] text-background/50 block">
                      Conforme a la Ley N.° 29571
                    </span>
                  </div>
                </div>
              </Link>
            </nav>

            <div className="pt-2">
              <span className="text-xs text-background/50 block mb-1.5 font-medium">Envíos a todo el Perú:</span>
              <p className="text-xs text-background/70">
                Lima: 24 - 48 hrs. Provincias: 24 - 72 hrs vía Shalom u Olva Courier.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/50">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} CTG - Camisas en Tallas Grandes (Línea de Antobelly).
            Razón Social: Erick Alexis Chavez Rodriguez | RUC: 10099179886.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/formas-de-pago" className="hover:text-primary transition-colors">
              Formas de Pago
            </Link>
            <span>•</span>
            <Link href="/libro-de-reclamaciones" className="hover:text-primary transition-colors">
              Libro de Reclamaciones
            </Link>
            <span>•</span>
            <Link href="/contacto" className="hover:text-primary transition-colors">
              Showroom
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-background/5 text-center text-xs">
          <a
            href="https://fastpagepro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/60 hover:text-background transition-colors inline-flex items-center justify-center gap-1.5 group"
          >
            <span>Diseñado &amp; Desarrollado por</span>
            <span className="text-[#D4AF37] group-hover:text-amber-300 font-semibold underline-offset-4 group-hover:underline transition-colors">
              fastpagepro.com
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

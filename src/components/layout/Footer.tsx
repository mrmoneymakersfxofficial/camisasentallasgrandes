import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/90 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-gradient-gold">
              ALGODÓN PERUANO
            </h3>
            <p className="text-sm text-background/60 leading-relaxed">
              Camisas premium para hombre en tallas grandes. 100% algodón
              peruano con la calidad que mereces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Enlaces Rápidos</h4>
            <nav className="flex flex-col gap-2" aria-label="Enlaces del pie de página">
              <Link href="/" className="text-sm text-background/60 hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/catalogo" className="text-sm text-background/60 hover:text-primary transition-colors">
                Catálogo
              </Link>
              <Link href="/tutalla" className="text-sm text-background/60 hover:text-primary transition-colors">
                Calcula tu Talla
              </Link>
              <Link href="/nosotros" className="text-sm text-background/60 hover:text-primary transition-colors">
                Nosotros
              </Link>
              <Link href="/contacto" className="text-sm text-background/60 hover:text-primary transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors"
              >
                <Phone className="size-4" />
                +51 999 999 999
              </a>
              <a
                href="mailto:contacto@algodonperuano.com"
                className="flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors"
              >
                <Mail className="size-4" />
                contacto@algodonperuano.com
              </a>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <MapPin className="size-4" />
                Lima, Perú
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Métodos de Pago</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-background/60">
                <div className="w-10 h-10 rounded-md bg-background/10 flex items-center justify-center text-xs font-bold">
                  Yape
                </div>
                <span>Transferencia Yape</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <div className="w-10 h-10 rounded-md bg-background/10 flex items-center justify-center text-xs font-bold">
                  Plin
                </div>
                <span>Transferencia Plin</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Algodón Peruano. Todos los derechos reservados.</p>
          <p>
            Diseño y desarrollo por{" "}
            <a
              href="https://www.fastpagepro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              fastpagepro.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

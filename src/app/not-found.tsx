import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-6">
          <Search className="size-10 text-primary" />
        </div>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          <span className="text-gradient-gold">404</span>
        </h1>
        <h2 className="font-heading text-2xl font-semibold mb-3">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. Te invitamos a explorar nuestro catálogo o volver al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="size-4 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/5"
            asChild
          >
            <Link href="/catalogo">Ver Catálogo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

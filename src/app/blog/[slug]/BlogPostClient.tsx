"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  Share2,
  MessageCircle,
  Ruler,
  ShoppingBag,
} from "lucide-react";
import { BlogPost, blogPosts } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildWhatsAppURL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Enlace copiado",
        description: "El enlace al artículo se ha copiado al portapapeles.",
      });
    }
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-background">
      {/* Header Container */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14 bg-gradient-warm border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium truncate max-w-xs">
              {post.category}
            </span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary font-semibold">
                {post.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.readingTime}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  CTG
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-[11px]">Especialistas en Tallas Grandes</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2 text-xs"
              >
                <Share2 className="size-3.5" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="space-y-8 text-foreground leading-relaxed">
          {post.content.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <p key={i} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {block.text}
                </p>
              );
            }

            if (block.type === "heading2") {
              return (
                <h2
                  key={i}
                  className="font-heading text-2xl sm:text-3xl font-bold text-foreground pt-6 pb-1 border-b border-border/50"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "heading3") {
              return (
                <h3
                  key={i}
                  className="font-heading text-xl font-semibold text-foreground pt-3"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2.5 my-4 pl-2">
                  {block.items?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-base text-muted-foreground">
                      <span className="text-primary font-bold mt-1 text-sm">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "image" && block.imageSrc) {
              return (
                <figure key={i} className="my-8 space-y-2">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-border bg-muted">
                    <Image
                      src={block.imageSrc}
                      alt={block.imageAlt || "Gráfico explicativo"}
                      width={1024}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="text-center text-xs text-muted-foreground italic pt-1">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            if (block.type === "callout") {
              return (
                <div
                  key={i}
                  className="my-6 p-5 rounded-2xl bg-primary/5 border border-primary/20 text-foreground font-medium text-sm sm:text-base leading-relaxed"
                >
                  {block.text}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* WhatsApp Banner CTA */}
        <div className="mt-14 p-8 rounded-3xl bg-secondary/40 border border-border/80 text-center space-y-4">
          <h3 className="font-heading text-2xl font-bold">
            ¿Quieres saber cuál es tu talla ideal?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Evita errores de calce. Nuestro equipo te asesora de forma gratuita y personalizada por WhatsApp al <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold gap-2">
              <a
                href={buildWhatsAppURL(`Hola CTG, leí el artículo "${post.title}" y deseo asesoría sobre mi talla.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-5" />
                Consultar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/30">
              <Link href="/tutalla">
                <Ruler className="size-4 mr-1.5" />
                Ver Tabla de Medidas
              </Link>
            </Button>
          </div>
        </div>

        {/* Back Link & Related Posts */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <Button asChild variant="ghost" className="gap-2 text-primary font-medium">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Ver más artículos del blog
            </Link>
          </Button>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12 space-y-4">
            <h4 className="font-heading text-xl font-bold">Artículos recomendados</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-4 rounded-xl border border-border hover:border-primary/40 bg-card transition-all flex flex-col justify-between group"
                >
                  <div>
                    <Badge variant="secondary" className="text-[10px] mb-2">
                      {rel.category}
                    </Badge>
                    <h5 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h5>
                  </div>
                  <span className="text-xs text-primary font-semibold mt-3 flex items-center gap-1">
                    Leer artículo <ChevronRight className="size-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

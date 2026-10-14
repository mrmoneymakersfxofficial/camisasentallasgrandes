"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  User,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/blog";

export default function BlogIndexClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm border-b border-border/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Blog & Guías</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-semibold gap-1.5 border-primary/20 bg-primary/10"
            >
              <BookOpen className="size-3.5 text-primary" />
              Guías de Estilo, Tallas y Cuidado
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Blog Especializado en <span className="text-gradient-gold">Tallas Grandes</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Consejos prácticos, tablas anatómicas y recomendaciones de sastrería para elegir, lucir y cuidar tus camisas de 100% algodón peruano.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat === "all" ? "Todos los Artículos" : cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full border-border/70 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group">
                  <div>
                    {/* Cover Image */}
                    <div className="relative w-full h-56 overflow-hidden bg-muted">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-border shadow-sm text-xs font-semibold">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {post.readingTime}
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h2 className="font-heading font-bold text-xl text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between p-0 hover:bg-transparent text-primary hover:text-primary/80 font-semibold group/btn"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <span>Leer artículo completo</span>
                        <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Ruler, CheckCircle2, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageScrollSpyController from "@/components/layout/PageScrollSpyController";

const sizeChart = [
  { size: "2XL", chest: "120-130 cm", chestMin: 120, chestMax: 130 },
  { size: "3XL", chest: "130-140 cm", chestMin: 130, chestMax: 140 },
  { size: "4XL", chest: "140-155 cm", chestMin: 140, chestMax: 155 },
  { size: "5XL", chest: "155-170 cm", chestMin: 155, chestMax: 170 },
  { size: "6XL", chest: "170+ cm", chestMin: 170, chestMax: 999 },
];

function getRecommendedSize(weight: number, height: number, chest: number): string {
  if (chest > 0) {
    for (const entry of sizeChart) {
      if (chest >= entry.chestMin && chest < entry.chestMax) {
        return entry.size;
      }
    }
    return "6XL";
  }
  const bmi = weight / ((height / 100) ** 2);
  if (bmi > 35 || height > 185) return "5XL";
  if (bmi > 30 || height > 180) return "4XL";
  if (bmi > 27 || height > 175) return "3XL";
  return "2XL";
}

function getSizeLabel(recommendation: string): string {
  switch (recommendation) {
    case "2XL":
      return "Tu talla ideal es 2XL. Nuestros cortes confort te brindarán espacio y estilo sin sacrificar la elegancia.";
    case "3XL":
      return "Te recomendamos talla 3XL. El ajuste perfecto para una silueta cómoda y moderna.";
    case "4XL":
      return "4XL es tu talla ideal. Diseñada para ofrecer máxima comodidad con un look impecable.";
    case "5XL":
      return "5XL es la talla perfecta para ti. Generosidad en el corte sin perder la forma.";
    case "6XL":
      return "6XL te quedará ideal. Máximo confort con la calidad premium que mereces.";
    default:
      return "";
  }
}

export default function TutallaClient() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [chest, setChest] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const c = parseFloat(chest) || 0;

    if (!w || !h) {
      return;
    }

    const recommended = getRecommendedSize(w, h, c);
    setResult(recommended);
    setStep(1);
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setChest("");
    setResult(null);
    setStep(0);
  };

  return (
    <>
      <PageScrollSpyController sectionIds={["hero", "tabla-medidas"]} />

      {/* Page Hero */}
      <section id="hero" className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, oklch(0.65 0.15 50) 0px, oklch(0.65 0.15 50) 1px, transparent 1px, transparent 20px)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Calcula tu Talla</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Ruler className="size-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Calcula <span className="text-gradient-gold">Tu Talla</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ingresa tus medidas y te recomendamos la talla perfecta para ti. Sin dudas, sin devoluciones innecesarias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Size Calculator */}
      <section id="tabla-medidas" className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border/50 overflow-hidden shadow-lg">
              <CardContent className="p-6 md:p-10">
                <AnimatePresence mode="wait">
                  {step === 0 ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Info banner */}
                      <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4">
                        <Info className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Cuantas más medidas proporciones, más precisa será nuestra recomendación. El contorno de pecho es el dato más importante.
                        </p>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="weight" className="text-base font-medium">
                            Peso (kg)
                          </Label>
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Ej: 95"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="h-12 text-base"
                          />
                          <p className="text-xs text-muted-foreground">
                            Tu peso corporal en kilogramos
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height" className="text-base font-medium">
                            Altura (cm)
                          </Label>
                          <Input
                            id="height"
                            type="number"
                            placeholder="Ej: 175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="h-12 text-base"
                          />
                          <p className="text-xs text-muted-foreground">
                            Tu estatura en centímetros
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="chest" className="text-base font-medium">
                          Contorno de Pecho (cm){" "}
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Recomendado
                          </Badge>
                        </Label>
                        <Input
                          id="chest"
                          type="number"
                          placeholder="Ej: 130"
                          value={chest}
                          onChange={(e) => setChest(e.target.value)}
                          className="h-12 text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          Mide alrededor de la parte más ancha de tu pecho, manteniendo el nivel de la cinta métrica.
                        </p>
                      </div>

                      <Button
                        onClick={handleCalculate}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-7 text-lg rounded-xl"
                      >
                        <Ruler className="size-5 mr-2" />
                        Calcular mi Talla
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center space-y-8"
                    >
                      {/* Result Badge */}
                      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mx-auto">
                        <CheckCircle2 className="size-12 text-primary" />
                      </div>

                      <div>
                        <p className="text-muted-foreground text-lg mb-3">
                          Tu talla recomendada es:
                        </p>
                        <p className="font-heading text-6xl md:text-7xl font-bold text-gradient-gold">
                          {result}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                        {getSizeLabel(result || "")}
                      </p>

                      {/* Size Chart */}
                      <div className="pt-4">
                        <h3 className="font-heading font-semibold text-lg mb-4">
                          Tabla de Referencia
                        </h3>
                        <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto">
                          {sizeChart.map((entry) => (
                            <div
                              key={entry.size}
                              className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                                entry.size === result
                                  ? "bg-primary/10 border-primary text-primary font-bold scale-105 shadow-lg shadow-primary/10"
                                  : "border-border/50 hover:border-primary/30"
                              }`}
                            >
                              <p className="text-sm font-medium">{entry.size}</p>
                              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
                                {entry.chest}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Your measurements */}
                      <div className="bg-muted/50 rounded-xl p-5 max-w-md mx-auto">
                        <h4 className="text-sm font-medium mb-2">Tus medidas ingresadas:</h4>
                        <p className="text-sm text-muted-foreground">
                          Peso: {weight} kg · Altura: {height} cm
                          {chest && ` · Pecho: ${chest} cm`}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/5 px-8"
                        >
                          Calcular de nuevo
                        </Button>
                        <Button
                          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                          asChild
                        >
                          <Link href={`/catalogo`}>
                            Ver Camisas en {result}
                            <ChevronRight className="size-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-heading font-semibold text-base mb-2">
                  ¿Cómo medir tu pecho?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pasa la cinta métrica alrededor de la parte más ancha de tu pecho, a la altura de los pezones. Mantén la cinta nivelada y firme pero sin apretar.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-heading font-semibold text-base mb-2">
                  Entre dos tallas?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Si estás entre dos tallas, te recomendamos elegir la talla mayor. Nuestras camisas tienen un corte generoso que favorece sin apretar.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="font-heading font-semibold text-base mb-2">
                  ¿No estás seguro?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Escríbenos por WhatsApp y te ayudaremos personalmente a encontrar tu talla perfecta. Atención inmediata.
                </p>
                <Button variant="outline" size="sm" className="mt-3 border-primary/30 hover:bg-primary/5" asChild>
                  <a href="https://wa.me/51999999999?text=Hola,%20necesito%20ayuda%20para%20encontrar%20mi%20talla" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Ruler, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const sizeChart = [
  { size: "2XL", chest: "120-130 cm", chestMin: 120, chestMax: 130 },
  { size: "3XL", chest: "130-140 cm", chestMin: 130, chestMax: 140 },
  { size: "4XL", chest: "140-155 cm", chestMin: 140, chestMax: 155 },
  { size: "5XL", chest: "155-170 cm", chestMin: 155, chestMax: 170 },
  { size: "6XL", chest: "170+ cm", chestMin: 170, chestMax: 999 },
];

function getRecommendedSize(weight: number, height: number, chest: number): string {
  // Priority: chest measurement, then height+weight as fallback
  if (chest > 0) {
    for (const entry of sizeChart) {
      if (chest >= entry.chestMin && chest < entry.chestMax) {
        return entry.size;
      }
    }
    return "6XL";
  }
  // Fallback estimation
  const bmi = weight / ((height / 100) ** 2);
  if (bmi > 35 || height > 185) return "5XL";
  if (bmi > 30 || height > 180) return "4XL";
  if (bmi > 27 || height > 175) return "3XL";
  return "2XL";
}

export default function SizeAssistant() {
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
    <section className="py-20 md:py-28 bg-secondary/30" id="talla">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
              <Ruler className="size-7 text-primary" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Calcula <span className="text-gradient-gold">Tu Talla</span>
            </h2>
            <p className="text-muted-foreground">
              Ingresa tus medidas y te recomendamos la talla perfecta para ti.
            </p>
          </div>

          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Ej: 95"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Altura (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="Ej: 175"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chest">
                        Contorno de Pecho (cm){" "}
                        <span className="text-muted-foreground text-xs">
                          — opcional pero recomendado
                        </span>
                      </Label>
                      <Input
                        id="chest"
                        type="number"
                        placeholder="Ej: 130"
                        value={chest}
                        onChange={(e) => setChest(e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base rounded-xl"
                    >
                      Calcular mi Talla
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6"
                  >
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
                      <CheckCircle2 className="size-10 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        Tu talla recomendada es:
                      </p>
                      <p className="font-heading text-5xl md:text-6xl font-bold text-gradient-gold">
                        {result}
                      </p>
                    </div>

                    {/* Size comparison */}
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Tabla de referencia:
                      </p>
                      <div className="grid grid-cols-5 gap-2">
                        {sizeChart.map((entry) => (
                          <div
                            key={entry.size}
                            className={`text-center p-3 rounded-xl border transition-all ${
                              entry.size === result
                                ? "bg-primary/10 border-primary text-primary font-bold scale-105"
                                : "border-border/50"
                            }`}
                          >
                            <p className="text-xs font-medium">{entry.size}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {entry.chest}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/5"
                    >
                      Calcular de nuevo
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}



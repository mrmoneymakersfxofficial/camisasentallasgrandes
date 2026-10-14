"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Ruler,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
  MessageCircle,
  Video,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageScrollSpyController from "@/components/layout/PageScrollSpyController";
import {
  WHATSAPP_DISPLAY,
  SOCIAL_LINKS,
  buildWhatsAppURL,
  generateSizeHelpMessage,
} from "@/lib/whatsapp";

// OFFICIAL TABLE FROM DOCUMENT 1 & 5
export const officialSizeTable = [
  {
    neckInch: "18.5",
    equivalence: "2XL",
    neckCm: "48",
    chestFrontal: "70.5",
    chestContour: "141",
    bellyFrontal: "71.5",
    bellyContour: "143",
    length: "82",
    sleeve: "63.5",
  },
  {
    neckInch: "19.5",
    equivalence: "3XL",
    neckCm: "50.5",
    chestFrontal: "73.5",
    chestContour: "147",
    bellyFrontal: "75.5",
    bellyContour: "151",
    length: "82",
    sleeve: "63.5",
  },
  {
    neckInch: "20.5",
    equivalence: "4XL",
    neckCm: "52.5",
    chestFrontal: "77.0",
    chestContour: "154",
    bellyFrontal: "78.5",
    bellyContour: "157",
    length: "83",
    sleeve: "63.5",
  },
  {
    neckInch: "21.5",
    equivalence: "5XL",
    neckCm: "54.5",
    chestFrontal: "80.0",
    chestContour: "160",
    bellyFrontal: "83.0",
    bellyContour: "166",
    length: "84",
    sleeve: "64.5",
  },
  {
    neckInch: "22.5",
    equivalence: "6XL",
    neckCm: "58.0",
    chestFrontal: "83.0",
    chestContour: "166",
    bellyFrontal: "85.0",
    bellyContour: "170",
    length: "85",
    sleeve: "65.0",
  },
];

export default function TutallaClient() {
  const [neckInput, setNeckInput] = useState("");
  const [chestInput, setChestInput] = useState("");
  const [bellyInput, setBellyInput] = useState("");
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const handleCalculate = () => {
    const neck = parseFloat(neckInput) || 0;
    const chest = parseFloat(chestInput) || 0;
    const belly = parseFloat(bellyInput) || 0;

    if (!neck && !chest && !belly) {
      return;
    }

    // Recommendation logic based on neck, chest, or belly
    let selected = officialSizeTable[0];

    // Check by neck (in inches or cm)
    if (neck > 0) {
      if (neck >= 22 || neck >= 56) selected = officialSizeTable[4];
      else if (neck >= 21 || neck >= 53.5) selected = officialSizeTable[3];
      else if (neck >= 20 || neck >= 51.5) selected = officialSizeTable[2];
      else if (neck >= 19 || neck >= 49) selected = officialSizeTable[1];
      else selected = officialSizeTable[0];
    } else if (chest > 0 || belly > 0) {
      // Check by chest/belly contour
      const maxTorso = Math.max(chest, belly);
      if (maxTorso >= 165) selected = officialSizeTable[4];
      else if (maxTorso >= 158) selected = officialSizeTable[3];
      else if (maxTorso >= 152) selected = officialSizeTable[2];
      else if (maxTorso >= 145) selected = officialSizeTable[1];
      else selected = officialSizeTable[0];
    }

    setCalculationResult(selected);
  };

  const handleReset = () => {
    setNeckInput("");
    setChestInput("");
    setBellyInput("");
    setCalculationResult(null);
  };

  return (
    <>
      <PageScrollSpyController sectionIds={["hero", "asistente", "tabla-oficial", "video-tutorial"]} />

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Guía de Tallas</span>
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
              <Ruler className="size-3.5 text-primary" />
              Tallas Reales 18.5&quot; a 22.5&quot; (2XL a 6XL)
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Tabla Oficial de Medidas & <span className="text-gradient-gold">Calculador de Talla</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              En <strong>CTG Camisas en Tallas Grandes</strong> diseñamos prendas anatómicas que respetan tu cuerpo real. Encuentra tu talla exacta sin confusiones ni prendas desproporcionadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
        {/* INTERACTIVE SIZE CALCULATOR */}
        <section id="asistente" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary/30 text-primary">
                Asistente Virtual de Tallas
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                Calcula tu Talla Ideal en Segundos
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ingresa una o más de tus medidas (puedes medir una camisa que te quede cómoda extendida sobre la cama o medir tu cuerpo):
              </p>
            </div>

            <Card className="border-border/80 bg-card p-6 md:p-8 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="neckInput" className="text-xs font-semibold">
                    1. Medida del Cuello (Pulgadas o Centímetros)
                  </Label>
                  <Input
                    id="neckInput"
                    placeholder="Ej. 19.5 (pulgadas) o 50 cm"
                    value={neckInput}
                    onChange={(e) => setNeckInput(e.target.value)}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    Mide alrededor de la base del cuello dejando el espacio de un dedo.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="chestInput" className="text-xs font-semibold">
                    2. Contorno Total de Pecho (cm)
                  </Label>
                  <Input
                    id="chestInput"
                    type="number"
                    placeholder="Ej. 145 cm (o aprox el doble del ancho frontal)"
                    value={chestInput}
                    onChange={(e) => setChestInput(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bellyInput" className="text-xs font-semibold">
                    3. Contorno de Barriga / Abdomen (cm)
                  </Label>
                  <Input
                    id="bellyInput"
                    type="number"
                    placeholder="Ej. 150 cm"
                    value={bellyInput}
                    onChange={(e) => setBellyInput(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-primary text-primary-foreground font-semibold py-6 rounded-xl shadow"
                  >
                    Calcular Talla Recomendada
                  </Button>
                  {calculationResult && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="px-4 py-6 rounded-xl"
                      title="Reiniciar"
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Calculator Result Box */}
          <div className="lg:col-span-6">
            {calculationResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border-2 border-primary/40 bg-primary/5 p-8 md:p-10 text-center space-y-6 shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="size-8" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Tu Talla Sugerida en CTG
                  </p>
                  <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-foreground mt-1">
                    {calculationResult.neckInch}&quot; ({calculationResult.equivalence})
                  </h3>
                  <p className="text-xs text-primary font-semibold mt-1">
                    Cuello: {calculationResult.neckCm} cm | Largo Favorecedor: {calculationResult.length} cm
                  </p>
                </div>

                <div className="bg-card p-4 rounded-xl border border-border text-xs text-muted-foreground grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="font-semibold text-foreground block">Ancho Frontal Pecho:</span>
                    <span>{calculationResult.chestFrontal} cm (costura a costura)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Ancho Frontal Barriga:</span>
                    <span>{calculationResult.bellyFrontal} cm</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Largo de Manga:</span>
                    <span>{calculationResult.sleeve} cm</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Corte Anatómico:</span>
                    <span>100% Algodón Peruano</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold gap-2">
                    <a
                      href={buildWhatsAppURL(
                        generateSizeHelpMessage({
                          neck: `${calculationResult.neckInch}" (${calculationResult.neckCm}cm)`,
                          chest: calculationResult.chestContour,
                          belly: calculationResult.bellyContour,
                        })
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-5" />
                      Validar con Asesor por WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-primary/30">
                    <Link href="/catalogo">Ver Camisas Disponibles</Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border/80 bg-secondary/20 p-8 md:p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Ruler className="size-8" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Ingresa tus medidas
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Completa el formulario de la izquierda para ver al instante tu talla recomendada y las medidas exactas de confección.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-xs"
                    onClick={() => {
                      setNeckInput("19.5");
                      handleCalculate();
                    }}
                  >
                    Probar ejemplo (19.5&quot; / 3XL)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* OFFICIAL TABLE OF MEASURES (DOCUMENT 1 & 5) */}
        <section id="tabla-oficial" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Tabla Oficial de Medidas
            </Badge>
            <h2 className="font-heading text-3xl font-bold">
              Medidas Exactas de la Colección CTG
            </h2>
            <p className="text-sm text-muted-foreground">
              *Todas las medidas de pecho y barriga corresponden al ancho frontal de la prenda (de costura a costura).
            </p>
          </div>

          {/* Responsive Table */}
          <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-primary/10 border-b border-border text-foreground font-heading">
                  <tr>
                    <th className="py-4 px-4 text-center font-bold">Referencia</th>
                    <th className="py-4 px-4 text-center font-bold">Talla 18.5&quot; (2XL)</th>
                    <th className="py-4 px-4 text-center font-bold">Talla 19.5&quot; (3XL)</th>
                    <th className="py-4 px-4 text-center font-bold">Talla 20.5&quot; (4XL)</th>
                    <th className="py-4 px-4 text-center font-bold">Talla 21.5&quot; (5XL)</th>
                    <th className="py-4 px-4 text-center font-bold">Talla 22.5&quot; (6XL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30">
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      <strong className="text-primary font-bold mr-1">A</strong> Largo Total (cm)
                    </td>
                    <td className="py-3.5 px-4 text-center">82</td>
                    <td className="py-3.5 px-4 text-center">82</td>
                    <td className="py-3.5 px-4 text-center">83</td>
                    <td className="py-3.5 px-4 text-center">84</td>
                    <td className="py-3.5 px-4 text-center">85</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      <strong className="text-primary font-bold mr-1">B</strong> Pecho Frontal (cm)
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-foreground">70.5</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-foreground">73.5</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-foreground">77.0</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-foreground">80.0</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-foreground">83.0</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      <strong className="text-primary font-bold mr-1">C</strong> Barriga Frontal (cm)
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">71.5</td>
                    <td className="py-3.5 px-4 text-center font-mono">75.5</td>
                    <td className="py-3.5 px-4 text-center font-mono">78.5</td>
                    <td className="py-3.5 px-4 text-center font-mono">83.0</td>
                    <td className="py-3.5 px-4 text-center font-mono">85.0</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      <strong className="text-primary font-bold mr-1">D</strong> Largo Mangas (cm)
                    </td>
                    <td className="py-3.5 px-4 text-center">63.5</td>
                    <td className="py-3.5 px-4 text-center">63.5</td>
                    <td className="py-3.5 px-4 text-center">63.5</td>
                    <td className="py-3.5 px-4 text-center">64.5</td>
                    <td className="py-3.5 px-4 text-center">65.0</td>
                  </tr>
                  <tr className="hover:bg-muted/30 bg-primary/5">
                    <td className="py-3.5 px-4 font-bold text-primary">
                      <strong className="text-primary font-bold mr-1">E</strong> Medida Cuello (cm)
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground">48 cm</td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground">50.5 cm</td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground">52.5 cm</td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground">54.5 cm</td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground">58 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Diagram Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-border shadow bg-white p-2">
              <Image
                src="/images/medidas/tabla-medidas-oficial.png"
                alt="Infografía oficial de medidas de camisas CTG"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-border shadow bg-[#F7F5F0] p-2">
              <Image
                src="/images/medidas/tabla-medidas-dorada.png"
                alt="Infografía dorada de medidas de camisas CTG"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* VIDEO TUTORIAL SECTION */}
        <section id="video-tutorial" className="rounded-3xl bg-secondary/30 border border-border p-8 md:p-12 text-center space-y-6">
          <Badge variant="outline" className="border-red-500/40 text-red-500">
            <Video className="size-3.5 mr-1" />
            Guía Explicativa en Video
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Cómo Medir tu Camisa Paso a Paso
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Observa cómo extender la prenda y medir el cuello desde el centro del botón hasta la mitad del ojal para corroborar tu talla con total exactitud.
          </p>

          <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border border-border bg-black">
            <iframe
              src="https://www.youtube.com/embed/WaABMdBPABc"
              title="Video Tutorial de Toma de Medidas de Camisa CTG"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="pt-4">
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold gap-2">
              <a
                href={buildWhatsAppURL("Hola CTG, vi el video de medidas y deseo validar mi talla antes de pedir.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-5" />
                Asesorarme por WhatsApp ({WHATSAPP_DISPLAY})
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

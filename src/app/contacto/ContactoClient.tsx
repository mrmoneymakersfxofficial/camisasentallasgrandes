"use client";

import { useState, useRef } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Respuesta inmediata",
    value: "+51 999 999 999",
    href: "https://wa.me/51999999999?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20camisas",
    color: "bg-[#25D366]",
    description: "El método más rápido. Escríbenos y te responderemos al instante.",
  },
  {
    icon: Phone,
    title: "Teléfono",
    subtitle: "Llámanos",
    value: "+51 999 999 999",
    href: "tel:+51999999999",
    color: "bg-primary/10",
    description: "Lunes a sábado de 9am a 7pm. Atención directa.",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "Escríbenos",
    value: "contacto@algodonperuano.com",
    href: "mailto:contacto@algodonperuano.com",
    color: "bg-primary/10",
    description: "Para consultas detalladas o pedidos especiales. Respuesta en 24 horas.",
  },
];

const schedule = [
  { day: "Lunes a Viernes", hours: "9:00 AM - 7:00 PM" },
  { day: "Sábado", hours: "9:00 AM - 5:00 PM" },
  { day: "Domingo", hours: "Cerrado" },
];

const faqs = [
  // ── Tallas y Medidas ──
  {
    question: "¿Qué tallas de camisas tienen disponibles?",
    answer: "Trabajamos con tallas de cuello desde 18.5 hasta 22.5 pulgadas. Equivalencias aproximadas: 18.5 = 2XL, 19.5 = 3XL, 20.5 = 4XL, 21.5 = 5XL, 22.5 = 6XL. Si tiene dudas sobre su talla, podemos ayudarle por WhatsApp.",
  },
  {
    question: "¿Cómo puedo saber cuál es mi talla?",
    answer: "La forma más sencilla es medir una camisa que le quede cómoda actualmente y comparar las medidas con nuestra tabla de tallas. Extienda completamente el cuello sobre una superficie plana y mida desde el centro del botón hasta la mitad del ojal. Esa medida corresponde a la talla del cuello.",
  },
  {
    question: "¿Las camisas son realmente para hombres de talla grande?",
    answer: "Sí. Nos especializamos exclusivamente en camisas para hombres de contextura grande. No son camisas estándar agrandadas, sino prendas pensadas para ofrecer mayor comodidad y una mejor apariencia.",
  },
  {
    question: "¿Qué talla de camisa necesito si uso 2XL?",
    answer: "Nuestra camisa de talla 18.5\" (48 cm de medida de cuello) equivale aproximadamente a una talla 2XL. Sin embargo, recomendamos siempre comparar las medidas con nuestra tabla de medidas, ya que cada persona tiene una contextura diferente.",
  },
  {
    question: "¿Qué talla necesito si uso 3XL?",
    answer: "Nuestra camisa de talla 19.5\" (50.5 cm de medida de cuello) equivale aproximadamente a una talla 3XL. Recomendamos comparar las medidas de una camisa cómoda con nuestra tabla de medidas.",
  },
  {
    question: "¿Qué talla necesito si uso 4XL?",
    answer: "Nuestra camisa de talla 20.5\" (52.5 cm de medida de cuello) equivale aproximadamente a una talla 4XL. Además de la medida de cuello, recomendamos revisar pecho, cintura, hombros y largo para un mejor ajuste.",
  },
  {
    question: "¿Qué talla necesito si uso 5XL?",
    answer: "Nuestra camisa de talla 21.5\" (55 cm de medida de cuello) equivale aproximadamente a una talla 5XL. Recomendamos revisar todas las medidas para lograr un mejor ajuste. Nuestro equipo puede asesorarlo por WhatsApp.",
  },
  {
    question: "¿Qué talla necesito si uso 6XL?",
    answer: "Nuestra camisa de talla 22.5\" (58 cm de medida de cuello) equivale aproximadamente a una talla 6XL. Es nuestra talla estándar más amplia, diseñada para brindar comodidad sin sacrificar elegancia.",
  },
  {
    question: "¿Cómo medir el cuello para una camisa?",
    answer: "Si va a medir una camisa que le queda bien: extienda completamente el cuello sobre una superficie plana, use una cinta métrica y mida desde el centro del botón hasta la mitad del ojal. Si mide su cuello directamente: coloque la cinta alrededor de la base del cuello, pasando ligeramente por debajo de la manzana de Adán, dejando espacio para uno o dos dedos.",
  },
  {
    question: "¿Tienen camisas para hombres con barriga pronunciada?",
    answer: "Sí. Nuestras camisas han sido desarrolladas considerando las necesidades de hombres de contextura robusta, incluyendo mayor amplitud en la zona del abdomen y cintura. Además, cuentan con un largo extendido que ayuda a mantener la camisa dentro del pantalón.",
  },
  // ── Características del Producto ──
  {
    question: "¿Las camisas son 100% algodón?",
    answer: "Sí. Nuestras camisas están confeccionadas en 100% algodón peruano de alta calidad, una fibra reconocida mundialmente por su suavidad, transpirabilidad y durabilidad.",
  },
  {
    question: "¿Qué beneficios tiene una camisa de 100% algodón?",
    answer: "Mayor transpirabilidad, menor acumulación de olores, suavidad al contacto con la piel, mayor comodidad durante largas jornadas, y excelente durabilidad con los cuidados adecuados.",
  },
  {
    question: "¿Por qué elegir una camisa de algodón y no una de poliéster?",
    answer: "El algodón ofrece una sensación más fresca y natural sobre la piel. Proporciona mayor transpirabilidad, menor acumulación de olores, mayor suavidad al contacto, mejor confort durante largas jornadas y excelente durabilidad.",
  },
  {
    question: "¿Las camisas de algodón son recomendables para pieles sensibles?",
    answer: "Sí. Al tratarse de una fibra natural, el algodón suele ser una excelente alternativa para personas con piel sensible o quienes buscan mayor suavidad y comodidad durante el uso diario.",
  },
  {
    question: "¿Qué tela es mejor para el clima peruano?",
    answer: "Las fibras naturales como el algodón son ampliamente valoradas por su capacidad de transpiración, suavidad y comodidad. Utilizamos 100% algodón peruano, reconocido mundialmente por su calidad y durabilidad.",
  },
  {
    question: "¿Las camisas tienen bolsillo en el pecho?",
    answer: "No. Hemos optado por un diseño limpio sin bolsillo porque ofrece una apariencia más elegante y estilizada, evita volumen visual innecesario y permite que las líneas se vean más ordenadas.",
  },
  {
    question: "¿Por qué las camisas CTG son más largas?",
    answer: "Todas nuestras camisas tienen un largo delantero y posterior cuidadosamente desarrollado para mantenerse mejor dentro del pantalón. Esto ayuda a conservar una apariencia ordenada durante todo el día, incluso al sentarse, caminar o realizar movimientos cotidianos.",
  },
  {
    question: "¿El cuello aprieta?",
    answer: "No. Nuestras camisas cuentan con un cuello de diseño más cómodo y funcional, pensado para ofrecer mejor comodidad en hombres de cuello robusto. Las camisas con cuellos excesivamente altos suelen resultar incómodas para hombres con cuello grueso.",
  },
  {
    question: "¿Qué son las presillas ocultas del cuello?",
    answer: "Son pequeñas presillas ubicadas debajo del cuello que ayudan a mantenerlo mejor alineado y ordenado cuando la camisa se utiliza sin corbata.",
  },
  {
    question: "¿Tienen camisas con puños para gemelos?",
    answer: "Sí. Disponemos de modelos con puño tradicional y modelos con puño francés para utilizar gemelos (cufflinks), logrando una apariencia más distinguida.",
  },
  {
    question: "¿Tienen camisas para usar con corbata?",
    answer: "Sí. La mayoría de nuestros modelos pueden utilizarse perfectamente con corbata. Nuestras camisas incorporan un cuello elegante y funcional que mantiene una excelente presentación tanto con corbata tradicional como con corbatas slim o michis.",
  },
  {
    question: "¿Tienen camisas para matrimonio, oficina o eventos formales?",
    answer: "Sí. Contamos con camisas ideales para reuniones de trabajo, eventos corporativos, matrimonios, graduaciones, cenas formales, celebraciones especiales y eventos de etiqueta. Disponemos de modelos clásicos en blanco, celeste y otros tonos elegantes.",
  },
  {
    question: "¿También venden camisas para esmoquin o etiqueta?",
    answer: "Sí. Contamos con camisas especiales para eventos de etiqueta y ocasiones formales.",
  },
  // ── Compra y Pago ──
  {
    question: "¿Cómo puedo realizar una compra?",
    answer: "Elija el modelo, confirme su talla, realice el pago y coordinamos el envío. Todo el proceso se realiza de forma sencilla por WhatsApp.",
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos transferencias bancarias, Yape, Plin y link de cobro. Todas las compras se coordinan directamente por WhatsApp para brindar una atención más personalizada.",
  },
  {
    question: "¿Tienen pasarela de pago en la web?",
    answer: "No. Actualmente todas las compras se coordinan directamente por WhatsApp para brindar una atención más personalizada.",
  },
  // ── Envíos ──
  {
    question: "¿Realizan envíos a provincias?",
    answer: "Sí. Realizamos envíos a Lima Metropolitana y a todas las provincias del Perú mediante empresas de transporte reconocidas.",
  },
  {
    question: "¿Qué empresas utilizan para los envíos?",
    answer: "Trabajamos regularmente con Shalom y Olva Courier. También podemos coordinar otra empresa de transporte de su preferencia.",
  },
  {
    question: "¿Cuánto demora un envío?",
    answer: "Lima: normalmente entre 24 y 48 horas. Provincias: normalmente entre 24 y 72 horas.",
  },
  {
    question: "¿Puedo enviar mi propio motorizado a recoger?",
    answer: "Sí. Si desea una entrega más rápida en Lima, puede coordinar el recojo mediante su propio servicio de mensajería.",
  },
  // ── Cambios y Devoluciones ──
  {
    question: "¿Puedo cambiar la talla de una camisa?",
    answer: "Sí. Aceptamos cambios de talla dentro de los 7 días posteriores a la recepción del producto.",
  },
  {
    question: "¿Devuelven dinero?",
    answer: "No realizamos devoluciones de dinero por cambios de opinión o elección incorrecta de talla. Recomendamos revisar las medidas antes de comprar y solicitar asesoría si tiene dudas.",
  },
  {
    question: "¿Las camisas deben estar sin uso para realizar un cambio?",
    answer: "Sí. La prenda debe encontrarse sin uso, sin lavado y en buen estado.",
  },
  // ── Camisas a Medida ──
  {
    question: "¿Realizan camisas a medida?",
    answer: "Sí. También confeccionamos camisas a medida utilizando telas de algodón peruano e italiano.",
  },
  {
    question: "¿Cuál es el precio de una camisa a medida?",
    answer: "El precio depende de la talla, tela elegida y trabajo requerido. La cotización se realiza de manera personalizada.",
  },
  {
    question: "¿Cuánto demora una camisa a medida?",
    answer: "El tiempo de confección depende de la complejidad del pedido y la carga de trabajo del taller. Le informaremos el plazo estimado antes de confirmar.",
  },
  // ── Tienda Física ──
  {
    question: "¿Puedo visitar la tienda personalmente?",
    answer: "Sí. Puede visitarnos en Miraflores previa coordinación.",
  },
  {
    question: "¿Tienen estacionamiento?",
    answer: "No contamos con estacionamiento propio, pero existen varias cocheras cercanas para mayor comodidad.",
  },
  {
    question: "¿Ofrecen presentación para regalo?",
    answer: "Sí. Podemos preparar una presentación especial para regalo previa coordinación.",
  },
  {
    question: "¿Tienen Libro de Reclamaciones?",
    answer: "Sí. Contamos con Libro de Reclamaciones Virtual conforme a la normativa peruana vigente.",
  },
  // ── Cuidados ──
  {
    question: "¿Cómo planchar correctamente una camisa de algodón?",
    answer: "Recomendamos utilizar una plancha seca y atomizar ligeramente agua sobre la tela antes de comenzar el planchado. Este método ayuda a obtener un acabado más prolijo, respetando las características naturales del algodón.",
  },
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
    if (!name.trim() || !message.trim()) {
      toast({ title: "Completa los campos requeridos", variant: "destructive" });
      return;
    }
    // Build WhatsApp message with contact form data
    const waMessage = `📞 *Nuevo mensaje de contacto*\n\n👤 *Nombre:* ${name.trim()}\n📧 *Email:* ${email || "No proporcionado"}\n📱 *Teléfono:* ${phone || "No proporcionado"}\n\n💬 *Mensaje:*\n${message.trim()}`;
    const waUrl = `https://wa.me/51999999999?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
    toast({
      title: "¡Mensaje enviado!",
      description: "Se abrió WhatsApp con tu mensaje. Te responderemos pronto.",
    });
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-warm overflow-hidden">
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
            <span className="text-foreground font-medium">Contacto</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient-gold">Contáctanos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Escríbenos y recibe atención personalizada para tu compra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.title === "WhatsApp" || method.title === "Email" ? "_blank" : undefined}
                rel={method.title === "WhatsApp" || method.title === "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${method.color} flex items-center justify-center mb-5`}>
                  <method.icon className="size-7 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">
                  {method.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {method.subtitle}
                </p>
                <p className="text-primary font-medium mb-3">
                  {method.value}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                Envíanos un <span className="text-gradient-gold">Mensaje</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Completa el formulario y te contactaremos por WhatsApp con la respuesta.
              </p>

              {submitted ? (
                <Card className="border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                      <CheckCircle2 className="size-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Tu mensaje fue enviado por WhatsApp. Te responderemos lo antes posible.
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/5"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setMessage("");
                      }}
                    >
                      Enviar otro mensaje
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nombre completo *</Label>
                      <Input
                        id="contact-name"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Teléfono</Label>
                      <Input
                        id="contact-phone"
                        placeholder="999 999 999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Mensaje *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Escribe tu consulta aquí..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base rounded-xl gap-2"
                  >
                    <Send className="size-4" />
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ + Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Schedule */}
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="size-5 text-primary" />
                  Horarios de Atención
                </h2>
                <Card className="border-border/50">
                  <CardContent className="p-0 divide-y divide-border/30">
                    {schedule.map((s) => (
                      <div key={s.day} className="flex items-center justify-between px-5 py-4">
                        <span className="font-medium text-sm">{s.day}</span>
                        <span className={`text-sm ${s.hours === "Cerrado" ? "text-destructive" : "text-muted-foreground"}`}>
                          {s.hours}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Location */}
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  Ubicación
                </h2>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Lima, Perú. Realizamos envíos a todo el territorio nacional con entrega puerta a puerta.
                    </p>
                    <div className="mt-4 rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="size-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground font-medium">
                          Envíos a todo Perú
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social */}
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
                  <Instagram className="size-5 text-primary" />
                  Síguenos
                </h2>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground">
                      Síguenos en redes sociales para ver nuevas colecciones, ofertas exclusivas y tips de estilo.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 border-primary/30 hover:bg-primary/5" asChild>
                      <a href="https://www.instagram.com/algodonperuano" target="_blank" rel="noopener noreferrer">
                        <Instagram className="size-4 mr-1.5" />
                        @algodonperuano
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Preguntas Frecuentes
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-5">
                        <h4 className="font-medium text-sm mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

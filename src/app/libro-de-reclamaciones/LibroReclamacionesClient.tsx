"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Building2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Calendar,
  Send,
  Printer,
  ChevronRight,
  ShieldAlert,
  Info,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function LibroReclamacionesClient() {
  const { toast } = useToast();

  // Automatic code & date
  const [claimNumber, setClaimNumber] = useState("CTG-000001-2026");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Generate date
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );

    // Get sequence from localStorage
    try {
      const savedCount = localStorage.getItem("ctg_claim_sequence");
      const nextNum = savedCount ? parseInt(savedCount, 10) + 1 : 1;
      const formatted = `CTG-${String(nextNum).padStart(6, "0")}-${now.getFullYear()}`;
      setClaimNumber(formatted);
    } catch {
      // fallback
    }
  }, []);

  // Form states
  const [fullName, setFullName] = useState("");
  const [docType, setDocType] = useState("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("Lima");
  const [province, setProvince] = useState("Lima");
  const [district, setDistrict] = useState("Miraflores");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Underage
  const [isMinor, setIsMinor] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  // Product / Service
  const [itemType, setItemType] = useState<"Producto" | "Servicio">("Producto");
  const [itemName, setItemName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [claimedAmount, setClaimedAmount] = useState("");

  // Claim details
  const [claimType, setClaimType] = useState<"RECLAMO" | "QUEJA">("RECLAMO");
  const [claimDetail, setClaimDetail] = useState("");
  const [concreteRequest, setConcreteRequest] = useState("");

  // Attachment
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  // Confirmations
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  // Submission result
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim() || !docNumber.trim() || !address.trim() || !phone.trim() || !email.trim()) {
      toast({
        title: "Campos requeridos incompletos",
        description: "Por favor completa todos tus datos personales obligatorios (*).",
        variant: "destructive",
      });
      return;
    }

    if (isMinor && !parentName.trim()) {
      toast({
        title: "Datos del apoderado requeridos",
        description: "Ingresa el nombre completo del padre, madre o representante.",
        variant: "destructive",
      });
      return;
    }

    if (!itemName.trim() || !itemDescription.trim()) {
      toast({
        title: "Identificación del bien requerida",
        description: "Indica el producto o servicio adquirido y una breve descripción.",
        variant: "destructive",
      });
      return;
    }

    if (!claimDetail.trim() || !concreteRequest.trim()) {
      toast({
        title: "Detalle de la reclamación requerida",
        description: "Escribe de forma clara qué ocurrió y qué solución solicitas.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      toast({
        title: "Confirmación obligatoria",
        description: "Debes marcar las casillas de confirmación y tratamiento de datos personales.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      code: claimNumber,
      date: currentDate,
      fullName,
      docType,
      docNumber,
      address,
      department,
      province,
      district,
      phone,
      email,
      isMinor,
      parent: isMinor ? { parentName, parentAddress, parentPhone, parentEmail } : null,
      itemType,
      itemName,
      orderNumber,
      purchaseDate,
      itemDescription,
      claimedAmount,
      claimType,
      claimDetail,
      concreteRequest,
      attachedFileName,
    };

    // Save increment in sequence
    try {
      const match = claimNumber.match(/CTG-(\d+)-/);
      if (match) {
        localStorage.setItem("ctg_claim_sequence", match[1]);
      }
      // Store record in local list
      const existing = JSON.parse(localStorage.getItem("ctg_complaints_log") || "[]");
      existing.push(payload);
      localStorage.setItem("ctg_complaints_log", JSON.stringify(existing));
    } catch {}

    setSubmittedData(payload);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    toast({
      title: "Reclamación Registrada",
      description: `Hoja de Reclamación N.° ${claimNumber} generada correctamente.`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14 bg-gradient-warm border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground font-medium">Libro de Reclamaciones</span>
          </nav>

          <div className="text-center space-y-3">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-semibold gap-1.5 border-primary/20 bg-primary/10"
            >
              <FileText className="size-3.5 text-primary" />
              Conforme a la Ley N.° 29571
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Libro de Reclamaciones <span className="text-gradient-gold">Virtual</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              En <strong>Camisas Talla Grande – CTG</strong> valoramos la confianza de nuestros clientes y estamos comprometidos con brindar productos de calidad y una atención responsable.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* SUCCESS SCREEN */}
        {isSubmitted && submittedData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <Card className="border-green-500/30 bg-green-500/5 shadow-xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="size-10" />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                TU {submittedData.claimType} HA SIDO REGISTRADO CORRECTAMENTE
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-6">
                Hemos recibido tu solicitud y se ha generado tu constancia oficial.
              </p>

              <div className="bg-card border border-border p-6 rounded-2xl max-w-md mx-auto shadow-sm space-y-2 mb-8">
                <p className="text-xs uppercase text-muted-foreground font-semibold">
                  Número de Hoja de Reclamación
                </p>
                <p className="font-mono text-2xl md:text-3xl font-extrabold text-primary">
                  {submittedData.code}
                </p>
                <p className="text-xs text-muted-foreground">
                  Fecha de Registro: <span className="font-medium text-foreground">{submittedData.date}</span>
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 text-xs text-left text-muted-foreground space-y-2 mb-8">
                <p>
                  📧 <strong>Constancia enviada:</strong> Hemos remitido una copia del registro al correo proporcionado: <span className="text-foreground font-medium">{submittedData.email}</span>.
                </p>
                <p>
                  ⏳ <strong>Plazo de respuesta:</strong> Conforme a la legislación vigente, responderemos en un plazo máximo no mayor a quince (15) días hábiles.
                </p>
                <p>
                  🔒 Conserva tu número <strong>{submittedData.code}</strong> para cualquier seguimiento o consulta.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button onClick={handlePrint} variant="outline" className="gap-2">
                  <Printer className="size-4" />
                  Imprimir / Descargar Constancia
                </Button>
                <Button asChild className="bg-primary text-primary-foreground">
                  <Link href="/">Volver al Inicio</Link>
                </Button>
              </div>
            </Card>

            {/* Printable summary */}
            <div className="p-6 border border-border rounded-2xl bg-card space-y-4 text-xs text-muted-foreground">
              <h3 className="font-bold text-sm text-foreground uppercase border-b pb-2">
                Resumen de la Reclamación Registrada
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <p><strong>Consumidor:</strong> {submittedData.fullName}</p>
                <p><strong>Documento:</strong> {submittedData.docType} {submittedData.docNumber}</p>
                <p><strong>Teléfono:</strong> {submittedData.phone}</p>
                <p><strong>Correo:</strong> {submittedData.email}</p>
                <p><strong>Dirección:</strong> {submittedData.address}, {submittedData.district}, {submittedData.province}</p>
                <p><strong>Tipo de Solicitud:</strong> <span className="font-bold text-foreground">{submittedData.claimType}</span></p>
                <p><strong>Bien Contratado:</strong> {submittedData.itemType} - {submittedData.itemName}</p>
                {submittedData.orderNumber && <p><strong>N° Pedido/Boleta:</strong> {submittedData.orderNumber}</p>}
                {submittedData.claimedAmount && <p><strong>Monto Reclamado:</strong> S/ {submittedData.claimedAmount}</p>}
              </div>
              <div className="border-t pt-2 space-y-2">
                <p><strong>Detalle:</strong> {submittedData.claimDetail}</p>
                <p><strong>Pedido Concreto:</strong> {submittedData.concreteRequest}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* FORM VIEW */
          <div className="space-y-10">
            {/* Clarification Callout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <h3 className="font-bold text-sm text-primary uppercase mb-1">
                  ¿Qué es un RECLAMO?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Disconformidad relacionada directamente con los <strong>productos o servicios</strong> adquiridos (defectos, fallas, diferencias con lo solicitado).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <h3 className="font-bold text-sm text-amber-600 dark:text-amber-400 uppercase mb-1">
                  ¿Qué es una QUEJA?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Disconformidad <strong>no relacionada directamente</strong> con el producto, sino con la atención al cliente, demoras o trato recibido.
                </p>
              </div>
            </div>

            {/* Provider Information Box */}
            <Card className="border-border/60 bg-secondary/30 shadow-sm">
              <CardContent className="p-5 md:p-6 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-2">
                  <Building2 className="size-4 text-primary" />
                  <span>DATOS DEL PROVEEDOR</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Razón Social / Titular:</span>
                    <strong className="text-foreground">Erick Alexis Chavez Rodriguez</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Nombre Comercial:</span>
                    <strong className="text-foreground">Camisas Talla Grande – CTG</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">RUC:</span>
                    <strong className="text-foreground">10099179886</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Dirección Comercial:</span>
                    <strong className="text-foreground">Av. Larco 812, Of. 201 – Miraflores, Lima</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Correo Electrónico:</span>
                    <strong className="text-foreground">ventas@camisasentallasgrandes.com</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Teléfono:</span>
                    <strong className="text-foreground">970 298 099</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-border/40 flex flex-wrap justify-between items-center text-xs text-foreground font-medium">
                  <span>Hoja de Reclamación N.°: <span className="font-mono text-primary font-bold">{claimNumber}</span></span>
                  <span>Fecha: <span className="text-muted-foreground">{currentDate}</span></span>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* SECTION 1: CONSUMER */}
              <div className="space-y-4">
                <div className="border-b border-border pb-2 flex items-center justify-between">
                  <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</span>
                    IDENTIFICACIÓN DEL CONSUMIDOR
                  </h2>
                  <span className="text-xs text-muted-foreground">(*) Campos obligatorios</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="fullName" className="text-xs font-semibold">
                      Nombres y Apellidos completos (*)
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Ej. Juan Carlos Pérez Gómez"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="docType" className="text-xs font-semibold">
                      Tipo de Documento (*)
                    </Label>
                    <select
                      id="docType"
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="DNI">DNI</option>
                      <option value="Carné de Extranjería">Carné de Extranjería</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="RUC">RUC</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="docNumber" className="text-xs font-semibold">
                      Número de Documento (*)
                    </Label>
                    <Input
                      id="docNumber"
                      placeholder="Número del documento"
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="address" className="text-xs font-semibold">
                      Domicilio (Calle, Av., N°, Dpto.) (*)
                    </Label>
                    <Input
                      id="address"
                      placeholder="Dirección completa"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="department" className="text-xs font-semibold">
                      Departamento (*)
                    </Label>
                    <Input
                      id="department"
                      placeholder="Ej. Lima, Arequipa, etc."
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="province" className="text-xs font-semibold">
                      Provincia (*)
                    </Label>
                    <Input
                      id="province"
                      placeholder="Ej. Lima, Cusco, etc."
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="district" className="text-xs font-semibold">
                      Distrito (*)
                    </Label>
                    <Input
                      id="district"
                      placeholder="Ej. Miraflores, San Isidro, etc."
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold">
                      Teléfono / Celular (*)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9 dígitos de celular"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="email" className="text-xs font-semibold">
                      Correo Electrónico (*)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com (Aquí recibirás tu constancia)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Minor Toggle */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 border border-border/50">
                    <input
                      type="checkbox"
                      id="isMinor"
                      checked={isMinor}
                      onChange={(e) => setIsMinor(e.target.checked)}
                      className="size-4 accent-primary rounded cursor-pointer"
                    />
                    <Label htmlFor="isMinor" className="text-xs font-medium cursor-pointer">
                      ¿El consumidor es menor de edad?
                    </Label>
                  </div>

                  <AnimatePresence>
                    {isMinor && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-4"
                      >
                        <p className="text-xs font-semibold text-primary">
                          Datos del padre, madre o representante legal:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="parentName" className="text-xs">
                              Nombre completo del apoderado (*)
                            </Label>
                            <Input
                              id="parentName"
                              value={parentName}
                              onChange={(e) => setParentName(e.target.value)}
                              placeholder="Nombres y apellidos del padre/madre/tutor"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="parentAddress" className="text-xs">
                              Domicilio del apoderado
                            </Label>
                            <Input
                              id="parentAddress"
                              value={parentAddress}
                              onChange={(e) => setParentAddress(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="parentPhone" className="text-xs">
                              Teléfono / Celular
                            </Label>
                            <Input
                              id="parentPhone"
                              value={parentPhone}
                              onChange={(e) => setParentPhone(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="parentEmail" className="text-xs">
                              Correo electrónico
                            </Label>
                            <Input
                              id="parentEmail"
                              type="email"
                              value={parentEmail}
                              onChange={(e) => setParentEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* SECTION 2: PRODUCT OR SERVICE */}
              <div className="space-y-4">
                <div className="border-b border-border pb-2">
                  <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</span>
                    IDENTIFICACIÓN DEL BIEN CONTRATADO
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs font-semibold block">Tipo (*)</Label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="itemType"
                          value="Producto"
                          checked={itemType === "Producto"}
                          onChange={() => setItemType("Producto")}
                          className="size-4 accent-primary"
                        />
                        <span>Producto (Camisa, etc.)</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="itemType"
                          value="Servicio"
                          checked={itemType === "Servicio"}
                          onChange={() => setItemType("Servicio")}
                          className="size-4 accent-primary"
                        />
                        <span>Servicio (Envío, confección a medida, etc.)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="itemName" className="text-xs font-semibold">
                      Producto o servicio contratado (*)
                    </Label>
                    <Input
                      id="itemName"
                      placeholder="Ej. Camisa de Vestir Blanca CTG Talla 19.5"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="orderNumber" className="text-xs">
                      N° de pedido, boleta, factura o comprobante
                    </Label>
                    <Input
                      id="orderNumber"
                      placeholder="Opcional si lo tienes a la mano"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="purchaseDate" className="text-xs">
                      Fecha de compra
                    </Label>
                    <Input
                      id="purchaseDate"
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="claimedAmount" className="text-xs">
                      Monto reclamado (S/)
                    </Label>
                    <Input
                      id="claimedAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={claimedAmount}
                      onChange={(e) => setClaimedAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="itemDescription" className="text-xs font-semibold">
                      Descripción del bien contratado (*)
                    </Label>
                    <Input
                      id="itemDescription"
                      placeholder="Ej. Modelo, color, talla, especificaciones"
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: CLAIM DETAIL */}
              <div className="space-y-4">
                <div className="border-b border-border pb-2">
                  <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</span>
                    DETALLE DE LA RECLAMACIÓN
                  </h2>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold block">
                    Tipo de Solicitud (*) — Selecciona una opción:
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        claimType === "RECLAMO"
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="claimType"
                        value="RECLAMO"
                        checked={claimType === "RECLAMO"}
                        onChange={() => setClaimType("RECLAMO")}
                        className="size-4 accent-primary mt-0.5"
                      />
                      <div>
                        <strong className="block text-sm text-foreground">RECLAMO</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Disconformidad relacionada con los productos o servicios adquiridos.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        claimType === "QUEJA"
                          ? "border-amber-500 bg-amber-500/10 shadow-sm"
                          : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="claimType"
                        value="QUEJA"
                        checked={claimType === "QUEJA"}
                        onChange={() => setClaimType("QUEJA")}
                        className="size-4 accent-amber-500 mt-0.5"
                      />
                      <div>
                        <strong className="block text-sm text-foreground">QUEJA</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Disconformidad o malestar respecto de la atención recibida.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <Label htmlFor="claimDetail" className="text-xs font-semibold">
                    Detalle del {claimType.toLowerCase()} (*)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Cuéntanos de manera clara qué ocurrió:
                  </p>
                  <Textarea
                    id="claimDetail"
                    rows={4}
                    placeholder="Describe los hechos ocurridos..."
                    value={claimDetail}
                    onChange={(e) => setClaimDetail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="concreteRequest" className="text-xs font-semibold">
                    Pedido concreto del consumidor (*)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Indícanos claramente qué solución o respuesta solicitas:
                  </p>
                  <Textarea
                    id="concreteRequest"
                    rows={3}
                    placeholder="Indica la solución requerida..."
                    value={concreteRequest}
                    onChange={(e) => setConcreteRequest(e.target.value)}
                    required
                  />
                </div>

                {/* File upload */}
                <div className="pt-2">
                  <Label className="text-xs font-semibold block mb-1">
                    Documentos de sustento (Opcional)
                  </Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Puedes adjuntar comprobantes, fotografías del producto o capturas (PDF, JPG, PNG). Límite 10MB.
                  </p>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-xs font-medium text-foreground transition-colors">
                      <Upload className="size-4 text-primary" />
                      <span>{attachedFileName ? "Cambiar archivo" : "Adjuntar archivo"}</span>
                      <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg,image/jpg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setAttachedFileName(file.name);
                        }}
                      />
                    </label>
                    {attachedFileName && (
                      <span className="text-xs text-primary font-mono truncate max-w-xs">
                        📎 {attachedFileName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 4: CONFIRMATION & TERMS */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-foreground">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="size-4 accent-primary mt-0.5 rounded cursor-pointer"
                      required
                    />
                    <span>
                      Declaro que la información consignada en esta Hoja de Reclamación corresponde a mi solicitud y confirmo la veracidad del contenido del reclamo o queja presentado. (*)
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-foreground">
                    <input
                      type="checkbox"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      className="size-4 accent-primary mt-0.5 rounded cursor-pointer"
                      required
                    />
                    <span>
                      He leído y acepto la información sobre el tratamiento de mis datos personales para la gestión, seguimiento y atención de mi reclamo o queja conforme a la legislación peruana. (*)
                    </span>
                  </label>
                </div>

                <div className="p-4 rounded-xl bg-muted/60 text-[11px] text-muted-foreground space-y-1.5">
                  <p>
                    • Una vez enviado correctamente el formulario, recibirás una copia en el correo electrónico proporcionado.
                  </p>
                  <p>
                    • Camisas Talla Grande – CTG responderá los reclamos y quejas en un plazo máximo de quince (15) días hábiles de acuerdo con la Ley N.° 29571.
                  </p>
                  <p>
                    • La presentación de un reclamo o queja no impide acudir a otras vías de solución de controversias ni constituye un requisito previo para presentar una denuncia ante INDECOPI.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground font-bold text-base py-6 rounded-xl shadow-lg hover:shadow-xl transition-all gap-2"
                >
                  <Send className="size-5" />
                  Enviar Reclamo o Queja
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

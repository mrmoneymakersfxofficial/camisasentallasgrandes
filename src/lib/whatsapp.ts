/**
 * ═══════════════════════════════════════════════════════════════
 * WhatsApp Business Helper — Camisas en Tallas Grandes (CTG)
 * ═══════════════════════════════════════════════════════════════
 *
 * SINGLE SOURCE OF TRUTH for:
 *   - WhatsApp number: +51 970 298 099
 *   - Email: ventas@camisasentallasgrandes.com
 *   - Address: Av. Larco 812 Oficina 201 - Miraflores, Lima
 *   - Message generation (product, cart, favorites, contact, sizes)
 *   - URL encoding
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Config ───────────────────────────────────────────────────
export const WHATSAPP_NUMBER = "51970298099";
export const WHATSAPP_DISPLAY = "+51 970 298 099";
export const BRAND_NAME = "CTG Camisas en Tallas Grandes";
export const STORE_EMAIL = "ventas@camisasentallasgrandes.com";
export const STORE_ADDRESS = "Av. Larco 812, Oficina / Tienda 201, Miraflores, Lima - Perú";
export const STORE_MAPS_URL = "https://maps.app.goo.gl/3iueWagVDpRMTHAA8";
export const SITE_URL = "https://www.camisasentallasgrandes.com";

export const WHATSAPP_CONFIG = {
  number: WHATSAPP_NUMBER,
  display: WHATSAPP_DISPLAY,
  getDirectUrl: (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/camisasentallasgrandes",
  tiktok: "https://www.tiktok.com/@camisasgrandesperu",
  facebook: "https://www.facebook.com/Camisasentallasgrandes",
  youtube: "https://www.youtube.com/@CamisasTallasGrandes",
  videoMedidas: "https://youtu.be/WaABMdBPABc?si=hrpEPwIqR9Ualm4h",
};

// ─── Color map (English → Spanish) ─────────────────────────────
const colorLabels: Record<string, string> = {
  navy: "Azul Formal / Marino",
  white: "Blanco Ejecutivo",
  beige: "Beige Natural",
  gray: "Gris Carbón",
  black: "Negro Elegance",
  blue: "Celeste Clásico",
  green: "Verde / Cuadros Casual",
  striped: "Rayado Azul",
  custom: "A Elección (Sastrería a Medida)",
};

function getColorLabel(color: string): string {
  return colorLabels[color] || color;
}

// ─── Types ─────────────────────────────────────────────────────
export interface WhatsAppProduct {
  name: string;
  slug?: string;
  price: number;
  color: string;
  sizes: string[];
  material: string;
  category?: string;
  style?: string;
}

export interface WhatsAppCartItem {
  name: string;
  productId: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
  color?: string;
  material?: string;
}

export interface WhatsAppFavoriteItem {
  name: string;
  slug: string;
  price: number;
  color: string;
  sizes: string[];
}

// ─── URL Builder ───────────────────────────────────────────────
export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppURL(message), "_blank");
}

// ─── Message Generators ────────────────────────────────────────

/**
 * Single product inquiry — used on product detail pages
 */
export function generateProductMessage(
  product: WhatsAppProduct,
  options: {
    size?: string;
    quantity?: number;
  } = {}
): string {
  const { size, quantity } = options;
  const qty = quantity || 1;
  const sizeText = size || "Por confirmar";
  const productUrl = product.slug
    ? `${SITE_URL}/catalogo/${product.slug}`
    : SITE_URL;

  return [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Estoy interesado en la siguiente camisa:`,
    ``,
    `👔 Producto: ${product.name}`,
    `📏 Talla elegida: ${sizeText}`,
    `🎨 Color: ${getColorLabel(product.color)}`,
    `🧵 Tela: ${product.material}`,
    `📦 Cantidad: ${qty} ${qty === 1 ? "unidad" : "unidades"}`,
    `💰 Precio unitario: S/ ${product.price.toFixed(0)}`,
    ``,
    `🔗 Enlace:`,
    productUrl,
    ``,
    `Tallas en catálogo: ${product.sizes.join(", ")}`,
    ``,
    `Agradecería información sobre:`,
    `✅ Disponibilidad inmediata`,
    `✅ Tiempo de envío (Lima / Provincia)`,
    `✅ Métodos de pago (BCP / Yape / Plin)`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * Cart checkout — multiple products with full detail
 */
export function generateCartMessage(
  items: WhatsAppCartItem[],
  customerName: string,
  customerPhone: string
): string {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const productLines = items.map((item, index) => {
    const lines = [
      `${numberEmoji(index + 1)} ${item.name}`,
      `   📏 Talla: ${item.size}`,
      `   📦 Cantidad: ${item.quantity} ${item.quantity === 1 ? "unidad" : "unidades"}`,
      `   💰 Subtotal: S/ ${(item.price * item.quantity).toFixed(0)}`,
    ];
    if (item.color) {
      lines.splice(1, 0, `   🎨 Color: ${getColorLabel(item.color)}`);
    }
    if (item.slug) {
      lines.push(`   🔗 ${SITE_URL}/catalogo/${item.slug}`);
    }
    return lines.join("\n");
  });

  return [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Deseo confirmar el siguiente pedido de camisas:`,
    ``,
    productLines.join("\n\n"),
    ``,
    `📦 Total de prendas: ${totalItems}`,
    `💰 Total a pagar: S/ ${totalPrice.toFixed(0)}`,
    ``,
    `👤 Cliente: ${customerName}`,
    `📱 Teléfono: ${customerPhone}`,
    ``,
    `Deseo coordinar:`,
    `✅ Confirmación de tallas con asesor`,
    `✅ Envío a domicilio o agencia (Shalom / Olva)`,
    `✅ Pago por Yape, BCP o Plin`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * Favorites inquiry — products the user saved
 */
export function generateFavoritesMessage(
  items: WhatsAppFavoriteItem[]
): string {
  const productLines = items.map((item, index) => {
    return [
      `${numberEmoji(index + 1)} ${item.name}`,
      `   📏 Tallas: ${item.sizes.join(", ")}`,
      `   🎨 Color: ${getColorLabel(item.color)}`,
      `   💰 Precio: S/ ${item.price.toFixed(0)}`,
      `   🔗 ${SITE_URL}/catalogo/${item.slug}`,
    ].join("\n");
  });

  return [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Tengo guardados en mis favoritos los siguientes modelos:`,
    ``,
    productLines.join("\n\n"),
    ``,
    `📦 Total de modelos: ${items.length}`,
    ``,
    `¿Me pueden orientar sobre stock y disponibilidad para mi talla?`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * Size consultation — used on tutalla page
 */
export function generateSizeHelpMessage(measures?: {
  neck?: string;
  chest?: string;
  belly?: string;
}): string {
  const lines = [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Necesito asesoría personalizada para confirmar mi talla exacta de camisa.`,
  ];

  if (measures?.neck) lines.push(`📏 Cuello: ${measures.neck} cm / pulgadas`);
  if (measures?.chest) lines.push(`📏 Pecho: ${measures.chest} cm`);
  if (measures?.belly) lines.push(`📏 Barriga / Abdomen: ${measures.belly} cm`);

  lines.push(
    ``,
    `Por favor ayúdenme a verificar según la Tabla Oficial de Medidas CTG.`,
    ``,
    `Muchas gracias.`
  );

  return lines.join("\n");
}

/**
 * General contact — CTA section, footer, etc.
 */
export function generateGeneralMessage(): string {
  return [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Deseo solicitar información y asesoría sobre sus camisas de vestir en tallas grandes (18.5 a 22.5).`,
    ``,
    `Agradecería información sobre:`,
    `✅ Modelos disponibles en 100% algodón`,
    `✅ Tabla de medidas y asesoría de calce`,
    `✅ Visita a la tienda en Miraflores o envíos a todo el Perú`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * Contact form submission — from contacto page
 */
export function generateContactMessage(data: {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}): string {
  return [
    `📞 *Nuevo mensaje de contacto web — CTG*`,
    ``,
    `👤 *Nombre:* ${data.name}`,
    data.email ? `📧 *Email:* ${data.email}` : "",
    data.phone ? `📱 *Teléfono:* ${data.phone}` : "",
    ``,
    `💬 *Mensaje:*\n${data.message}`,
    ``,
    `Agradecería su pronta respuesta. ¡Muchas gracias!`,
  ].filter(Boolean).join("\n");
}

// ─── Utility ──────────────────────────────────────────────────
function numberEmoji(n: number): string {
  const emojis = ["", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  return n >= 1 && n <= 10 ? emojis[n] : `${n}.`;
}

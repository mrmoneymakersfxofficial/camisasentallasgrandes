/**
 * ═══════════════════════════════════════════════════════════════
 * WhatsApp Business Helper — Algodón Peruano (CTG)
 * ═══════════════════════════════════════════════════════════════
 *
 * SINGLE SOURCE OF TRUTH for:
 *   - WhatsApp number
 *   - Message generation (product, cart, favorites, contact)
 *   - URL encoding
 *
 * ALL WhatsApp CTAs in the site MUST use these helpers.
 * Never hardcode the number or build messages inline.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Config ───────────────────────────────────────────────────
export const WHATSAPP_NUMBER = "51970298099";
export const WHATSAPP_DISPLAY = "+51 970 298 099";
export const BRAND_NAME = "Algodón Peruano";
export const SITE_URL = "https://camisasentallasgrandes.vercel.app";

// ─── Color map (English → Spanish) ─────────────────────────────
const colorLabels: Record<string, string> = {
  navy: "Navy",
  white: "Blanco",
  beige: "Beige",
  gray: "Gris Carbón",
  black: "Negra",
  blue: "Celeste",
  striped: "Rayada Azul",
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
 * Super personalized with full product info
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
    `Estoy interesado en la siguiente prenda:`,
    ``,
    `👔 Producto: ${product.name}`,
    `📏 Talla: ${sizeText}`,
    `🎨 Color: ${getColorLabel(product.color)}`,
    `🧵 Tela: ${product.material}`,
    `📦 Cantidad: ${qty} ${qty === 1 ? "unidad" : "unidades"}`,
    `💰 Precio unitario: S/ ${product.price.toFixed(0)}`,
    ``,
    `🔗 Producto:`,
    productUrl,
    ``,
    `📏 Tallas disponibles: ${product.sizes.join(", ")}`,
    ``,
    `Agradecería información sobre:`,
    ``,
    `✅ Disponibilidad`,
    `✅ Precio final`,
    `✅ Tiempo de entrega`,
    `✅ Opciones de pago`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * Cart checkout — multiple products with full detail
 * Professional order-style message
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
    `Deseo cotizar los siguientes productos:`,
    ``,
    productLines.join("\n\n"),
    ``,
    `📦 Total de prendas: ${totalItems}`,
    `💰 Total estimado: S/ ${totalPrice.toFixed(0)}`,
    ``,
    `👤 Cliente: ${customerName}`,
    `📱 Teléfono: ${customerPhone}`,
    ``,
    `Agradecería información sobre:`,
    ``,
    `✅ Cotización con precios finales`,
    `✅ Disponibilidad de stock`,
    `✅ Tiempo de entrega`,
    `✅ Opciones de pago (Yape / Plin / Transferencia)`,
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
    `Estoy interesado en los siguientes productos que guardé como favoritos:`,
    ``,
    productLines.join("\n\n"),
    ``,
    `📦 Total de productos: ${items.length}`,
    ``,
    `Agradecería información sobre:`,
    ``,
    `✅ Disponibilidad`,
    `✅ Precio final`,
    `✅ Tiempo de entrega`,
    `✅ Opciones de pago`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * Size consultation — used on tutalla page
 */
export function generateSizeHelpMessage(chestCm?: string): string {
  const chestLine = chestCm
    ? `📏 Mi contorno de pecho es: ${chestCm} cm`
    : "";

  return [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Necesito ayuda para encontrar mi talla perfecta.`,
    chestLine,
    ``,
    `Podrían orientarme con la Tabla de Medidas CTG.`,
    ``,
    `Muchas gracias.`,
  ].join("\n");
}

/**
 * General contact — CTA section, footer, etc.
 */
export function generateGeneralMessage(): string {
  return [
    `👋 Hola, ${BRAND_NAME}.`,
    ``,
    `Me gustaría obtener más información sobre sus camisas premium en tallas grandes.`,
    ``,
    `📦 Tallas: 18.5 — 22.5`,
    `🧵 100% Algodón Peruano`,
    ``,
    `Agradecería información sobre:`,
    `✅ Catálogo completo`,
    `✅ Precios`,
    `✅ Envíos`,
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
    `📞 *Nuevo mensaje de contacto*`,
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

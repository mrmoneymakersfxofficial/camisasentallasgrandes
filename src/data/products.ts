// Static product data — Camisas en Tallas Grandes (CTG) / Antobelly
// All product data is committed to the repo as TypeScript

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: "vestir" | "casual" | "etiqueta" | "medida";
  style: string;
  color: string;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  image: string;
  material: string;
  care: string;
  collarType?: string;
  pocket?: string;
  cuffType?: string;
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  {
    id: "ctg_01",
    slug: "camisa-vestir-blanca-ejecutiva-ctg",
    name: "Camisa de Vestir Blanca Ejecutiva CTG",
    description:
      "La camisa blanca imprescindible de nuestra colección. Confeccionada en 100% algodón peruano de máxima calidad, suave, fresco y transpirable. Cuenta con nuestro exclusivo cuello bajo y cómodo que no aprieta la garganta, presillas ocultas para mantenerlo siempre firme, diseño limpio sin bolsillo en el pecho para una caída estilizada y largo delantero y posterior superior que evita que la camisa se salga del pantalón.",
    price: 129.0,
    currency: "PEN",
    category: "vestir",
    style: "Camisa de Vestir",
    color: "white",
    sizes: ["18.5 (2XL)", "19.5 (3XL)", "20.5 (4XL)", "21.5 (5XL)", "22.5 (6XL)"],
    inStock: true,
    featured: true,
    image: "/images/modelos/modelo-blanca-formal.png",
    material: "100% Algodón Peruano Premium",
    care: "Lavar a mano o máquina en ciclo delicado con agua fría (máx 30°C). Secar al aire libre a la sombra en percha. Planchar ligeramente húmeda a temperatura media-alta.",
    collarType: "Cuello bajo y cómodo con presillas ocultas",
    pocket: "Sin bolsillo en el pecho",
    cuffType: "Puño tradicional ajustable",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    id: "ctg_02",
    slug: "camisa-vestir-celeste-clasica-ctg",
    name: "Camisa de Vestir Celeste Clásica CTG",
    description:
      "Camisa formal celeste en 100% algodón peruano de hilado fino y textura distinguida. Molde anatómico proporcional diseñado para caballeros de espalda y tórax ancho. Confort total durante extensas jornadas de oficina o reuniones de negocios, manteniendo siempre un calce prolijo.",
    price: 129.0,
    currency: "PEN",
    category: "vestir",
    style: "Camisa de Vestir",
    color: "blue",
    sizes: ["18.5 (2XL)", "19.5 (3XL)", "20.5 (4XL)", "21.5 (5XL)", "22.5 (6XL)"],
    inStock: true,
    featured: true,
    image: "/images/ctg-celeste-1.png",
    material: "100% Algodón Peruano",
    care: "Lavar con agua fría en ciclo suave. No usar secadora ni blanqueador. Secado a la sombra.",
    collarType: "Cuello bajo confortable",
    pocket: "Sin bolsillo frontal",
    cuffType: "Puño tradicional de botón",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    id: "ctg_03",
    slug: "camisa-vestir-azul-frances-gemelos-ctg",
    name: "Camisa Azul Formal con Puño Francés para Gemelos CTG",
    description:
      "Diseñada especialmente para eventos de gala, matrimonios y citas de etiqueta. Confeccionada en 100% algodón peruano con puños franceses dobles para uso con gemelos (cufflinks). Su corte estructurado brinda presencia, solidez y elegancia insuperable a hombres de talla grande.",
    price: 139.0,
    currency: "PEN",
    category: "vestir",
    style: "Camisa Formal de Gala",
    color: "navy",
    sizes: ["18.5 (2XL)", "19.5 (3XL)", "20.5 (4XL)", "21.5 (5XL)", "22.5 (6XL)"],
    inStock: true,
    featured: true,
    image: "/images/modelos/modelo-azul-gemelos.png",
    material: "100% Algodón Peruano de Alta Densidad",
    care: "Lavar a mano o lavado suave en frío. Planchar con vapor del revés cuidando los puños dobles.",
    collarType: "Cuello camisero estructurado",
    pocket: "Sin bolsillo (pecho limpio)",
    cuffType: "Puño Francés doble para gemelos",
    createdAt: "2025-01-20T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    id: "ctg_04",
    slug: "camisa-vestir-negra-elegance-ctg",
    name: "Camisa de Vestir Negra Elegance CTG",
    description:
      "Sofisticación pura en negro profundo. El tinte reactivo de alta fijación sobre 100% algodón peruano asegura que el tono negro se mantenga intenso y uniforme con el paso del tiempo. Ideal para cenas formales, eventos nocturnos o reuniones corporativas.",
    price: 129.0,
    currency: "PEN",
    category: "vestir",
    style: "Camisa de Vestir",
    color: "black",
    sizes: ["18.5 (2XL)", "19.5 (3XL)", "20.5 (4XL)", "21.5 (5XL)", "22.5 (6XL)"],
    inStock: true,
    featured: true,
    image: "/images/modelos/modelo-negra-formal.png",
    material: "100% Algodón Peruano",
    care: "Lavar siempre al revés en agua fría. Secar en sombra para preservar la intensidad del tono negro.",
    collarType: "Cuello bajo anatómico",
    pocket: "Diseño limpio sin bolsillo",
    cuffType: "Puño de botón",
    createdAt: "2025-01-25T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    id: "ctg_05",
    slug: "camisa-casual-manga-larga-cuadros-ctg",
    name: "Camisa Casual Manga Larga a Cuadros CTG",
    description:
      "El equilibrio ideal entre frescura y porte ejecutivo para el fin de semana o reuniones informales. Diseñada para lucirse con mangas remangadas a la altura del antebrazo, sin exceso de tela ni bultos molestos. Pecho limpio sin bolsillo que permite que el patrón a cuadros destaque con total dinamismo.",
    price: 119.0,
    currency: "PEN",
    category: "casual",
    style: "Camisa Casual",
    color: "green",
    sizes: ["18.5 (2XL)", "19.5 (3XL)", "20.5 (4XL)", "21.5 (5XL)", "22.5 (6XL)"],
    inStock: true,
    featured: true,
    image: "/images/blog/blog-casual-presencia.png",
    material: "100% Algodón Peruano Suave",
    care: "Lavado a máquina ciclo suave en agua fría. Secado a la sombra. Planchado rápido.",
    collarType: "Cuello relajado funcional",
    pocket: "Sin bolsillo de pecho",
    cuffType: "Puño remangable confortable",
    createdAt: "2025-02-01T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    id: "ctg_06",
    slug: "camisa-etiqueta-esmoquin-ctg",
    name: "Camisa de Etiqueta y Esmoquin Especial CTG",
    description:
      "Camisa para trajes de etiqueta, smokings y eventos de alta gala formal. Confección artesanal en algodón peruano de lujo con pechera especial y puño francés. Acompaña con armonía y prestancia a ternos y smokings Antobelly.",
    price: 149.0,
    currency: "PEN",
    category: "etiqueta",
    style: "Camisa de Esmoquin",
    color: "white",
    sizes: ["18.5 (2XL)", "19.5 (3XL)", "20.5 (4XL)", "21.5 (5XL)", "22.5 (6XL)"],
    inStock: true,
    featured: false,
    image: "/images/ctg-blanca-1.png",
    material: "100% Algodón Pima Peruano de Hilado Fino",
    care: "Lavado profesional o a mano con sumo cuidado. Planchar con vapor protector.",
    collarType: "Cuello esmoquin / palomita o camisero formal",
    pocket: "Sin bolsillo",
    cuffType: "Puño Francés para gemelos",
    createdAt: "2025-02-10T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    id: "ctg_07",
    slug: "confeccion-camisa-a-medida-antobelly",
    name: "Confección de Camisa a Medida Antobelly / CTG",
    description:
      "Servicio de sastrería personalizada respaldado por más de 15 años de maestría de Antobelly en Miraflores. Selecciona entre los mejores tejidos de algodón peruano e italiano. Tomamos tus medidas exactas de cuello, hombros, pecho, abdomen, largo y brazos para confeccionar la camisa perfecta adaptada a tu anatomía.",
    price: 180.0,
    currency: "PEN",
    category: "medida",
    style: "Sastrería a Medida",
    color: "custom",
    sizes: ["A Medida Personalizada"],
    inStock: true,
    featured: false,
    image: "/images/ctg-azul-1.png",
    material: "Algodón Peruano e Italiano Seleccionado",
    care: "Instrucciones personalizadas según el tejido seleccionado.",
    collarType: "Personalizado al gusto del cliente",
    pocket: "A elección (con o sin bolsillo)",
    cuffType: "A elección (botón o puño francés)",
    createdAt: "2025-02-15T10:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
];

// ─── Helper functions (pure, no DB) ──────────────────────────────────

export function getAllProducts(options?: {
  category?: string;
  featured?: boolean;
}): Product[] {
  let filtered = [...products];
  if (options?.category && options.category !== "all") {
    filtered = filtered.filter((p) => p.category === options.category);
  }
  if (options?.featured !== undefined) {
    filtered = filtered.filter((p) => p.featured === options.featured);
  }
  return filtered;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}

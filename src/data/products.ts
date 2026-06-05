// Static product data — No database required for Vercel deployment
// All product data is committed to the repo as TypeScript

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  style: string;
  color: string;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  image: string;
  material: string;
  care: string;
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  {
    id: "prod_01",
    slug: "polo-casual-navy",
    name: "Polo Casual Navy Premium",
    description:
      "Polo de algodón pima peruano en navy profundo. Corte relajado pensado para comodidad y estilo. Tejido suave con acabado premium que respeta tu silueta. Ideal para un look casual elegante.",
    price: 89.9,
    currency: "PEN",
    category: "casual",
    style: "Polo",
    color: "navy",
    sizes: ["2XL", "3XL", "4XL", "5XL"],
    inStock: true,
    featured: true,
    image: "/images/products/casual-polo-navy.png",
    material: "100% Algodón Pima Peruano",
    care: "Lavar a mano o máquina en ciclo suave. Secar a la sombra.",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_02",
    slug: "casual-tee-white",
    name: "T-Shirt Clásica Blanca",
    description:
      "Camiseta básica premium en algodón 100% peruano. Corte oversized con caída perfecta. El esencial que todo hombre necesita en su armario. Suave al tacto y resistente al uso frecuente.",
    price: 69.9,
    currency: "PEN",
    category: "casual",
    style: "T-Shirt",
    color: "white",
    sizes: ["2XL", "3XL", "4XL", "5XL", "6XL"],
    inStock: true,
    featured: true,
    image: "/images/products/casual-tee-white.png",
    material: "100% Algodón Peruano",
    care: "Lavar a máquina en ciclo suave. No usar blanqueador.",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_03",
    slug: "casual-linen-beige",
    name: "Camisa Linzo Beige",
    description:
      "Camisa de estilo lino en tono beige natural. Perfecta para días cálidos con un look sofisticado. Transpirable y elegante, con botones de calidad premium.",
    price: 99.9,
    currency: "PEN",
    category: "casual",
    style: "Camisa Lino",
    color: "beige",
    sizes: ["2XL", "3XL", "4XL"],
    inStock: true,
    featured: false,
    image: "/images/products/casual-linen-beige.png",
    material: "100% Algodón Peruano (estilo lino)",
    care: "Lavar a mano. Planchar a temperatura media.",
    createdAt: "2025-01-20T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_04",
    slug: "casual-polo-gray",
    name: "Polo Casual Gris Carbón",
    description:
      "Polo de piqué de algodón en gris carbón elegante. Versátil para cualquier ocasión casual. Costuras reforzadas y acabado impecable que dura.",
    price: 89.9,
    currency: "PEN",
    category: "casual",
    style: "Polo",
    color: "gray",
    sizes: ["2XL", "3XL", "4XL", "5XL"],
    inStock: true,
    featured: false,
    image: "/images/products/casual-polo-gray.png",
    material: "100% Algodón Pima Peruano",
    care: "Lavar a máquina en ciclo suave. Secar a la sombra.",
    createdAt: "2025-01-25T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_05",
    slug: "casual-henley-black",
    name: "Henley Negra Premium",
    description:
      "Camisa henley en negro intenso con detalles de botones. Un básico moderno con personalidad. Algodón peruano ultra suave con corte favorecedor para tallas grandes.",
    price: 79.9,
    currency: "PEN",
    category: "casual",
    style: "Henley",
    color: "black",
    sizes: ["2XL", "3XL", "4XL", "5XL", "6XL"],
    inStock: true,
    featured: true,
    image: "/images/products/casual-henley-black.png",
    material: "100% Algodón Peruano",
    care: "Lavar a máquina en agua fría. No usar blanqueador.",
    createdAt: "2025-02-01T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_06",
    slug: "dress-shirt-blue",
    name: "Camisa Formal Celeste",
    description:
      "Camisa de vestir en celeste clásico. Cuello corte italiano con puños de botón. Algodón peruano de hilado fino para un look ejecutivo impecable. Perfecta para la oficina o eventos formales.",
    price: 119.9,
    currency: "PEN",
    category: "vestir",
    style: "Camisa Formal",
    color: "blue",
    sizes: ["2XL", "3XL", "4XL"],
    inStock: true,
    featured: true,
    image: "/images/products/dress-shirt-blue.png",
    material: "100% Algodón Pima Peruano",
    care: "Lavar a mano preferentemente. Planchar a temperatura media.",
    createdAt: "2025-02-10T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_07",
    slug: "dress-shirt-white",
    name: "Camisa Formal Blanca Ejecutiva",
    description:
      "La camisa blanca definitiva. Algodón pima peruano premium con acabado antiarrugas natural. Cuello estructurado y corte slim-plus que favorece sin apretar. Esencial en todo guardarropa profesional.",
    price: 129.9,
    currency: "PEN",
    category: "vestir",
    style: "Camisa Formal",
    color: "white",
    sizes: ["2XL", "3XL", "4XL", "5XL"],
    inStock: true,
    featured: true,
    image: "/images/products/dress-shirt-white.png",
    material: "100% Algodón Pima Peruano",
    care: "Lavar a mano. Planchar con vapor.",
    createdAt: "2025-02-15T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
  {
    id: "prod_08",
    slug: "dress-shirt-striped",
    name: "Camisa Formal Rayada Azul",
    description:
      "Camisa de vestir con rayas finas en azul y blanco. Un toque de personalidad para el look de oficina. Algodón peruano suave con corte comfortable para hombre plus size.",
    price: 119.9,
    currency: "PEN",
    category: "vestir",
    style: "Camisa Formal",
    color: "striped",
    sizes: ["2XL", "3XL", "4XL"],
    inStock: true,
    featured: false,
    image: "/images/products/dress-shirt-striped.png",
    material: "100% Algodón Peruano",
    care: "Lavar a mano o máquina delicada. Secar al aire.",
    createdAt: "2025-02-20T10:00:00.000Z",
    updatedAt: "2025-06-01T12:00:00.000Z",
  },
];

// ─── Helper functions (pure, no DB) ──────────────────────────────────

export function getAllProducts(options?: {
  category?: string;
  featured?: boolean;
}): Product[] {
  let filtered = [...products];
  if (options?.category) {
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

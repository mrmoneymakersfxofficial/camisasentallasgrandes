import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.order.deleteMany();
  await prisma.siteContent.deleteMany();
  await prisma.product.deleteMany();

  // Seed products
  const products = [
    {
      slug: "polo-casual-navy",
      name: "Polo Casual Navy Premium",
      description: "Polo de algodón pima peruano en navy profundo. Corte relajado pensado para comodidad y estilo. Tejido suave con acabado premium que respeta tu silueta. Ideal para un look casual elegante.",
      price: 89.90,
      category: "casual",
      style: "Polo",
      color: "Navy",
      sizes: '["2XL","3XL","4XL","5XL"]',
      featured: true,
      image: "/images/products/casual-polo-navy.png",
      material: "100% Algodón Pima Peruano",
      care: "Lavar a mano o máquina en ciclo suave. Secar a la sombra."
    },
    {
      slug: "casual-tee-white",
      name: "T-Shirt Clásica Blanca",
      description: "Camiseta básica premium en algodón 100% peruano. Corte oversized con caída perfecta. El esencial que todo hombre necesita en su armario. Suave al tacto y resistente al uso frecuente.",
      price: 69.90,
      category: "casual",
      style: "T-Shirt",
      color: "Blanco",
      sizes: '["2XL","3XL","4XL","5XL","6XL"]',
      featured: true,
      image: "/images/products/casual-tee-white.png",
      material: "100% Algodón Peruano",
      care: "Lavar a máquina en ciclo suave. No usar blanqueador."
    },
    {
      slug: "casual-linen-beige",
      name: "Camisa Linzo Beige",
      description: "Camisa de estilo lino en tono beige natural. Perfecta para días cálidos con un look sofisticado. Transpirable y elegante, con botones de calidad premium.",
      price: 99.90,
      category: "casual",
      style: "Camisa Lino",
      color: "Beige",
      sizes: '["2XL","3XL","4XL"]',
      featured: false,
      image: "/images/products/casual-linen-beige.png",
      material: "100% Algodón Peruano (estilo lino)",
      care: "Lavar a mano. Planchar a temperatura media."
    },
    {
      slug: "casual-polo-gray",
      name: "Polo Casual Gris Carbón",
      description: "Polo de piqué de algodón en gris carbón elegante. Versátil para cualquier ocasión casual. Costuras reforzadas y acabado impecable que dura.",
      price: 89.90,
      category: "casual",
      style: "Polo",
      color: "Gris Carbón",
      sizes: '["2XL","3XL","4XL","5XL"]',
      featured: false,
      image: "/images/products/casual-polo-gray.png",
      material: "100% Algodón Pima Peruano",
      care: "Lavar a máquina en ciclo suave. Secar a la sombra."
    },
    {
      slug: "casual-henley-black",
      name: "Henley Negra Premium",
      description: "Camisa henley en negro intenso con detalles de botones. Un básico moderno con personalidad. Algodón peruano ultra suave con corte favorecedor para tallas grandes.",
      price: 79.90,
      category: "casual",
      style: "Henley",
      color: "Negro",
      sizes: '["2XL","3XL","4XL","5XL","6XL"]',
      featured: true,
      image: "/images/products/casual-henley-black.png",
      material: "100% Algodón Peruano",
      care: "Lavar a máquina en agua fría. No usar blanqueador."
    },
    {
      slug: "dress-shirt-blue",
      name: "Camisa Formal Celeste",
      description: "Camisa de vestir en celeste clásico. Cuello corte italiano con puños de botón. Algodón peruano de hilado fino para un look ejecutivo impecable. Perfecta para la oficina o eventos formales.",
      price: 119.90,
      category: "vestir",
      style: "Camisa Formal",
      color: "Celeste",
      sizes: '["2XL","3XL","4XL"]',
      featured: true,
      image: "/images/products/dress-shirt-blue.png",
      material: "100% Algodón Pima Peruano",
      care: "Lavar a mano preferentemente. Planchar a temperatura media."
    },
    {
      slug: "dress-shirt-white",
      name: "Camisa Formal Blanca Ejecutiva",
      description: "La camisa blanca definitiva. Algodón pima peruano premium con acabado antiarrugas natural. Cuello estructurado y corte slim-plus que favorece sin apretar. Esencial en todo guardarropa profesional.",
      price: 129.90,
      category: "vestir",
      style: "Camisa Formal",
      color: "Blanco",
      sizes: '["2XL","3XL","4XL","5XL"]',
      featured: true,
      image: "/images/products/dress-shirt-white.png",
      material: "100% Algodón Pima Peruano",
      care: "Lavar a mano. Planchar con vapor."
    },
    {
      slug: "dress-shirt-striped",
      name: "Camisa Formal Rayada Azul",
      description: "Camisa de vestir con rayas finas en azul y blanco. Un toque de personalidad para el look de oficina. Algodón peruano suave con corte comfortable para hombre plus size.",
      price: 119.90,
      category: "vestir",
      style: "Camisa Formal",
      color: "Azul Rayado",
      sizes: '["2XL","3XL","4XL"]',
      featured: false,
      image: "/images/products/dress-shirt-striped.png",
      material: "100% Algodón Peruano",
      care: "Lavar a mano o máquina delicada. Secar al aire."
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  // Seed site content (CMS editable content)
  const siteContent = [
    { key: "hero_title", value: "Algodón Peruano de Lujo", type: "text" },
    { key: "hero_subtitle", value: "Camisas Premium para Hombre Plus Size", type: "text" },
    { key: "hero_cta", value: "Ver Catálogo", type: "text" },
    { key: "hero_description", value: "Descubre nuestra colección exclusiva de camisas 100% algodón peruano, diseñadas con la mejor calidad para hombres que merecen comodidad y estilo sin compromisos.", type: "text" },
    { key: "brand_name", value: "ALGODÓN PERUANO", type: "text" },
    { key: "whatsapp_number", value: "51999999999", type: "text" },
    { key: "about_title", value: "Nuestra Historia", type: "text" },
    { key: "about_text", value: "Nacimos de la pasión por ofrecer al hombre plus size prendas de calidad premium que realmente le queden bien. Trabajamos directamente con productores de algodón peruano para garantizar la mejor fibra del mundo en cada una de nuestras camisas.", type: "text" },
    { key: "quality_title", value: "Calidad Incomparable", type: "text" },
    { key: "quality_text", value: "Cada camisa es el resultado de meses de desarrollo enfocado en tallas grandes. Probamos cada modelo con clientes reales para asegurar el ajuste perfecto, la máxima comodidad y un estilo que te haga sentir seguro.", type: "text" },
    { key: "shipping_info", value: "Envíos a todo Lima metropolitana. Delivery en 24-48 horas hábiles. Envíos a provincias en 3-5 días hábiles.", type: "text" },
    { key: "payment_methods", value: "Aceptamos Yape, Plin y transferencia bancaria. Pagos seguros y fáciles.", type: "text" },
  ];

  for (const content of siteContent) {
    await prisma.siteContent.create({ data: content });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = {};
    if (category && (category === "casual" || category === "vestir")) {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    const parsedProducts = products.map((product) => ({
      ...product,
      sizes: JSON.parse(product.sizes),
    }));

    return NextResponse.json(parsedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

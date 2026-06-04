import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, items, total } = body;

    if (!customerName || !customerPhone || !items || !total) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const order = await db.order.create({
      data: {
        customerName,
        customerPhone,
        items: JSON.stringify(items),
        total: parseFloat(total.toString()),
        status: "pending",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error al crear el pedido" },
      { status: 500 }
    );
  }
}

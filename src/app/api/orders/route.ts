import { NextResponse } from "next/server";

// Orders are handled via WhatsApp — this endpoint logs the order data
// In production, connect to a real DB (Turso, Neon, etc.) or a third-party service
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

    // In production, save to a database. For now, return success
    // and let WhatsApp handle the actual order flow.
    const order = {
      id: `ord_${Date.now()}`,
      customerName,
      customerPhone,
      items,
      total: parseFloat(total.toString()),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error al crear el pedido" },
      { status: 500 }
    );
  }
}

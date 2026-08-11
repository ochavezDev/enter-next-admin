import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { esConflictoDeEmail } from "./errors";
import { clienteSchema } from "./schema";

export async function GET() {
  try {
    const clientes = await db.cliente.findMany({
      orderBy: { nombre: "asc" },
    });
    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Error al listar clientes:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "El cuerpo de la solicitud no es JSON válido" },
        { status: 400 },
      );
    }

    const parsed = clienteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Datos inválidos",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const cliente = await db.cliente.create({
      data: parsed.data,
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: esConflictoDeEmail(error)
            ? "Ya existe un cliente con ese email"
            : "Ya existe un cliente con ese documento",
        },
        { status: 409 },
      );
    }
    console.error("Error al crear cliente:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

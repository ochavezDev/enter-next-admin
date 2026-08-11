import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { esConflictoDeEmail } from "../errors";
import { clienteUpdateSchema } from "../schema";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const cliente = await db.cliente.findUnique({ where: { id } });
    if (!cliente) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "El cuerpo de la solicitud no es JSON válido" },
        { status: 400 },
      );
    }

    const parsed = clienteUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Datos inválidos",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { message: "No se enviaron campos para actualizar" },
        { status: 400 },
      );
    }

    const existe = await db.cliente.findUnique({ where: { id } });
    if (!existe) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 },
      );
    }

    const cliente = await db.cliente.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(cliente);
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
    console.error("Error al actualizar cliente:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const existe = await db.cliente.findUnique({ where: { id } });
    if (!existe) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 },
      );
    }
    const cliente = await db.cliente.delete({ where: { id } });
    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

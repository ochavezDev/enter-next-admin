import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { subirImagen } from "@/lib/cloudinary";
import { validarImagen } from "@/lib/image";
import { blogSchema } from "./schema";

export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { fechaPublicacion: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error al listar blogs:", error);
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

    const parsed = blogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Datos inválidos",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    let imagen: string | null = null;
    if (parsed.data.imagen) {
      const validacion = validarImagen(parsed.data.imagen);
      if (!validacion.ok) {
        return NextResponse.json(
          { message: validacion.message },
          { status: 400 },
        );
      }

      try {
        imagen = await subirImagen(parsed.data.imagen);
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        return NextResponse.json(
          { message: "Error al subir la imagen" },
          { status: 400 },
        );
      }
    }

    const blog = await db.blog.create({
      data: {
        titulo: parsed.data.titulo,
        contenido: parsed.data.contenido,
        autor: parsed.data.autor,
        fechaPublicacion: parsed.data.fechaPublicacion,
        estado: parsed.data.estado,
        imagen,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Ya existe un blog con ese título" },
        { status: 409 },
      );
    }
    console.error("Error al crear blog:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

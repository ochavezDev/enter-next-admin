import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { eliminarImagen, subirImagen } from "@/lib/cloudinary";
import { validarImagen } from "@/lib/image";
import { esConflictoDeTitulo } from "../errors";
import { blogUpdateSchema } from "../schema";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const blog = await db.blog.findUnique({ where: { id } });
    if (!blog) {
      return NextResponse.json(
        { message: "Blog no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error al obtener blog:", error);
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

    const parsed = blogUpdateSchema.safeParse(body);
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

    const existe = await db.blog.findUnique({ where: { id } });
    if (!existe) {
      return NextResponse.json(
        { message: "Blog no encontrado" },
        { status: 404 },
      );
    }

    const data: Record<string, unknown> = { ...parsed.data };

    let imagenNueva: string | null | undefined;
    if ("imagen" in parsed.data) {
      if (parsed.data.imagen) {
        const validacion = validarImagen(parsed.data.imagen);
        if (!validacion.ok) {
          return NextResponse.json(
            { message: validacion.message },
            { status: 400 },
          );
        }

        try {
          imagenNueva = await subirImagen(parsed.data.imagen);
        } catch (error) {
          console.error("Error al subir la imagen a Cloudinary:", error);
          return NextResponse.json(
            { message: "Error al subir la imagen" },
            { status: 400 },
          );
        }
      } else {
        imagenNueva = null;
      }
      data.imagen = imagenNueva;
    }

    const blog = await db.blog.update({
      where: { id },
      data: {
        ...(data.titulo !== undefined && { titulo: data.titulo as string }),
        ...(data.contenido !== undefined && {
          contenido: data.contenido as string,
        }),
        ...(data.autor !== undefined && { autor: data.autor as string }),
        ...(data.fechaPublicacion !== undefined && {
          fechaPublicacion: data.fechaPublicacion as Date,
        }),
        ...(data.estado !== undefined && {
          estado: data.estado as "Publicado" | "Borrador",
        }),
        ...(data.imagen !== undefined && {
          imagen: data.imagen as string | null,
        }),
      },
    });

    if ("imagen" in parsed.data && existe.imagen && imagenNueva !== existe.imagen) {
      await eliminarImagen(existe.imagen).catch((error) => {
        console.error("Error al eliminar la imagen anterior:", error);
      });
    }

    return NextResponse.json(blog);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: esConflictoDeTitulo(error)
            ? "Ya existe un blog con ese título"
            : "El blog ya existe",
        },
        { status: 409 },
      );
    }
    console.error("Error al actualizar blog:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const existe = await db.blog.findUnique({ where: { id } });
    if (!existe) {
      return NextResponse.json(
        { message: "Blog no encontrado" },
        { status: 404 },
      );
    }
    const blog = await db.blog.delete({ where: { id } });

    if (blog.imagen) {
      await eliminarImagen(blog.imagen).catch((error) => {
        console.error("Error al eliminar la imagen en Cloudinary:", error);
      });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error al eliminar blog:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

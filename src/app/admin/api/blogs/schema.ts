import { z } from "zod";

const blogFields = z.object({
  titulo: z
    .string()
    .trim()
    .min(10, "El título debe tener al menos 10 caracteres"),
  contenido: z
    .string()
    .trim()
    .min(50, "El contenido debe tener al menos 50 caracteres"),
  autor: z.string().trim().min(5, "El autor debe tener al menos 5 caracteres"),
  fechaPublicacion: z.coerce.date({
    error: "La fecha de publicación no es válida",
  }),
  estado: z.enum(["Publicado", "Borrador"]).optional(),
  imagen: z.string().trim().optional(),
});

export const blogSchema = blogFields;

export const blogUpdateSchema = blogFields.partial();

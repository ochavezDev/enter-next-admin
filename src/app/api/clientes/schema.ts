import { z } from "zod";

const clienteFields = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z.string().trim().email("El email no tiene un formato válido"),
  telefono: z
    .string()
    .trim()
    .regex(/^\+?[\d\s().-]{6,20}$/, "El teléfono no tiene un formato válido"),
  tipoDocumento: z.enum(["DNI", "RUC"]),
  numeroDocumento: z
    .string()
    .trim()
    .regex(/^\d+$/, "El número de documento solo puede contener dígitos"),
  direccion: z.string().trim().min(1, "La dirección es obligatoria"),
  estado: z.enum(["Activo", "Inactivo"]).optional(),
});

function validarDocumento(
  data: {
    tipoDocumento?: "DNI" | "RUC";
    numeroDocumento?: string;
  },
  ctx: z.RefinementCtx,
) {
  if (!data.tipoDocumento || !data.numeroDocumento) {
    return;
  }
  const esperado = data.tipoDocumento === "DNI" ? 8 : 11;
  if (data.numeroDocumento.length !== esperado) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["numeroDocumento"],
      message: `El ${data.tipoDocumento} debe tener exactamente ${esperado} dígitos`,
    });
  }
}

export const clienteSchema = clienteFields.superRefine(validarDocumento);

export const clienteUpdateSchema = clienteFields
  .partial()
  .superRefine(validarDocumento);

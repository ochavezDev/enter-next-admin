import { Prisma } from "@/generated/prisma/client";

export function esConflictoDeEmail(error: unknown): boolean {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false;
  }
  const meta = error.meta;
  const target = meta?.target;
  if (Array.isArray(target)) {
    return target.includes("email");
  }
  const adapterError = meta?.driverAdapterError as
    | { cause?: { constraint?: { fields?: unknown } } }
    | undefined;
  const fields = adapterError?.cause?.constraint?.fields;
  return Array.isArray(fields) && fields.includes("email");
}

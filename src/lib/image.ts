export const IMAGEN_MAX_BYTES = 5 * 1024 * 1024;

const MIME_PERMITIDOS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
};

export type ResultadoValidacionImagen =
  | { ok: true; buffer: Buffer; mime: string }
  | { ok: false; message: string };

export function validarImagen(dataUri: string): ResultadoValidacionImagen {
  const match = /^data:([^;]+);base64,([\s\S]+)$/.exec(dataUri);
  if (!match) {
    return { ok: false, message: "El formato de la imagen no es válido" };
  }

  const [, mime, base64] = match;
  if (!(mime in MIME_PERMITIDOS)) {
    return { ok: false, message: "Solo se permiten imágenes JPG o PNG" };
  }

  const buffer = Buffer.from(base64, "base64");
  if (buffer.length === 0) {
    return { ok: false, message: "La imagen está vacía" };
  }

  if (buffer.length > IMAGEN_MAX_BYTES) {
    return { ok: false, message: "La imagen no debe superar los 5 MB" };
  }

  return { ok: true, buffer, mime };
}

export function publicIdDesdeUrl(url: string): string | null {
  try {
    const path = new URL(url).pathname.split("/").filter(Boolean);
    const indexUpload = path.indexOf("upload");
    if (indexUpload === -1) {
      return null;
    }

    let resto = path.slice(indexUpload + 1);
    if (/^v\d+$/.test(resto[0] ?? "")) {
      resto = resto.slice(1);
    }
    if (resto.length === 0) {
      return null;
    }

    const ultima = resto[resto.length - 1];
    if (ultima.includes(".")) {
      resto[resto.length - 1] = ultima.slice(0, ultima.lastIndexOf("."));
    }
    return resto.join("/");
  } catch {
    return null;
  }
}

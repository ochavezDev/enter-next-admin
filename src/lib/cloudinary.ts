import { v2 as cloudinary } from "cloudinary";
import { publicIdDesdeUrl } from "./image";

cloudinary.config({
  cloud_name: "fuh3zsuf",
  api_key: process.env.APIKEY_CLAUDINARY,
  api_secret: process.env.APIKEY_CLAUDINARY_SECRET,
});

export async function subirImagen(dataUri: string): Promise<string> {
  const resultado = await cloudinary.uploader.upload(dataUri, {
    folder: "blogs",
  });
  return resultado.secure_url;
}

export async function eliminarImagen(url?: string | null): Promise<void> {
  if (!url) {
    return;
  }
  const publicId = publicIdDesdeUrl(url);
  if (!publicId) {
    return;
  }
  await cloudinary.uploader.destroy(publicId);
}

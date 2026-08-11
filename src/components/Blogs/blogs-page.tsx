"use client";

import { CloseIcon, PencilSquareIcon, TrashIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { SelectField } from "@/components/FormElements/SelectField";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

type Blog = {
  id: string;
  titulo: string;
  contenido: string;
  autor: string;
  fechaPublicacion: string;
  estado: "Publicado" | "Borrador";
  imagen: string | null;
  createdAt: string;
  updatedAt: string;
};

type BlogForm = {
  titulo: string;
  contenido: string;
  autor: string;
  fechaPublicacion: string;
  estado: "Publicado" | "Borrador";
};

const FORM_VACIO: BlogForm = {
  titulo: "",
  contenido: "",
  autor: "",
  fechaPublicacion: "",
  estado: "Publicado",
};

function validarForm(form: BlogForm): Record<string, string> {
  const errores: Record<string, string> = {};

  if (form.titulo.trim().length < 10) {
    errores.titulo = "El título debe tener al menos 10 caracteres";
  }

  if (form.contenido.trim().length < 50) {
    errores.contenido = "El contenido debe tener al menos 50 caracteres";
  }

  if (form.autor.trim().length < 5) {
    errores.autor = "El autor debe tener al menos 5 caracteres";
  }

  if (!form.fechaPublicacion) {
    errores.fechaPublicacion = "La fecha de publicación es obligatoria";
  }

  return errores;
}

async function leerError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return body?.message ?? "Error inesperado al comunicarse con el servidor";
  } catch {
    return "Error inesperado al comunicarse con el servidor";
  }
}

function ErrorCampo({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-body-sm text-red">{message}</p>;
}

export function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [formAbierto, setFormAbierto] = useState(false);
  const [editando, setEditando] = useState<Blog | null>(null);
  const [erroresForm, setErroresForm] = useState<Record<string, string>>({});
  const [form, setForm] = useState<BlogForm>(FORM_VACIO);
  const [imagenArchivo, setImagenArchivo] = useState<string | null>(null);
  const [imagenEliminar, setImagenEliminar] = useState(false);
  const [blogDetalle, setBlogDetalle] = useState<Blog | null>(null);

  const fetchBlogs = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) {
        toast.error(await leerError(res));
        return;
      }
      setBlogs(await res.json());
    } catch (error) {
      console.error("Error al cargar blogs:", error);
      toast.error("Error al cargar la lista de blogs");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const abrirNuevo = () => {
    setForm(FORM_VACIO);
    setEditando(null);
    setErroresForm({});
    setImagenArchivo(null);
    setImagenEliminar(false);
    setFormAbierto(true);
  };

  const abrirEdicion = (blog: Blog) => {
    setForm({
      titulo: blog.titulo,
      contenido: blog.contenido,
      autor: blog.autor,
      fechaPublicacion: dayjs(blog.fechaPublicacion).format("YYYY-MM-DD"),
      estado: blog.estado,
    });
    setEditando(blog);
    setErroresForm({});
    setImagenArchivo(null);
    setImagenEliminar(false);
    setFormAbierto(true);
  };

  const cerrarForm = () => {
    setFormAbierto(false);
    setEditando(null);
    setErroresForm({});
    setImagenArchivo(null);
    setImagenEliminar(false);
  };

  const abrirDetalle = (blog: Blog) => {
    setBlogDetalle(blog);
  };

  const cerrarDetalle = () => {
    setBlogDetalle(null);
  };

  useEffect(() => {
    if (!blogDetalle) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrarDetalle();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [blogDetalle]);

  const handleChange = (campo: keyof BlogForm, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) {
      return;
    }

    if (!["image/jpeg", "image/png"].includes(archivo.type)) {
      toast.error("Solo se permiten imágenes JPG o PNG");
      e.target.value = "";
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5 MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagenArchivo(reader.result as string);
      setImagenEliminar(false);
    };
    reader.readAsDataURL(archivo);
  };

  const quitarImagen = () => {
    setImagenArchivo(null);
    setImagenEliminar(Boolean(editando?.imagen));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errores = validarForm(form);
    setErroresForm(errores);
    if (Object.keys(errores).length > 0) {
      return;
    }

    setGuardando(true);
    try {
      const payload: Record<string, unknown> = { ...form };
      if (imagenArchivo) {
        payload.imagen = imagenArchivo;
      } else if (imagenEliminar) {
        payload.imagen = "";
      }

      const url = editando ? `/api/blogs/${editando.id}` : "/api/blogs";
      const res = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error(await leerError(res));
        return;
      }

      toast.success(
        editando
          ? "Blog actualizado exitosamente"
          : "Blog creado exitosamente",
      );
      cerrarForm();
      await fetchBlogs();
    } catch (error) {
      console.error("Error al guardar blog:", error);
      toast.error("Error inesperado al guardar el blog");
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (blog: Blog) => {
    const confirmar = window.confirm(
      `¿Eliminar el blog "${blog.titulo}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmar) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${blog.id}`, { method: "DELETE" });

      if (!res.ok) {
        toast.error(await leerError(res));
        return;
      }

      toast.success("Blog eliminado exitosamente");
      await fetchBlogs();
    } catch (error) {
      console.error("Error al eliminar blog:", error);
      toast.error("Error inesperado al eliminar el blog");
    }
  };

  const imagenPreview = imagenArchivo ?? editando?.imagen ?? null;

  return (
    <div className="space-y-10">
      {formAbierto && (
        <ShowcaseSection
          title={
            editando ? `Editar blog: ${editando.titulo}` : "Nuevo blog"
          }
          className="p-7!"
        >
          <div className="mb-5 flex items-start justify-between gap-3">
            <p className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
              {editando
                ? "Modificá los datos y guardá los cambios."
                : "Completá los datos del nuevo blog."}
            </p>

            <button
              type="button"
              onClick={cerrarForm}
              aria-label="Cerrar formulario"
              className="shrink-0 rounded-md p-1 text-dark-5 transition hover:text-dark dark:text-dark-6 dark:hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5.5 grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <InputGroup
                label="Título"
                placeholder="5 estrategias para cerrar más ventas"
                type="text"
                name="titulo"
                value={form.titulo}
                handleChange={(e) => handleChange("titulo", e.target.value)}
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.titulo} />

              <InputGroup
                label="Autor"
                placeholder="Equipo Comercial"
                type="text"
                name="autor"
                value={form.autor}
                handleChange={(e) => handleChange("autor", e.target.value)}
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.autor} />

              <InputGroup
                label="Fecha de publicación"
                placeholder="2026-08-05"
                type="date"
                name="fechaPublicacion"
                value={form.fechaPublicacion}
                handleChange={(e) =>
                  handleChange("fechaPublicacion", e.target.value)
                }
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.fechaPublicacion} />

              <SelectField
                label="Estado"
                value={form.estado}
                onChange={(valor) => handleChange("estado", valor)}
                options={[
                  { value: "Publicado", label: "Publicado" },
                  { value: "Borrador", label: "Borrador" },
                ]}
                required
                disabled={guardando}
              />

              <div className="sm:col-span-2">
                <TextAreaGroup
                  label="Contenido"
                  placeholder="En este artículo te mostramos..."
                  name="contenido"
                  value={form.contenido}
                  onChange={(e) => handleChange("contenido", e.target.value)}
                  required
                  disabled={guardando}
                />
                <ErrorCampo message={erroresForm.contenido} />
              </div>

              <div className="sm:col-span-2">
                <span className="block text-body-sm font-medium text-dark dark:text-white">
                  Imagen
                  <span className="ml-1 text-body-sm font-normal text-dark-5 dark:text-dark-6">
                    (opcional, JPG/PNG · máx 5 MB)
                  </span>
                </span>

                {imagenPreview && (
                  <img
                    src={imagenPreview}
                    alt="Vista previa de la imagen del blog"
                    className="mt-3 h-44 w-full rounded-lg border border-stroke object-cover dark:border-dark-3"
                  />
                )}

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer rounded-lg border border-stroke px-4 py-2 text-body-sm font-medium text-dark transition hover:border-primary hover:text-primary disabled:cursor-default disabled:opacity-50 dark:border-dark-3 dark:text-white">
                    {imagenArchivo ? "Cambiar imagen" : "Seleccionar imagen"}
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      className="sr-only"
                      disabled={guardando}
                      onChange={handleImagenChange}
                    />
                  </label>

                  {imagenPreview && (
                    <button
                      type="button"
                      onClick={quitarImagen}
                      disabled={guardando}
                      className="rounded-lg border border-stroke px-4 py-2 text-body-sm font-medium text-red transition hover:border-red disabled:cursor-default disabled:opacity-50 dark:border-dark-3"
                    >
                      Quitar imagen
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={cerrarForm}
                disabled={guardando}
                className="rounded-lg border border-stroke px-6 py-1.75 font-medium text-dark hover:shadow-1 disabled:opacity-50 dark:border-dark-3 dark:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={guardando}
                className="rounded-lg bg-primary px-6 py-1.75 font-medium text-gray-2 hover:bg-opacity-90 disabled:opacity-50"
              >
                {guardando
                  ? "Guardando..."
                  : editando
                    ? "Guardar cambios"
                    : "Crear blog"}
              </button>
            </div>
          </form>
        </ShowcaseSection>
      )}

      {blogDetalle && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-dark/60 p-4 backdrop-blur-sm"
          onClick={cerrarDetalle}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle del blog: ${blogDetalle.titulo}`}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[10px] border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-gray-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-stroke px-6 py-4 dark:border-dark-3">
              <div className="min-w-0">
                <span
                  className={cn(
                    "inline-block max-w-fit rounded-full px-3 py-0.5 text-xs font-medium",
                    blogDetalle.estado === "Publicado"
                      ? "bg-[#219653]/8 text-[#219653]"
                      : "bg-[#FFA70B]/8 text-[#FFA70B]",
                  )}
                >
                  {blogDetalle.estado}
                </span>

                <h3 className="mt-2 pr-8 text-lg font-medium text-dark dark:text-white">
                  {blogDetalle.titulo}
                </h3>
              </div>

              <button
                type="button"
                onClick={cerrarDetalle}
                aria-label="Cerrar detalle del blog"
                className="shrink-0 rounded-md p-1 text-dark-5 transition hover:text-dark dark:text-dark-6 dark:hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              {blogDetalle.imagen && (
                <img
                  src={blogDetalle.imagen}
                  alt={blogDetalle.titulo}
                  className="mb-5 max-h-72 w-full rounded-lg border border-stroke object-cover dark:border-dark-3"
                />
              )}

              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-body-sm font-medium text-dark dark:text-white">
                  {blogDetalle.autor}
                </span>

                <span className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
                  {dayjs(blogDetalle.fechaPublicacion).format("DD MMM, YYYY")}
                </span>
              </div>

              <p className="whitespace-pre-wrap text-body-sm font-medium leading-relaxed text-dark-5 dark:text-dark-6">
                {blogDetalle.contenido}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-medium text-dark dark:text-white">
            Blogs
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              label="Actualizar"
              variant="outlineDark"
              size="small"
              onClick={fetchBlogs}
              disabled={cargando}
            />

            <Button label="Nuevo blog" size="small" onClick={abrirNuevo} />
          </div>
        </div>

        {cargando && blogs.length === 0 && (
          <p className="py-8 text-center text-body-sm font-medium text-dark-5 dark:text-dark-6">
            Cargando blogs...
          </p>
        )}

        {!cargando && blogs.length === 0 && (
          <p className="py-8 text-center text-body-sm font-medium text-dark-5 dark:text-dark-6">
            No hay blogs publicados todavía.
          </p>
        )}

        {blogs.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => abrirDetalle(blog)}
                className="flex cursor-pointer flex-col rounded-lg border border-stroke bg-white p-5 shadow-sm transition hover:border-primary/40 dark:border-dark-3 dark:bg-dark-2"
              >
                {blog.imagen && (
                  <img
                    src={blog.imagen}
                    alt={blog.titulo}
                    className="mb-4 h-44 w-full rounded-lg border border-stroke object-cover dark:border-dark-3"
                  />
                )}

                <div className="flex items-start justify-between gap-3">
                  <h4 className="flex-1 text-base font-medium leading-snug text-dark dark:text-white">
                    {blog.titulo}
                  </h4>

                  <div className="flex shrink-0 items-center gap-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirEdicion(blog);
                      }}
                      aria-label={`Editar ${blog.titulo}`}
                      className="hover:text-primary"
                    >
                      <PencilSquareIcon />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog);
                      }}
                      aria-label={`Eliminar ${blog.titulo}`}
                      className="hover:text-primary"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                <span
                  className={cn(
                    "mt-2 max-w-fit rounded-full px-3 py-0.5 text-xs font-medium",
                    blog.estado === "Publicado"
                      ? "bg-[#219653]/8 text-[#219653]"
                      : "bg-[#FFA70B]/8 text-[#FFA70B]",
                  )}
                >
                  {blog.estado}
                </span>

                <p className="mt-3 line-clamp-3 text-body-sm font-medium text-dark-5 dark:text-dark-6">
                  {blog.contenido}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                  <span className="text-body-sm font-medium text-dark dark:text-white">
                    {blog.autor}
                  </span>

                  <span className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    {dayjs(blog.fechaPublicacion).format("DD MMM, YYYY")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

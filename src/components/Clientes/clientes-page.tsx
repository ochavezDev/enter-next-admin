"use client";

import { CloseIcon, PencilSquareIcon, TrashIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { SelectField } from "@/components/FormElements/SelectField";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";

type Cliente = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  tipoDocumento: "DNI" | "RUC";
  numeroDocumento: string;
  direccion: string;
  estado: "Activo" | "Inactivo";
  createdAt: string;
  updatedAt: string;
};

type ClienteForm = {
  nombre: string;
  email: string;
  telefono: string;
  tipoDocumento: "DNI" | "RUC";
  numeroDocumento: string;
  direccion: string;
  estado: "Activo" | "Inactivo";
};

const FORM_VACIO: ClienteForm = {
  nombre: "",
  email: "",
  telefono: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
  direccion: "",
  estado: "Activo",
};

function validarForm(form: ClienteForm): Record<string, string> {
  const errores: Record<string, string> = {};

  if (!form.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errores.email = "El email no tiene un formato válido";
  }

  if (!/^\+?[\d\s().-]{6,20}$/.test(form.telefono)) {
    errores.telefono = "El teléfono no tiene un formato válido";
  }

  if (!/^\d+$/.test(form.numeroDocumento)) {
    errores.numeroDocumento =
      "El número de documento solo puede contener dígitos";
  } else {
    const esperado = form.tipoDocumento === "DNI" ? 8 : 11;
    if (form.numeroDocumento.length !== esperado) {
      errores.numeroDocumento = `El ${form.tipoDocumento} debe tener exactamente ${esperado} dígitos`;
    }
  }

  if (!form.direccion.trim()) {
    errores.direccion = "La dirección es obligatoria";
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

export function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [formAbierto, setFormAbierto] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [erroresForm, setErroresForm] = useState<Record<string, string>>({});
  const [form, setForm] = useState<ClienteForm>(FORM_VACIO);

  const fetchClientes = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/clientes");
      if (!res.ok) {
        toast.error(await leerError(res));
        return;
      }
      setClientes(await res.json());
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      toast.error("Error al cargar la lista de clientes");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const abrirNuevo = () => {
    setForm(FORM_VACIO);
    setEditando(null);
    setErroresForm({});
    setFormAbierto(true);
  };

  const abrirEdicion = (cliente: Cliente) => {
    setForm({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      tipoDocumento: cliente.tipoDocumento,
      numeroDocumento: cliente.numeroDocumento,
      direccion: cliente.direccion,
      estado: cliente.estado,
    });
    setEditando(cliente);
    setErroresForm({});
    setFormAbierto(true);
  };

  const cerrarForm = () => {
    setFormAbierto(false);
    setEditando(null);
    setErroresForm({});
  };

  const handleChange = (campo: keyof ClienteForm, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
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
      const url = editando ? `/api/clientes/${editando.id}` : "/api/clientes";
      const res = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error(await leerError(res));
        return;
      }

      toast.success(
        editando
          ? "Cliente actualizado correctamente"
          : "Cliente creado correctamente",
      );
      cerrarForm();
      await fetchClientes();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      toast.error("Error inesperado al guardar el cliente");
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (cliente: Cliente) => {
    const confirmar = window.confirm(
      `¿Eliminar al cliente "${cliente.nombre}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmar) {
      return;
    }

    try {
      const res = await fetch(`/api/clientes/${cliente.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error(await leerError(res));
        return;
      }

      toast.success("Cliente eliminado correctamente");
      await fetchClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      toast.error("Error inesperado al eliminar el cliente");
    }
  };

  return (
    <div className="space-y-10">
      {formAbierto && (
        <ShowcaseSection
          title={
            editando ? `Editar cliente: ${editando.nombre}` : "Nuevo cliente"
          }
          className="p-7!"
        >
          <div className="mb-5 flex items-start justify-between gap-3">
            <p className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
              {editando
                ? "Modificá los datos y guardá los cambios."
                : "Completá los datos del nuevo cliente."}
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
                label="Nombre"
                placeholder="María Pérez"
                type="text"
                name="nombre"
                value={form.nombre}
                handleChange={(e) => handleChange("nombre", e.target.value)}
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.nombre} />

              <InputGroup
                label="Email"
                placeholder="mperez@empresa.com"
                type="email"
                name="email"
                value={form.email}
                handleChange={(e) => handleChange("email", e.target.value)}
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.email} />

              <InputGroup
                label="Teléfono"
                placeholder="+51 987 654 321"
                type="text"
                name="telefono"
                value={form.telefono}
                handleChange={(e) => handleChange("telefono", e.target.value)}
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.telefono} />

              <SelectField
                label="Tipo de documento"
                value={form.tipoDocumento}
                onChange={(valor) => handleChange("tipoDocumento", valor)}
                options={[
                  { value: "DNI", label: "DNI" },
                  { value: "RUC", label: "RUC" },
                ]}
                required
                disabled={guardando}
              />

              <InputGroup
                label="Número de documento"
                placeholder={form.tipoDocumento === "DNI" ? "70544123" : "20511234567"}
                type="text"
                name="numeroDocumento"
                value={form.numeroDocumento}
                handleChange={(e) =>
                  handleChange("numeroDocumento", e.target.value)
                }
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.numeroDocumento} />

              <SelectField
                label="Estado"
                value={form.estado}
                onChange={(valor) => handleChange("estado", valor)}
                options={[
                  { value: "Activo", label: "Activo" },
                  { value: "Inactivo", label: "Inactivo" },
                ]}
                required
                disabled={guardando}
              />

              <InputGroup
                label="Dirección"
                placeholder="Av. Los Álamos 123, Miraflores, Lima"
                type="text"
                name="direccion"
                value={form.direccion}
                handleChange={(e) => handleChange("direccion", e.target.value)}
                required
                disabled={guardando}
              />
              <ErrorCampo message={erroresForm.direccion} />
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
                    : "Crear cliente"}
              </button>
            </div>
          </form>
        </ShowcaseSection>
      )}

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-medium text-dark dark:text-white">
            Clientes
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              label="Actualizar"
              variant="outlineDark"
              size="small"
              onClick={fetchClientes}
              disabled={cargando}
            />

            <Button label="Nuevo cliente" size="small" onClick={abrirNuevo} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[155px] xl:pl-7.5">Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right xl:pr-7.5">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cargando && clientes.length === 0 && (
              <TableRow className="border-[#eee] dark:border-dark-3">
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-body-sm font-medium text-dark-5 dark:text-dark-6"
                >
                  Cargando clientes...
                </TableCell>
              </TableRow>
            )}

            {!cargando && clientes.length === 0 && (
              <TableRow className="border-[#eee] dark:border-dark-3">
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-body-sm font-medium text-dark-5 dark:text-dark-6"
                >
                  No hay clientes registrados todavía.
                </TableCell>
              </TableRow>
            )}

            {clientes.map((cliente) => (
              <TableRow
                key={cliente.id}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{cliente.nombre}</h5>
                </TableCell>

                <TableCell>
                  <p className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    {cliente.email}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    {cliente.tipoDocumento} · {cliente.numeroDocumento}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    {cliente.telefono}
                  </p>
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      cliente.estado === "Activo"
                        ? "bg-[#219653]/8 text-[#219653]"
                        : "bg-[#D34053]/8 text-[#D34053]",
                    )}
                  >
                    {cliente.estado}
                  </div>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      onClick={() => abrirEdicion(cliente)}
                      aria-label={`Editar a ${cliente.nombre}`}
                      className="hover:text-primary"
                    >
                      <PencilSquareIcon />
                    </button>

                    <button
                      onClick={() => handleDelete(cliente)}
                      aria-label={`Eliminar a ${cliente.nombre}`}
                      className="hover:text-primary"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

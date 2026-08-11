-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('DNI', 'RUC');

-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('Activo', 'Inactivo');

-- CreateEnum
CREATE TYPE "EstadoBlog" AS ENUM ('Publicado', 'Borrador');

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "tipo_documento" "TipoDocumento" NOT NULL,
    "numero_documento" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'Activo',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "imagen" TEXT,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'Activo',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoBlog" NOT NULL DEFAULT 'Borrador',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogProductos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlogProductos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_tipo_documento_numero_documento_key" ON "cliente"("tipo_documento", "numero_documento");

-- CreateIndex
CREATE UNIQUE INDEX "producto_nombre_key" ON "producto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "blog_titulo_key" ON "blog"("titulo");

-- CreateIndex
CREATE INDEX "_BlogProductos_B_index" ON "_BlogProductos"("B");

-- AddForeignKey
ALTER TABLE "_BlogProductos" ADD CONSTRAINT "_BlogProductos_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogProductos" ADD CONSTRAINT "_BlogProductos_B_fkey" FOREIGN KEY ("B") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

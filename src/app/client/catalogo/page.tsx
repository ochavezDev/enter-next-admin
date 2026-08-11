import Image from "next/image";
import type { ReactNode } from "react";
import { Footer } from "../_components/footer";
import { TopNav } from "../_components/topnav";

const PRODUCTS = [
  {
    name: "ProBook X15 Quantum",
    brand: "Nexus",
    price: "$1,499",
    rating: 4.5,
    stock: "En stock",
    stockClass: "bg-es-primary/20 text-es-primary-container border-es-primary/30",
    image: "/client/product-laptop.png",
    alt: "Laptop profesional ProBook X15 Quantum",
  },
  {
    name: "SonicForge ANC 900",
    brand: "Aether",
    price: "$349",
    rating: 5,
    stock: "Poco stock",
    stockClass:
      "bg-es-surface-container-highest text-es-on-surface-variant border-es-outline-variant",
    image: "/client/product-headphones.png",
    alt: "Audífonos inalámbricos SonicForge ANC 900",
  },
  {
    name: "ChronoSync Ultra",
    brand: "Quantum",
    price: "$299",
    rating: 4.1,
    stock: null,
    stockClass: "",
    image: "/client/product-watch.png",
    alt: "Smartwatch ChronoSync Ultra",
  },
];

export default function CatalogoPage() {
  return (
    <>
      <TopNav active="catalogo" />

      <main className="mx-auto flex w-full max-w-max-width flex-grow flex-col gap-gutter px-margin-mobile py-8 md:flex-row md:px-margin-desktop">
        <aside className="mb-8 w-full flex-shrink-0 md:mb-0 md:w-64">
          <div className="card-level-1 sticky top-28 h-fit max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-es-headline-md text-es-headline-md text-es-on-surface">
                Filtros
              </h2>
              <button className="font-es-label-sm text-es-label-sm text-es-primary-fixed-dim hover:underline">
                Restablecer
              </button>
            </div>

            <div className="mb-6 border-b border-es-outline-variant pb-6">
              <h3 className="mb-3 font-es-body-lg text-es-body-lg font-semibold text-es-on-surface">
                Categoría
              </h3>
              <div className="flex flex-col gap-2">
                <Checkbox label="Portátiles (24)" defaultChecked />
                <Checkbox label="Audio (18)" />
                <Checkbox label="Wearables (12)" />
              </div>
            </div>

            <div className="mb-6 border-b border-es-outline-variant pb-6">
              <h3 className="mb-3 font-es-body-lg text-es-body-lg font-semibold text-es-on-surface">
                Rango de Precios
              </h3>
              <div className="mb-4 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Mín"
                  className="w-full rounded-md border border-es-outline-variant bg-es-surface-container-high px-2 py-1 font-es-body-md text-es-body-md text-es-on-surface focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container"
                />
                <span className="text-es-on-surface-variant">-</span>
                <input
                  type="number"
                  placeholder="Máx"
                  className="w-full rounded-md border border-es-outline-variant bg-es-surface-container-high px-2 py-1 font-es-body-md text-es-body-md text-es-on-surface focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container"
                />
              </div>
              <div className="relative mt-2 h-1 w-full rounded-full bg-es-surface-container-high">
                <div className="absolute top-0 right-1/4 left-1/4 h-full rounded-full bg-es-primary-container" />
                <div className="absolute top-[-3px] left-1/4 size-3 cursor-ew-resize rounded-full border border-es-surface-container-highest bg-es-primary-container shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
                <div className="absolute top-[-3px] right-1/4 size-3 cursor-ew-resize rounded-full border border-es-surface-container-highest bg-es-primary-container shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-es-body-lg text-es-body-lg font-semibold text-es-on-surface">
                Marca
              </h3>
              <div className="flex flex-col gap-2">
                <Checkbox label="Quantum" />
                <Checkbox label="Aether" />
                <Checkbox label="Nexus" defaultChecked />
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="font-es-headline-lg-mobile text-es-headline-lg-mobile text-es-on-surface md:font-es-headline-lg md:text-es-headline-lg">
              Portátiles
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-es-body-md text-es-body-md text-es-on-surface-variant">
                Mostrando 24 resultados
              </span>
              <select className="rounded-md border border-es-outline-variant bg-es-surface-container-high px-3 py-1.5 pr-8 font-es-body-md text-es-body-md text-es-on-surface focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container">
                <option>Recomendados</option>
                <option>Precio: de menor a mayor</option>
                <option>Precio: de mayor a menor</option>
                <option>Novedades</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              disabled
              className="flex size-10 items-center justify-center rounded-md border border-es-outline-variant text-es-on-surface-variant transition-colors hover:border-es-primary-fixed-dim hover:text-es-primary-fixed-dim disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>
            <PageButton active>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <span className="mx-1 text-es-on-surface-variant">...</span>
            <PageButton>8</PageButton>
            <button className="flex size-10 items-center justify-center rounded-md border border-es-outline-variant text-es-on-surface transition-colors hover:border-es-primary-fixed-dim hover:text-es-primary-fixed-dim">
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Checkbox({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="form-checkbox"
      />
      <span className="font-es-body-md text-es-body-md text-es-on-surface-variant transition-colors group-hover:text-es-on-surface">
        {label}
      </span>
    </label>
  );
}

function PageButton({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={
        active
          ? "flex size-10 items-center justify-center rounded-md bg-es-primary-container font-es-body-md font-semibold text-es-on-primary-container"
          : "flex size-10 items-center justify-center rounded-md border border-es-outline-variant font-es-body-md text-es-on-surface transition-colors hover:border-es-primary-fixed-dim hover:text-es-primary-fixed-dim"
      }
    >
      {children}
    </button>
  );
}

function ProductCard(props: (typeof PRODUCTS)[number]) {
  return (
    <article className="card-level-1 group relative flex flex-col overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1">
      {props.stock && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`rounded border px-2 py-1 font-es-label-sm text-es-label-sm backdrop-blur-sm ${props.stockClass}`}
          >
            {props.stock}
          </span>
        </div>
      )}

      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-es-surface-container-highest p-4">
        <Image
          src={props.image}
          alt={props.alt}
          width={400}
          height={400}
          className="z-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="glass-panel relative z-10 flex flex-grow flex-col p-5">
        <p className="mb-1 font-es-label-sm text-es-label-sm tracking-wider text-es-on-surface-variant uppercase">
          {props.brand}
        </p>
        <h3 className="mb-2 line-clamp-1 font-es-body-lg text-es-body-lg font-semibold text-es-on-surface">
          {props.name}
        </h3>

        <div className="mb-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`es-fill-1 material-symbols-outlined text-sm ${i < Math.round(props.rating) ? "text-es-primary-fixed-dim" : "text-es-surface-container-highest"}`}
            >
              {i < Math.round(props.rating) ? "star" : "star"}
            </span>
          ))}
          <span className="ml-1 font-es-label-sm text-es-label-sm text-es-on-surface-variant">
            ({props.rating.toFixed(1)})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <p className="font-es-headline-md text-es-headline-md text-es-on-surface">
            {props.price}
          </p>
          <button
            aria-label="Añadir al carrito"
            className="btn-primary flex size-10 items-center justify-center rounded-full transition-transform group-hover:scale-105"
          >
            <span className="material-symbols-outlined">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

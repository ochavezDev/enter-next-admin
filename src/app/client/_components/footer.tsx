import Link from "next/link";

const LINKS = [
  { label: "Política de privacidad", href: "#" },
  { label: "Términos de servicio", href: "#" },
  { label: "Información de envío", href: "#" },
  { label: "Contáctenos", href: "#" },
];

export function Footer() {
  return (
    <footer className="mx-auto mt-auto flex w-full max-w-max-width flex-col items-center justify-between gap-8 border-t border-es-outline-variant bg-es-surface-container-lowest px-margin-mobile py-margin-desktop md:flex-row md:gap-0 md:px-margin-desktop">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <div className="flex items-center gap-2 font-es-headline-md text-es-headline-md text-es-on-surface">
          <span className="es-fill-1 material-symbols-outlined text-es-primary-fixed-dim">
            bolt
          </span>
          ElectronicStore
        </div>
        <p className="text-sm font-es-body-md text-es-body-md text-center text-es-on-surface-variant md:text-left">
          © 2024 ElectronicStore. Todos los derechos reservados. Diseñado con
          precisión para el rendimiento.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-es-body-md text-es-body-md text-es-on-surface-variant underline transition-all hover:text-es-primary-fixed-dim"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}

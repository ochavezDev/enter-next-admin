import { cn } from "@/lib/utils";
import Link from "next/link";

type TopNavProps = {
  active?: "catalogo" | "blog" | "soporte" | "cuenta";
  showSearch?: boolean;
  underlineActive?: boolean;
};

const LINKS = [
  { id: "catalogo", label: "Catálogo", href: "/client/catalogo" },
  { id: "blog", label: "Blog", href: "/client/blog" },
  { id: "soporte", label: "Soporte", href: "#" },
  { id: "cuenta", label: "Cuenta", href: "#" },
] as const;

export function TopNav({
  active,
  showSearch = true,
  underlineActive = true,
}: TopNavProps) {
  return (
    <nav className="fixed top-0 z-50 mx-auto flex h-20 w-full max-w-max-width items-center justify-between border-b border-es-outline-variant bg-es-surface px-margin-mobile font-es-body-md text-es-body-md shadow-sm transition-all duration-300 md:px-margin-desktop">
      <div className="flex items-center gap-6 md:gap-12">
        <Link
          href="/client"
          className="flex items-center gap-2 font-es-headline-md text-es-headline-md tracking-tight text-es-primary-fixed-dim"
        >
          <span className="es-fill-1 material-symbols-outlined text-es-primary-fixed-dim">
            bolt
          </span>
          ElectronicStore
        </Link>

        <div className="hidden gap-6 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "cursor-pointer transition-colors active:scale-95",
                  underlineActive
                    ? "pb-1"
                    : "hover:text-es-primary-fixed-dim",
                  isActive
                    ? "text-es-primary-fixed-dim"
                    : "text-es-on-surface-variant hover:text-es-primary-fixed-dim",
                  underlineActive &&
                    isActive &&
                    "border-b-2 border-es-primary-fixed-dim",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="hidden items-center rounded-full border border-es-outline-variant bg-es-surface-container-high px-4 py-2 transition-colors focus-within:border-es-primary-fixed-dim md:flex">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-48 border-none bg-transparent text-es-body-md text-es-on-surface outline-none placeholder:text-es-on-surface-variant"
            />
            <span className="material-symbols-outlined cursor-pointer text-es-on-surface-variant transition-colors hover:text-es-primary-fixed-dim">
              search
            </span>
          </div>
        )}

        <span className="material-symbols-outlined cursor-pointer text-es-primary-fixed-dim transition-colors hover:text-es-primary-container active:scale-95">
          shopping_cart
        </span>
        <span className="material-symbols-outlined hidden cursor-pointer text-es-primary-fixed-dim transition-colors hover:text-es-primary-container active:scale-95 md:block">
          person
        </span>
        <span className="material-symbols-outlined cursor-pointer text-es-primary-fixed-dim transition-colors hover:text-es-primary-container active:scale-95 md:hidden">
          menu
        </span>
      </div>
    </nav>
  );
}

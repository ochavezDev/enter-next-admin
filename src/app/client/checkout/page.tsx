import Image from "next/image";
import Link from "next/link";

const ITEMS = [
  {
    name: "Volt RTX 5090 Supernova Edition",
    quantity: "Cant.: 1",
    price: "$1,899.00",
    image: "/client/gpu.png",
    alt: "Tarjeta gráfica Volt RTX 5090",
  },
  {
    name: "Aura Sonic Pro Wireless",
    quantity: "Cant.: 1",
    price: "$349.00",
    image: "/client/headphones.png",
    alt: "Audífonos inalámbricos Aura Sonic Pro",
  },
];

export default function CheckoutPage() {
  return (
    <>
      <header className="inner-light-top sticky top-0 z-50 w-full border-b border-es-outline-variant bg-es-surface-container-lowest">
        <div className="mx-auto flex h-20 max-w-max-width items-center justify-between px-margin-mobile md:px-margin-desktop">
          <Link
            href="/client"
            className="font-es-headline-md text-es-headline-md tracking-tight text-es-primary-fixed-dim"
          >
            ElectronicStore
          </Link>
          <div className="flex items-center gap-2 font-es-label-sm text-es-label-sm text-es-on-surface-variant">
            <span className="es-fill-1 material-symbols-outlined">lock</span>
            <span className="hidden uppercase tracking-widest md:inline">
              Pago Seguro
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-max-width flex-grow px-margin-mobile py-8 md:px-margin-desktop md:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 font-es-label-sm text-es-label-sm text-es-on-surface-variant"
        >
          <Link href="/client" className="transition-colors hover:text-es-primary-fixed-dim">
            CARRITO
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-es-primary-fixed-dim">PAGO</span>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span>CONFIRMACIÓN</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7 xl:col-span-8">
            <h1 className="mb-6 font-es-headline-lg-mobile text-es-headline-lg-mobile text-es-on-surface md:font-es-headline-lg md:text-es-headline-lg">
              Pago Seguro
            </h1>

            <section className="inner-light-top relative overflow-hidden rounded-xl border border-es-outline-variant bg-es-surface-bright p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-es-outline-variant pb-4">
                <span className="material-symbols-outlined text-es-primary-fixed-dim">
                  local_shipping
                </span>
                <h2 className="font-es-headline-md text-es-headline-md text-es-on-surface">
                  Detalles de Envío
                </h2>
              </div>

              <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Nombre" placeholder="Jane" />
                <Field label="Apellido" placeholder="Doe" />
                <Field
                  label="Correo Electrónico"
                  placeholder="jane.doe@ejemplo.com"
                  type="email"
                  full
                />
                <Field
                  label="Dirección"
                  placeholder="123 Bulevar Tecnológico, Suite 400"
                  full
                />
                <Field label="Ciudad" placeholder="Neo Reikiavik" />
                <Field label="Código Postal" placeholder="90210" />
              </form>
            </section>

            <section className="inner-light-top relative overflow-hidden rounded-xl border border-es-outline-variant bg-es-surface-bright p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-es-outline-variant pb-4">
                <span className="material-symbols-outlined text-es-primary-fixed-dim">
                  account_balance_wallet
                </span>
                <h2 className="font-es-headline-md text-es-headline-md text-es-on-surface">
                  Método de Pago
                </h2>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <PaymentOption
                  icon="credit_card"
                  label="Tarjeta de Crédito"
                  defaultChecked
                />
                <PaymentOption icon="payments" label="PayPal" />
                <PaymentOption icon="currency_bitcoin" label="Criptomonedas" />
              </div>

              <div className="rounded-lg border border-es-outline-variant bg-es-surface p-4 md:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="flex flex-col gap-1.5 md:col-span-4">
                    <label className="font-es-label-sm text-es-label-sm tracking-wide text-es-on-surface-variant uppercase">
                      Número de Tarjeta
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded border border-es-outline-variant bg-es-background p-3 pl-10 font-es-label-sm text-es-on-surface outline-none transition-all placeholder:text-es-outline focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container"
                      />
                      <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-es-outline-variant">
                        credit_card
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-es-label-sm text-es-label-sm tracking-wide text-es-on-surface-variant uppercase">
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full rounded border border-es-outline-variant bg-es-background p-3 font-es-label-sm text-es-on-surface outline-none transition-all placeholder:text-es-outline focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="flex justify-between font-es-label-sm text-es-label-sm tracking-wide text-es-on-surface-variant uppercase">
                      <span>CVC</span>
                      <span
                        className="material-symbols-outlined cursor-help text-[14px]"
                        title="3 dígitos en el reverso de la tarjeta"
                      >
                        help
                      </span>
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      className="w-full rounded border border-es-outline-variant bg-es-background p-3 font-es-label-sm text-es-on-surface outline-none transition-all placeholder:text-es-outline focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <section className="inner-light-top sticky top-28 rounded-xl border border-es-outline-variant bg-es-surface-container-high p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <h2 className="mb-6 border-b border-es-outline-variant pb-4 font-es-headline-md text-es-headline-md text-es-on-surface">
                Resumen del Pedido
              </h2>

              <div className="no-scrollbar mb-6 flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-2">
                {ITEMS.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded border border-es-outline-variant bg-es-surface">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-grow flex-col justify-center">
                      <h3 className="mb-1 line-clamp-2 font-es-body-md text-es-body-md leading-tight text-es-on-surface">
                        {item.name}
                      </h3>
                      <span className="font-es-label-sm text-es-label-sm text-es-primary-fixed-dim">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="font-es-label-sm text-es-label-sm text-es-on-surface whitespace-nowrap">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-es-outline-variant pt-4 font-es-label-sm text-es-label-sm">
                <Row label="Subtotal" value="$2,248.00" />
                <Row label="Envío (Día Siguiente)" value="$25.00" />
                <Row label="Impuestos Estimados" value="$168.60" />
              </div>

              <div className="mb-6 mt-4 flex items-end justify-between border-t border-es-outline-variant pt-4">
                <span className="font-es-body-lg text-es-body-lg text-es-on-surface">
                  Total
                </span>
                <span className="font-es-headline-md text-es-headline-md text-es-primary-fixed-dim">
                  $2,441.60
                </span>
              </div>

              <button className="inner-light-top group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-es-primary-container py-4 font-es-headline-md text-es-headline-md text-es-on-primary-container shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all hover:bg-es-primary-fixed-dim hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] active:scale-[0.98]">
                <span className="relative z-10">Completar Compra</span>
                <span className="material-symbols-outlined relative z-10">
                  arrow_forward
                </span>
                <div className="absolute inset-0 z-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />
              </button>

              <div className="mt-6 flex justify-center gap-6 border-t border-es-outline-variant pt-4 text-es-on-surface-variant">
                <TrustBadge icon="verified_user" label="SSL 256-bit" />
                <TrustBadge icon="workspace_premium" label="Garantía" />
                <TrustBadge icon="support_agent" label="Soporte 24/7" />
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-auto w-full border-t border-es-outline-variant bg-es-surface-container-lowest">
        <div className="mx-auto flex max-w-max-width flex-col items-center justify-between gap-4 py-margin-desktop px-margin-desktop font-es-label-sm text-es-label-sm text-es-on-surface-variant md:flex-row">
          <p>© 2024 ElectronicStore. Todos los derechos reservados. Diseñado con precisión para el rendimiento.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-es-primary-fixed-dim">
              Política de Privacidad
            </Link>
            <Link href="#" className="transition-colors hover:text-es-primary-fixed-dim">
              Términos de Servicio
            </Link>
            <Link href="#" className="transition-colors hover:text-es-primary-fixed-dim">
              Contáctanos
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  full,
}: {
  label: string;
  placeholder: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <label className="font-es-label-sm text-es-label-sm tracking-wide text-es-on-surface-variant uppercase">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-es-outline-variant bg-es-surface p-3 text-es-on-surface outline-none transition-all placeholder:text-es-outline focus:border-es-primary-container focus:ring-1 focus:ring-es-primary-container"
      />
    </div>
  );
}

function PaymentOption({
  icon,
  label,
  defaultChecked,
}: {
  icon: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        name="payment_method"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-es-outline-variant bg-es-surface p-4 transition-all hover:bg-es-surface-container-high peer-checked:border-es-primary-container peer-checked:bg-es-surface-container-high peer-checked:shadow-[0_0_0_1px_rgba(0,229,255,1)]">
        <span
          className={`material-symbols-outlined ${defaultChecked ? "es-fill-1 text-es-primary-fixed-dim" : "text-es-on-surface-variant"}`}
        >
          {icon}
        </span>
        <span
          className={`font-es-label-sm text-es-label-sm font-semibold peer-checked:text-es-on-surface ${defaultChecked ? "text-es-on-surface" : "text-es-on-surface-variant"}`}
        >
          {label}
        </span>
      </div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-es-on-surface-variant">
      <span>{label}</span>
      <span className="text-es-on-surface">{value}</span>
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="font-es-label-sm text-[10px] tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

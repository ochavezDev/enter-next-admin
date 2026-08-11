import Image from "next/image";
import { Footer } from "./_components/footer";
import { TopNav } from "./_components/topnav";

export default function LandingPage() {
  return (
    <>
      <TopNav underlineActive={false} />

      <main className="mx-auto flex w-full max-w-max-width flex-grow flex-col gap-16 px-margin-mobile pt-24 pb-16 md:px-margin-desktop">
        <section className="glass-panel relative flex min-h-[600px] w-full flex-col items-center overflow-hidden rounded-2xl border-t-2 border-t-es-outline-variant md:flex-row">
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, rgba(0,218,243,0.1) 0%, transparent 40%)",
            }}
          />

          <div className="z-10 flex flex-1 flex-col gap-6 p-8 md:p-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-es-outline-variant bg-es-surface-container px-3 py-1">
              <span className="size-2 animate-pulse rounded-full bg-es-primary-fixed-dim" />
              <span className="font-es-label-sm text-es-label-sm tracking-wider text-es-primary-fixed-dim uppercase">
                Novedad
              </span>
            </div>

            <h1 className="max-w-xl font-es-headline-lg-mobile text-es-headline-lg-mobile text-es-on-surface md:font-es-headline-lg md:text-es-headline-lg">
              Diseñado para una Precisión Absoluta.
            </h1>

            <p className="max-w-lg font-es-body-lg text-es-body-lg text-es-on-surface-variant">
              Experimente la próxima generación de potencia computacional. El
              VoltX Pro redefine el rendimiento con arquitectura de grado
              empresarial en un chasis de gravedad cero.
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <button className="rounded border-t border-es-primary-fixed bg-es-primary-container px-8 py-3 font-es-body-md text-es-body-md font-bold text-es-on-primary-container shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-colors hover:bg-es-primary">
                Reservar Ahora
              </button>
              <button className="rounded border border-es-outline-variant bg-transparent px-8 py-3 font-es-body-md text-es-body-md text-es-primary-fixed-dim transition-colors hover:border-es-primary-fixed-dim hover:bg-es-surface-container">
                Ver Especificaciones
              </button>
            </div>
          </div>

          <div className="relative z-10 flex h-[400px] w-full flex-1 items-center justify-center p-8 md:h-full">
            <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-full">
              <div className="absolute inset-0 rounded-full bg-es-primary-container opacity-10 blur-[100px]" />
              <Image
                src="/client/laptop-hero.png"
                alt="Laptop futurista de alto rendimiento"
                width={600}
                height={600}
                className="z-10 h-auto w-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>
        </section>

        <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <ValueProp
            icon="local_shipping"
            title="Logística Global Prioritaria"
            description="Entrega empresarial al día siguiente en todos los componentes de hardware insignia. Tránsito totalmente asegurado."
          />
          <ValueProp
            icon="support_agent"
            title="Soporte Técnico 24/7"
            description="Línea directa a ingenieros de Nivel 3 para una integración y resolución de problemas sin interrupciones."
          />
          <ValueProp
            icon="verified"
            title="Garantía de Calidad"
            description="Rigurosa inspección multipunto. Respaldada por nuestra garantía integral de hardware de 3 años."
          />
        </section>

        <section className="glass-panel flex w-full flex-col overflow-hidden rounded-2xl border-l-4 border-l-es-primary-fixed-dim md:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-4 bg-es-surface-container-lowest p-8 md:p-12">
            <h2 className="font-es-headline-md text-es-headline-md text-es-on-surface">
              Manténgase Operativo.
            </h2>
            <p className="font-es-body-md text-es-body-md text-es-on-surface-variant">
              Suscríbase para recibir informes técnicos, actualizaciones de
              firmware y acceso exclusivo a prototipos de hardware inéditos.
            </p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Ingrese correo corporativo"
                className="flex-1 rounded border border-es-outline-variant bg-es-surface px-4 py-3 font-es-body-md text-es-body-md text-es-on-surface outline-none transition-all placeholder:text-es-on-surface-variant focus:border-es-primary-fixed-dim focus:ring-1 focus:ring-es-primary-fixed-dim"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded border border-es-outline-variant bg-es-surface-bright px-6 py-3 font-es-body-md text-es-body-md text-es-primary-fixed-dim transition-colors hover:border-es-primary-fixed-dim"
              >
                Suscribirse
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>

          <div className="relative hidden min-h-[250px] w-1/3 md:block">
            <Image
              src="/client/circuit-board.png"
              alt="Macro de placa de circuito electrónico"
              fill
              className="object-cover opacity-50 grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-es-surface-container-lowest to-transparent" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValueProp({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-panel tech-glow group flex flex-col gap-4 rounded-xl p-8 transition-all duration-300">
      <div className="flex size-12 items-center justify-center rounded-full border border-es-outline-variant bg-es-surface-container transition-colors group-hover:border-es-primary-fixed-dim">
        <span className="material-symbols-outlined text-2xl text-es-primary-fixed-dim">
          {icon}
        </span>
      </div>
      <h3 className="font-es-headline-md text-es-headline-md text-es-on-surface">
        {title}
      </h3>
      <p className="font-es-body-md text-es-body-md text-es-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

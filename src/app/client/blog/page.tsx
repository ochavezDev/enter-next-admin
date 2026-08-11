import Image from "next/image";
import { Footer } from "../_components/footer";
import { TopNav } from "../_components/topnav";

const CATEGORIES = [
  "Todos los temas",
  "Reseñas de hardware",
  "Tecnología empresarial",
  "Tutoriales",
  "Noticias de la industria",
];

const ARTICLES = [
  {
    category: "Reseñas de hardware",
    title: "Las 5 mejores estaciones de trabajo empresariales de 2024: La potencia se une a la eficiencia",
    excerpt:
      "Pusimos a prueba las últimas máquinas insignia de los principales fabricantes para ver cuáles resisten bajo cargas de trabajo de compilación y renderizado extremas.",
    date: "22 de oct, 2024",
    readTime: "5 min de lectura",
    image: "/client/blog-workstation.png",
    alt: "Laptop estación de trabajo con código en pantalla",
  },
  {
    category: "Tutoriales",
    title: "Precisión táctil: Cómo elegir tu primer teclado mecánico personalizado",
    excerpt:
      "Una guía completa sobre interruptores, materiales de chasis y amortiguación acústica para profesionales que exigen más de su experiencia de escritura diaria.",
    date: "18 de oct, 2024",
    readTime: "12 min de lectura",
    image: "/client/blog-keyboard.png",
    alt: "Teclado mecánico personalizado",
  },
  {
    category: "Noticias de la industria",
    title: "La carrera del nodo de 2nm: Qué significa para las cadenas de suministro",
    excerpt:
      "A medida que las fundiciones empujan los límites físicos del silicio, analizamos los efectos posteriores en la disponibilidad y los precios del hardware empresarial para el próximo año fiscal.",
    date: "15 de oct, 2024",
    readTime: "7 min de lectura",
    image: "/client/blog-chip.png",
    alt: "Chip de silicio microscópico",
  },
];

const TRENDING = [
  "Configuración de matrices RAID para un rendimiento máximo",
  "Los mejores monitores ultra anchos para visualización de datos",
  "Comprendiendo las limitaciones de ancho de banda de PCIe 5.0",
];

export default function BlogPage() {
  return (
    <>
      <TopNav active="blog" showSearch={false} />

      <main className="mx-auto w-full max-w-max-width flex-grow px-margin-mobile pt-[100px] pb-16 md:px-margin-desktop">
        <header className="mb-12">
          <h1 className="mb-2 font-es-headline-lg-mobile text-es-headline-lg-mobile text-es-on-surface md:font-es-headline-lg md:text-es-headline-lg">
            ElectronicStore Insider <span className="text-gradient">Blog</span>
          </h1>
          <p className="max-w-2xl font-es-body-lg text-es-body-lg text-es-on-surface-variant">
            Análisis profundos sobre computación de alto rendimiento, tendencias
            de adquisición empresarial y el futuro de la ingeniería de hardware.
          </p>
        </header>

        <div className="scrollbar-hide mb-12 flex gap-4 overflow-x-auto pb-4">
          {CATEGORIES.map((category, i) =>
            i === 0 ? (
              <button
                key={category}
                className="rounded-full bg-es-primary-fixed-dim px-6 py-2 font-es-label-sm text-es-label-sm whitespace-nowrap text-es-on-primary-fixed"
              >
                {category}
              </button>
            ) : (
              <button
                key={category}
                className="rounded-full border border-es-outline-variant px-6 py-2 font-es-label-sm text-es-label-sm whitespace-nowrap text-es-on-surface-variant transition-colors hover:border-es-primary-fixed-dim hover:text-es-primary-fixed-dim"
              >
                {category}
              </button>
            ),
          )}
        </div>

        <section className="mb-16">
          <div className="group relative h-[500px] w-full cursor-pointer overflow-hidden rounded-xl border border-es-outline-variant">
            <Image
              src="/client/blog-server.png"
              alt="Sala de servidores con luces cian"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-es-surface-container-lowest via-es-surface-container-lowest/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <span className="mb-4 inline-block rounded border border-es-primary-fixed-dim px-3 py-1 font-es-label-sm text-es-label-sm text-es-primary-fixed-dim">
                Tecnología empresarial
              </span>
              <h2 className="mb-4 max-w-3xl font-es-headline-lg-mobile text-es-headline-lg-mobile text-es-on-surface md:font-es-headline-lg md:text-es-headline-lg">
                La evolución de la refrigeración de centros de datos: La
                inmersión líquida toma el control
              </h2>
              <p className="mb-6 max-w-2xl font-es-body-lg text-es-body-lg text-es-on-surface-variant">
                A medida que las demandas de procesamiento se disparan con la
                integración de la IA, la refrigeración por aire tradicional está
                alcanzando sus límites físicos. Exploramos la dinámica térmica
                de las configuraciones de inmersión líquida de próxima
                generación.
              </p>
              <div className="flex items-center gap-4 font-es-label-sm text-es-label-sm text-es-on-surface-variant">
                <span>Por el Dr. Aris Thorne</span>
                <span>•</span>
                <span>24 de oct, 2024</span>
                <span>•</span>
                <span>8 min de lectura</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-16 grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="flex flex-col gap-gutter md:col-span-8">
            <h3 className="mb-2 border-b border-es-outline-variant pb-4 font-es-headline-md text-es-headline-md text-es-on-surface">
              Últimas perspectivas
            </h3>

            {ARTICLES.map((article, i) => (
              <div key={article.title}>
                {i > 0 && <hr className="border-es-outline-variant" />}
                <ArticleCard {...article} />
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-8 md:col-span-4">
            <div className="glass-panel flex flex-col gap-4 rounded-xl p-6">
              <h3 className="flex items-center gap-2 font-es-headline-md text-es-headline-md text-es-on-surface">
                <span className="material-symbols-outlined text-es-primary-fixed-dim">
                  trending_up
                </span>
                Tendencias actuales
              </h3>
              <ul className="mt-2 flex flex-col gap-4">
                {TRENDING.map((title, i) => (
                  <li
                    key={title}
                    className={`group cursor-pointer ${i > 0 ? "border-t border-es-outline-variant pt-4" : ""}`}
                  >
                    <span className="mb-1 block font-es-label-sm text-es-label-sm text-es-primary-fixed-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-es-body-lg text-es-body-lg text-es-on-surface transition-colors group-hover:text-es-primary-fixed-dim">
                      {title}
                    </h4>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-es-outline-variant bg-es-surface-container p-6 text-center">
              <span className="material-symbols-outlined mb-4 text-4xl text-es-primary-fixed-dim">
                mail
              </span>
              <h3 className="mb-2 font-es-headline-md text-es-headline-md text-es-on-surface">
                Boletín de ElectronicStore
              </h3>
              <p className="mb-6 font-es-body-md text-es-body-md text-es-on-surface-variant">
                Reciba los últimos análisis técnicos y de la industria cada
                semana.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Ingrese su correo del trabajo"
                  className="w-full rounded-lg border border-es-outline-variant bg-es-surface-dim px-4 py-3 font-es-body-md text-es-on-surface outline-none focus:border-es-primary-fixed-dim focus:ring-1 focus:ring-es-primary-fixed-dim"
                />
                <button
                  type="button"
                  className="w-full rounded-lg bg-es-primary-container py-3 font-es-headline-md text-es-headline-md text-es-on-primary-container transition-colors hover:bg-es-primary"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

function ArticleCard({
  category,
  title,
  excerpt,
  date,
  readTime,
  image,
  alt,
}: (typeof ARTICLES)[number]) {
  return (
    <article className="group flex cursor-pointer flex-col gap-6 rounded-xl border border-transparent p-4 transition-colors hover:border-es-outline-variant hover:bg-es-surface-container-low md:flex-row">
      <div className="h-48 w-full shrink-0 overflow-hidden rounded-lg border border-es-outline-variant md:h-auto md:w-1/3">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="mb-2 font-es-label-sm text-es-label-sm text-es-primary-fixed-dim">
          {category}
        </span>
        <h4 className="mb-3 font-es-headline-md text-es-headline-md text-es-on-surface transition-colors group-hover:text-es-primary-fixed-dim">
          {title}
        </h4>
        <p className="mb-4 line-clamp-2 font-es-body-md text-es-body-md text-es-on-surface-variant">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 font-es-label-sm text-es-label-sm text-es-on-surface-variant">
          <span>{date}</span>
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}

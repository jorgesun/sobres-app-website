import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <Image src="/icon.png" alt="Sobres" width={32} height={32} className="rounded-[8px]" />
            <span className="text-button text-ink">Sobres</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/app/budget"
              className="rounded-pill bg-blue px-4 py-2 text-sub font-semibold text-white hover:bg-blueDk"
            >
              Abrir app web
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-pill bg-blueSoft px-3 py-1 text-label font-semibold text-blue">
            Método de sobres · Presupuesto base cero
          </span>
          <h1 className="mt-5 text-[40px] font-extrabold leading-tight tracking-tight md:text-[52px]">
            Asigna cada peso a un propósito.
          </h1>
          <p className="mt-4 max-w-md text-body text-muted">
            Sobres es la app de presupuesto personal basada en el método de
            sobres. Toma el control de tu dinero dándole un trabajo a cada peso
            que recibes — en tu iPhone y ahora también en el navegador.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/app/budget"
              className="rounded-button bg-blue px-6 py-3 text-button text-white hover:bg-blueDk"
            >
              Empezar gratis
            </Link>
            <a
              href="#features"
              className="rounded-button border border-line px-6 py-3 text-button text-ink hover:bg-field"
            >
              Conocer más
            </a>
          </div>
          <p className="mt-4 text-label text-faint">
            Local-first · Funciona offline · Tus datos son tuyos
          </p>
        </div>
        <div className="flex justify-center">
          <div className="rounded-card bg-gradient-to-br from-deep2 to-deep p-8 shadow-2xl">
            <Image
              src="/icon.png"
              alt="Sobres app"
              width={220}
              height={220}
              className="rounded-card"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-field py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-title font-bold">Por qué Sobres</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-card bg-white p-6">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 text-button text-ink">{f.title}</h3>
                <p className="mt-2 text-sub text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuatro pasos */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-title font-bold">Cuatro pasos</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-card border border-line p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-pill bg-blue text-button text-white">
                {i + 1}
              </div>
              <h3 className="mt-3 text-button text-ink">{s.title}</h3>
              <p className="mt-2 text-sub text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-card bg-gradient-to-br from-blue to-deep p-10 text-center text-white">
          <h2 className="text-title font-bold">Empieza a presupuestar hoy</h2>
          <p className="mx-auto mt-3 max-w-md text-body text-white/80">
            Cada peso que entra tiene un trabajo. Cuando asignas todo lo que
            recibes, tu &quot;Sin asignar&quot; llega a cero — ese es el estado ideal.
          </p>
          <Link
            href="/app/budget"
            className="mt-6 inline-block rounded-button bg-white px-6 py-3 text-button text-blue hover:bg-white/90"
          >
            Abrir la app web
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sub text-muted md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/favicon.png" alt="" width={20} height={20} className="rounded" />
            <span>© {new Date().getFullYear()} Sobres</span>
          </div>
          <div className="flex gap-5">
            <Link href="/privacidad" className="hover:text-ink">
              Privacidad
            </Link>
            <a href="mailto:hola@sobres-app.com" className="hover:text-ink">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: "✉️",
    title: "Método de sobres",
    body: "Reparte tu ingreso en sobres por categoría. El dinero se mueve entre sobres, nunca se crea de la nada.",
  },
  {
    icon: "💳",
    title: "Tarjetas de crédito",
    body: "Aparta el dinero para pagar cada cargo. Sabes exactamente cuánto debes y cuánto tienes reservado.",
  },
  {
    icon: "🌎",
    title: "Multimoneda MXN/USD",
    body: "Cuentas en pesos y dólares. Todo el presupuesto se calcula en MXN con el tipo de cambio vigente.",
  },
  {
    icon: "🔒",
    title: "Local-first y privado",
    body: "Tus datos viven en tu dispositivo y funcionan offline. La sincronización es opcional y cifrada por tu cuenta.",
  },
  {
    icon: "📊",
    title: "Reportes claros",
    body: "Mira a dónde se va tu dinero con donut por grupo y análisis Pareto de tus categorías.",
  },
  {
    icon: "🎯",
    title: "Metas de ahorro",
    body: "Define metas mensuales, por cantidad o con fecha límite, y sigue tu progreso mes a mes.",
  },
];

const STEPS = [
  { title: "Recibe", body: "Registra el dinero que entra a tus cuentas." },
  { title: "Asigna", body: "Dale un trabajo a cada peso repartiéndolo en sobres." },
  { title: "Gasta", body: "Registra tus gastos; cada sobre baja en tiempo real." },
  { title: "Ajusta", body: "Mueve dinero entre sobres cuando la vida cambie." },
];

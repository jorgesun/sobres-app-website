import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — Sobres",
  description: "Política de privacidad de la app Sobres.",
};

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-field">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="Sobres" width={28} height={28} className="rounded-[8px]" />
            <span className="text-button text-ink">Sobres</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <div className="rounded-card bg-white p-8 md:p-10">
          <h1 className="text-h1 font-bold text-ink">💼 Política de Privacidad</h1>
          <p className="mt-1 text-muted">Sobres — Presupuesto Personal</p>

          <Section title="🔒 Resumen en una línea">
            <p>
              Sobres no recopila, transmite ni comparte ningún dato personal sin
              tu consentimiento. Tu información financiera vive en tu dispositivo
              y solo se sincroniza si tú activas una cuenta.
            </p>
          </Section>

          <Section title="📱 Datos que guardamos">
            <p>Sobres almacena localmente en tu dispositivo:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Presupuestos, categorías y grupos de categorías que tú creas</li>
              <li>Cuentas bancarias y tarjetas de crédito que registres manualmente</li>
              <li>Transacciones y montos que ingreses</li>
              <li>Pagos programados y metas de ahorro</li>
              <li>Preferencias de la app (modo privacidad, bloqueo)</li>
            </ul>
          </Section>

          <Section title="🚫 Lo que NO hacemos">
            <ul className="ml-5 list-disc space-y-1">
              <li>No recopilamos datos de uso, analíticas ni telemetría</li>
              <li>No conectamos con tu banco ni leemos estados de cuenta</li>
              <li>No vendemos, alquilamos ni compartimos tu información con terceros</li>
              <li>No mostramos publicidad de ningún tipo</li>
              <li>No usamos cookies ni tecnologías de seguimiento</li>
            </ul>
          </Section>

          <Section title="☁️ Sincronización opcional">
            <p>
              La app funciona 100% local y offline. Si decides crear una cuenta,
              tus datos se sincronizan de forma segura mediante un servicio con
              control de acceso por usuario (RLS) para que solo tú puedas verlos.
              Puedes usar Sobres sin crear ninguna cuenta.
            </p>
          </Section>

          <Section title="💾 Respaldos y exportación">
            <p>
              Puedes exportar tu información en formato JSON (respaldo completo) o
              CSV (transacciones). Estos archivos se generan localmente y se
              comparten únicamente a través de las opciones que tú elijas.
            </p>
          </Section>

          <Section title="👶 Menores de edad">
            <p>
              Sobres no está dirigido a menores de 13 años y no recopila
              información de ningún usuario, independientemente de su edad.
            </p>
          </Section>

          <Section title="✏️ Cambios a esta política">
            <p>
              Si modificamos esta política, publicaremos la versión actualizada en
              esta misma página. Te recomendamos revisarla periódicamente.
            </p>
          </Section>

          <Section title="✉️ Contacto">
            <p>
              ¿Preguntas sobre privacidad o sobre la app? Escríbenos a{" "}
              <a href="mailto:hola@sobres-app.com" className="text-blue underline">
                hola@sobres-app.com
              </a>
            </p>
          </Section>

          <p className="mt-8 text-label text-faint">
            Última actualización: 22 de junio de 2026
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sub text-blue">
            ‹ Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="text-button text-ink">{title}</h2>
      <div className="mt-2 space-y-2 text-body text-muted">{children}</div>
    </section>
  );
}

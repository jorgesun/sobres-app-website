import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Soporte — Sobres",
  description: "Centro de ayuda y contacto de la app Sobres.",
};

export default function Soporte() {
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
          <h1 className="text-h1 font-bold text-ink">💬 Soporte</h1>
          <p className="mt-1 text-muted">Sobres — Presupuesto Personal</p>

          <Section title="✉️ ¿Necesitas ayuda?">
            <p>
              ¿Tienes una duda, encontraste un error o quieres sugerir algo?
              Escríbenos a{" "}
              <a href="mailto:hola@sobres-app.com" className="text-blue underline">
                hola@sobres-app.com
              </a>
              . Respondemos en un plazo de 24 a 48 horas.
            </p>
          </Section>

          <Section title="❓ Preguntas frecuentes">
            <div className="space-y-5">
              <Faq q="¿Cómo asigno dinero a un sobre?">
                En la pestaña <strong>Presupuesto</strong>, toca el monto de la
                columna “Asignado” de la categoría y escribe la cantidad. Puedes
                usar <code>+</code> o <code>−</code> para sumar o restar sobre lo
                que ya tenía.
              </Faq>

              <Faq q="¿Cómo registro un gasto o ingreso?">
                Abre una cuenta en la pestaña <strong>Cuentas</strong> y agrega
                una transacción. Elige egreso, ingreso o transferencia, pon el
                monto y, si es un gasto, la categoría a la que pertenece.
              </Faq>

              <Faq q="¿Qué pasa si gasto de más en un sobre?">
                El disponible de esa categoría se marca en rojo. Para corregirlo,
                mueve dinero desde otro sobre con saldo hacia el que quedó
                negativo.
              </Faq>

              <Faq q="¿Cómo manejo mis tarjetas de crédito?">
                Al registrar una cuenta de tarjeta, Sobres crea un sobre para
                ella. Apartas ahí el dinero de los gastos que hiciste con la
                tarjeta, para tener listo el pago y evitar que la deuda crezca.
              </Faq>

              <Faq q="¿Cómo creo un pago recurrente?">
                Desde <strong>Pagos programados</strong> defines el monto, la
                cuenta, la categoría y la frecuencia. La app te recuerda cuando
                vence y lo registras con un toque.
              </Faq>

              <Faq q="¿Cómo oculto mis saldos o bloqueo la app?">
                Activa el <strong>modo privacidad</strong> para ocultar los montos
                de un vistazo, y el <strong>bloqueo con Face ID / Touch ID</strong>{" "}
                desde <strong>Ajustes</strong>.
              </Faq>

              <Faq q="¿Mis datos se sincronizan entre dispositivos?">
                Sí. Al iniciar sesión, tu información se sincroniza de forma segura
                con tu cuenta para tenerla en todos tus dispositivos. La app
                también funciona sin conexión y sincroniza cuando vuelves a tener
                internet.
              </Faq>

              <Faq q="¿Puedo exportar o respaldar mi información?">
                Sí. Desde <strong>Ajustes</strong> puedes exportar un respaldo
                completo en JSON o tus transacciones en CSV.
              </Faq>
            </div>
          </Section>

          <Section title="🗑️ Eliminar tu cuenta">
            <p>
              Puedes borrar permanentemente tu cuenta y todos sus datos desde la
              app: <strong>Ajustes → Cuenta → Eliminar cuenta</strong>. La acción
              es irreversible. Si tienes problemas para hacerlo, escríbenos a{" "}
              <a href="mailto:hola@sobres-app.com" className="text-blue underline">
                hola@sobres-app.com
              </a>{" "}
              y lo resolvemos.
            </p>
          </Section>

          <Section title="🔒 Privacidad">
            <p>
              Consulta cómo cuidamos tu información en nuestra{" "}
              <Link href="/privacidad" className="text-blue underline">
                Política de Privacidad
              </Link>
              .
            </p>
          </Section>
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

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-body font-semibold text-ink">{q}</p>
      <p className="mt-1 text-body text-muted">{children}</p>
    </div>
  );
}

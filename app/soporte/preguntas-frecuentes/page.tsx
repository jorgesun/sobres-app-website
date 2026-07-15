import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout } from "../components";

const SLUG = "/soporte/preguntas-frecuentes";

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="acc-body">{children}</div>
    </details>
  );
}

export default function PreguntasFrecuentes() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Respuestas rápidas a lo que más nos preguntan. ¿No está aquí? Escríbenos a hola@sobres-app.com."
      />

      <Toc
        items={[
          { id: "general", label: "Lo básico" },
          { id: "dinero", label: "Sobre el dinero" },
          { id: "datos", label: "Datos y privacidad" },
          { id: "glosario", label: "Mini-glosario" },
        ]}
      />

      <h2 id="general">Lo básico</h2>
      <div className="sop-accordion">
        <Faq q="¿Sobres se conecta a mi banco?">
          <p>No. Toda la información la ingresas tú manualmente. La app nunca se conecta a bancos ni lee estados de cuenta. Es a propósito: capturar tus movimientos es lo que te mantiene consciente de tu dinero.</p>
        </Faq>
        <Faq q="¿Necesito crear una cuenta para usarla?">
          <p>No. Puedes elegir <em>&quot;Continuar sin cuenta&quot;</em> y usar todo en <strong>modo local</strong>, con tus datos guardados solo en tu iPhone. La cuenta es opcional y sirve para sincronizar entre dispositivos.</p>
        </Faq>
        <Faq q="¿En qué dispositivos funciona?">
          <p>Sobres es una app para iPhone. Con una cuenta, tus datos se sincronizan entre tus dispositivos iOS.</p>
        </Faq>
        <Faq q="¿Por dónde empiezo?">
          <p>Por la guía <Link href="/soporte/empieza-aqui">Empieza aquí</Link> y luego <Link href="/soporte/flujo-del-dinero">Cómo se mueve tu dinero</Link>. Con esas dos entiendes el 90% de la app.</p>
        </Faq>
      </div>

      <h2 id="dinero">Sobre el dinero</h2>
      <div className="sop-accordion">
        <Faq q="¿Cómo asigno dinero a un sobre?">
          <p>En <Link href="/soporte/presupuesto">Presupuesto</Link>, toca el monto en la columna &quot;Asignado&quot; de la categoría y escribe la cantidad. Puedes usar <strong>+</strong> o <strong>−</strong> para sumar o restar sobre lo que ya tenía.</p>
        </Faq>
        <Faq q="¿Qué significa que «Sin asignar» esté en $0?">
          <p>Que ya le diste un trabajo a cada peso: todo tu dinero disponible está repartido en sobres. Es la meta de cada mes, no tener el banco en ceros.</p>
        </Faq>
        <Faq q="¿Qué pasa si gasto de más en un sobre?">
          <p>Su disponible se pone en rojo (negativo). Para corregirlo, <Link href="/soporte/presupuesto">mueve dinero</Link> desde otro sobre con saldo, o asígnale más el próximo mes.</p>
        </Faq>
        <Faq q="¿El dinero que no gasto se pierde a fin de mes?">
          <p>No. El disponible de cada sobre <strong>se acumula</strong> y arranca el mes siguiente ahí mismo. Así puedes ahorrar poco a poco para cosas grandes.</p>
        </Faq>
        <Faq q="¿Cómo funcionan las tarjetas de crédito?">
          <p>Cada tarjeta tiene un sobre de pago. Al gastar con ella desde un sobre con fondos, ese dinero se <strong>reserva</strong> para pagar la tarjeta. Todo el detalle en <Link href="/soporte/tarjetas-de-credito">Tarjetas de crédito</Link>.</p>
        </Faq>
        <Faq q="¿Puedo llevar cuentas en dólares?">
          <p>Sí, la app soporta multimoneda (MXN/USD). Se activa en <Link href="/soporte/ajustes">Ajustes</Link>.</p>
        </Faq>
      </div>

      <h2 id="datos">Datos y privacidad</h2>
      <div className="sop-accordion">
        <Faq q="¿Mis datos se sincronizan entre dispositivos?">
          <p>Sí, si inicias sesión: tu información se sincroniza de forma cifrada y aislada por usuario. Sin cuenta, todo se queda en tu dispositivo.</p>
        </Faq>
        <Faq q="¿Puedo exportar o respaldar mi información?">
          <p>Sí. Desde <Link href="/soporte/ajustes">Ajustes</Link> exportas un respaldo completo en JSON o tus transacciones en CSV.</p>
        </Faq>
        <Faq q="¿Cómo oculto mis saldos o bloqueo la app?">
          <p>Activa el <strong>modo privacidad</strong> para ocultar los montos, y el <strong>bloqueo con Face ID / Touch ID</strong> desde Ajustes.</p>
        </Faq>
        <Faq q="¿Cómo elimino mi cuenta?">
          <p>En <strong>Ajustes → Cuenta → Eliminar cuenta</strong>. Borra tu usuario y todos tus datos de forma permanente e irreversible.</p>
        </Faq>
        <Faq q="¿Usan anuncios o rastreadores?">
          <p>No. Sin anuncios, sin rastreadores de terceros y sin analítica. Ver la <Link href="/privacidad">Política de Privacidad</Link>.</p>
        </Faq>
      </div>

      <h2 id="glosario">Mini-glosario</h2>
      <dl className="sop-glossary">
        <div><dt>Sobre (categoría)</dt><dd>Un apartado de dinero para un propósito (Renta, Súper, Vacaciones). Como un sobre de papel con efectivo etiquetado.</dd></div>
        <div><dt>Sin asignar</dt><dd>El dinero que ya tienes pero al que aún no le das un trabajo. Meta: $0.</dd></div>
        <div><dt>Asignado</dt><dd>Cuánto pusiste en un sobre este mes.</dd></div>
        <div><dt>Actividad</dt><dd>Lo que entró o salió del sobre por transacciones este mes (gasto negativo, ingreso positivo).</dd></div>
        <div><dt>Disponible</dt><dd>Lo que de verdad queda en el sobre: Asignado + Actividad + lo que sobró el mes pasado.</dd></div>
        <div><dt>Carryover (acumulación)</dt><dd>Que el disponible no gastado pasa al mes siguiente en vez de perderse.</dd></div>
        <div><dt>Reserva de tarjeta</dt><dd>Dinero apartado en el sobre de una tarjeta para pagar sus cargos cuando llegue el estado de cuenta.</dd></div>
        <div><dt>Confirmada</dt><dd>Marca que una transacción ya apareció en tu banco.</dd></div>
        <div><dt>Reconciliar</dt><dd>Cuadrar el saldo de la app con el del banco y &quot;congelar&quot; ese punto como verdad.</dd></div>
        <div><dt>Dentro / fuera del presupuesto</dt><dd>Las cuentas de gasto alimentan tus sobres; las de inversión pueden quedar fuera y su dinero no cuenta para asignar.</dd></div>
      </dl>

      <Callout type="tip" title="¿Sigues con dudas?">
        <p>Escríbenos a <a href="mailto:hola@sobres-app.com">hola@sobres-app.com</a> y te respondemos en 24–48 horas.</p>
      </Callout>

      <PrevNext slug={SLUG} />
    </>
  );
}

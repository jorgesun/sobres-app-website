import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, WhatIf, WhatIfItem, Shot } from "../components";

const SLUG = "/soporte/resumen";

export default function Resumen() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Resumen es la primera pestaña y tu tablero de control: de un vistazo ves cuánto tienes disponible, qué falta por asignar, tus metas y qué pagos vienen en camino."
      />

      <Toc
        items={[
          { id: "para-que", label: "¿Para qué sirve?" },
          { id: "que-ves", label: "Qué ves aquí" },
          { id: "tareas", label: "Cómo usar el calendario" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "tips", label: "Tips" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="para-que">¿Para qué sirve esta pantalla?</h2>
      <p>
        Es tu panorama del mes. No se asigna ni se gasta dinero aquí (eso pasa en
        <Link href="/soporte/presupuesto"> Presupuesto</Link> y <Link href="/soporte/cuentas">Cuentas</Link>);
        Resumen es para <strong>ver cómo vas</strong> y para procesar tus pagos programados.
      </p>

      <Shot label="pestaña Resumen" />

      <h2 id="que-ves">Qué ves aquí</h2>
      <ul>
        <li><strong>&quot;Sin asignar&quot;</strong> — cuánto dinero te falta por repartir. Si dice $0, ya le diste trabajo a todo.</li>
        <li><strong>Total disponible</strong> — la suma de lo que queda en todos tus sobres.</li>
        <li><strong>Asignado del mes</strong> — cuánto has puesto en sobres este mes.</li>
        <li><strong>Deuda de tarjetas</strong> — cuánto debes en total en tus tarjetas de crédito.</li>
        <li><strong>Metas</strong> — tus metas de ahorro con su avance. <strong>Toca una</strong> para abrir su pantalla de detalle con anillo de progreso y proyección.</li>
        <li><strong>Calendario de pagos programados</strong> — los días con un pago recurrente aparecen marcados. Toca un día para procesarlo u omitirlo.</li>
      </ul>

      <h2 id="tareas">Cómo procesar un pago desde el calendario</h2>
      <Steps>
        <li><strong>Toca el día marcado</strong> en el calendario de pagos programados.</li>
        <li>Verás el o los pagos de ese día. Elige <strong>&quot;Procesar ahora&quot;</strong> para crear la transacción, o <strong>&quot;Omitir&quot;</strong> para saltar ese ciclo sin registrarlo.</li>
        <li>Al procesar, puedes <strong>ajustar el monto</strong> de ese cargo si vino distinto de lo normal.</li>
      </Steps>
      <p className="muted">
        Todo el detalle (crear, frecuencias, ajustar de forma permanente o solo una vez) está en
        <Link href="/soporte/pagos-programados"> Pagos programados</Link>.
      </p>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <Callout type="tip" title="Al procesar un pago programado…">
        <p>
          Se crea una <strong>transacción real</strong>, igual que si la hubieras capturado a mano:
          si es un egreso, baja el disponible del sobre correspondiente; si es un ingreso, entra a
          &quot;Sin asignar&quot;; si es una transferencia, mueve dinero entre dos cuentas. <strong>Omitir</strong>
          no toca tu dinero: solo salta ese ciclo.
        </p>
      </Callout>

      <h2 id="tips">Tips y errores comunes</h2>
      <Callout type="good">
        <p>Revisa Resumen al inicio del mes: si &quot;Sin asignar&quot; es mayor a $0, aún tienes dinero por repartir.</p>
      </Callout>
      <Callout type="warn">
        <p>Un pago programado <strong>no se registra solo</strong>: la app te avisa, pero eres tú quien confirma &quot;Procesar ahora&quot;. Así nunca se crea un movimiento sin que tú lo apruebes.</p>
      </Callout>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si «Sin asignar» aparece en rojo (negativo)?">
          <p>Significa que asignaste más dinero del que tienes. Quita asignación de algún sobre (en <Link href="/soporte/presupuesto">Presupuesto</Link>) hasta que vuelva a $0 o positivo.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si toco una meta?">
          <p>Se abre su <strong>pantalla de detalle</strong>: anillo de progreso, aporte mensual sugerido, disponible actual, fecha objetivo y una gráfica con tu avance real y la proyección de cuándo la lograrás. Ver <Link href="/soporte/metas">Metas</Link>.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si un día tiene varios pagos?">
          <p>Al tocar el día verás todos, y puedes procesar u omitir cada uno por separado.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

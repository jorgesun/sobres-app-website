import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, TableWrap, WhatIf, WhatIfItem } from "../components";

const SLUG = "/soporte/pagos-programados";

export default function PagosProgramados() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Los pagos programados son tus movimientos recurrentes: renta, Netflix, un seguro, tu quincena. La app te los recuerda en el calendario y tú los registras con un toque, siempre bajo tu control."
      />

      <Toc
        items={[
          { id: "que-son", label: "¿Qué son?" },
          { id: "crear", label: "Cómo crear uno" },
          { id: "procesar", label: "Procesar u omitir" },
          { id: "ajustar", label: "Ajustar el monto" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="que-son">¿Qué son?</h2>
      <p>
        Un pago programado es un movimiento que se repite: puede ser un <strong>egreso</strong> (la renta),
        un <strong>ingreso</strong> (tu sueldo) o una <strong>transferencia</strong> (pasar a ahorro). Eliges
        la frecuencia y la app lo coloca en el <Link href="/soporte/resumen">calendario de Resumen</Link>.
      </p>

      <TableWrap>
        <thead><tr><th>Puede ser…</th><th>Frecuencia</th></tr></thead>
        <tbody>
          <tr><td>Egreso · Ingreso · Transferencia</td><td>Semanal, quincenal, mensual y más</td></tr>
        </tbody>
      </TableWrap>

      <h2 id="crear">Cómo crear un pago programado</h2>
      <Steps>
        <li>Define el <strong>tipo</strong> (egreso, ingreso o transferencia) y el <strong>monto</strong>.</li>
        <li>Elige la <strong>cuenta</strong> y, si es un gasto, la <strong>categoría</strong> (el sobre).</li>
        <li>Elige la <strong>frecuencia</strong> y la fecha del primer cargo.</li>
        <li>Guarda. Aparecerá marcado en el calendario los días que corresponda.</li>
      </Steps>

      <h2 id="procesar">Procesar u omitir</h2>
      <p>Un pago programado <strong>no se registra solo</strong>: la app te lo recuerda y tú decides.</p>
      <Steps>
        <li>En <Link href="/soporte/resumen">Resumen</Link>, toca el <strong>día marcado</strong> del calendario.</li>
        <li>Elige <strong>&quot;Procesar ahora&quot;</strong> para crear la transacción de ese ciclo…</li>
        <li>…o <strong>&quot;Omitir&quot;</strong> para saltar ese ciclo sin registrar nada (el pago sigue vivo para la próxima vez).</li>
      </Steps>

      <Callout type="tip" title="Por qué tú apruebas cada pago">
        <p>
          Así nunca aparece un movimiento fantasma en tu presupuesto. La app te ayuda a recordar, pero
          la realidad la confirmas tú: si este mes no se cobró, lo omites y listo.
        </p>
      </Callout>

      <h2 id="ajustar">Ajustar el monto de un cargo</h2>
      <p>
        A veces el cargo llega distinto (la luz varía, un recibo subió). Al procesar puedes cambiar el
        monto, y tienes dos opciones:
      </p>
      <TableWrap>
        <thead><tr><th>Opción</th><th>Qué hace</th></tr></thead>
        <tbody>
          <tr><td><strong>Actualizando monto</strong></td><td>Cambia el cargo recurrente <strong>de forma permanente</strong>: de aquí en adelante usará el nuevo monto.</td></tr>
          <tr><td><strong>Manteniendo cargo original</strong></td><td>Cambia <strong>solo este cargo</strong>. Los siguientes vuelven al monto normal.</td></tr>
        </tbody>
      </TableWrap>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <p>Cuando procesas un pago, se crea una transacción real:</p>
      <ul>
        <li><strong>Egreso</strong> → baja el saldo de la cuenta y el disponible del sobre.</li>
        <li><strong>Ingreso</strong> → entra a la cuenta y a <strong>&quot;Sin asignar&quot;</strong>, listo para repartir.</li>
        <li><strong>Transferencia</strong> → mueve dinero entre dos cuentas.</li>
      </ul>
      <Callout type="good">
        <p><strong>Omitir</strong> no toca tu dinero: solo salta ese ciclo. Tu presupuesto no cambia hasta que procesas.</p>
      </Callout>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si olvidé procesar un pago de días pasados?">
          <p>Sigue marcado en el calendario. Ve a ese día y procésalo cuando puedas; también puedes omitirlo si al final no ocurrió.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si el gasto ya no es recurrente?">
          <p>Puedes editar o dar de baja el pago programado para que deje de aparecer en el calendario, conservando las transacciones que ya registraste.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si el sobre no tiene fondos cuando proceso un egreso?">
          <p>La transacción se registra igual y el disponible del sobre quedará en rojo. Muévele dinero de otro sobre para cubrirlo (ver <Link href="/soporte/presupuesto">Presupuesto</Link>).</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

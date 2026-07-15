import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, TableWrap, WhatIf, WhatIfItem, Shot } from "../components";

const SLUG = "/soporte/cuentas";

export default function Cuentas() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Cuentas es donde vive el dinero de verdad: tus cheques, efectivo, ahorro, tarjetas e inversiones. Aquí registras cada transacción y las cuadras con tu banco."
      />

      <Toc
        items={[
          { id: "para-que", label: "¿Para qué sirve?" },
          { id: "tipos", label: "Tipos de cuenta" },
          { id: "transaccion", label: "Cómo registrar una transacción" },
          { id: "confirmar", label: "Confirmar y reconciliar" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "tips", label: "Tips" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="para-que">¿Para qué sirve esta pantalla?</h2>
      <p>
        Mientras <Link href="/soporte/presupuesto">Presupuesto</Link> organiza el dinero en sobres,
        Cuentas lleva el registro de <strong>dónde está físicamente</strong> ese dinero y de cada
        movimiento que haces con él.
      </p>

      <Shot label="pestaña Cuentas con la lista de cuentas y saldos" />

      <h2 id="tipos">Tipos de cuenta</h2>
      <TableWrap>
        <thead>
          <tr><th>Tipo</th><th>Para qué</th><th>¿Alimenta el presupuesto?</th></tr>
        </thead>
        <tbody>
          <tr><td>Cheques / Débito</td><td>Tu cuenta del día a día</td><td>Sí (dentro del presupuesto)</td></tr>
          <tr><td>Efectivo</td><td>El dinero en tu cartera</td><td>Sí</td></tr>
          <tr><td>Ahorro</td><td>Dinero apartado</td><td>Sí</td></tr>
          <tr><td>Tarjeta de crédito</td><td>Compras a crédito</td><td>Sí (con su reserva de pago)</td></tr>
          <tr><td>Inversión</td><td>Dinero que no es para gasto diario</td><td>Puede quedar fuera del presupuesto</td></tr>
        </tbody>
      </TableWrap>

      <Callout type="tip" title="Dentro vs. fuera del presupuesto">
        <p>
          Las cuentas de gasto (cheques, efectivo, ahorro) están <strong>dentro del presupuesto</strong>:
          su dinero se reparte en sobres. Una cuenta de inversión puede marcarse <strong>fuera del
          presupuesto</strong>; entonces su saldo <strong>no</strong> cuenta como &quot;Sin asignar&quot; ni entra
          a los sobres. Un ingreso desde una cuenta fuera del presupuesto tampoco suma a &quot;Sin asignar&quot;.
        </p>
      </Callout>

      <h2 id="transaccion">Cómo registrar una transacción</h2>
      <Steps>
        <li>Abre la cuenta y toca para <strong>agregar una transacción</strong>.</li>
        <li>Elige el tipo: <strong>egreso</strong> (gasto), <strong>ingreso</strong> o <strong>transferencia</strong> entre dos cuentas.</li>
        <li>Escribe el <strong>monto</strong>. Recuerda el signo: negativo = egreso, positivo = ingreso.</li>
        <li>Si es un gasto, elige la <strong>categoría</strong> (el sobre) de la que sale.</li>
        <li>Guarda. El saldo de la cuenta y el disponible del sobre se actualizan al instante.</li>
      </Steps>

      <h2 id="confirmar">Confirmar y reconciliar</h2>
      <p>Son dos cosas distintas y complementarias:</p>
      <ul>
        <li><strong>Confirmada</strong> — marcas que la transacción <strong>ya apareció</strong> en tu banco (dejó de estar pendiente).</li>
        <li><strong>Reconciliar</strong> — cuadras el saldo de la app con el saldo real del banco en un momento dado, y &quot;congelas&quot; ese punto como verdad.</li>
      </ul>
      <Callout type="good">
        <p>Tienen su propia guía, paso a paso, en <Link href="/soporte/reconciliacion">Reconciliación</Link>.</p>
      </Callout>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <ul>
        <li><strong>Egreso</strong>: baja el saldo de la cuenta <em>y</em> baja el disponible del sobre elegido.</li>
        <li><strong>Ingreso</strong> (a cuenta dentro del presupuesto): sube el saldo de la cuenta y entra a <strong>&quot;Sin asignar&quot;</strong>, listo para repartir.</li>
        <li><strong>Transferencia</strong>: mueve dinero de una cuenta a otra; no toca tus sobres (salvo el caso de pagar una tarjeta, ver abajo).</li>
        <li><strong>Pago a una tarjeta de crédito</strong>: es una transferencia de tu cuenta de cheques hacia la tarjeta; usa la reserva que ya tenías apartada.</li>
      </ul>

      <h2 id="tips">Tips y errores comunes</h2>
      <Callout type="tip">
        <p>Registra tus gastos el mismo día. Toma diez segundos y es lo que mantiene tu presupuesto pegado a la realidad.</p>
      </Callout>
      <Callout type="warn">
        <p>Al capturar un gasto, no olvides elegir la categoría: una transacción sin sobre no baja de ningún lado y descuadra tu disponible.</p>
      </Callout>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si me devuelven dinero de una compra?">
          <p>Regístralo como <strong>ingreso en esa misma categoría</strong>: sube el disponible del sobre sin pasar por &quot;Sin asignar&quot;. Es el caso típico de un reembolso.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si el saldo de la app no coincide con el del banco?">
          <p>Usa la <Link href="/soporte/reconciliacion">reconciliación</Link> para encontrar la diferencia y cuadrar. Casi siempre es una transacción que olvidaste registrar o un monto mal capturado.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si pago con tarjeta de crédito?">
          <p>Al elegir la categoría del gasto, la app <strong>reserva</strong> ese dinero en el sobre de tu tarjeta para el pago futuro. Todo el detalle en <Link href="/soporte/tarjetas-de-credito">Tarjetas de crédito</Link>.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

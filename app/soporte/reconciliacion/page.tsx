import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, TableWrap, WhatIf, WhatIfItem } from "../components";

const SLUG = "/soporte/reconciliacion";

export default function Reconciliacion() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="«Confirmar» y «reconciliar» suenan parecido, pero hacen cosas distintas. Aquí queda claro cuál usar y cómo cuadrar el saldo de la app con el de tu banco."
      />

      <Toc
        items={[
          { id: "diferencia", label: "Confirmar vs. reconciliar" },
          { id: "confirmar", label: "Cómo confirmar" },
          { id: "reconciliar", label: "Cómo reconciliar" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="diferencia">Confirmar vs. reconciliar</h2>
      <TableWrap>
        <thead><tr><th></th><th>Confirmada</th><th>Reconciliar</th></tr></thead>
        <tbody>
          <tr><td><strong>Qué significa</strong></td><td>La transacción ya apareció en tu banco</td><td>El saldo de la app cuadra con el del banco en un momento dado</td></tr>
          <tr><td><strong>Alcance</strong></td><td>Una transacción</td><td>Toda una cuenta hasta una fecha</td></tr>
          <tr><td><strong>Cada cuándo</strong></td><td>Cuando quieras, seguido</td><td>De vez en cuando (p. ej. mensual)</td></tr>
          <tr><td><strong>Efecto</strong></td><td>Marca que dejó de estar pendiente</td><td>&quot;Congela&quot; ese punto como verdad</td></tr>
        </tbody>
      </TableWrap>

      <Callout type="tip" title="La analogía simple">
        <p>
          <strong>Confirmar</strong> es palomear cada movimiento que ya viste en tu banco.
          <strong> Reconciliar</strong> es cerrar la cuenta: &quot;a día de hoy, la app y el banco dicen lo mismo&quot;.
        </p>
      </Callout>

      <h2 id="confirmar">Cómo confirmar una transacción</h2>
      <Steps>
        <li>Abre la cuenta en <Link href="/soporte/cuentas">Cuentas</Link> y revisa tu banco en paralelo.</li>
        <li>Marca como <strong>&quot;Confirmada&quot;</strong> cada transacción que ya aparezca en el banco.</li>
        <li>Las que sigan pendientes (aún no las procesa el banco) déjalas sin confirmar.</li>
      </Steps>

      <h2 id="reconciliar">Cómo reconciliar una cuenta</h2>
      <Steps>
        <li>Ten a la mano el <strong>saldo real</strong> de la cuenta según tu banco.</li>
        <li>Entra a reconciliar esa cuenta e indica ese saldo.</li>
        <li>Si el saldo de la app <strong>coincide</strong>, confirmas y ese punto queda &quot;congelado&quot;.</li>
        <li>Si <strong>no coincide</strong>, busca la diferencia: casi siempre es una transacción que faltó registrar o un monto mal capturado. Corrígela y vuelve a cuadrar.</li>
      </Steps>

      <Callout type="good" title="Qué logras al reconciliar">
        <p>
          Una transacción reconciliada queda <strong>bloqueada</strong> a nivel de confirmación: es un punto
          de verdad que no se mueve por accidente. Si de plano necesitas cambiarla, puedes
          <strong> &quot;Quitar reconciliación&quot;</strong> a propósito.
        </p>
      </Callout>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <p>
        Ni confirmar ni reconciliar <strong>cambian tus sobres</strong>: no asignan ni gastan. Son
        herramientas para que el saldo de tus <Link href="/soporte/cuentas">cuentas</Link> refleje la
        realidad. El dinero solo se mueve cuando creas o corriges una transacción durante el proceso.
      </p>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si no cuadra por unos pesos?">
          <p>Suele ser una comisión, un redondeo o un cargo chico que olvidaste. Regístralo y volverá a cuadrar. Evita &quot;forzar&quot; el saldo sin entender la diferencia.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si necesito editar una transacción ya reconciliada?">
          <p>Primero usa <strong>&quot;Quitar reconciliación&quot;</strong>, haz el cambio y vuelve a reconciliar. El bloqueo existe justo para que no la alteres sin querer.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Cada cuánto conviene reconciliar?">
          <p>Una vez al mes, cuando te llega el estado de cuenta, es un buen ritmo. Confirmar, en cambio, puedes hacerlo cada que revisas la app.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

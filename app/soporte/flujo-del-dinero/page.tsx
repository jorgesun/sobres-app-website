import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Flow, FlowBox, FlowArrow, Money, MoneyRow, WhatIf, WhatIfItem } from "../components";

const SLUG = "/soporte/flujo-del-dinero";

export default function FlujoDelDinero() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Esta es la página más importante de toda la ayuda. Si entiendes lo de aquí, entiendes Sobres. Vamos a seguir un peso desde que entra hasta que se gasta."
      />

      <Toc
        items={[
          { id: "diagrama", label: "El diagrama maestro" },
          { id: "historia", label: "La historia de los $10,000" },
          { id: "reglas", label: "Las 3 reglas que lo explican todo" },
          { id: "dos-formas", label: "Dos formas de llenar un sobre" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="diagrama">El diagrama maestro</h2>
      <p>
        Tu dinero siempre recorre el mismo camino. Léelo de arriba hacia abajo: entra,
        espera un trabajo, lo asignas a un sobre y desde ahí se gasta.
      </p>

      <Flow>
        <FlowBox title="1 · Ingreso" sub="registras que te pagaron" />
        <FlowArrow />
        <FlowBox title="2 · Cuenta (dentro del presupuesto)" sub="cheques · efectivo · ahorro" />
        <FlowArrow />
        <FlowBox title="3 · Sin asignar" sub="dinero sin trabajo asignado" variant="yellow" />
        <FlowArrow label="asignas" />
        <FlowBox title="4 · Sobres / categorías" sub="Renta · Súper · Vacaciones…" variant="accent" />
        <FlowArrow label="gastas" />
        <FlowBox title="5 · Gasto" sub="baja el «Disponible» del sobre" />
      </Flow>

      <div className="flow-branch">
        <div className="bnote">↳ Si pagaste con TARJETA DE CRÉDITO, hay un paso extra:</div>
        <Flow>
          <FlowBox title="Sobre de pago de tu tarjeta" sub="se reserva el dinero del sobre de gasto" variant="accent" />
          <FlowArrow label="al llegar el estado de cuenta" />
          <FlowBox title="Pagas la tarjeta" sub="ya tenías el dinero apartado" />
        </Flow>
      </div>

      <Callout type="tip" title="Lee esto una vez y todo encaja">
        <p>
          El dinero <strong>nunca aparece de la nada dentro de un sobre</strong>. Siempre viene
          de &quot;Sin asignar&quot; (o lo mueves desde otro sobre). Por eso la app te obliga a repartir
          antes de gastar: para que no gastes dinero que en realidad ya tenía otro destino.
        </p>
      </Callout>

      <h2 id="historia">La historia de los $10,000</h2>
      <p>Sigamos un mes completo, paso a paso, con cifras reales.</p>

      <Money label="Paso 1 — Te pagan">
        <p>Registras un ingreso de <strong>$10,000</strong> en tu cuenta de Cheques. Aparecen en <strong>&quot;Sin asignar&quot;</strong>, esperando trabajo.</p>
        <MoneyRow name="Sin asignar" amount="$10,000" sign="pos" />
      </Money>

      <Money label="Paso 2 — Asignas cada peso">
        <p>Vas a la pestaña <strong>Presupuesto</strong> y repartes:</p>
        <MoneyRow name="🏠 Renta" amount="$4,000" />
        <MoneyRow name="🛒 Súper" amount="$3,000" />
        <MoneyRow name="✈️ Vacaciones" amount="$1,000" />
        <MoneyRow name="🚨 Emergencias" amount="$2,000" />
        <MoneyRow name="Sin asignar" amount="$0" sign="pos" />
        <p className="muted">¡Todo tiene trabajo! &quot;Sin asignar&quot; = $0.</p>
      </Money>

      <Money label="Paso 3 — Gastas con débito">
        <p>Vas al súper y pagas <strong>$800</strong> con tu tarjeta de débito. El sobre <strong>Súper</strong> baja:</p>
        <MoneyRow name="🛒 Súper — antes" amount="$3,000" />
        <MoneyRow name="🛒 Súper — gasto" amount="−$800" sign="neg" />
        <MoneyRow name="🛒 Súper — disponible" amount="$2,200" sign="pos" />
      </Money>

      <Money label="Paso 4 — Fin de mes: lo que sobra se queda">
        <p>No gastaste todo el Súper. Quedan <strong>$2,200</strong>. El próximo mes ese sobre <strong>empieza en $2,200</strong>, no en cero. El dinero no se pierde: se acumula.</p>
        <MoneyRow name="🛒 Súper — arranca julio con" amount="$2,200" sign="pos" />
      </Money>

      <Money label="Paso 5 — Compras con tarjeta de crédito">
        <p>Reservas un vuelo de <strong>$1,500</strong> con tu <strong>tarjeta de crédito</strong>, desde el sobre de Vacaciones. Pasan dos cosas a la vez:</p>
        <MoneyRow name="✈️ Vacaciones — baja" amount="−$1,500" sign="neg" />
        <MoneyRow name="💳 Pago de tarjeta — sube (reserva)" amount="+$1,500" sign="pos" />
        <p className="muted">
          El dinero salió de Vacaciones y se <strong>reservó</strong> en el sobre de tu tarjeta.
          Cuando llegue el estado de cuenta, ya tienes los $1,500 apartados para pagarla, sin sustos.
        </p>
      </Money>

      <Callout type="good" title="El resultado">
        <p>
          Tu tarjeta de crédito dejó de ser una fuente de deuda sorpresa. Cada compra que
          haces con ella <strong>ya viene con su dinero apartado</strong> para pagarla. Ver la
          guía completa de <Link href="/soporte/tarjetas-de-credito">Tarjetas de crédito</Link>.
        </p>
      </Callout>

      <h2 id="reglas">Las 3 reglas que lo explican todo</h2>

      <Callout type="tip" title="Regla 1 · Cada peso necesita un trabajo">
        <p>Asigna tu dinero hasta que &quot;Sin asignar&quot; sea <strong>$0</strong>. Un peso sin trabajo es un peso que gastarás sin darte cuenta.</p>
      </Callout>
      <Callout type="tip" title="Regla 2 · Gastar mueve dinero, no lo inventa">
        <p>Si un sobre no tiene fondos, no puedes gastar de él sin quitárselo a otro. Cuando eso pasa, <strong>mueves dinero</strong> de un sobre con saldo al que le hizo falta.</p>
      </Callout>
      <Callout type="tip" title="Regla 3 · Lo que sobra se queda">
        <p>El disponible de cada sobre <strong>se acumula mes a mes</strong> (a esto se le llama <em>carryover</em>). Es lo que hace posible ahorrar poco a poco para cosas grandes.</p>
      </Callout>

      <h3>Traducción de términos</h3>
      <p>Solo hay cuatro palabras que necesitas dominar. Aquí están, con su fórmula:</p>
      <ul>
        <li><strong>Sin asignar</strong> — el dinero que ya tienes pero aún no repartes. Meta: $0.</li>
        <li><strong>Asignado</strong> — cuánto pusiste en un sobre este mes.</li>
        <li><strong>Actividad</strong> — lo que entró o salió del sobre por transacciones este mes (gasto negativo, reembolso positivo).</li>
        <li><strong>Disponible</strong> — lo que de verdad queda en el sobre ahora mismo:
          <br /><code>Disponible = Asignado + Actividad + lo que sobró el mes pasado</code>
        </li>
      </ul>

      <h2 id="dos-formas">Dos formas de llenar un sobre</h2>
      <p>Aquí se confunde mucha gente. Hay dos maneras de que a un sobre le entre dinero:</p>

      <Flow>
        <FlowBox title="Camino normal (recomendado)" sub="Ingreso → Sin asignar → repartes a los sobres" variant="yellow" />
      </Flow>
      <p className="muted">Casi siempre usarás este: el ingreso cae en &quot;Sin asignar&quot; y tú decides a dónde va.</p>

      <Flow>
        <FlowBox title="Ingreso directo al sobre" sub="registras un ingreso dentro de una categoría" variant="accent" />
      </Flow>
      <p className="muted">
        A veces te <strong>reembolsan</strong> algo (te devuelven $200 del Súper). Puedes registrar ese
        ingreso directo en la categoría &quot;Súper&quot;: sube su disponible sin pasar por &quot;Sin asignar&quot;.
        Útil para reembolsos y devoluciones.
      </p>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si gasto más de lo que hay en un sobre?">
          <p>El disponible de ese sobre se pone en <strong>rojo</strong> (negativo). No pasa nada grave: solo significa que le debes dinero a ese sobre. Para arreglarlo, <strong>mueve dinero</strong> desde otro sobre con saldo, o asígnale más el próximo mes. Ver <Link href="/soporte/presupuesto">Presupuesto</Link>.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si no asigno todo y dejo dinero «Sin asignar»?">
          <p>No se rompe nada: ese dinero simplemente sigue disponible para asignar cuando quieras. Pero mientras esté sin trabajo, es dinero que puedes gastar sin un plan. La recomendación es repartirlo todo.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si mi dinero está en una cuenta de inversión?">
          <p>Las cuentas de inversión pueden marcarse como <strong>«fuera del presupuesto»</strong>. Su dinero no cuenta como &quot;Sin asignar&quot; ni se reparte en sobres, porque no es dinero para el gasto diario. Ver <Link href="/soporte/cuentas">Cuentas</Link>.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si quiero ahorrar para algo grande?">
          <p>Crea un sobre para esa meta y asígnale un poco cada mes. Como el disponible se acumula, el sobre irá creciendo. La app incluso puede calcular cuánto aportar al mes: ver <Link href="/soporte/metas">Metas de ahorro</Link>.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

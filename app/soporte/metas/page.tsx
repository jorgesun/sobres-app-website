import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, TableWrap, Steps, WhatIf, WhatIfItem, Shot } from "../components";

const SLUG = "/soporte/metas";

export default function Metas() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Una meta convierte un sobre en un plan de ahorro: le dices a la app cuánto quieres juntar (y para cuándo) y ella calcula cuánto aportar cada mes y te muestra tu avance."
      />

      <Toc
        items={[
          { id: "que-es", label: "¿Qué es una meta?" },
          { id: "tipos", label: "Los 5 tipos de meta" },
          { id: "crear", label: "Cómo poner una meta" },
          { id: "detalle", label: "La pantalla de detalle" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="que-es">¿Qué es una meta?</h2>
      <p>
        Es un objetivo que le pones a un sobre. En lugar de asignar &quot;lo que caiga&quot;, la app te
        dice <strong>cuánto te falta</strong> y <strong>cuánto aportar</strong> para lograrlo. Como el
        disponible <Link href="/soporte/flujo-del-dinero">se acumula mes a mes</Link>, tu sobre va
        creciendo hasta llegar a la meta.
      </p>

      <Shot label="categoría con barra de progreso de meta" />

      <h2 id="tipos">Los 5 tipos de meta</h2>
      <TableWrap>
        <thead>
          <tr><th>Tipo</th><th>Qué hace</th><th>Ejemplo</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Ahorro mensual fijo</strong></td><td>Apartar un monto fijo cada mes</td><td>$500 al mes para el Fondo de emergencia</td></tr>
          <tr><td><strong>Ahorro semanal fijo</strong></td><td>Un monto por cada semana del mes</td><td>$200 por semana para el Súper</td></tr>
          <tr><td><strong>Meta de cantidad</strong></td><td>Llegar a un total, sin fecha</td><td>Juntar $20,000 de colchón</td></tr>
          <tr><td><strong>Meta con fecha</strong></td><td>Llegar a un total para una fecha; la app reparte el aporte mensual</td><td>$18,000 para diciembre (aguinaldo de regalos)</td></tr>
          <tr><td><strong>Pago de deuda</strong></td><td>Como la meta con fecha, para saldar algo</td><td>Pagar $12,000 de una deuda en 6 meses</td></tr>
        </tbody>
      </TableWrap>

      <Callout type="tip" title="¿Fija por monto o por fecha?">
        <p>
          Si tienes una <strong>fecha límite</strong> (un viaje, un pago), usa <em>meta con fecha</em> o
          <em> pago de deuda</em>: la app divide lo que falta entre los meses restantes y te dice el
          aporte mensual. Si solo quieres <strong>juntar sin prisa</strong>, usa <em>meta de cantidad</em>
          o un <em>ahorro fijo</em>.
        </p>
      </Callout>

      <h2 id="crear">Cómo poner una meta</h2>
      <Steps>
        <li>En <Link href="/soporte/presupuesto">Presupuesto</Link>, abre la categoría y entra a editarla.</li>
        <li>Elige el <strong>tipo de meta</strong> y captura el monto (y la fecha objetivo, si aplica).</li>
        <li>Guarda. A partir de ahí verás una <strong>barra de progreso</strong> en la categoría.</li>
      </Steps>
      <Callout type="warn">
        <p>Las metas no se ofrecen para las categorías de <strong>tarjeta de crédito</strong> ni para las del sistema: esas las gestiona la app automáticamente.</p>
      </Callout>

      <h2 id="detalle">La pantalla de detalle de la meta</h2>
      <p>Desde <Link href="/soporte/resumen">Resumen</Link>, toca una meta para abrir su detalle:</p>
      <ul>
        <li><strong>Anillo de progreso</strong> — qué tan cerca estás, en porcentaje.</li>
        <li><strong>Aporte mensual sugerido</strong> — cuánto conviene asignar este mes para ir a tiempo.</li>
        <li><strong>Disponible actual</strong> — lo que ya llevas juntado en el sobre.</li>
        <li><strong>Fecha objetivo</strong> — cuándo quieres lograrla.</li>
        <li><strong>Gráfica</strong> — tu avance real y la <strong>proyección</strong> de cuándo la alcanzarás si sigues a este ritmo.</li>
      </ul>

      <Shot label="pantalla de detalle de meta con anillo y gráfica de proyección" />

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <p>
        La meta <strong>no mueve dinero por sí sola</strong>: es una guía. Tú sigues asignando al sobre
        en <Link href="/soporte/presupuesto">Presupuesto</Link> (o dejas que un ahorro fijo te recuerde
        el monto). La meta solo compara <em>cuánto llevas</em> contra <em>cuánto necesitas</em> y te dice
        si vas a tiempo.
      </p>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si no asigno el aporte sugerido un mes?">
          <p>No pasa nada: la meta recalcula. Si te atrasas, subirá el aporte sugerido de los meses que quedan para llegar a tiempo. La gráfica de proyección te mostrará el nuevo estimado.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si gasto del sobre que tiene meta?">
          <p>El disponible baja y tu progreso también. Es normal para sobres de gasto; para un ahorro puro, procura no tocarlo hasta lograr la meta.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si ya alcancé la meta?">
          <p>El anillo llega al 100%. Puedes gastar ese dinero en su propósito, subir la meta o quitarla. El sobre sigue funcionando normal.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, Money, MoneyRow, WhatIf, WhatIfItem, Screenshot } from "../components";

const SLUG = "/soporte/presupuesto";

export default function Presupuesto() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Presupuesto es el corazón de la app: aquí están tus sobres. Es donde le das un trabajo a cada peso, asignando dinero a cada categoría y moviéndolo cuando hace falta."
      />

      <Toc
        items={[
          { id: "para-que", label: "¿Para qué sirve?" },
          { id: "que-ves", label: "Qué ves aquí" },
          { id: "asignar", label: "Cómo asignar dinero" },
          { id: "mover", label: "Cómo mover dinero entre sobres" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "tips", label: "Tips" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="para-que">¿Para qué sirve esta pantalla?</h2>
      <p>
        Aquí decides <strong>en qué se va a usar tu dinero</strong>. Tus categorías están
        organizadas en grupos (Gastos Fijos, Gastos Variables, Ahorro…). Cada categoría es
        un sobre con su propio saldo disponible.
      </p>

      <Screenshot
        src="/soporte/presupuesto.png"
        alt="Pestaña Presupuesto: arriba «Sin asignar $0.00 · Todo asignado» y el mes; abajo las categorías por grupo (Gastos Fijos, Gastos Variables) con sus columnas Asignado y Disponible."
        caption="La pestaña Presupuesto: «Sin asignar» arriba y cada sobre con su Asignado y Disponible."
      />

      <h2 id="que-ves">Qué ves aquí</h2>
      <ul>
        <li>Arriba, cuánto te queda <strong>&quot;Sin asignar&quot;</strong> para este mes.</li>
        <li>Un selector de <strong>mes</strong> para moverte entre meses.</li>
        <li>Cada categoría muestra tres cosas: <strong>&quot;Asignado&quot;</strong> (lo que pusiste este mes), <strong>&quot;Actividad&quot;</strong> (lo que entró o salió) y <strong>&quot;Disponible&quot;</strong> (lo que queda de verdad).</li>
        <li>El disponible se pinta en <strong>verde</strong> si hay saldo y en <strong>rojo</strong> si el sobre quedó negativo.</li>
      </ul>

      <h2 id="asignar">Cómo asignar dinero a un sobre</h2>
      <Steps>
        <li>Ubica la categoría y <strong>toca el monto en la columna &quot;Asignado&quot;</strong>.</li>
        <li>Escribe la cantidad que quieres poner en ese sobre este mes.</li>
        <li>También puedes usar <strong>+</strong> o <strong>−</strong> para sumar o restar sobre lo que ya tenía (útil para fondear un poco más sin recalcular).</li>
        <li>Repite hasta que <strong>&quot;Sin asignar&quot; llegue a $0</strong>.</li>
      </Steps>

      <Callout type="tip" title="Asignar toma de «Sin asignar»">
        <p>
          Cada peso que pones en un sobre <strong>sale de &quot;Sin asignar&quot;</strong>. Si asignas $3,000 al
          Súper, tu &quot;Sin asignar&quot; baja $3,000. Por eso la meta de $0 significa &quot;ya repartí todo&quot;.
        </p>
      </Callout>

      <h2 id="mover">Cómo mover dinero entre sobres</h2>
      <p>
        Cuando un sobre se queda corto, no necesitas ingreso nuevo: le quitas a otro que
        tenga de sobra. Eso es <strong>mover dinero</strong>.
      </p>
      <Steps>
        <li>Abre la categoría de la que quieres <strong>sacar</strong> o a la que quieres <strong>meter</strong> dinero.</li>
        <li>Elige <strong>mover dinero</strong>, indica el sobre de origen, el de destino y el monto.</li>
        <li>Listo: un sobre baja y el otro sube exactamente lo mismo.</li>
      </Steps>

      <Money label="Mover dinero es suma cero">
        <p>Gasolina quedó en −$120 y Súper tiene $450 de sobra. Mueves $120:</p>
        <MoneyRow name="🛒 Súper" amount="−$120" sign="neg" />
        <MoneyRow name="⛽ Gasolina" amount="+$120" sign="pos" />
        <p className="muted">El total de tu presupuesto no cambia; solo cambió el reparto. Gasolina vuelve a $0 y deja de estar en rojo.</p>
      </Money>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <ul>
        <li><strong>Asignar</strong>: mueve dinero de &quot;Sin asignar&quot; → al sobre. Sube su disponible.</li>
        <li><strong>Quitar asignación</strong> (o usar −): regresa dinero del sobre → a &quot;Sin asignar&quot;.</li>
        <li><strong>Mover dinero</strong>: pasa de un sobre → a otro, sin tocar &quot;Sin asignar&quot;.</li>
        <li><strong>Fin de mes</strong>: el disponible que sobra en cada sobre <strong>se acumula</strong> y arranca el mes siguiente ahí mismo.</li>
      </ul>
      <Callout type="good">
        <p>¿No te queda claro de dónde a dónde va el dinero? Repásalo en <Link href="/soporte/flujo-del-dinero">Cómo se mueve tu dinero</Link>.</p>
      </Callout>

      <h2 id="tips">Tips y errores comunes</h2>
      <Callout type="tip">
        <p>Asigna primero a lo indispensable (Renta, Servicios, Súper) y deja el ahorro y los gustos para el final. Si sobra, lo repartes; si falta, ya sabes qué recortar.</p>
      </Callout>
      <Callout type="warn">
        <p>No confundas <strong>Asignado</strong> con <strong>Disponible</strong>. Puedes asignar $0 este mes y aún tener disponible, porque el sobre traía saldo acumulado del mes pasado.</p>
      </Callout>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si un sobre quedó en rojo?">
          <p>Mueve dinero desde otro sobre con saldo, o asígnale más. Mientras esté negativo, ese rojo te recuerda que gastaste dinero que aún no habías respaldado.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si quiero una categoría nueva?">
          <p>Puedes crear categorías dentro de tus grupos. Nota: los grupos automáticos <em>Sistema</em> y <em>Tarjetas de Crédito</em> no aparecen como opción, porque la app los gestiona sola.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si asigno de más y «Sin asignar» se va a negativo?">
          <p>Significa que repartiste más de lo que tienes. Reduce la asignación de algún sobre hasta que &quot;Sin asignar&quot; vuelva a $0 o positivo.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si quiero ponerle una meta a un sobre?">
          <p>Puedes asignarle una meta de ahorro (por monto, por fecha, etc.). Ver <Link href="/soporte/metas">Metas de ahorro</Link>.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

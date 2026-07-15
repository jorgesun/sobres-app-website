import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Flow, FlowBox, FlowArrow, Money, MoneyRow, WhatIf, WhatIfItem } from "../components";

const SLUG = "/soporte/tarjetas-de-credito";

export default function TarjetasDeCredito() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Esta es la parte más contraintuitiva de la app, y también la más poderosa: bien usada, tu tarjeta de crédito nunca vuelve a agarrarte por sorpresa. Vamos despacio."
      />

      <Toc
        items={[
          { id: "sobre-auto", label: "Cada tarjeta tiene su sobre" },
          { id: "reserva", label: "Cómo funciona la reserva" },
          { id: "sin-fondos", label: "Cuando gastas sin fondos" },
          { id: "pagar", label: "Pagar la tarjeta" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="sobre-auto">Cada tarjeta tiene su propio sobre</h2>
      <p>
        Cuando registras una cuenta de tarjeta de crédito, Sobres le crea automáticamente un
        <strong> sobre de &quot;pago de tarjeta&quot;</strong>. No lo creas tú y no lo editas como los demás:
        es una <strong>reserva</strong> para pagar la tarjeta cuando llegue el estado de cuenta.
      </p>

      <h2 id="reserva">Cómo funciona la reserva</h2>
      <p>
        La clave es esta: cuando pagas con la tarjeta <strong>desde un sobre que tiene dinero</strong>,
        ese dinero no desaparece. Se <strong>mueve</strong> del sobre de gasto al sobre de la tarjeta.
      </p>

      <Flow>
        <FlowBox title="Gastas $1,500 con la tarjeta" sub="desde el sobre «Vacaciones»" />
        <FlowArrow label="la app reserva" />
        <FlowBox title="Vacaciones baja $1,500" sub="gastaste de ese sobre" />
        <FlowArrow />
        <FlowBox title="Sobre de la tarjeta sube $1,500" sub="dinero apartado para pagarla" variant="accent" />
      </Flow>

      <Money label="Compra con tarjeta que sí tiene respaldo">
        <MoneyRow name="✈️ Vacaciones — antes" amount="$3,000" />
        <MoneyRow name="✈️ Vacaciones — después" amount="$1,500" sign="pos" />
        <MoneyRow name="💳 Pago de tarjeta — reservado" amount="$1,500" sign="pos" />
        <p className="muted">Cuando llegue el estado de cuenta, ya tienes los $1,500 apartados. Pagar la tarjeta no te va a doler.</p>
      </Money>

      <Callout type="good" title="Por qué esto lo cambia todo">
        <p>
          La deuda de tarjeta duele porque llega <em>después</em>, cuando ya te gastaste el dinero. Con
          la reserva, apartas el pago <strong>en el momento de comprar</strong>. La tarjeta se vuelve solo
          una forma de pago, no una fuente de deuda.
        </p>
      </Callout>

      <h2 id="sin-fondos">Cuando gastas con la tarjeta sin fondos en el sobre</h2>
      <p>
        ¿Qué pasa si compras con la tarjeta desde un sobre <strong>que no tiene suficiente</strong>? Esa
        parte se convierte en <strong>deuda no respaldada</strong> (un sobregasto): gastaste dinero que no
        habías reservado, así que la app no puede apartar el pago.
      </p>

      <Money label="Compra sin respaldo">
        <MoneyRow name="🛒 Súper tenía" amount="$200" />
        <MoneyRow name="Compra con tarjeta" amount="−$500" sign="neg" />
        <MoneyRow name="Reservado para pagar la tarjeta" amount="$200" sign="pos" />
        <MoneyRow name="Deuda no respaldada" amount="$300" sign="neg" />
      </Money>

      <Callout type="warn" title="Cómo arreglarlo">
        <p>
          Asígnale dinero a ese sobre (o <Link href="/soporte/presupuesto">mueve dinero</Link> de otro con
          saldo) para cubrir los $300 que faltan. En cuanto lo hagas, esa deuda queda respaldada y el pago
          de la tarjeta vuelve a estar completo.
        </p>
      </Callout>

      <h2 id="pagar">Pagar la tarjeta</h2>
      <p>
        Cuando pagas el estado de cuenta, lo registras como una <strong>transferencia</strong> de tu cuenta
        de cheques hacia la tarjeta (ver <Link href="/soporte/cuentas">Cuentas</Link>). Ese pago usa el
        dinero que ya tenías <strong>reservado</strong> en el sobre de la tarjeta, así que tu presupuesto
        queda cuadrado.
      </p>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si no pago el total, solo una parte?">
          <p>Registra el pago por el monto que hayas hecho. La reserva que no uses se queda en el sobre de la tarjeta para el siguiente pago. La deuda restante sigue reflejada en el saldo de la cuenta.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si mi tarjeta ya traía deuda cuando empecé a usar Sobres?">
          <p>Es deuda que aún no tiene respaldo. Ve creando un sobre/asignación para irla pagando poco a poco; el tipo de meta <Link href="/soporte/metas">Pago de deuda</Link> es ideal para eso.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si uso la tarjeta para un reembolso o devolución?">
          <p>Regístralo como ingreso en la categoría correspondiente; ajusta la reserva si es necesario. La lógica es la inversa de una compra: en vez de reservar, liberas.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Por qué no puedo editar el sobre de la tarjeta como los demás?">
          <p>Porque la app lo maneja sola: su saldo se calcula a partir de tus compras, pagos y reservas. Tú controlas los sobres de gasto; la reserva se ajusta en consecuencia.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

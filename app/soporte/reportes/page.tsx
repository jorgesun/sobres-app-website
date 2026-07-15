import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, WhatIf, WhatIfItem, Screenshot, ScreenshotRow } from "../components";

const SLUG = "/soporte/reportes";

export default function Reportes() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Reportes te muestra la película, no la foto: en qué gastas de más, cómo cambia tu patrimonio y qué categorías se comen tu dinero."
      />

      <Toc
        items={[
          { id: "para-que", label: "¿Para qué sirve?" },
          { id: "que-ves", label: "Qué ves aquí" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "tips", label: "Tips" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="para-que">¿Para qué sirve esta pantalla?</h2>
      <p>
        Para <strong>entender tus patrones</strong>. No se cambia dinero aquí: es una vista de solo
        lectura que convierte tus transacciones en gráficas fáciles de leer, para que ajustes tus
        sobres el próximo mes con datos y no a ojo.
      </p>

      <ScreenshotRow>
        <Screenshot
          src="/soporte/reportes-mensual.png"
          alt="Reportes, vista Mensual: tarjeta de «Patrimonio neto $58,150» con su tendencia, y una gráfica de dona de «Gastos por grupo»."
          caption="Vista Mensual: patrimonio neto y gastos por grupo (dona)."
        />
        <Screenshot
          src="/soporte/reportes-tendencias.png"
          alt="Reportes, vista Tendencias: gráfica de barras de gasto por categoría (Súper) a 6 meses, con promedio, máximo y total."
          caption="Vista Tendencias: el gasto de una categoría mes a mes (barras)."
        />
      </ScreenshotRow>

      <h2 id="que-ves">Qué ves aquí</h2>
      <ul>
        <li><strong>Tendencia de gasto</strong> — cómo sube o baja tu gasto a lo largo de los meses.</li>
        <li><strong>Patrimonio neto</strong> — la suma de lo que tienes menos lo que debes, a través del tiempo.</li>
        <li><strong>Gasto por categoría</strong> — gráficas de dona y barras que muestran a dónde se va tu dinero.</li>
        <li><strong>Vista Pareto</strong> — identifica el 20% de categorías que se llevan el 80% de tu gasto.</li>
      </ul>

      <Callout type="tip" title="La regla 80/20">
        <p>
          Casi siempre unas pocas categorías explican la mayoría de tu gasto. La vista Pareto las
          pone al frente para que sepas <strong>dónde un pequeño ajuste hace la mayor diferencia</strong>.
        </p>
      </Callout>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <p>
        Nada: Reportes no mueve ni un peso. Solo <strong>lee</strong> las transacciones que registraste
        en <Link href="/soporte/cuentas">Cuentas</Link> y las agrupa por categoría y por mes. Si un
        número te sorprende, casi siempre es una transacción mal categorizada.
      </p>

      <h2 id="tips">Tips y errores comunes</h2>
      <Callout type="good">
        <p>Dedica cinco minutos a fin de mes a mirar tus reportes antes de asignar el mes nuevo. Es el hábito que más mejora un presupuesto.</p>
      </Callout>
      <Callout type="warn">
        <p>Si una categoría se ve enorme sin razón, revisa que no haya un gasto grande capturado en el sobre equivocado.</p>
      </Callout>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si mi patrimonio neto sale negativo?">
          <p>Significa que hoy debes más de lo que tienes (por ejemplo, mucha deuda de tarjeta). No es un error de la app: es una señal para enfocar tu presupuesto en bajar esa deuda. La tendencia importa más que el número de un solo día.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si una gráfica está vacía?">
          <p>Necesita historial. Con pocos días de uso hay poco que graficar; se llena conforme registras transacciones mes a mes.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

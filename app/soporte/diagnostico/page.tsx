import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, WhatIf, WhatIfItem, Shot } from "../components";

const SLUG = "/soporte/diagnostico";

export default function Diagnostico() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Diagnóstico es el chequeo médico de tu presupuesto: una puntuación de salud y una lista de señales de alerta para arreglar antes de que se vuelvan un problema."
      />

      <Toc
        items={[
          { id: "para-que", label: "¿Para qué sirve?" },
          { id: "que-ves", label: "Qué ves aquí" },
          { id: "senales", label: "Señales de alerta típicas" },
          { id: "dinero", label: "Qué le pasa a tu dinero" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="para-que">¿Para qué sirve esta pantalla?</h2>
      <p>
        Para saber <strong>de un vistazo si vas bien</strong>. En lugar de revisar sobre por sobre,
        Diagnóstico junta las cosas que conviene atender y te da una puntuación general de salud.
      </p>

      <Shot label="pestaña Diagnóstico con la puntuación de salud" />

      <h2 id="que-ves">Qué ves aquí</h2>
      <ul>
        <li>Una <strong>puntuación de salud</strong> de tu presupuesto.</li>
        <li>Una lista de <strong>señales de alerta</strong>: cosas concretas que puedes corregir.</li>
      </ul>

      <h2 id="senales">Señales de alerta típicas</h2>
      <ul>
        <li>Dinero <strong>&quot;Sin asignar&quot;</strong> que llevas tiempo sin repartir.</li>
        <li><strong>Sobres en rojo</strong> (disponible negativo) que aún no arreglas.</li>
        <li>Deuda de tarjeta <strong>sin respaldo</strong> (gastaste más de lo que reservaste).</li>
      </ul>

      <Callout type="tip" title="Úsalo como lista de pendientes">
        <p>
          Cada señal es una tarea pequeña. Resuélvelas una por una —mover dinero, asignar lo que
          falta— y verás subir tu puntuación. No busques el 100% perfecto: busca que no haya focos rojos.
        </p>
      </Callout>

      <h2 id="dinero">Qué le pasa a tu dinero</h2>
      <p>
        Diagnóstico <strong>no mueve dinero</strong>: solo lo analiza. Los arreglos los haces en
        <Link href="/soporte/presupuesto"> Presupuesto</Link> (asignar, mover) y en
        <Link href="/soporte/cuentas"> Cuentas</Link> (registrar lo que faltaba).
      </p>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si mi puntuación es baja?">
          <p>No te preocupes: es un punto de partida. Atiende primero los sobres en rojo y el dinero sin asignar; suelen ser la mayor parte del problema.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si una alerta no aplica a mi caso?">
          <p>Puedes ignorarla si de verdad no aplica; la puntuación es una guía, no una regla estricta. Lo importante es que tú entiendas por qué apareció.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

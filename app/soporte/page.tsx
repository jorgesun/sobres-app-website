import Link from "next/link";
import { NAV, HUB } from "./nav";
import { CardGrid, SopCard, Callout } from "./components";

export default function SoporteHub() {
  return (
    <>
      <div className="sop-hero">
        <h1>Dale un trabajo a cada peso.</h1>
        <p>
          Bienvenido al centro de ayuda de Sobres. Aquí aprendes a usar cada pantalla
          y —lo más importante— a entender cómo entra, se asigna, se gasta y se mueve
          tu dinero.
        </p>
      </div>

      <div className="sop-bigcta">
        <div>
          <div className="bc-t">¿Primera vez con Sobres?</div>
          <div className="bc-s">Empieza por la guía de 5 minutos y luego entiende el flujo del dinero.</div>
        </div>
        <Link href="/soporte/empieza-aqui">Empieza aquí →</Link>
      </div>

      <h2 id="pasos">Lo esencial primero</h2>
      <CardGrid>
        <SopCard href="/soporte/empieza-aqui" icon="🚀" title="Empieza aquí" desc="El método de sobres y el ciclo de 4 pasos, sin rodeos." read="5 min" />
        <SopCard href="/soporte/flujo-del-dinero" icon="🌊" title="Cómo se mueve tu dinero" desc="La página estrella. El modelo mental completo, con diagramas." read="8 min" />
      </CardGrid>

      <h2 id="pantallas">Guías por pantalla</h2>
      <p className="muted">Una guía por cada pestaña de la app, con pasos numerados y qué le pasa a tu dinero.</p>
      <CardGrid>
        {NAV[1].items.map((it) => (
          <SopCard key={it.slug} href={it.slug} icon={it.icon} title={it.title} desc={it.desc} read={it.read} />
        ))}
      </CardGrid>

      <h2 id="temas">Temas a fondo</h2>
      <CardGrid>
        {NAV[2].items.map((it) => (
          <SopCard key={it.slug} href={it.slug} icon={it.icon} title={it.title} desc={it.desc} read={it.read} />
        ))}
        <SopCard href="/soporte/preguntas-frecuentes" icon="❓" title="Preguntas frecuentes" desc="Respuestas rápidas a las dudas más comunes." read="5 min" />
      </CardGrid>

      <Callout type="tip" title="Consejo para leer esta ayuda">
        <p>
          Puedes recorrer las guías en orden con los botones <strong>Anterior / Siguiente</strong>
          al pie de cada página, o saltar directo a lo que necesitas desde el menú de la izquierda.
          Usa el buscador de la barra lateral para encontrar un tema al instante.
        </p>
      </Callout>

      <h2 id="faq-rapido">Preguntas rápidas</h2>
      <div className="sop-accordion">
        <details>
          <summary>¿Necesito conectar mi banco?</summary>
          <div className="acc-body"><p>No. Sobres es 100% manual: tú registras tus ingresos y gastos. Nunca se conecta a bancos ni lee estados de cuenta. Esto es a propósito: escribir cada movimiento es lo que te mantiene consciente de tu dinero.</p></div>
        </details>
        <details>
          <summary>¿Tengo que crear una cuenta?</summary>
          <div className="acc-body"><p>No. Puedes usar todo en <strong>modo local</strong> (tus datos se quedan en tu iPhone). Crear cuenta es opcional y solo sirve para sincronizar entre dispositivos. Ver <Link href="/soporte/ajustes">Ajustes</Link>.</p></div>
        </details>
        <details>
          <summary>¿Qué es &quot;Sin asignar&quot;?</summary>
          <div className="acc-body"><p>Es el dinero que ya tienes pero al que todavía no le has dado un trabajo. La meta es dejarlo en $0 repartiéndolo en tus sobres. Lo explicamos a fondo en <Link href="/soporte/flujo-del-dinero">Cómo se mueve tu dinero</Link>.</p></div>
        </details>
      </div>
    </>
  );
}

import { PageHeader, Toc, PrevNext, Callout, Steps, Flow, FlowBox, FlowArrow, BigCta, Money, MoneyRow } from "../components";

const SLUG = "/soporte/empieza-aqui";

export default function EmpiezaAqui() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="En cinco minutos vas a entender qué es el método de sobres y cómo funciona Sobres. Sin términos raros: solo tu dinero, repartido en sobres."
      />

      <Toc
        items={[
          { id: "que-es", label: "¿Qué es el método de sobres?" },
          { id: "ciclo", label: "El ciclo de 4 pasos" },
          { id: "meta", label: "La única meta que importa" },
          { id: "siguiente", label: "¿Y ahora qué?" },
        ]}
      />

      <h2 id="que-es">¿Qué es el método de sobres?</h2>
      <p>
        Imagina que cobras tu quincena en efectivo y, antes de gastar nada, repartes
        los billetes en <strong>sobres de papel etiquetados</strong>: uno para la Renta,
        otro para el Súper, otro para la Gasolina, otro para Vacaciones. Cuando quieres
        gastar en algo, sacas dinero del sobre correspondiente. Si un sobre se vacía,
        se acabó lo de esa categoría… a menos que muevas dinero de otro sobre.
      </p>
      <p>
        Ese es el método de sobres, y funciona desde hace décadas porque es imposible
        engañarte: <strong>ves exactamente cuánto te queda para cada cosa</strong>.
        Sobres digitaliza esa idea en tu iPhone, sin que tengas que cargar efectivo.
      </p>

      <Callout type="tip" title="La idea central">
        <p>
          <strong>Dale un trabajo a cada peso</strong> antes de gastarlo. En lugar de mirar
          el saldo del banco y preguntarte &quot;¿puedo gastar esto?&quot;, miras el sobre y ya
          lo sabes.
        </p>
      </Callout>

      <h2 id="ciclo">El ciclo de 4 pasos</h2>
      <p>Usar Sobres es repetir este ciclo cada vez que te entra dinero:</p>

      <Steps>
        <li><strong>Registra tus cuentas y saldos.</strong> Dile a la app cuánto tienes hoy en tu cuenta de cheques, tu efectivo, tu ahorro. Es tu punto de partida.</li>
        <li><strong>Registra tu ingreso.</strong> Cuando te pagan, lo anotas. Ese dinero llega a tu cuenta y aparece como <strong>&quot;Sin asignar&quot;</strong>: dinero esperando un trabajo.</li>
        <li><strong>Asigna cada peso a un sobre.</strong> Repartes ese dinero entre tus categorías hasta que &quot;Sin asignar&quot; llegue a $0. Cada peso ya tiene destino.</li>
        <li><strong>Gasta y registra.</strong> Cuando compras algo, anotas la transacción y eliges de qué sobre salió. El disponible de ese sobre baja. Así siempre sabes cuánto te queda.</li>
      </Steps>

      <Flow>
        <FlowBox title="Ingreso" sub="registras que te pagaron" />
        <FlowArrow />
        <FlowBox title="Sin asignar" sub="dinero sin trabajo" variant="yellow" />
        <FlowArrow label="asignas" />
        <FlowBox title="Sobres" sub="Renta, Súper, Vacaciones…" variant="accent" />
        <FlowArrow label="gastas" />
        <FlowBox title="Gasto registrado" sub="baja el disponible del sobre" />
      </Flow>

      <Money label="Un ejemplo rápido">
        <p>Te pagan <strong>$10,000</strong>. Los repartes así:</p>
        <MoneyRow name="🏠 Renta" amount="$4,000" />
        <MoneyRow name="🛒 Súper" amount="$3,000" />
        <MoneyRow name="✈️ Vacaciones" amount="$1,000" />
        <MoneyRow name="🚨 Emergencias" amount="$2,000" />
        <MoneyRow name="Sin asignar" amount="$0" sign="pos" />
        <p className="muted">Cuando &quot;Sin asignar&quot; llega a $0, terminaste: cada peso tiene un trabajo.</p>
      </Money>

      <h2 id="meta">La única meta que importa</h2>
      <p>
        No se trata de tener tu saldo en ceros. Se trata de que <strong>&quot;Sin asignar&quot;
        llegue a $0</strong>, porque eso significa que ya decidiste, con calma, en qué va a
        usarse cada peso. Después solo sigues el plan que tú mismo hiciste.
      </p>

      <Callout type="good" title="Lo que hace especial a este método">
        <p>
          El dinero que no gastas en un sobre <strong>no se pierde</strong>: se queda ahí y
          pasa al mes siguiente. A eso le llamamos que el disponible &quot;se acumula&quot;. Tu
          sobre de Vacaciones va creciendo mes con mes hasta que te vas de viaje.
        </p>
      </Callout>

      <h2 id="siguiente">¿Y ahora qué?</h2>
      <p>
        Ya tienes el mapa. El siguiente paso es entender <strong>a dónde va cada peso</strong>
        cuando tocas cada botón: eso es lo que te va a dar seguridad total con la app.
      </p>

      <BigCta
        title="Cómo se mueve tu dinero"
        sub="La página estrella. Diagramas, la historia de los $10,000 y las 3 reglas que lo explican casi todo."
        href="/soporte/flujo-del-dinero"
        cta="Continuar →"
      />

      <PrevNext slug={SLUG} />
    </>
  );
}

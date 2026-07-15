import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, WhatIf, WhatIfItem, Shot } from "../components";

const SLUG = "/soporte/ajustes";

export default function Ajustes() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Ajustes es el panel de control de la app: apariencia, seguridad, privacidad, moneda, respaldos y tu cuenta. Aquí decides cómo se ve y cómo se protege tu información."
      />

      <Toc
        items={[
          { id: "para-que", label: "¿Para qué sirve?" },
          { id: "que-ves", label: "Qué encuentras aquí" },
          { id: "respaldo", label: "Exportar e importar" },
          { id: "cuenta", label: "Cuenta y sincronización" },
          { id: "eliminar", label: "Eliminar tu cuenta" },
          { id: "dudas", label: "¿Y si…?" },
        ]}
      />

      <h2 id="para-que">¿Para qué sirve esta pantalla?</h2>
      <p>Para dejar la app a tu medida y mantener tus datos seguros y bajo tu control.</p>

      <Shot label="pestaña Ajustes" />

      <h2 id="que-ves">Qué encuentras aquí</h2>
      <ul>
        <li><strong>Tema claro / oscuro</strong> — la apariencia de la app.</li>
        <li><strong>Bloqueo con Face ID / Touch ID</strong> — pide tu rostro o huella para abrir la app.</li>
        <li><strong>Modo privacidad</strong> — oculta todos los montos con un toque, ideal para usar la app en público.</li>
        <li><strong>Multimoneda (MXN / USD)</strong> — para manejar cuentas en otra moneda.</li>
        <li><strong>Exportar / importar datos</strong> — respaldo en JSON o transacciones en CSV.</li>
        <li><strong>Sincronización</strong> — activa el respaldo entre dispositivos si tienes cuenta.</li>
        <li><strong>Eliminar cuenta</strong> — borra tu cuenta y todos tus datos.</li>
      </ul>

      <h2 id="respaldo">Exportar e importar</h2>
      <Steps>
        <li>Entra a <strong>Ajustes</strong> y elige exportar.</li>
        <li>Elige el formato: <strong>JSON</strong> (respaldo completo del presupuesto) o <strong>CSV</strong> (solo transacciones, para abrir en hojas de cálculo).</li>
        <li>Comparte el archivo a donde quieras (AirDrop, correo…). Se genera en tu dispositivo.</li>
      </Steps>
      <Callout type="tip" title="Importar crea un presupuesto nuevo">
        <p>
          Al importar un respaldo JSON, la app lo restaura como un <strong>presupuesto nuevo</strong>
          (no sobrescribe el actual). Es seguro para probar o para mover tus datos a otro dispositivo.
        </p>
      </Callout>

      <h2 id="cuenta">Cuenta y sincronización</h2>
      <p>
        Sobres funciona <strong>sin cuenta</strong> (modo local: todo se queda en tu iPhone). Si creas
        una cuenta e inicias sesión, tus datos se <strong>sincronizan de forma cifrada</strong> y aislada
        por usuario, para tenerlos en todos tus dispositivos. Crear cuenta es opcional; puedes volver al
        modo local cerrando sesión.
      </p>
      <Callout type="good">
        <p>Todos los detalles de qué se guarda y dónde están en la <Link href="/privacidad">Política de Privacidad</Link>.</p>
      </Callout>

      <h2 id="eliminar">Eliminar tu cuenta</h2>
      <p>
        En <strong>Ajustes → Cuenta → Eliminar cuenta</strong> puedes borrar de forma permanente tu
        usuario y <strong>todos tus datos</strong>, tanto en el servidor como la copia local. La acción
        es <strong>irreversible</strong>.
      </p>
      <Callout type="warn">
        <p>Antes de eliminar, exporta un respaldo si quieres conservar tu información. Una vez borrada, no se puede recuperar.</p>
      </Callout>

      <h2 id="dudas">¿Y si…?</h2>
      <WhatIf>
        <WhatIfItem q="¿Y si olvido mi contraseña?">
          <p>Desde la pantalla de inicio de sesión puedes pedir recuperar el acceso por correo. Si usas modo local sin cuenta, no hay contraseña que recuperar: tus datos están en el dispositivo.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si cambio de iPhone?">
          <p>Con cuenta, inicia sesión en el nuevo equipo y tus datos se sincronizan. Sin cuenta, exporta un respaldo JSON en el viejo e impórtalo en el nuevo.</p>
        </WhatIfItem>
        <WhatIfItem q="¿Y si activo el modo privacidad y olvido cómo quitarlo?">
          <p>Es un interruptor en Ajustes (y suele tener un acceso rápido). Vuelve a tocarlo para mostrar de nuevo los montos.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

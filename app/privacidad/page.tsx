import type { Metadata } from "next";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo cuida Sobres tu información: uso local sin cuenta en el iPhone, sincronización cifrada, medición propia y sin cookies de la app web, sin anuncios ni rastreadores de terceros.",
  alternates: { languages: { en: "/en/privacy" } },
};

export default function PrivacidadPage() {
  return (
    <div className="privacy">
      <header>
        <div className="logo">💼</div>
        <h1>Política de Privacidad</h1>
        <p>Sobres — Presupuesto Personal</p>
        <p><a href="/en/privacy" hrefLang="en" lang="en">Read in English</a></p>
      </header>

      <main>
        <div className="card">
          <h2><span className="icon">🔒</span> Resumen en una línea</h2>
          <div className="highlight">
            <strong>Tus datos son tuyos.</strong> En el iPhone puedes usar Sobres <strong>sin cuenta</strong>,
            y entonces toda tu información se guarda únicamente en tu dispositivo. La
            sincronización en la nube es <strong>opcional</strong> y solo ocurre si creas una
            cuenta. No vendemos tus datos, no mostramos publicidad y no usamos herramientas de
            analítica ni rastreadores de terceros. En la app web contamos las visitas con una
            medición propia, sin cookies y sin guardar tu dirección IP (detalles abajo).
          </div>
        </div>

        <div className="card">
          <h2><span className="icon">📱</span> Puedes usar la app sin cuenta</h2>
          <p>En el iPhone, Sobres funciona de dos formas, y tú eliges:</p>
          <ul>
            <li><strong>Modo local (sin cuenta):</strong> al elegir <em>&quot;Continuar sin cuenta&quot;</em>, toda la app funciona y tus datos —presupuestos, cuentas, transacciones, categorías, metas— se guardan <strong>solo en tu dispositivo</strong>. En este modo no enviamos nada a ningún servidor ni recopilamos tu correo.</li>
            <li><strong>Modo sincronizado (con cuenta):</strong> si creas una cuenta o inicias sesión, habilitas el respaldo y la sincronización entre tus dispositivos. Puedes volver al modo local cerrando sesión; tus datos permanecen en el dispositivo.</li>
          </ul>
          <p>
            La <strong>app web</strong> (<a href="https://app.sobres-app.com">app.sobres-app.com</a>) siempre
            requiere cuenta: tus datos se guardan en nuestro servidor y se muestran en tu navegador. Es la
            misma cuenta y el mismo presupuesto que en el iPhone.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">📝</span> Información que recopilamos</h2>
          <p>Recopilamos únicamente lo siguiente, y solo para operar la app:</p>
          <ul>
            <li><strong>Datos de cuenta (solo si creas una cuenta):</strong> tu correo electrónico y una contraseña cifrada, para iniciar sesión y recuperar el acceso, y el idioma en que prefieres recibir los correos de tu cuenta. Si entras con <strong>Apple o Google</strong>, en lugar de contraseña recibimos de ese proveedor tu correo y los datos básicos de perfil que comparta (como tu nombre). Si usas el modo local sin cuenta, <strong>no recopilamos tu correo</strong>.</li>
            <li><strong>Datos de presupuesto que tú creas:</strong> presupuestos, grupos y categorías, cuentas y tarjetas que registras manualmente, transacciones y montos, metas de ahorro y pagos programados. En el iPhone siempre se guardan en tu dispositivo y se sincronizan a la nube <strong>solo si tienes sesión iniciada</strong>; en la app web viven en el servidor.</li>
            <li><strong>Visitas a la app web:</strong> por cada página que abres en app.sobres-app.com registramos la página (sin los identificadores que lleve la dirección), el país, la región y la ciudad aproximados que se deducen de tu conexión, el tipo de aparato, la familia de navegador y de sistema operativo (sin versión), el idioma del navegador y, si llegaste desde otro sitio, el nombre de ese sitio (no la página). También anotamos cuándo se captura un movimiento desde la web y desde qué pantalla. <strong>No guardamos tu dirección IP</strong> ni el identificador completo de tu navegador: con ellos calculamos un código que cambia cada día y que no se puede revertir, solo para contar visitantes distintos. Si tienes sesión iniciada, el registro lleva además el identificador de tu cuenta. Estos registros se borran solos a los <strong>120 días</strong>.</li>
          </ul>
          <div className="highlight">
            Esta información se usa <strong>solo para el funcionamiento de la app</strong>. No se utiliza para rastrearte ni para publicidad.
          </div>
        </div>

        <div className="card">
          <h2><span className="icon">⚙️</span> Cómo usamos tu información</h2>
          <ul>
            <li>Para guardar y mostrar tu presupuesto en tu dispositivo (siempre en el iPhone) o en tu navegador (en la app web).</li>
            <li>Si tienes cuenta: para autenticarte, mantener tu sesión y sincronizar tu presupuesto entre tus dispositivos.</li>
            <li>Si tienes cuenta: para enviarte correos de tu cuenta (verificación y recuperación de contraseña).</li>
            <li>Para entender cómo se usa Sobres y decidir qué mejorar: con las visitas a la app web y con <strong>cifras de conjunto</strong> calculadas sobre las cuentas (por ejemplo, cuántas personas usan cada moneda, cuántas ya registraron movimientos o cuántas siguen usando la app después de su primera semana). Esas cifras son totales: no sirven para ver el presupuesto de nadie.</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">☁️</span> Almacenamiento y sincronización</h2>
          <p>
            Tus datos siempre se guardan localmente en tu dispositivo (con SwiftData de Apple).
            <strong> En modo local (sin cuenta) ahí termina todo:</strong> nada se envía a ningún servidor.
          </p>
          <p>
            <strong>Solo si tienes sesión iniciada</strong>, tus datos se respaldan y sincronizan
            en <strong>Supabase</strong>, nuestro proveedor de base de datos y autenticación.
            Cada usuario está aislado por reglas de seguridad a nivel de fila (Row Level Security):
            solo tú puedes acceder a tus propios datos. La comunicación con el servidor va siempre
            cifrada en tránsito (HTTPS/TLS). Supabase procesa los datos por nuestra cuenta; sus
            servidores pueden ubicarse fuera de tu país.
          </p>
          <p>
            La app web y este sitio se sirven desde <strong>Vercel</strong>, nuestro proveedor de
            alojamiento. Vercel es quien deduce de tu conexión el país y la ciudad aproximados que se
            usan para contar visitas.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🍪</span> Cookies y almacenamiento del navegador (app web)</h2>
          <p>La app web usa solo cookies propias, necesarias para funcionar o para recordar tus preferencias:</p>
          <ul>
            <li><strong>Sesión:</strong> te mantienen dentro de tu cuenta, y una más cierra la sesión sola tras 15 minutos sin uso.</li>
            <li><strong>Preferencias:</strong> tema y apariencia, ocultar saldos, idioma, zona horaria, avisos de pagos, presupuesto activo y las cuentas que fijas arriba. Son de este navegador y no se envían a nadie más.</li>
          </ul>
          <p>
            Además guarda en el almacenamiento local del navegador la hora de tu última actividad (para que
            el cierre por inactividad funcione entre pestañas) y el día del último aviso de pagos (para no
            repetirlo). <strong>No usamos cookies de publicidad, de analítica ni de terceros.</strong>
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">💱</span> Tipo de cambio (multimoneda)</h2>
          <p>
            Si usas cuentas en otra moneda, la app consulta una tabla global de tipos de cambio
            en nuestro servidor. Es una consulta de solo lectura y <strong>no envía ninguno de tus
            datos personales ni financieros</strong>.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🚫</span> Lo que NO hacemos</h2>
          <ul>
            <li>No usamos herramientas de analítica, telemetría ni rastreo de terceros: la medición de visitas de la app web es nuestra y sus datos no salen de nuestra base de datos</li>
            <li>No accedemos a tu ubicación, contactos, cámara ni micrófono</li>
            <li>No usamos identificadores de publicidad ni rastreo entre apps</li>
            <li>No vendemos, alquilamos ni compartimos tu información con fines comerciales</li>
            <li>No mostramos publicidad de ningún tipo</li>
            <li>No conectamos con tu banco ni leemos estados de cuenta: los saldos y movimientos los ingresas tú manualmente</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">🤝</span> Compartir con terceros</h2>
          <p>
            No vendemos ni compartimos tu información personal con terceros con fines comerciales.
            Solo la compartimos con los proveedores de infraestructura estrictamente necesarios
            para operar la app —Supabase, para autenticación y base de datos, y Vercel, para alojar la
            app web—, que la procesan bajo nuestras instrucciones. Como cualquier servicio en internet,
            esos proveedores guardan por un tiempo limitado registros técnicos de las peticiones (incluida
            la dirección IP) para operar y proteger el servicio. Si entras con Apple o Google, ese
            proveedor sabe que usas Sobres para iniciar sesión. También podríamos divulgar tu información
            si la ley lo exige.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🔑</span> Face ID / Touch ID</h2>
          <p>
            Sobres puede usar Face ID o Touch ID para bloquear el acceso a la app, además de un
            modo de privacidad para ocultar tus saldos. La autenticación biométrica la gestiona
            completamente iOS; la app nunca accede ni almacena tus datos biométricos.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">💾</span> Respaldos y exportación</h2>
          <p>
            Puedes exportar tu información en formato JSON (respaldo completo) o CSV (transacciones).
            Estos archivos se generan en tu dispositivo y se comparten únicamente a donde tú decidas
            enviarlos (AirDrop, correo, etc.).
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🗑️</span> Eliminación de tu cuenta y tus datos</h2>
          <p>
            Puedes eliminar tu cuenta directamente desde la app, en el iPhone o en la web (Ajustes →
            Eliminar cuenta). Al confirmarlo, se borran de forma permanente tu usuario y <strong>todos tus
            datos asociados en el servidor</strong> —incluidos los registros de visitas a la app web que
            llevan el identificador de tu cuenta—, así como la copia local en el dispositivo desde el que
            la eliminas. Esta acción es irreversible. Si además eliminas la app, la copia local también se
            elimina.
          </p>
          <p>
            Las visitas que hiciste sin sesión iniciada no llevan ningún dato que nos permita
            relacionarlas contigo, así que no se pueden borrar por cuenta: se borran solas a los 120 días.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🛡️</span> Seguridad</h2>
          <p>
            Protegemos tu información con cifrado en tránsito (HTTPS/TLS), contraseñas almacenadas de
            forma cifrada y aislamiento por usuario (RLS). Ningún sistema es 100&nbsp;% infalible, pero
            aplicamos medidas razonables conforme a las mejores prácticas.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">👶</span> Menores de edad</h2>
          <p>
            Sobres no está dirigido a menores de 13 años y no recopilamos conscientemente información
            de menores. Si crees que un menor nos proporcionó datos, contáctanos para eliminarlos.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">✏️</span> Cambios a esta política</h2>
          <p>
            Si modificamos esta política de privacidad, publicaremos la versión actualizada en esta
            misma página y actualizaremos la fecha de vigencia. Te recomendamos revisarla periódicamente.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">✉️</span> Contacto</h2>
          <p>
            ¿Tienes preguntas sobre privacidad, o deseas ejercer tus derechos sobre tus datos?<br />
            Escríbenos a <a href="mailto:hola@sobres-app.com">hola@sobres-app.com</a>
          </p>
        </div>

        <p className="updated">Última actualización: 11 de octubre de 2026</p>
      </main>
    </div>
  );
}

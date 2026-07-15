import type { Metadata } from "next";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo cuida Sobres tu información: uso local sin cuenta, sincronización opcional cifrada, sin anuncios ni rastreadores.",
};

export default function PrivacidadPage() {
  return (
    <div className="privacy">
      <header>
        <div className="logo">💼</div>
        <h1>Política de Privacidad</h1>
        <p>Sobres — Presupuesto Personal</p>
      </header>

      <main>
        <div className="card">
          <h2><span className="icon">🔒</span> Resumen en una línea</h2>
          <div className="highlight">
            <strong>Tus datos son tuyos.</strong> Puedes usar Sobres <strong>sin cuenta</strong>,
            y entonces toda tu información se guarda únicamente en tu dispositivo. La
            sincronización en la nube es <strong>opcional</strong> y solo ocurre si creas una
            cuenta. No vendemos tus datos, no mostramos publicidad y no usamos rastreadores.
          </div>
        </div>

        <div className="card">
          <h2><span className="icon">📱</span> Puedes usar la app sin cuenta</h2>
          <p>Sobres funciona de dos formas, y tú eliges:</p>
          <ul>
            <li><strong>Modo local (sin cuenta):</strong> al elegir <em>&quot;Continuar sin cuenta&quot;</em>, toda la app funciona y tus datos —presupuestos, cuentas, transacciones, categorías, metas— se guardan <strong>solo en tu dispositivo</strong>. En este modo no enviamos nada a ningún servidor ni recopilamos tu correo.</li>
            <li><strong>Modo sincronizado (con cuenta):</strong> si creas una cuenta o inicias sesión, habilitas el respaldo y la sincronización entre tus dispositivos. Puedes volver al modo local cerrando sesión; tus datos permanecen en el dispositivo.</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">📝</span> Información que recopilamos</h2>
          <p>Recopilamos únicamente lo siguiente, y solo para operar la app:</p>
          <ul>
            <li><strong>Datos de cuenta (solo si creas una cuenta):</strong> tu correo electrónico y una contraseña cifrada, para iniciar sesión y recuperar el acceso. Si usas el modo local sin cuenta, <strong>no recopilamos tu correo</strong>.</li>
            <li><strong>Datos de presupuesto que tú creas:</strong> presupuestos, grupos y categorías, cuentas y tarjetas que registras manualmente, transacciones y montos, metas de ahorro y pagos programados. Siempre se guardan en tu dispositivo; se sincronizan a la nube <strong>solo si tienes sesión iniciada</strong>.</li>
          </ul>
          <div className="highlight">
            Esta información se usa <strong>solo para el funcionamiento de la app</strong>. No se utiliza para rastrearte ni para publicidad.
          </div>
        </div>

        <div className="card">
          <h2><span className="icon">⚙️</span> Cómo usamos tu información</h2>
          <ul>
            <li>Para guardar y mostrar tu presupuesto en tu dispositivo (siempre).</li>
            <li>Si tienes cuenta: para autenticarte, mantener tu sesión y sincronizar tu presupuesto entre tus dispositivos.</li>
            <li>Si tienes cuenta: para enviarte correos de tu cuenta (verificación y recuperación de contraseña).</li>
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
            <li>No recopilamos datos de uso, analíticas ni telemetría</li>
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
            para operar la app (Supabase, para autenticación y base de datos), que la procesan bajo
            nuestras instrucciones. También podríamos divulgarla si la ley lo exige.
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
            Puedes eliminar tu cuenta directamente desde la app (Ajustes → Eliminar cuenta). Al
            confirmarlo, se borran de forma permanente tu usuario y <strong>todos tus datos asociados
            en el servidor</strong>, así como la copia local en el dispositivo. Esta acción es
            irreversible. Si además eliminas la app, la copia local también se elimina.
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

        <p className="updated">Última actualización: 2 de julio de 2026</p>
      </main>
    </div>
  );
}

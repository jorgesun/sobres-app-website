import "./home.css";
import { APP_STORE_URL, AppStoreGlyph, WEB_APP_URL } from "./portada";

/* Las capturas son las mismas que están publicadas en la ficha del App Store
   (1.1.1). Salen de ahí a propósito: si la tienda y el sitio muestran pantallas
   distintas, una de las dos está mintiendo. */
const SHOTS = [
  { src: "/screens/resumen.webp", title: "Resumen", desc: "Tu mes completo de un vistazo: lo que te queda para gastar, tus metas y lo que viene." },
  { src: "/screens/presupuesto.webp", title: "Presupuesto", desc: "Cada sobre con lo que le asignaste y lo que todavía tiene." },
  { src: "/screens/mover-dinero.webp", title: "Mover dinero", desc: "¿Se te pasó la mano en Súper? Jálale a otro sobre sin salir de la lista." },
  { src: "/screens/cuentas.webp", title: "Cuentas", desc: "Débito, efectivo, tarjetas e inversión, con tu deuda siempre a la vista." },
  { src: "/screens/cuenta-detalle.webp", title: "Movimientos", desc: "Cada cargo con su sobre y su estado: confirmado o por confirmar." },
  { src: "/screens/calendario.webp", title: "Calendario", desc: "Los pagos programados del mes, marcados en el día que tocan." },
  { src: "/screens/reportes.webp", title: "Reportes", desc: "Patrimonio neto y a dónde se fue el dinero, por grupo y por categoría." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sobres",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS 18.0 o superior",
  inLanguage: "es-MX",
  url: "https://sobres-app.com",
  downloadUrl: APP_STORE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
};

export default function HomePage() {
  return (
    <div className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav>
        <div className="nav-brand">
          <div className="nav-icon">
            <img src="/icon.png" alt="" width={34} height={34} />
          </div>
          Sobres
        </div>
        <div className="nav-links">
          <a href="#capturas">La app</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#caracteristicas">Características</a>
          <a href="/soporte">Soporte</a>
        </div>
        {/* "Entrar" va antes de "Descargar" y sin relleno: quien ya tiene cuenta
            busca la puerta, no la descarga, y en fantasma no le compite a la
            acción principal del sitio. Es dominio aparte (app.sobres-app.com),
            así que es un <a> normal y no una ruta de este Next. */}
        <div className="nav-actions">
          <a href="/en" className="nav-lang" hrefLang="en" lang="en" aria-label="Sobres in English">English</a>
          <a href={WEB_APP_URL} className="btn-nav-ghost">Entrar</a>
          <a href={APP_STORE_URL} className="btn-nav">Descargar</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <img src="/icon.png" alt="" width={18} height={18} style={{ borderRadius: 5 }} />
              <b>Gratis</b> en el App Store · iPhone · en español
            </div>

            <h1>Tu dinero, <span>en sus propios sobres.</span></h1>

            <p>
              Dale un trabajo a cada peso antes de gastarlo. El método de sobres de
              toda la vida, hecho app para tu iPhone —y también en tu navegador.
            </p>

            <div className="hero-actions">
              <a href={APP_STORE_URL} className="btn-primary">
                <AppStoreGlyph />
                <span>
                  <small>Descárgala en el</small>
                  <strong>App Store</strong>
                </span>
              </a>
              <a href="#capturas" className="btn-secondary">Ver la app →</a>
            </div>

            <div className="hero-trust">
              <span><b>✓</b> Sin conectar tu banco</span>
              <span><b>✓</b> Sin suscripción</span>
              <span><b>✓</b> Sin anuncios ni rastreadores</span>
            </div>
          </div>

          <div className="hero-devices">
            <div className="device device-back">
              <img
                src="/screens/presupuesto.webp"
                alt="Pantalla de Presupuesto de Sobres, con los sobres del mes y su disponible"
                width={900}
                height={1947}
              />
            </div>
            <div className="device device-front">
              <img
                src="/screens/resumen.webp"
                alt="Pantalla de Resumen de Sobres, con el disponible para gastar del mes y las metas"
                width={900}
                height={1947}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="tour" id="capturas">
        <div className="section-head">
          <div className="section-label">La app por dentro</div>
          <h2 className="section-title">Así se ve Sobres en tu iPhone</h2>
        </div>

        <div className="shots">
          {SHOTS.map((s) => (
            <figure className="shot" key={s.src}>
              <div className="device">
                <img
                  src={s.src}
                  alt={`Sobres — pantalla de ${s.title}`}
                  width={900}
                  height={1947}
                  loading="lazy"
                />
              </div>
              <figcaption className="shot-cap">
                <b>{s.title}</b>
                <span>{s.desc}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="how-bg" id="como-funciona">
        <div className="section-head">
          <div className="section-label">Cómo funciona</div>
          <h2 className="section-title">Cuatro pasos y ya</h2>
          <p className="section-sub">Simple, en español y pensado para México.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Registra tu ingreso</h3>
            <p>Cuando cae la quincena, la registras. Ese dinero queda &quot;sin asignar&quot;, esperando destino.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Repártelo en sobres</h3>
            <p>Renta, Súper, Gasolina, Ahorro… hasta dejar el &quot;sin asignar&quot; en cero. Cada peso con un trabajo.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Gasta sin adivinar</h3>
            <p>Anotas el gasto y baja el sobre que le toca. Si un sobre se queda corto, le mueves de otro.</p>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <h3>Ajusta el siguiente mes</h3>
            <p>Lo que no gastaste se acumula, y los reportes te dicen dónde se te va de verdad.</p>
          </div>
        </div>
      </section>

      <section id="metodo" style={{ background: "#fff" }}>
        <div className="method-grid">
          <div>
            <div className="section-label">El método de sobres</div>
            <h2 className="section-title">La forma más vieja de presupuestar, y la que sí funciona</h2>
            <p className="section-sub">
              Separar el dinero en sobres según su propósito y gastar solo lo que hay en
              cada uno tiene décadas funcionando. Sobres lo lleva a tu iPhone sin perder
              lo que lo hace servir: saber, en cualquier momento, cuánto te queda para
              cada cosa.
            </p>
            <div className="method-checks">
              <div><b>✓</b> Nada de conectar cuentas bancarias</div>
              <div><b>✓</b> Sincronización privada entre tus dispositivos</div>
              <div><b>✓</b> Gratis, sin suscripción mensual</div>
            </div>
          </div>
          <div className="method-envelopes">
            <div className="envelope"><div className="envelope-emoji">🏠</div><div className="envelope-name">Renta</div><div className="envelope-amt">$8,500</div></div>
            <div className="envelope"><div className="envelope-emoji">🛒</div><div className="envelope-name">Súper</div><div className="envelope-amt">$2,000</div></div>
            <div className="envelope"><div className="envelope-emoji">⛽</div><div className="envelope-name">Gasolina</div><div className="envelope-amt">$1,200</div></div>
            <div className="envelope"><div className="envelope-emoji">✈️</div><div className="envelope-name">Vacaciones</div><div className="envelope-amt">$500</div></div>
          </div>
        </div>
      </section>

      <section className="features" id="caracteristicas">
        <div className="section-head">
          <div className="section-label">Características</div>
          <h2 className="section-title">Todo lo que necesitas, nada de lo que no</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF9E0" }}>💼</div><h3>Múltiples presupuestos</h3><p>Uno para tu casa, otro para el negocio o para un proyecto aparte. Cada quien con sus categorías y sus cuentas.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#E8F5E8" }}>📅</div><h3>Pagos programados</h3><p>Netflix, la renta, el seguro. Los pones una vez, aparecen en el calendario y te avisan el día que tocan.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF5F5" }}>💳</div><h3>Tarjetas de crédito</h3><p>Al gastar con la tarjeta, Sobres aparta el dinero para pagarla. Llegas al corte con el pago completo, no con sorpresas.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#EFF6FF" }}>📊</div><h3>Reportes que se entienden</h3><p>Patrimonio neto, donas de gasto por grupo y por categoría, y tendencias mes a mes para ver si vas subiendo o bajando.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#F5F3FF" }}>🎯</div><h3>Metas de ahorro</h3><p>Por monto, por fecha o por aportación fija al mes. La app calcula cuánto le toca a cada mes y te muestra el avance.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#F0FDF4" }}>✂️</div><h3>Gastos divididos</h3><p>Un ticket del súper que trae despensa, farmacia y cosas del bebé se reparte entre varios sobres, sin inventar dos gastos.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFFBEB" }}>🔒</div><h3>Privacidad primero</h3><p>Face ID para abrirla, modo privacidad para ocultar saldos, y solo tu correo para la cuenta. Sin anuncios ni rastreadores de terceros.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#EEF2FF" }}>💻</div><h3>iPhone y navegador</h3><p>La misma cuenta y los mismos datos desde tu teléfono o desde la computadora, sincronizados de forma privada.</p></div>
        </div>
      </section>

      <section className="cta-section" id="descargar">
        <h2>Empieza hoy. Es gratis.</h2>
        <p>Bájala en tu iPhone y dale trabajo a tu próximo peso.</p>
        <a href={APP_STORE_URL} className="btn-yellow">
          <AppStoreGlyph size={24} />
          <span>
            <small>Descárgala en el</small>
            <strong>App Store</strong>
          </span>
        </a>
        <p className="cta-note">Requiere iOS 18 o superior.</p>

        {/* La segunda puerta: quien no trae el iPhone a la mano —o no quiere
            instalar nada todavía— entra desde el navegador con la misma cuenta.
            Va aquí abajo y no en el hero para no partir en dos la decisión de
            descargar, que sigue siendo la principal. */}
        <p className="cta-web">
          ¿Prefieres la computadora?{" "}
          <a href={WEB_APP_URL}>Entra a la app web →</a>
        </p>
      </section>

      <footer>
        <div className="footer-brand">
          <div className="nav-icon"><img src="/icon.png" alt="" width={34} height={34} /></div>
          Sobres
        </div>
        <div className="footer-links">
          <a href={APP_STORE_URL}>App Store</a>
          <a href={WEB_APP_URL}>App web</a>
          <a href="/soporte">Soporte</a>
          <a href="/privacidad">Privacidad</a>
          <a href="mailto:hola@sobres-app.com">Contacto</a>
          <a href="/en" hrefLang="en" lang="en">English</a>
        </div>
        <div className="footer-copy">© 2026 Sobres. Hecho con ♥ en México.</div>
      </footer>
    </div>
  );
}

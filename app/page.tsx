import "./home.css";

function AppStoreGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="home">
      <nav>
        <div className="nav-brand">
          <div className="nav-icon">
            <img src="/icon.png" alt="Sobres" />
          </div>
          Sobres
        </div>
        <div className="nav-links">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#caracteristicas">Características</a>
          <a href="#metodo">El método</a>
          <a href="/soporte">Soporte</a>
          <a href="mailto:hola@sobres-app.com">Contacto</a>
        </div>
        <a href="#descargar" className="btn-nav">Descargar</a>
      </nav>

      <section className="hero">
        <img
          src="/icon.png"
          alt="Sobres"
          style={{ width: 96, height: 96, borderRadius: 22, margin: "0 auto 20px", display: "block", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        />
        <div className="hero-badge">📱 Disponible para iPhone</div>

        <h1>Tu dinero, <span>en sus propios sobres.</span></h1>

        <p>
          Asigna cada peso a un propósito antes de gastarlo. El método de presupuesto
          por sobres, ahora en tu iPhone.
        </p>

        <div className="hero-actions">
          <a href="#descargar" className="btn-primary">
            <AppStoreGlyph />
            App Store
          </a>
          <a href="#como-funciona" className="btn-secondary">Ver cómo funciona →</a>
        </div>

        <div className="phone-wrap">
          <div className="phone">
            <div className="phone-nav-bar"><div className="phone-notch" /></div>
            <div className="phone-screen">
              <div className="screen-header">Mi Presupuesto</div>
              <div className="screen-month">
                <span>‹</span>
                <span style={{ fontWeight: 600, color: "#111" }}>Junio 2026</span>
                <span>›</span>
              </div>

              <div className="screen-card">
                <div className="screen-tbb">
                  <div>
                    <div className="screen-tbb-label">Sin Asignar</div>
                    <div className="screen-tbb-amount">$2,450</div>
                  </div>
                  <div className="screen-tbb-badge">✓ Todo asignado</div>
                </div>
                <div style={{ height: 6 }} />
                <div className="screen-row">
                  <div className="screen-row-label"><div className="screen-row-dot" style={{ background: "#1A8C1A" }} />Total disponible</div>
                  <div className="screen-row-val">$8,200</div>
                </div>
                <div className="screen-row">
                  <div className="screen-row-label"><div className="screen-row-dot" style={{ background: "#3B82F6" }} />Asignado</div>
                  <div className="screen-row-val">$15,000</div>
                </div>
                <div className="screen-row" style={{ border: "none" }}>
                  <div className="screen-row-label"><div className="screen-row-dot" style={{ background: "#EF4444" }} />Adeudado TC</div>
                  <div className="screen-row-val" style={{ color: "#EF4444" }}>$4,350</div>
                </div>
              </div>

              <div className="screen-section-title">Gastos Fijos</div>
              <div className="screen-cat-row">
                <div className="screen-cat-name">🏠 <span>Renta</span></div>
                <div className="screen-cat-avail" style={{ color: "#1A8C1A" }}>$0</div>
              </div>
              <div className="screen-cat-row">
                <div className="screen-cat-name">💡 <span>Servicios</span></div>
                <div className="screen-cat-avail" style={{ color: "#1A8C1A" }}>$350</div>
              </div>
              <div className="screen-cat-row">
                <div className="screen-cat-name">📱 <span>Internet</span></div>
                <div className="screen-cat-avail" style={{ color: "#1A8C1A" }}>$80</div>
              </div>

              <div className="screen-section-title">Gastos Variables</div>
              <div className="screen-cat-row">
                <div className="screen-cat-name">🛒 <span>Súper</span></div>
                <div className="screen-cat-avail" style={{ color: "#F97316" }}>$450</div>
              </div>
              <div className="screen-cat-row">
                <div className="screen-cat-name">⛽ <span>Gasolina</span></div>
                <div className="screen-cat-avail" style={{ color: "#EF4444" }}>-$120</div>
              </div>

              <div style={{ flex: 1 }} />
              <div className="screen-tabbar">
                <div className="tab-item active"><span className="tab-icon">📋</span>Resumen</div>
                <div className="tab-item"><span className="tab-icon">📊</span>Presupuesto</div>
                <div className="tab-item"><span className="tab-icon">💳</span>Cuentas</div>
                <div className="tab-item"><span className="tab-icon">📈</span>Reportes</div>
                <div className="tab-item"><span className="tab-icon">⚙️</span>Ajustes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-bg" id="como-funciona">
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label">Cómo funciona</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Cuatro pasos para tomar el control</h2>
          <p className="section-sub" style={{ margin: "14px auto 0" }}>Simple, intuitivo y diseñado para México.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Registra tu ingreso</h3>
            <p>Cuando cobras tu sueldo, lo registras en Sobres. Ese dinero queda &quot;listo para asignar&quot;.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Asigna a cada sobre</h3>
            <p>Distribuye tu dinero entre categorías: Renta, Súper, Gasolina, Ahorro... cada peso con un destino.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Gasta con confianza</h3>
            <p>Al pagar, registra la transacción. Si el sobre tiene saldo, puedes gastar. Si no, sabes que debes mover dinero.</p>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <h3>Revisa y ajusta</h3>
            <p>Los reportes te muestran en qué gastas más. Ajusta tus sobres cada mes y mejora mes a mes.</p>
          </div>
        </div>
      </section>

      <section id="metodo" style={{ background: "#fff" }}>
        <div className="method-grid">
          <div>
            <div className="section-label">El método de sobres</div>
            <h2 className="section-title">La forma más efectiva de presupuestar</h2>
            <p className="section-sub">
              El método de sobres existe desde hace décadas: separa tu dinero físicamente
              en sobres según categoría y solo gastas lo que hay en cada uno. Sobres
              digitaliza esa idea para tu iPhone, sin perder la claridad mental que hace
              que funcione.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--green)" }}>✓ Sin cuentas bancarias vinculadas</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--green)" }}>✓ Sincronización privada en la nube</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--green)" }}>✓ Sin suscripción mensual</div>
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

      <section id="caracteristicas" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label">Características</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Todo lo que necesitas, nada de lo que no</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF9E0" }}>💼</div><h3>Múltiples presupuestos</h3><p>Crea presupuestos separados para tu hogar, negocio o cualquier proyecto. Cada uno con sus propias categorías y cuentas.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#E8F5E8" }}>📅</div><h3>Pagos programados</h3><p>Registra Netflix, renta, seguros y cualquier gasto recurrente. Sobres te avisa cuando vencen a las 8 AM del día.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#EFF6FF" }}>📊</div><h3>Reportes Pareto</h3><p>Identifica el 20% de categorías que representan el 80% de tus gastos. Gráficas de dona y barras para entender tu dinero.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF5F5" }}>💳</div><h3>Tarjetas de crédito</h3><p>Lleva el control de tus tarjetas. Sobres reserva automáticamente lo necesario para pagar tus cargos sin sorpresas.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#F5F3FF" }}>🎯</div><h3>Metas de ahorro</h3><p>Define metas por monto, por fecha o por aportación mensual. Ve tu progreso en tiempo real con barras visuales.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFFBEB" }}>🔒</div><h3>Privacidad primero</h3><p>Solo pedimos tu correo para tu cuenta. Sin rastreadores, sin analíticas, sin anuncios. Tus datos viajan cifrados y se sincronizan de forma privada solo entre tus dispositivos.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#F0FDF4" }}>💾</div><h3>Respaldo y exportación</h3><p>Exporta tu presupuesto completo en JSON o tus transacciones en CSV. Tus datos siempre contigo.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF9E0" }}>👁</div><h3>Modo privacidad</h3><p>Oculta todos los saldos con un toque. Ideal para usar la app en público sin exponer tus finanzas.</p></div>
        </div>
      </section>

      <section className="cta-section" id="descargar">
        <h2>Empieza hoy. Es gratis.</h2>
        <p>Descarga Sobres en tu iPhone y asigna tu próximo peso con propósito.</p>
        <a href="#" className="btn-yellow">
          <AppStoreGlyph size={22} />
          Descargar en el App Store
        </a>
        <p style={{ marginTop: 20, fontSize: 13, opacity: 0.5 }}>iOS 18 o superior requerido</p>
      </section>

      <footer>
        <div className="footer-brand">
          <div className="nav-icon"><img src="/icon.png" alt="Sobres" /></div>
          Sobres
        </div>
        <div className="footer-links">
          <a href="/privacidad">Política de Privacidad</a>
          <a href="/soporte">Soporte</a>
          <a href="mailto:hola@sobres-app.com">Contacto</a>
        </div>
        <div className="footer-copy">© 2026 Sobres. Hecho con ♥ en México.</div>
      </footer>
    </div>
  );
}

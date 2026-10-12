import type { Metadata } from "next";
import "../home.css";
import { APP_STORE_URL, AppStoreGlyph, WEB_APP_URL } from "../portada";

export const metadata: Metadata = {
  title: { absolute: "Sobres — Envelope Budgeting for iPhone" },
  description:
    "Sobres is a personal budgeting app for iPhone based on the envelope method. Give your money a job and take control of your finances.",
  alternates: { languages: { es: "/" } },
  openGraph: {
    title: "Sobres — Envelope Budgeting",
    description: "Give your money a job. The envelope budgeting app for iPhone.",
    url: "https://sobres-app.com/en",
    type: "website",
    locale: "en",
    images: ["/og-image.png"],
  },
};

/* Las mismas capturas que la portada en español: la app en español. Lo dice
   el subtítulo del recorrido, para que nadie crea que no hay versión en inglés. */
const SHOTS = [
  { src: "/screens/resumen.webp", title: "Summary", desc: "Your whole month at a glance: what you have left to spend, your goals and what's coming up." },
  { src: "/screens/presupuesto.webp", title: "Budget", desc: "Every envelope with what you assigned to it and what it still has." },
  { src: "/screens/mover-dinero.webp", title: "Move money", desc: "Went a bit over on Groceries? Pull from another envelope without leaving the list." },
  { src: "/screens/cuentas.webp", title: "Accounts", desc: "Debit, cash, cards and investments, with your debt always in view." },
  { src: "/screens/cuenta-detalle.webp", title: "Transactions", desc: "Every charge with its envelope and its status: cleared or uncleared." },
  { src: "/screens/calendario.webp", title: "Calendar", desc: "The month's scheduled payments, marked on the day they're due." },
  { src: "/screens/reportes.webp", title: "Reports", desc: "Net worth and where the money went, by group and by category." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sobres",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS 18.0 or later",
  inLanguage: "en",
  url: "https://sobres-app.com/en",
  downloadUrl: APP_STORE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HomePageEn() {
  return (
    // `lang` aquí porque el `<html>` de la landing es español (layout raíz).
    <div className="home" lang="en">
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
          <a href="#screens">The app</a>
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="/en/support">Support</a>
        </div>
        <div className="nav-actions">
          <a href="/" className="nav-lang" hrefLang="es" lang="es" aria-label="Sobres en español">Español</a>
          <a href={WEB_APP_URL} className="btn-nav-ghost">Sign in</a>
          <a href={APP_STORE_URL} className="btn-nav">Download</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <img src="/icon.png" alt="" width={18} height={18} style={{ borderRadius: 5 }} />
              <b>Free</b> on the App Store · iPhone · English and Spanish
            </div>

            <h1>Your money, <span>in its own envelopes.</span></h1>

            <p>
              Give your money a job before you spend it. The classic envelope method,
              made into an app for your iPhone, and in your browser too.
            </p>

            <div className="hero-actions">
              <a href={APP_STORE_URL} className="btn-primary">
                <AppStoreGlyph />
                <span>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>
              <a href="#screens" className="btn-secondary">See the app →</a>
            </div>

            <div className="hero-trust">
              <span><b>✓</b> No bank connection</span>
              <span><b>✓</b> No subscription</span>
              <span><b>✓</b> No ads or trackers</span>
            </div>
          </div>

          <div className="hero-devices">
            <div className="device device-back">
              <img
                src="/screens/presupuesto.webp"
                alt="Sobres Budget screen, with the month's envelopes and what's available in each"
                width={900}
                height={1947}
              />
            </div>
            <div className="device device-front">
              <img
                src="/screens/resumen.webp"
                alt="Sobres Summary screen, with the month's available-to-spend amount and goals"
                width={900}
                height={1947}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="tour" id="screens">
        <div className="section-head">
          <div className="section-label">Inside the app</div>
          <h2 className="section-title">This is Sobres on your iPhone</h2>
          <p className="section-sub">Screenshots in Spanish; the app is also fully in English.</p>
        </div>

        <div className="shots">
          {SHOTS.map((s) => (
            <figure className="shot" key={s.src}>
              <div className="device">
                <img
                  src={s.src}
                  alt={`Sobres — ${s.title} screen`}
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

      <section className="how-bg" id="how-it-works">
        <div className="section-head">
          <div className="section-label">How it works</div>
          <h2 className="section-title">Four steps and you&apos;re done</h2>
          <p className="section-sub">Simple, in your language, in your currency.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Record your income</h3>
            <p>When your paycheck lands, you record it. That money stays &quot;unassigned&quot;, waiting for a destination.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Split it into envelopes</h3>
            <p>Rent, Groceries, Gas, Savings… until &quot;unassigned&quot; is at zero. All your money with a job.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Spend without guessing</h3>
            <p>You record the expense and its envelope goes down. If an envelope comes up short, you move money over from another.</p>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <h3>Adjust next month</h3>
            <p>What you didn&apos;t spend accumulates, and the reports tell you where your money really goes.</p>
          </div>
        </div>
      </section>

      <section id="method" style={{ background: "#fff" }}>
        <div className="method-grid">
          <div>
            <div className="section-label">The envelope method</div>
            <h2 className="section-title">The oldest way to budget, and the one that actually works</h2>
            <p className="section-sub">
              Splitting your money into envelopes by purpose and spending only what&apos;s in
              each one has worked for decades. Sobres brings it to your iPhone without losing
              what makes it useful: knowing, at any moment, how much you have left for
              each thing.
            </p>
            <div className="method-checks">
              <div><b>✓</b> No connecting bank accounts</div>
              <div><b>✓</b> Private sync between your devices</div>
              <div><b>✓</b> Free, no monthly subscription</div>
            </div>
          </div>
          <div className="method-envelopes">
            <div className="envelope"><div className="envelope-emoji">🏠</div><div className="envelope-name">Rent</div><div className="envelope-amt">$8,500</div></div>
            <div className="envelope"><div className="envelope-emoji">🛒</div><div className="envelope-name">Groceries</div><div className="envelope-amt">$2,000</div></div>
            <div className="envelope"><div className="envelope-emoji">⛽</div><div className="envelope-name">Gas</div><div className="envelope-amt">$1,200</div></div>
            <div className="envelope"><div className="envelope-emoji">✈️</div><div className="envelope-name">Vacation</div><div className="envelope-amt">$500</div></div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-head">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything you need, nothing you don&apos;t</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF9E0" }}>💼</div><h3>Multiple budgets</h3><p>One for your home, another for your business or a side project. Each with its own categories and accounts.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#E8F5E8" }}>📅</div><h3>Scheduled payments</h3><p>Netflix, rent, insurance. Set them up once; they show up on the calendar and remind you on the day they&apos;re due.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFF5F5" }}>💳</div><h3>Credit cards</h3><p>When you spend with the card, Sobres sets aside the money to pay it. You reach the statement date with the full payment ready, not with surprises.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#EFF6FF" }}>📊</div><h3>Reports that make sense</h3><p>Net worth, spending donuts by group and by category, and month-by-month trends to see whether you&apos;re going up or down.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#F5F3FF" }}>🎯</div><h3>Savings goals</h3><p>By amount, by date or by a fixed monthly contribution. The app works out each month&apos;s share and shows your progress.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#F0FDF4" }}>✂️</div><h3>Split transactions</h3><p>A store receipt with groceries, pharmacy and baby items gets split across several envelopes, without making up two expenses.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#FFFBEB" }}>🔒</div><h3>Privacy first</h3><p>Face ID to open it, privacy mode to hide balances, and only your email for the account. No ads or third-party trackers.</p></div>
          <div className="feature-card"><div className="feature-icon" style={{ background: "#EEF2FF" }}>💻</div><h3>iPhone and browser</h3><p>The same account and the same data from your phone or your computer, synced privately.</p></div>
        </div>
      </section>

      <section className="cta-section" id="download">
        <h2>Start today. It&apos;s free.</h2>
        <p>Get it on your iPhone and give your next paycheck a job.</p>
        <a href={APP_STORE_URL} className="btn-yellow">
          <AppStoreGlyph size={24} />
          <span>
            <small>Download on the</small>
            <strong>App Store</strong>
          </span>
        </a>
        <p className="cta-note">Requires iOS 18 or later.</p>

        <p className="cta-web">
          Prefer your computer?{" "}
          <a href={WEB_APP_URL}>Open the web app →</a>
        </p>
      </section>

      <footer>
        <div className="footer-brand">
          <div className="nav-icon"><img src="/icon.png" alt="" width={34} height={34} /></div>
          Sobres
        </div>
        <div className="footer-links">
          <a href={APP_STORE_URL}>App Store</a>
          <a href={WEB_APP_URL}>Web app</a>
          <a href="/en/support">Support</a>
          <a href="/en/privacy">Privacy</a>
          <a href="mailto:hola@sobres-app.com">Contact</a>
          <a href="/" hrefLang="es" lang="es">Español</a>
        </div>
        <div className="footer-copy">© 2026 Sobres. Made with ♥ in Mexico.</div>
      </footer>
    </div>
  );
}

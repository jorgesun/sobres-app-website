import type { Metadata } from "next";
import "../../privacidad/privacy.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sobres takes care of your information: local use without an account on iPhone, encrypted sync, our own cookie-free measurement in the web app, no ads or third-party trackers.",
  alternates: { languages: { es: "/privacidad" } },
};

/*
 * Traducción de `/privacidad`. Es un documento legal: cualquier cambio de
 * fondo se hace en LAS DOS versiones y se mueve la fecha en las dos.
 */
export default function PrivacyPage() {
  return (
    <div className="privacy" lang="en">
      <header>
        <div className="logo">💼</div>
        <h1>Privacy Policy</h1>
        <p>Sobres — Personal Budget</p>
        <p><a href="/privacidad" hrefLang="es" lang="es">Leer en español</a></p>
      </header>

      <main>
        <div className="card">
          <h2><span className="icon">🔒</span> In one line</h2>
          <div className="highlight">
            <strong>Your data is yours.</strong> On iPhone you can use Sobres <strong>without an account</strong>,
            and then all your information is stored only on your device. Cloud sync is{" "}
            <strong>optional</strong> and only happens if you create an account. We don&apos;t sell your
            data, we don&apos;t show ads and we don&apos;t use third-party analytics tools or trackers. In the
            web app we count visits with our own measurement, without cookies and without storing your
            IP address (details below).
          </div>
        </div>

        <div className="card">
          <h2><span className="icon">📱</span> You can use the app without an account</h2>
          <p>On iPhone, Sobres works in two ways, and you choose:</p>
          <ul>
            <li><strong>Local mode (no account):</strong> when you choose <em>&quot;Continue without an account&quot;</em>, the whole app works and your data —budgets, accounts, transactions, categories, goals— is stored <strong>only on your device</strong>. In this mode we don&apos;t send anything to any server or collect your email.</li>
            <li><strong>Synced mode (with an account):</strong> if you create an account or sign in, you turn on backup and sync between your devices. You can go back to local mode by signing out; your data stays on the device.</li>
          </ul>
          <p>
            The <strong>web app</strong> (<a href="https://app.sobres-app.com">app.sobres-app.com</a>) always
            requires an account: your data is stored on our server and displayed in your browser. It&apos;s the
            same account and the same budget as on your iPhone.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">📝</span> Information we collect</h2>
          <p>We collect only the following, and only to run the app:</p>
          <ul>
            <li><strong>Account data (only if you create an account):</strong> your email address and an encrypted password, to sign in and recover access, and the language you prefer for your account emails. If you sign in with <strong>Apple or Google</strong>, instead of a password we receive from that provider your email and the basic profile data it shares (such as your name). If you use local mode without an account, <strong>we don&apos;t collect your email</strong>.</li>
            <li><strong>Budget data you create:</strong> budgets, groups and categories, accounts and cards you enter manually, transactions and amounts, savings goals and scheduled payments. On iPhone it is always stored on your device and syncs to the cloud <strong>only if you&apos;re signed in</strong>; in the web app it lives on the server.</li>
            <li><strong>Visits to the web app:</strong> for each page you open on app.sobres-app.com we record the page (without any identifiers in the address), the approximate country, region and city derived from your connection, the type of device, the browser and operating system family (no version), the browser language and, if you came from another site, that site&apos;s name (not the page). We also note when a transaction is entered from the web and from which screen. <strong>We don&apos;t store your IP address</strong> or your browser&apos;s full identifier: we use them to calculate a code that changes every day and can&apos;t be reversed, only to count distinct visitors. If you&apos;re signed in, the record also carries your account identifier. These records are deleted automatically after <strong>120 days</strong>.</li>
          </ul>
          <div className="highlight">
            This information is used <strong>only for the app to work</strong>. It is not used to track you or for advertising.
          </div>
        </div>

        <div className="card">
          <h2><span className="icon">⚙️</span> How we use your information</h2>
          <ul>
            <li>To store and display your budget on your device (always on iPhone) or in your browser (in the web app).</li>
            <li>If you have an account: to authenticate you, keep your session and sync your budget between your devices.</li>
            <li>If you have an account: to send you account emails (verification and password recovery).</li>
            <li>To understand how Sobres is used and decide what to improve: with visits to the web app and with <strong>aggregate figures</strong> calculated over accounts (for example, how many people use each currency, how many have recorded transactions or how many keep using the app after their first week). Those figures are totals: they can&apos;t be used to see anyone&apos;s budget.</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">☁️</span> Storage and sync</h2>
          <p>
            Your data is always stored locally on your device (with Apple&apos;s SwiftData).
            <strong> In local mode (no account) that&apos;s where it ends:</strong> nothing is sent to any server.
          </p>
          <p>
            <strong>Only if you&apos;re signed in</strong>, your data is backed up and synced
            on <strong>Supabase</strong>, our database and authentication provider.
            Each user is isolated by row-level security rules (Row Level Security):
            only you can access your own data. Communication with the server is always
            encrypted in transit (HTTPS/TLS). Supabase processes the data on our behalf; its
            servers may be located outside your country.
          </p>
          <p>
            The web app and this site are served from <strong>Vercel</strong>, our hosting provider.
            Vercel is the one that derives the approximate country and city from your connection that are
            used to count visits.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🍪</span> Cookies and browser storage (web app)</h2>
          <p>The web app uses only its own cookies, needed for it to work or to remember your preferences:</p>
          <ul>
            <li><strong>Session:</strong> they keep you signed in to your account, and one more signs you out automatically after 15 minutes without use.</li>
            <li><strong>Preferences:</strong> theme and appearance, hide balances, language, time zone, payment reminders, active budget and the accounts you pin to the top. They belong to this browser and aren&apos;t sent to anyone else.</li>
          </ul>
          <p>
            It also keeps in the browser&apos;s local storage the time of your last activity (so the inactivity
            sign-out works across tabs) and the day of the last payment reminder (so it isn&apos;t repeated).{" "}
            <strong>We don&apos;t use advertising, analytics or third-party cookies.</strong>
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">💱</span> Exchange rates (multi-currency)</h2>
          <p>
            If you use accounts in another currency, the app looks up a global exchange-rate table
            on our server. It&apos;s a read-only lookup and <strong>doesn&apos;t send any of your
            personal or financial data</strong>.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🚫</span> What we DON&apos;T do</h2>
          <ul>
            <li>We don&apos;t use third-party analytics, telemetry or tracking tools: the web app&apos;s visit measurement is our own and its data doesn&apos;t leave our database</li>
            <li>We don&apos;t access your location, contacts, camera or microphone</li>
            <li>We don&apos;t use advertising identifiers or cross-app tracking</li>
            <li>We don&apos;t sell, rent or share your information for commercial purposes</li>
            <li>We don&apos;t show ads of any kind</li>
            <li>We don&apos;t connect to your bank or read statements: you enter balances and transactions manually</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">🤝</span> Sharing with third parties</h2>
          <p>
            We don&apos;t sell or share your personal information with third parties for commercial purposes.
            We only share it with the infrastructure providers strictly necessary
            to run the app —Supabase, for authentication and database, and Vercel, to host the
            web app—, which process it under our instructions. Like any internet service, those
            providers keep technical request logs (including the IP address) for a limited time to
            operate and protect the service. If you sign in with Apple or Google, that provider knows
            you use Sobres to sign in. We may also disclose your information if required by law.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🔑</span> Face ID / Touch ID</h2>
          <p>
            Sobres can use Face ID or Touch ID to lock access to the app, along with a
            privacy mode to hide your balances. Biometric authentication is handled
            entirely by iOS; the app never accesses or stores your biometric data.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">💾</span> Backups and export</h2>
          <p>
            You can export your information as JSON (full backup) or CSV (transactions).
            These files are generated on your device and shared only wherever you decide
            to send them (AirDrop, email, etc.).
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🗑️</span> Deleting your account and your data</h2>
          <p>
            You can delete your account directly from the app, on iPhone or on the web (Settings →
            Delete account). Once you confirm, your user and <strong>all your associated data on the
            server</strong> are permanently deleted —including the web app visit records that carry your
            account identifier—, as well as the local copy on the device you delete it from. This action
            is irreversible. If you also delete the app, the local copy is deleted too.
          </p>
          <p>
            Visits you made without being signed in don&apos;t carry any data that lets us link them to you,
            so they can&apos;t be deleted per account: they&apos;re deleted automatically after 120 days.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">🛡️</span> Security</h2>
          <p>
            We protect your information with encryption in transit (HTTPS/TLS), passwords stored in
            encrypted form and per-user isolation (RLS). No system is 100&nbsp;% foolproof, but
            we apply reasonable measures in line with best practices.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">👶</span> Children</h2>
          <p>
            Sobres is not directed at children under 13 and we do not knowingly collect information
            from children. If you believe a child has given us data, contact us to have it deleted.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">✏️</span> Changes to this policy</h2>
          <p>
            If we change this privacy policy, we will publish the updated version on this
            same page and update the effective date. We recommend reviewing it periodically.
          </p>
        </div>

        <div className="card">
          <h2><span className="icon">✉️</span> Contact</h2>
          <p>
            Do you have questions about privacy, or want to exercise your rights over your data?<br />
            Write to us at <a href="mailto:hola@sobres-app.com">hola@sobres-app.com</a>
          </p>
        </div>

        <p className="updated">Last updated: October 11, 2026</p>
      </main>
    </div>
  );
}

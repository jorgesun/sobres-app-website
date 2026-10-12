import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, WhatIf, WhatIfItem, Screenshot } from "../components";

const SLUG = "/en/support/settings";

export const metadata: Metadata = { title: "Settings tab" };

export default function Settings() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Settings is the app's control panel: appearance, security, privacy, currency, backups and your account. This is where you decide how it looks and how your information is protected."
      />

      <Toc
        items={[
          { id: "purpose", label: "What is it for?" },
          { id: "what-you-find", label: "What you'll find here" },
          { id: "backup", label: "Export and import" },
          { id: "account", label: "Account and sync" },
          { id: "delete", label: "Deleting your account" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="purpose">What is this screen for?</h2>
      <p>To make the app your own and keep your data safe and under your control.</p>

      <Screenshot
        src="/soporte/ajustes.png"
        alt="Settings tab: Security section (Face ID / Touch ID lock, Hide balances), Notifications (scheduled payment reminders) and Data (export/import)."
        caption="The Settings tab: security, notifications and your data."
      />

      <h2 id="what-you-find">What you&apos;ll find here</h2>
      <ul>
        <li><strong>Light / dark theme</strong> — the app&apos;s appearance.</li>
        <li><strong>Face ID / Touch ID lock</strong> — asks for your face or fingerprint to open the app.</li>
        <li><strong>Privacy mode</strong> — hides every amount with one tap, ideal for using the app in public.</li>
        <li><strong>Multi-currency</strong> — your budget has its own currency, and each account can use a different one.</li>
        <li><strong>Language</strong> — Spanish or English.</li>
        <li><strong>Export / import data</strong> — a JSON backup or your transactions as CSV.</li>
        <li><strong>Sync</strong> — turns on backup across devices if you have an account.</li>
        <li><strong>Delete account</strong> — deletes your account and all your data.</li>
      </ul>

      <h2 id="backup">Export and import</h2>
      <Steps>
        <li>Go to <strong>Settings</strong> and choose export.</li>
        <li>Pick the format: <strong>JSON</strong> (a full backup of the budget) or <strong>CSV</strong> (transactions only, to open in spreadsheets).</li>
        <li>Share the file wherever you want (AirDrop, email…). It&apos;s generated on your device.</li>
      </Steps>
      <Callout type="tip" title="Importing creates a new budget">
        <p>
          When you import a JSON backup, the app restores it as a <strong>new budget</strong>{" "}
          (it doesn&apos;t overwrite the current one). It&apos;s safe for trying things out or for moving your data to another device.
        </p>
      </Callout>

      <h2 id="account">Account and sync</h2>
      <p>
        Sobres works <strong>without an account</strong> (local mode: everything stays on your iPhone). If you create
        an account and sign in, your data is <strong>synced encrypted</strong> and kept separate
        per user, so you have it on all your devices. Creating an account is optional; you can go back to
        local mode by signing out.
      </p>
      <Callout type="good">
        <p>All the details about what is stored and where are in the <Link href="/en/privacy">Privacy Policy</Link>.</p>
      </Callout>

      <h2 id="delete">Deleting your account</h2>
      <p>
        In <strong>Settings → Account → Delete account</strong> (on the web, <strong>Settings → Danger zone</strong>) you can permanently delete your
        user and <strong>all your data</strong>, both on the server and the local copy. This action
        is <strong>irreversible</strong>.
      </p>
      <Callout type="warn">
        <p>Before deleting, export a backup if you want to keep your information. Once it&apos;s deleted, it can&apos;t be recovered.</p>
      </Callout>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if I forget my password?">
          <p>From the sign-in screen you can ask to recover access by email. If you use local mode without an account, there&apos;s no password to recover: your data is on the device.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I get a new iPhone?">
          <p>With an account, sign in on the new device and your data syncs. Without an account, export a JSON backup on the old one and import it on the new one.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I turn on privacy mode and forget how to turn it off?">
          <p>It&apos;s a switch in Settings (and it usually has a shortcut). Tap it again to show the amounts again.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

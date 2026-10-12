import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout } from "../components";

const SLUG = "/en/support/faq";

export const metadata: Metadata = { title: "Frequently asked questions" };

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="acc-body">{children}</div>
    </details>
  );
}

export default function FAQ() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Quick answers to what we get asked the most. Not here? Write to us at hola@sobres-app.com."
      />

      <Toc
        items={[
          { id: "basics", label: "The basics" },
          { id: "money", label: "About money" },
          { id: "data", label: "Data and privacy" },
          { id: "glossary", label: "Mini glossary" },
        ]}
      />

      <h2 id="basics">The basics</h2>
      <div className="sop-accordion">
        <Faq q="Does Sobres connect to my bank?">
          <p>No. You enter all the information yourself. The app never connects to banks or reads statements. That&apos;s on purpose: entering your transactions is what keeps you aware of your money.</p>
        </Faq>
        <Faq q="Do I need to create an account to use it?">
          <p>No. You can choose <em>&quot;Continue without an account&quot;</em> and use everything in <strong>local mode</strong>, with your data stored only on your iPhone. An account is optional and lets you sync between devices.</p>
        </Faq>
        <Faq q="Which devices does it work on?">
          <p>Sobres is an iPhone app, and it also works in your browser at <a href="https://app.sobres-app.com">app.sobres-app.com</a>. With an account, your data syncs between them.</p>
        </Faq>
        <Faq q="Where do I start?">
          <p>With the <Link href="/en/support/getting-started">Start here</Link> guide and then <Link href="/en/support/money-flow">How your money moves</Link>. Those two cover 90% of the app.</p>
        </Faq>
      </div>

      <h2 id="money">About money</h2>
      <div className="sop-accordion">
        <Faq q="How do I assign money to an envelope?">
          <p>In <Link href="/en/support/budget">Budget</Link>, tap the amount in the category&apos;s &quot;Assigned&quot; column and type the amount. You can use <strong>+</strong> or <strong>−</strong> to add to or subtract from what it already had.</p>
        </Faq>
        <Faq q="What does it mean when «Unassigned» is at $0?">
          <p>That all your money already has a job: everything you have available is split into envelopes. That&apos;s the goal every month, not having a zero bank balance.</p>
        </Faq>
        <Faq q="What happens if I overspend in an envelope?">
          <p>Its available amount turns red (negative). To fix it, <Link href="/en/support/budget">move money</Link> from another envelope that has some, or assign more to it next month.</p>
        </Faq>
        <Faq q="Is the money I don't spend lost at the end of the month?">
          <p>No. Each envelope&apos;s available amount <strong>accumulates</strong> and starts the next month right there. That&apos;s how you can save little by little for big things.</p>
        </Faq>
        <Faq q="How do credit cards work?">
          <p>Each card has a payment envelope. When you spend with it from an envelope that has funds, that money is <strong>set aside</strong> to pay the card. All the details are in <Link href="/en/support/credit-cards">Credit cards</Link>.</p>
        </Faq>
        <Faq q="Can I have accounts in another currency?">
          <p>Yes. Your budget has its own currency and each account can use a different one; amounts are converted to the budget&apos;s currency. See <Link href="/en/support/settings">Settings</Link>.</p>
        </Faq>
      </div>

      <h2 id="data">Data and privacy</h2>
      <div className="sop-accordion">
        <Faq q="Does my data sync between devices?">
          <p>Yes, if you sign in: your information syncs encrypted and kept separate per user. Without an account, everything stays on your device.</p>
        </Faq>
        <Faq q="Can I export or back up my information?">
          <p>Yes. From <Link href="/en/support/settings">Settings</Link> you can export a full JSON backup or your transactions as CSV.</p>
        </Faq>
        <Faq q="How do I hide my balances or lock the app?">
          <p>Turn on <strong>privacy mode</strong> to hide amounts, and the <strong>Face ID / Touch ID lock</strong> in Settings.</p>
        </Faq>
        <Faq q="How do I delete my account?">
          <p>In <strong>Settings → Account → Delete account</strong>. It deletes your user and all your data permanently and irreversibly.</p>
        </Faq>
        <Faq q="Do you use ads or trackers?">
          <p>No. No ads, no third-party trackers and no analytics. See the <Link href="/privacidad">Privacy Policy</Link> (in Spanish).</p>
        </Faq>
      </div>

      <h2 id="glossary">Mini glossary</h2>
      <dl className="sop-glossary">
        <div><dt>Envelope (category)</dt><dd>Money set aside for a purpose (Rent, Groceries, Vacation). Like a labeled paper envelope with cash in it.</dd></div>
        <div><dt>Unassigned</dt><dd>Money you already have but haven&apos;t given a job yet. Goal: $0.</dd></div>
        <div><dt>Assigned</dt><dd>How much you put into an envelope this month.</dd></div>
        <div><dt>Activity</dt><dd>What came in or went out of the envelope through transactions this month (spending negative, income positive).</dd></div>
        <div><dt>Available</dt><dd>What&apos;s really left in the envelope: Assigned + Activity + what was left last month.</dd></div>
        <div><dt>Carryover</dt><dd>Unspent available money rolls over to the next month instead of being lost.</dd></div>
        <div><dt>Card reserve</dt><dd>Money set aside in a card&apos;s envelope to pay its charges when the statement arrives.</dd></div>
        <div><dt>Cleared</dt><dd>Marks that a transaction has already shown up at your bank.</dd></div>
        <div><dt>Reconcile</dt><dd>Match the app&apos;s balance with the bank&apos;s and &quot;lock in&quot; that point as the truth.</dd></div>
        <div><dt>On / off budget</dt><dd>Spending accounts feed your envelopes; investment accounts can stay off budget and their money doesn&apos;t count toward assigning.</dd></div>
      </dl>

      <Callout type="tip" title="Still have questions?">
        <p>Write to us at <a href="mailto:hola@sobres-app.com">hola@sobres-app.com</a> and we&apos;ll reply within 24–48 hours.</p>
      </Callout>

      <PrevNext slug={SLUG} />
    </>
  );
}

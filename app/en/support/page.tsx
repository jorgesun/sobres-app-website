import Link from "next/link";
import { NAV_EN } from "../../soporte/nav";
import { CardGrid, SopCard, Callout } from "./components";

export default function SupportHub() {
  return (
    <>
      <div className="sop-hero">
        <h1>Give your money a job.</h1>
        <p>
          Welcome to the Sobres help center. Here you&apos;ll learn how to use every
          screen and, most importantly, understand how your money comes in, gets
          assigned, gets spent and moves around.
        </p>
      </div>

      <div className="sop-bigcta">
        <div>
          <div className="bc-t">New to Sobres?</div>
          <div className="bc-s">Start with the 5-minute guide, then learn how money flows.</div>
        </div>
        <Link href="/en/support/getting-started">Start here →</Link>
      </div>

      <h2 id="steps">The essentials first</h2>
      <CardGrid>
        <SopCard href="/en/support/getting-started" icon="🚀" title="Start here" desc="The envelope method and the 4-step cycle, no detours." read="5 min" />
        <SopCard href="/en/support/money-flow" icon="🌊" title="How your money moves" desc="The key page. The complete mental model, with diagrams." read="8 min" />
      </CardGrid>

      <h2 id="screens">Guides by screen</h2>
      <p className="muted">One guide for each tab in the app, with numbered steps and what happens to your money.</p>
      <CardGrid>
        {NAV_EN[1].items.map((it) => (
          <SopCard key={it.slug} href={it.slug} icon={it.icon} title={it.title} desc={it.desc} read={it.read} />
        ))}
      </CardGrid>

      <h2 id="topics">Deep dives</h2>
      <CardGrid>
        {NAV_EN[2].items.map((it) => (
          <SopCard key={it.slug} href={it.slug} icon={it.icon} title={it.title} desc={it.desc} read={it.read} />
        ))}
        <SopCard href="/en/support/faq" icon="❓" title="Frequently asked questions" desc="Quick answers to the most common questions." read="5 min" />
      </CardGrid>

      <Callout type="tip" title="How to read this help">
        <p>
          You can go through the guides in order with the <strong>Previous / Next</strong>{" "}
          buttons at the bottom of each page, or jump straight to what you need from the
          menu on the left. Use the search box in the sidebar to find a topic instantly.
        </p>
        <p>
          The screenshots show the app in Spanish. The screens are the same in English:
          only the labels change.
        </p>
      </Callout>

      <h2 id="quick-faq">Quick questions</h2>
      <div className="sop-accordion">
        <details>
          <summary>Do I need to connect my bank?</summary>
          <div className="acc-body"><p>No. Sobres is 100% manual: you record your income and expenses. It never connects to banks or reads statements. That&apos;s on purpose: writing down every transaction is what keeps you aware of your money.</p></div>
        </details>
        <details>
          <summary>Do I have to create an account?</summary>
          <div className="acc-body"><p>No. You can use everything in <strong>local mode</strong> (your data stays on your iPhone). Creating an account is optional and only serves to sync between devices. See <Link href="/en/support/settings">Settings</Link>.</p></div>
        </details>
        <details>
          <summary>What is &quot;Unassigned&quot;?</summary>
          <div className="acc-body"><p>It&apos;s money you already have but haven&apos;t given a job yet. The goal is to bring it down to $0 by spreading it across your envelopes. We explain it in depth in <Link href="/en/support/money-flow">How your money moves</Link>.</p></div>
        </details>
      </div>
    </>
  );
}

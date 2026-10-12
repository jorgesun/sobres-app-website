import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, TableWrap, WhatIf, WhatIfItem } from "../components";

const SLUG = "/en/support/reconciliation";

export const metadata: Metadata = { title: "Reconciliation" };

export default function Reconciliation() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="«Clearing» and «reconciling» sound alike, but they do different things. This page makes it clear which one to use and how to match the app's balance with your bank's."
      />

      <Toc
        items={[
          { id: "difference", label: "Clearing vs. reconciling" },
          { id: "clear", label: "How to clear" },
          { id: "reconcile", label: "How to reconcile" },
          { id: "money", label: "What happens to your money" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="difference">Clearing vs. reconciling</h2>
      <TableWrap>
        <thead><tr><th></th><th>Cleared</th><th>Reconcile</th></tr></thead>
        <tbody>
          <tr><td><strong>What it means</strong></td><td>The transaction has already shown up at your bank</td><td>The app&apos;s balance matches the bank&apos;s at a given moment</td></tr>
          <tr><td><strong>Scope</strong></td><td>One transaction</td><td>A whole account up to a date</td></tr>
          <tr><td><strong>How often</strong></td><td>Whenever you want, often</td><td>Every so often (e.g. monthly)</td></tr>
          <tr><td><strong>Effect</strong></td><td>Marks that it&apos;s no longer pending</td><td>&quot;Locks in&quot; that point as the truth</td></tr>
        </tbody>
      </TableWrap>

      <Callout type="tip" title="The simple analogy">
        <p>
          <strong>Clearing</strong> is ticking off each transaction you&apos;ve already seen at your bank.{" "}
          <strong>Reconciling</strong> is closing the books: &quot;as of today, the app and the bank say the same thing&quot;.
        </p>
      </Callout>

      <h2 id="clear">How to clear a transaction</h2>
      <Steps>
        <li>Open the account in <Link href="/en/support/accounts">Accounts</Link> and check your bank side by side.</li>
        <li>Mark each transaction that already shows up at the bank as <strong>&quot;Cleared&quot;</strong>.</li>
        <li>Leave the ones that are still pending (the bank hasn&apos;t processed them yet) uncleared.</li>
      </Steps>

      <h2 id="reconcile">How to reconcile an account</h2>
      <Steps>
        <li>Have the account&apos;s <strong>real balance</strong> according to your bank at hand.</li>
        <li>Go to reconcile that account and enter that balance.</li>
        <li>If the app&apos;s balance <strong>matches</strong>, you confirm and that point is &quot;locked in&quot;.</li>
        <li>If it <strong>doesn&apos;t match</strong>, look for the difference: it&apos;s almost always a transaction you didn&apos;t record or an amount entered wrong. Fix it and match them up again.</li>
      </Steps>

      <Callout type="good" title="What reconciling gets you">
        <p>
          A reconciled transaction is <strong>locked</strong> as far as clearing goes: it&apos;s a point
          of truth that doesn&apos;t move by accident. If you really need to change it, you can{" "}
          <strong>&quot;Unreconcile&quot;</strong> it on purpose.
        </p>
      </Callout>

      <h2 id="money">What happens to your money</h2>
      <p>
        Neither clearing nor reconciling <strong>changes your envelopes</strong>: they don&apos;t assign or spend. They&apos;re
        tools so that the balance of your <Link href="/en/support/accounts">accounts</Link> reflects
        reality. Money only moves when you create or fix a transaction along the way.
      </p>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if it's off by a small amount?">
          <p>It&apos;s usually a fee, a rounding difference or a small charge you forgot. Record it and it will match again. Avoid &quot;forcing&quot; the balance without understanding the difference.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I need to edit a transaction that's already reconciled?">
          <p>First use <strong>&quot;Unreconcile&quot;</strong>, make the change and reconcile again. The lock exists precisely so you don&apos;t change it by mistake.</p>
        </WhatIfItem>
        <WhatIfItem q="How often should I reconcile?">
          <p>Once a month, when your statement arrives, is a good pace. Clearing, on the other hand, you can do every time you check the app.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

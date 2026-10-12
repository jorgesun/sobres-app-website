import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, TableWrap, WhatIf, WhatIfItem, Screenshot } from "../components";

const SLUG = "/en/support/accounts";

export const metadata: Metadata = { title: "Accounts tab" };

export default function Accounts() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Accounts is where the real money lives: your checking, cash, savings, cards and investments. This is where you record every transaction and match them with your bank."
      />

      <Toc
        items={[
          { id: "purpose", label: "What is it for?" },
          { id: "types", label: "Account types" },
          { id: "transaction", label: "How to record a transaction" },
          { id: "clear", label: "Clearing and reconciling" },
          { id: "money", label: "What happens to your money" },
          { id: "tips", label: "Tips" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="purpose">What is this screen for?</h2>
      <p>
        While <Link href="/en/support/budget">Budget</Link> organizes your money into envelopes,
        Accounts keeps track of <strong>where that money physically is</strong> and of every
        transaction you make with it.
      </p>

      <Screenshot
        src="/soporte/cuentas.png"
        alt="Accounts tab: top card with «Available in accounts $62,500.00» and the accounts grouped by type (Checking, Credit Card, Investment) with their balances."
        caption="The Accounts tab: total available at the top and your accounts by type (checking, card, investment)."
      />

      <h2 id="types">Account types</h2>
      <TableWrap>
        <thead>
          <tr><th>Type</th><th>What it&apos;s for</th><th>Does it feed the budget?</th></tr>
        </thead>
        <tbody>
          <tr><td>Checking / Debit</td><td>Your everyday account</td><td>Yes (on budget)</td></tr>
          <tr><td>Cash</td><td>The money in your wallet</td><td>Yes</td></tr>
          <tr><td>Savings</td><td>Money set aside</td><td>Yes</td></tr>
          <tr><td>Credit card</td><td>Purchases on credit</td><td>Yes (with its payment reserve)</td></tr>
          <tr><td>Investment</td><td>Money that isn&apos;t for everyday spending</td><td>Can be off budget</td></tr>
        </tbody>
      </TableWrap>

      <Callout type="tip" title="On budget vs. off budget">
        <p>
          Spending accounts (checking, cash, savings) are <strong>on budget</strong>: their money is
          split into envelopes. An investment account can be marked <strong>off budget</strong>; then
          its balance does <strong>not</strong> count as &quot;Unassigned&quot; and doesn&apos;t go into the
          envelopes. Income into an off-budget account doesn&apos;t add to &quot;Unassigned&quot; either.
        </p>
      </Callout>

      <h2 id="transaction">How to record a transaction</h2>
      <Steps>
        <li>Open the account and tap to <strong>add a transaction</strong>.</li>
        <li>Choose the type: <strong>expense</strong>, <strong>income</strong> or <strong>transfer</strong> between two accounts.</li>
        <li>Enter the <strong>amount</strong>. Remember the sign: negative = expense, positive = income.</li>
        <li>If it&apos;s an expense, choose the <strong>category</strong> (the envelope) it comes out of.</li>
        <li>Save. The account balance and the envelope&apos;s available amount update instantly.</li>
      </Steps>

      <h2 id="clear">Clearing and reconciling</h2>
      <p>They&apos;re two different, complementary things:</p>
      <ul>
        <li><strong>Cleared</strong> — you mark that the transaction <strong>has already shown up</strong> at your bank (it&apos;s no longer pending).</li>
        <li><strong>Reconcile</strong> — you match the app&apos;s balance with your bank&apos;s real balance at a given moment, and &quot;lock in&quot; that point as the truth.</li>
      </ul>
      <Callout type="good">
        <p>They have their own step-by-step guide in <Link href="/en/support/reconciliation">Reconciliation</Link>.</p>
      </Callout>

      <h2 id="money">What happens to your money</h2>
      <ul>
        <li><strong>Expense</strong>: lowers the account balance <em>and</em> lowers the chosen envelope&apos;s available amount.</li>
        <li><strong>Income</strong> (into an on-budget account): raises the account balance and goes into <strong>&quot;Unassigned&quot;</strong>, ready to split up.</li>
        <li><strong>Transfer</strong>: moves money from one account to another; it doesn&apos;t touch your envelopes (except when paying a card, see below).</li>
        <li><strong>Credit card payment</strong>: a transfer from your checking account to the card; it uses the reserve you had already set aside.</li>
      </ul>

      <h2 id="tips">Tips and common mistakes</h2>
      <Callout type="tip">
        <p>Record your expenses the same day. It takes ten seconds and it&apos;s what keeps your budget in touch with reality.</p>
      </Callout>
      <Callout type="warn">
        <p>When entering an expense, don&apos;t forget to choose the category: a transaction without an envelope doesn&apos;t come out of anywhere and throws off your available amounts.</p>
      </Callout>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if I get money back from a purchase?">
          <p>Record it as <strong>income in that same category</strong>: it raises the envelope&apos;s available amount without going through &quot;Unassigned&quot;. That&apos;s the typical refund case.</p>
        </WhatIfItem>
        <WhatIfItem q="What if the app's balance doesn't match my bank's?">
          <p>Use <Link href="/en/support/reconciliation">reconciliation</Link> to find the difference and match them up. It&apos;s almost always a transaction you forgot to record or an amount entered wrong.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I pay with a credit card?">
          <p>When you choose the expense&apos;s category, the app <strong>sets aside</strong> that money in your card&apos;s envelope for the future payment. All the details are in <Link href="/en/support/credit-cards">Credit cards</Link>.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

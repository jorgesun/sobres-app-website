import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, TableWrap, WhatIf, WhatIfItem } from "../components";

const SLUG = "/en/support/scheduled-payments";

export const metadata: Metadata = { title: "Scheduled payments" };

export default function ScheduledPayments() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Scheduled payments are your recurring transactions: rent, Netflix, an insurance policy, your paycheck. The app reminds you on the calendar and you record them with one tap, always under your control."
      />

      <Toc
        items={[
          { id: "what-are-they", label: "What are they?" },
          { id: "create", label: "How to create one" },
          { id: "process", label: "Process or skip" },
          { id: "adjust", label: "Adjusting the amount" },
          { id: "money", label: "What happens to your money" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="what-are-they">What are they?</h2>
      <p>
        A scheduled payment is a transaction that repeats: it can be an <strong>expense</strong> (rent),
        <strong> income</strong> (your salary) or a <strong>transfer</strong> (moving money to savings). You choose
        the frequency and the app puts it on the <Link href="/en/support/summary">Summary calendar</Link>.
      </p>

      <TableWrap>
        <thead><tr><th>It can be…</th><th>Frequency</th></tr></thead>
        <tbody>
          <tr><td>Expense · Income · Transfer</td><td>Weekly, every 2 weeks, monthly and more</td></tr>
        </tbody>
      </TableWrap>

      <h2 id="create">How to create a scheduled payment</h2>
      <Steps>
        <li>Set the <strong>type</strong> (expense, income or transfer) and the <strong>amount</strong>.</li>
        <li>Choose the <strong>account</strong> and, if it&apos;s an expense, the <strong>category</strong> (the envelope).</li>
        <li>Choose the <strong>frequency</strong> and the date of the first charge.</li>
        <li>Save. It will show up marked on the calendar on the days it applies.</li>
      </Steps>

      <h2 id="process">Process or skip</h2>
      <p>A scheduled payment <strong>isn&apos;t recorded on its own</strong>: the app reminds you and you decide.</p>
      <Steps>
        <li>In <Link href="/en/support/summary">Summary</Link>, tap the <strong>marked day</strong> on the calendar.</li>
        <li>Choose <strong>&quot;Process now&quot;</strong> to create that cycle&apos;s transaction…</li>
        <li>…or <strong>&quot;Skip&quot;</strong> to skip that cycle without recording anything (the payment stays active for next time).</li>
      </Steps>

      <Callout type="tip" title="Why you approve every payment">
        <p>
          That way a ghost transaction never shows up in your budget. The app helps you remember, but
          you&apos;re the one who confirms what really happened: if it wasn&apos;t charged this month, you skip it and that&apos;s it.
        </p>
      </Callout>

      <h2 id="adjust">Adjusting the amount of a charge</h2>
      <p>
        Sometimes the charge comes in different (the electricity bill varies, a bill went up). When processing you can change the
        amount, and you have two options:
      </p>
      <TableWrap>
        <thead><tr><th>Option</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><strong>Update amount</strong></td><td>Changes the recurring charge <strong>permanently</strong>: from now on it will use the new amount.</td></tr>
          <tr><td><strong>Keep original charge</strong></td><td>Changes <strong>only this charge</strong>. The next ones go back to the usual amount.</td></tr>
        </tbody>
      </TableWrap>

      <h2 id="money">What happens to your money</h2>
      <p>When you process a payment, a real transaction is created:</p>
      <ul>
        <li><strong>Expense</strong> → lowers the account balance and the envelope&apos;s available amount.</li>
        <li><strong>Income</strong> → goes into the account and into <strong>&quot;Unassigned&quot;</strong>, ready to split up.</li>
        <li><strong>Transfer</strong> → moves money between two accounts.</li>
      </ul>
      <Callout type="good">
        <p><strong>Skip</strong> doesn&apos;t touch your money: it only skips that cycle. Your budget doesn&apos;t change until you process.</p>
      </Callout>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if I forgot to process a payment from a few days ago?">
          <p>It stays marked on the calendar. Go to that day and process it whenever you can; you can also skip it if it didn&apos;t happen after all.</p>
        </WhatIfItem>
        <WhatIfItem q="What if the expense isn't recurring anymore?">
          <p>You can edit or cancel the scheduled payment so it stops showing up on the calendar, keeping the transactions you already recorded.</p>
        </WhatIfItem>
        <WhatIfItem q="What if the envelope has no funds when I process an expense?">
          <p>The transaction is recorded anyway and the envelope&apos;s available amount will turn red. Move money to it from another envelope to cover it (see <Link href="/en/support/budget">Budget</Link>).</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

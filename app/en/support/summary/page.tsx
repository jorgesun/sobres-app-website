import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, WhatIf, WhatIfItem, Screenshot, ScreenshotRow } from "../components";

const SLUG = "/en/support/summary";

export const metadata: Metadata = { title: "Summary tab" };

export default function Summary() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Summary is the first tab and your dashboard: at a glance you see how much you have available, what's left to assign, your goals and which payments are coming up."
      />

      <Toc
        items={[
          { id: "purpose", label: "What is it for?" },
          { id: "what-you-see", label: "What you see here" },
          { id: "calendar", label: "How to use the calendar" },
          { id: "money", label: "What happens to your money" },
          { id: "tips", label: "Tips" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="purpose">What is this screen for?</h2>
      <p>
        It&apos;s your overview of the month. You don&apos;t assign or spend money here (that happens in{" "}
        <Link href="/en/support/budget">Budget</Link> and <Link href="/en/support/accounts">Accounts</Link>);
        Summary is for <strong>seeing how you&apos;re doing</strong> and for processing your scheduled payments.
      </p>

      <ScreenshotRow>
        <Screenshot
          src="/soporte/resumen-metricas.png"
          alt="Top of Summary: the «Available to spend $59,200.00 · No overspending» card, and the metrics Unassigned $0.00, Assigned this month $65,000.00 and Owed on cards $6,350.00, followed by the goals with their progress bars."
          caption="Top: available to spend, «unassigned», assigned this month and card debt."
        />
        <Screenshot
          src="/soporte/resumen-calendario.png"
          alt="Bottom of Summary: the goals with progress bars and the «Calendar — Recurring payments» for July 2026."
          caption="Bottom: your goals and the scheduled payments calendar (tap a day to process it)."
        />
      </ScreenshotRow>

      <h2 id="what-you-see">What you see here</h2>
      <ul>
        <li><strong>&quot;Unassigned&quot;</strong> — how much money you still have to split up. If it says $0, all your money already has a job.</li>
        <li><strong>Total available</strong> — the sum of what&apos;s left in all your envelopes.</li>
        <li><strong>Assigned this month</strong> — how much you&apos;ve put into envelopes this month.</li>
        <li><strong>Card debt</strong> — how much you owe in total on your credit cards.</li>
        <li><strong>Goals</strong> — your savings goals and their progress. <strong>Tap one</strong> to open its detail screen with a progress ring and a projection.</li>
        <li><strong>Scheduled payments calendar</strong> — days with a recurring payment are marked. Tap a day to process or skip it.</li>
      </ul>

      <h2 id="calendar">How to process a payment from the calendar</h2>
      <Steps>
        <li><strong>Tap the marked day</strong> on the scheduled payments calendar.</li>
        <li>You&apos;ll see that day&apos;s payment(s). Choose <strong>&quot;Process now&quot;</strong> to create the transaction, or <strong>&quot;Skip&quot;</strong> to skip that cycle without recording it.</li>
        <li>When processing, you can <strong>adjust the amount</strong> of that charge if it came in different than usual.</li>
      </Steps>
      <p className="muted">
        All the details (creating them, frequencies, adjusting permanently or just once) are in{" "}
        <Link href="/en/support/scheduled-payments">Scheduled payments</Link>.
      </p>

      <h2 id="money">What happens to your money</h2>
      <Callout type="tip" title="When you process a scheduled payment…">
        <p>
          A <strong>real transaction</strong> is created, just as if you had entered it by hand:
          if it&apos;s an expense, the matching envelope&apos;s available goes down; if it&apos;s income, it goes into
          &quot;Unassigned&quot;; if it&apos;s a transfer, it moves money between two accounts. <strong>Skip</strong>{" "}
          doesn&apos;t touch your money: it only skips that cycle.
        </p>
      </Callout>

      <h2 id="tips">Tips and common mistakes</h2>
      <Callout type="good">
        <p>Check Summary at the start of the month: if &quot;Unassigned&quot; is above $0, you still have money to split up.</p>
      </Callout>
      <Callout type="warn">
        <p>A scheduled payment <strong>isn&apos;t recorded on its own</strong>: the app reminds you, but you&apos;re the one who confirms &quot;Process now&quot;. That way a transaction is never created without your approval.</p>
      </Callout>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if «Unassigned» shows up in red (negative)?">
          <p>It means you assigned more money than you have. Remove some of what you assigned to an envelope (in <Link href="/en/support/budget">Budget</Link>) until it&apos;s back to $0 or positive.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I tap a goal?">
          <p>Its <strong>detail screen</strong> opens: progress ring, suggested monthly contribution, current available, target date and a chart with your actual progress and a projection of when you&apos;ll reach it. See <Link href="/en/support/goals">Goals</Link>.</p>
        </WhatIfItem>
        <WhatIfItem q="What if a day has several payments?">
          <p>When you tap the day you&apos;ll see all of them, and you can process or skip each one separately.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

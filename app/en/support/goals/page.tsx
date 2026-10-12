import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, TableWrap, Steps, WhatIf, WhatIfItem, Screenshot } from "../components";

const SLUG = "/en/support/goals";

export const metadata: Metadata = { title: "Savings goals" };

export default function Goals() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="A goal turns an envelope into a savings plan: you tell the app how much you want to save (and by when) and it calculates how much to put in each month and shows you your progress."
      />

      <Toc
        items={[
          { id: "what-is-it", label: "What is a goal?" },
          { id: "types", label: "The 5 goal types" },
          { id: "create", label: "How to set a goal" },
          { id: "detail", label: "The detail screen" },
          { id: "money", label: "What happens to your money" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="what-is-it">What is a goal?</h2>
      <p>
        It&apos;s a target you give an envelope. Instead of assigning &quot;whatever&apos;s left&quot;, the app
        tells you <strong>how much you still need</strong> and <strong>how much to put in</strong> to get there. Since the
        available amount <Link href="/en/support/money-flow">accumulates month to month</Link>, your envelope keeps
        growing until it reaches the goal.
      </p>

      <Screenshot
        src="/soporte/resumen-metricas.png"
        alt="«Goals» section on the Summary tab: «Emergency Fund» with a blue progress bar and «$30,000.00 to go», and «Vacation» with a green bar and «Done»."
        caption="On Summary, each goal shows its progress bar and how much is left."
      />

      <h2 id="types">The 5 goal types</h2>
      <TableWrap>
        <thead>
          <tr><th>Type</th><th>What it does</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Fixed monthly savings</strong></td><td>Set aside a fixed amount every month</td><td>$500 a month for the Emergency fund</td></tr>
          <tr><td><strong>Fixed weekly savings</strong></td><td>An amount for each week of the month</td><td>$200 a week for Groceries</td></tr>
          <tr><td><strong>Target amount</strong></td><td>Reach a total, with no date</td><td>Build up a $20,000 cushion</td></tr>
          <tr><td><strong>Target by date</strong></td><td>Reach a total by a date; the app spreads the monthly contribution</td><td>$18,000 by December (holiday gifts)</td></tr>
          <tr><td><strong>Debt payment</strong></td><td>Like the target by date, to pay something off</td><td>Pay off $12,000 of debt in 6 months</td></tr>
        </tbody>
      </TableWrap>

      <Callout type="tip" title="Fixed amount or by date?">
        <p>
          If you have a <strong>deadline</strong> (a trip, a payment), use <em>target by date</em> or{" "}
          <em>debt payment</em>: the app divides what&apos;s left among the remaining months and tells you the
          monthly contribution. If you just want to <strong>save without a rush</strong>, use <em>target amount</em>{" "}
          or a <em>fixed savings</em> goal.
        </p>
      </Callout>

      <h2 id="create">How to set a goal</h2>
      <Steps>
        <li>In <Link href="/en/support/budget">Budget</Link>, open the category and go to edit it.</li>
        <li>Choose the <strong>goal type</strong> and enter the amount (and the target date, if it applies).</li>
        <li>Save. From then on you&apos;ll see a <strong>progress bar</strong> on the category.</li>
      </Steps>
      <Callout type="warn">
        <p>Goals aren&apos;t offered for <strong>credit card</strong> categories or system categories: the app manages those automatically.</p>
      </Callout>

      <h2 id="detail">The goal detail screen</h2>
      <p>From <Link href="/en/support/summary">Summary</Link>, tap a goal to open its detail:</p>
      <ul>
        <li><strong>Progress ring</strong> — how close you are, as a percentage.</li>
        <li><strong>Suggested monthly contribution</strong> — how much to assign this month to stay on track.</li>
        <li><strong>Current available</strong> — what you&apos;ve already saved in the envelope.</li>
        <li><strong>Target date</strong> — when you want to reach it.</li>
        <li><strong>Chart</strong> — your actual progress and the <strong>projection</strong> of when you&apos;ll reach it at this pace.</li>
      </ul>

      <Screenshot
        src="/soporte/meta-detalle.png"
        alt="Detail screen for a «Vacation» goal: progress ring at 20% with «This month's contribution covered», and a «Path to the goal» chart with the actual accumulated amount and the projection toward $150,000."
        caption="Goal detail: progress ring at the top and the actual-progress + projection chart below."
      />

      <h2 id="money">What happens to your money</h2>
      <p>
        A goal <strong>doesn&apos;t move money on its own</strong>: it&apos;s a guide. You keep assigning to the envelope
        in <Link href="/en/support/budget">Budget</Link> (or let a fixed savings goal remind you of
        the amount). The goal only compares <em>how much you have</em> with <em>how much you need</em> and tells you
        whether you&apos;re on track.
      </p>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if I don't assign the suggested contribution one month?">
          <p>Nothing happens: the goal recalculates. If you fall behind, the suggested contribution for the remaining months goes up so you still get there on time. The projection chart will show you the new estimate.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I spend from the envelope that has a goal?">
          <p>The available amount goes down and so does your progress. That&apos;s normal for spending envelopes; for pure savings, try not to touch it until you reach the goal.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I already reached the goal?">
          <p>The ring reaches 100%. You can spend that money on its purpose, raise the goal or remove it. The envelope keeps working as usual.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

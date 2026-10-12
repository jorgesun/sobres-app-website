import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Flow, FlowBox, FlowArrow, Money, MoneyRow, WhatIf, WhatIfItem } from "../components";

const SLUG = "/en/support/money-flow";

export const metadata: Metadata = { title: "How your money moves" };

export default function MoneyFlow() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="This is the most important page in the whole help center. If you understand this, you understand Sobres. Let's follow your money from the moment it comes in until it's spent."
      />

      <Toc
        items={[
          { id: "diagram", label: "The master diagram" },
          { id: "story", label: "The story of the $10,000" },
          { id: "rules", label: "The 3 rules that explain everything" },
          { id: "two-ways", label: "Two ways to fill an envelope" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="diagram">The master diagram</h2>
      <p>
        Your money always follows the same path. Read it top to bottom: it comes in,
        waits for a job, you assign it to an envelope and it gets spent from there.
      </p>

      <Flow>
        <FlowBox title="1 · Income" sub="you record that you got paid" />
        <FlowArrow />
        <FlowBox title="2 · Account (on budget)" sub="checking · cash · savings" />
        <FlowArrow />
        <FlowBox title="3 · Unassigned" sub="money without a job yet" variant="yellow" />
        <FlowArrow label="you assign" />
        <FlowBox title="4 · Envelopes / categories" sub="Rent · Groceries · Vacation…" variant="accent" />
        <FlowArrow label="you spend" />
        <FlowBox title="5 · Expense" sub="the envelope's «Available» goes down" />
      </Flow>

      <div className="flow-branch">
        <div className="bnote">↳ If you paid with a CREDIT CARD, there&apos;s an extra step:</div>
        <Flow>
          <FlowBox title="Your card's payment envelope" sub="the money from the spending envelope is set aside" variant="accent" />
          <FlowArrow label="when the statement arrives" />
          <FlowBox title="You pay the card" sub="the money was already set aside" />
        </Flow>
      </div>

      <Callout type="tip" title="Read this once and everything clicks">
        <p>
          Money <strong>never appears out of nowhere inside an envelope</strong>. It always comes
          from &quot;Unassigned&quot; (or you move it from another envelope). That&apos;s why the app makes
          you assign before you spend: so you don&apos;t spend money that actually already had
          another purpose.
        </p>
      </Callout>

      <h2 id="story">The story of the $10,000</h2>
      <p>Let&apos;s follow a full month, step by step, with real numbers.</p>

      <Money label="Step 1 — You get paid">
        <p>You record <strong>$10,000</strong> of income in your Checking account. It shows up in <strong>&quot;Unassigned&quot;</strong>, waiting for a job.</p>
        <MoneyRow name="Unassigned" amount="$10,000" sign="pos" />
      </Money>

      <Money label="Step 2 — You assign all of it">
        <p>You go to the <strong>Budget</strong> tab and split it:</p>
        <MoneyRow name="🏠 Rent" amount="$4,000" />
        <MoneyRow name="🛒 Groceries" amount="$3,000" />
        <MoneyRow name="✈️ Vacation" amount="$1,000" />
        <MoneyRow name="🚨 Emergencies" amount="$2,000" />
        <MoneyRow name="Unassigned" amount="$0" sign="pos" />
        <p className="muted">Everything has a job! &quot;Unassigned&quot; = $0.</p>
      </Money>

      <Money label="Step 3 — You spend with debit">
        <p>You go to the grocery store and pay <strong>$800</strong> with your debit card. The <strong>Groceries</strong> envelope goes down:</p>
        <MoneyRow name="🛒 Groceries — before" amount="$3,000" />
        <MoneyRow name="🛒 Groceries — expense" amount="−$800" sign="neg" />
        <MoneyRow name="🛒 Groceries — available" amount="$2,200" sign="pos" />
      </Money>

      <Money label="Step 4 — End of the month: what's left stays">
        <p>You didn&apos;t spend all of Groceries. <strong>$2,200</strong> is left. Next month that envelope <strong>starts at $2,200</strong>, not at zero. The money isn&apos;t lost: it accumulates.</p>
        <MoneyRow name="🛒 Groceries — starts July with" amount="$2,200" sign="pos" />
      </Money>

      <Money label="Step 5 — You buy with a credit card">
        <p>You book a <strong>$1,500</strong> flight with your <strong>credit card</strong>, from the Vacation envelope. Two things happen at once:</p>
        <MoneyRow name="✈️ Vacation — goes down" amount="−$1,500" sign="neg" />
        <MoneyRow name="💳 Card payment — goes up (reserve)" amount="+$1,500" sign="pos" />
        <p className="muted">
          The money left Vacation and was <strong>set aside</strong> in your card&apos;s envelope.
          When the statement arrives, you already have the $1,500 set aside to pay it, no surprises.
        </p>
      </Money>

      <Callout type="good" title="The result">
        <p>
          Your credit card is no longer a source of surprise debt. Every purchase you
          make with it <strong>already comes with its money set aside</strong> to pay it. See the
          full guide on <Link href="/en/support/credit-cards">Credit cards</Link>.
        </p>
      </Callout>

      <h2 id="rules">The 3 rules that explain everything</h2>

      <Callout type="tip" title="Rule 1 · All your money needs a job">
        <p>Assign your money until &quot;Unassigned&quot; is <strong>$0</strong>. Money without a job is money you&apos;ll spend without noticing.</p>
      </Callout>
      <Callout type="tip" title="Rule 2 · Spending moves money, it doesn't create it">
        <p>If an envelope has no funds, you can&apos;t spend from it without taking money from another one. When that happens, you <strong>move money</strong> from an envelope that has some to the one that came up short.</p>
      </Callout>
      <Callout type="tip" title="Rule 3 · What's left stays">
        <p>Each envelope&apos;s available amount <strong>accumulates month to month</strong> (this is called <em>carryover</em>). It&apos;s what makes it possible to save little by little for big things.</p>
      </Callout>

      <h3>The terms, translated</h3>
      <p>There are only four words you need to master. Here they are, with their formula:</p>
      <ul>
        <li><strong>Unassigned</strong> — money you already have but haven&apos;t split up yet. Goal: $0.</li>
        <li><strong>Assigned</strong> — how much you put into an envelope this month.</li>
        <li><strong>Activity</strong> — what came in or went out of the envelope through transactions this month (spending is negative, a refund is positive).</li>
        <li><strong>Available</strong> — what&apos;s really left in the envelope right now:
          <br /><code>Available = Assigned + Activity + what was left last month</code>
        </li>
      </ul>

      <h2 id="two-ways">Two ways to fill an envelope</h2>
      <p>This is where a lot of people get confused. There are two ways for money to get into an envelope:</p>

      <Flow>
        <FlowBox title="The normal path (recommended)" sub="Income → Unassigned → you split it into envelopes" variant="yellow" />
      </Flow>
      <p className="muted">You&apos;ll almost always use this one: income lands in &quot;Unassigned&quot; and you decide where it goes.</p>

      <Flow>
        <FlowBox title="Income straight into an envelope" sub="you record income inside a category" variant="accent" />
      </Flow>
      <p className="muted">
        Sometimes you get a <strong>refund</strong> (you get $200 back from Groceries). You can record that
        income straight into the &quot;Groceries&quot; category: its available goes up without going through
        &quot;Unassigned&quot;. Handy for refunds and returns.
      </p>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if I spend more than what's in an envelope?">
          <p>That envelope&apos;s available amount turns <strong>red</strong> (negative). Nothing serious happens: it just means you owe that envelope money. To fix it, <strong>move money</strong> from another envelope that has some, or assign more to it next month. See <Link href="/en/support/budget">Budget</Link>.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I don't assign everything and leave money «Unassigned»?">
          <p>Nothing breaks: that money simply stays available to assign whenever you want. But while it has no job, it&apos;s money you can spend without a plan. Our recommendation is to assign all of it.</p>
        </WhatIfItem>
        <WhatIfItem q="What if my money is in an investment account?">
          <p>Investment accounts can be marked as <strong>«off budget»</strong>. Their money doesn&apos;t count as &quot;Unassigned&quot; and isn&apos;t split into envelopes, because it isn&apos;t money for everyday spending. See <Link href="/en/support/accounts">Accounts</Link>.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I want to save for something big?">
          <p>Create an envelope for that goal and assign a little to it every month. Since the available amount accumulates, the envelope will keep growing. The app can even calculate how much to put in each month: see <Link href="/en/support/goals">Savings goals</Link>.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

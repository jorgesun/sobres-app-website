import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Steps, Money, MoneyRow, WhatIf, WhatIfItem, Screenshot } from "../components";

const SLUG = "/en/support/budget";

export const metadata: Metadata = { title: "Budget tab" };

export default function Budget() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Budget is the heart of the app: your envelopes live here. It's where you give your money a job, assigning it to each category and moving it when needed."
      />

      <Toc
        items={[
          { id: "purpose", label: "What is it for?" },
          { id: "what-you-see", label: "What you see here" },
          { id: "assign", label: "How to assign money" },
          { id: "move", label: "How to move money between envelopes" },
          { id: "money", label: "What happens to your money" },
          { id: "tips", label: "Tips" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="purpose">What is this screen for?</h2>
      <p>
        This is where you decide <strong>what your money will be used for</strong>. Your categories
        are organized in groups (Fixed Expenses, Variable Expenses, Savings…). Each category is
        an envelope with its own available balance.
      </p>

      <Screenshot
        src="/soporte/presupuesto.png"
        alt="Budget tab: at the top «Unassigned $0.00 · All assigned» and the month; below, the categories by group (Fixed Expenses, Variable Expenses) with their Assigned and Available columns."
        caption="The Budget tab: «Unassigned» at the top and each envelope with its Assigned and Available."
      />

      <h2 id="what-you-see">What you see here</h2>
      <ul>
        <li>At the top, how much you have left <strong>&quot;Unassigned&quot;</strong> for this month.</li>
        <li>A <strong>month</strong> selector to move between months.</li>
        <li>Each category shows three things: <strong>&quot;Assigned&quot;</strong> (what you put in this month), <strong>&quot;Activity&quot;</strong> (what came in or went out) and <strong>&quot;Available&quot;</strong> (what&apos;s really left).</li>
        <li>The available amount shows in <strong>green</strong> if there&apos;s money and in <strong>red</strong> if the envelope went negative.</li>
      </ul>

      <h2 id="assign">How to assign money to an envelope</h2>
      <Steps>
        <li>Find the category and <strong>tap the amount in the &quot;Assigned&quot; column</strong>.</li>
        <li>Type how much you want to put into that envelope this month.</li>
        <li>You can also use <strong>+</strong> or <strong>−</strong> to add to or subtract from what it already had (handy for topping it up without recalculating).</li>
        <li>Repeat until <strong>&quot;Unassigned&quot; reaches $0</strong>.</li>
      </Steps>

      <Callout type="tip" title="Assigning takes from «Unassigned»">
        <p>
          Everything you put into an envelope <strong>comes out of &quot;Unassigned&quot;</strong>. If you assign $3,000 to
          Groceries, your &quot;Unassigned&quot; goes down by $3,000. That&apos;s why the $0 goal means &quot;I&apos;ve split it all up&quot;.
        </p>
      </Callout>

      <h2 id="move">How to move money between envelopes</h2>
      <p>
        When an envelope comes up short, you don&apos;t need new income: you take from another one
        that has extra. That&apos;s <strong>moving money</strong>.
      </p>
      <Steps>
        <li>Open the category you want to <strong>take</strong> money from or <strong>add</strong> money to.</li>
        <li>Choose <strong>Move money</strong>, then pick the source envelope, the destination envelope and the amount.</li>
        <li>Done: one envelope goes down and the other goes up by exactly the same amount.</li>
      </Steps>

      <Money label="Moving money is zero-sum">
        <p>Gas ended at −$120 and Groceries has $450 to spare. You move $120:</p>
        <MoneyRow name="🛒 Groceries" amount="−$120" sign="neg" />
        <MoneyRow name="⛽ Gas" amount="+$120" sign="pos" />
        <p className="muted">Your budget&apos;s total doesn&apos;t change; only the split did. Gas is back to $0 and no longer red.</p>
      </Money>

      <h2 id="money">What happens to your money</h2>
      <ul>
        <li><strong>Assigning</strong>: moves money from &quot;Unassigned&quot; → into the envelope. Its available goes up.</li>
        <li><strong>Removing an assignment</strong> (or using −): returns money from the envelope → to &quot;Unassigned&quot;.</li>
        <li><strong>Moving money</strong>: goes from one envelope → to another, without touching &quot;Unassigned&quot;.</li>
        <li><strong>End of the month</strong>: whatever is left available in each envelope <strong>accumulates</strong> and starts the next month right there.</li>
      </ul>
      <Callout type="good">
        <p>Not sure where the money goes from and to? Review it in <Link href="/en/support/money-flow">How your money moves</Link>.</p>
      </Callout>

      <h2 id="tips">Tips and common mistakes</h2>
      <Callout type="tip">
        <p>Assign to the essentials first (Rent, Utilities, Groceries) and leave savings and treats for last. If there&apos;s money left, you split it up; if you&apos;re short, you already know what to cut.</p>
      </Callout>
      <Callout type="warn">
        <p>Don&apos;t confuse <strong>Assigned</strong> with <strong>Available</strong>. You can assign $0 this month and still have money available, because the envelope carried a balance over from last month.</p>
      </Callout>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if an envelope went red?">
          <p>Move money from another envelope that has some, or assign more to it. While it&apos;s negative, that red reminds you that you spent money you hadn&apos;t backed yet.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I want a new category?">
          <p>You can create categories inside your groups. Note: the automatic <em>System</em> and <em>Credit Cards</em> groups don&apos;t show up as options, because the app manages them on its own.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I over-assign and «Unassigned» goes negative?">
          <p>It means you split up more than you have. Lower what you assigned to some envelope until &quot;Unassigned&quot; is back to $0 or positive.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I want to give an envelope a goal?">
          <p>You can give it a savings goal (by amount, by date, etc.). See <Link href="/en/support/goals">Savings goals</Link>.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, WhatIf, WhatIfItem, Screenshot, ScreenshotRow } from "../components";

const SLUG = "/en/support/reports";

export const metadata: Metadata = { title: "Reports tab" };

export default function Reports() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="Reports shows you the movie, not the snapshot: where you overspend, how your net worth changes and which categories eat up your money."
      />

      <Toc
        items={[
          { id: "purpose", label: "What is it for?" },
          { id: "what-you-see", label: "What you see here" },
          { id: "money", label: "What happens to your money" },
          { id: "tips", label: "Tips" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="purpose">What is this screen for?</h2>
      <p>
        To <strong>understand your patterns</strong>. No money changes here: it&apos;s a read-only
        view that turns your transactions into easy-to-read charts, so you can adjust your
        envelopes next month based on data instead of guesswork.
      </p>

      <ScreenshotRow>
        <Screenshot
          src="/soporte/reportes-mensual.png"
          alt="Reports, Monthly view: «Net worth $58,150» card with its trend, and a «Spending by group» donut chart."
          caption="Monthly view: net worth and spending by group (donut)."
        />
        <Screenshot
          src="/soporte/reportes-tendencias.png"
          alt="Reports, Trends view: bar chart of spending for one category (Groceries) over 6 months, with average, maximum and total."
          caption="Trends view: one category's spending month by month (bars)."
        />
      </ScreenshotRow>

      <h2 id="what-you-see">What you see here</h2>
      <ul>
        <li><strong>Spending trend</strong> — how your spending goes up or down over the months.</li>
        <li><strong>Net worth</strong> — what you have minus what you owe, over time.</li>
        <li><strong>Spending by category</strong> — donut and bar charts that show where your money goes.</li>
        <li><strong>Pareto view</strong> — finds the 20% of categories that take 80% of your spending.</li>
      </ul>

      <Callout type="tip" title="The 80/20 rule">
        <p>
          A few categories almost always explain most of your spending. The Pareto view puts
          them up front so you know <strong>where a small adjustment makes the biggest difference</strong>.
        </p>
      </Callout>

      <h2 id="money">What happens to your money</h2>
      <p>
        Nothing: Reports doesn&apos;t move a cent. It only <strong>reads</strong> the transactions you recorded
        in <Link href="/en/support/accounts">Accounts</Link> and groups them by category and by month. If a
        number surprises you, it&apos;s almost always a miscategorized transaction.
      </p>

      <h2 id="tips">Tips and common mistakes</h2>
      <Callout type="good">
        <p>Spend five minutes at the end of the month looking at your reports before assigning the new month. It&apos;s the habit that improves a budget the most.</p>
      </Callout>
      <Callout type="warn">
        <p>If a category looks huge for no reason, check that a large expense wasn&apos;t entered in the wrong envelope.</p>
      </Callout>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if my net worth comes out negative?">
          <p>It means that today you owe more than you have (for example, a lot of card debt). It&apos;s not an app error: it&apos;s a signal to focus your budget on paying down that debt. The trend matters more than the number on any single day.</p>
        </WhatIfItem>
        <WhatIfItem q="What if a chart is empty?">
          <p>It needs history. With only a few days of use there&apos;s little to chart; it fills up as you record transactions month after month.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

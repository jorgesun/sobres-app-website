import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Toc, PrevNext, Callout, Flow, FlowBox, FlowArrow, Money, MoneyRow, WhatIf, WhatIfItem } from "../components";

const SLUG = "/en/support/credit-cards";

export const metadata: Metadata = { title: "Credit cards" };

export default function CreditCards() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="This is the least intuitive part of the app, and also the most powerful: used well, your credit card never catches you by surprise again. Let's take it slowly."
      />

      <Toc
        items={[
          { id: "own-envelope", label: "Each card has its envelope" },
          { id: "reserve", label: "How the reserve works" },
          { id: "no-funds", label: "When you spend without funds" },
          { id: "pay", label: "Paying the card" },
          { id: "questions", label: "What if…?" },
        ]}
      />

      <h2 id="own-envelope">Each card has its own envelope</h2>
      <p>
        When you add a credit card account, Sobres automatically creates a{" "}
        <strong>&quot;card payment&quot; envelope</strong> for it. You don&apos;t create it and you don&apos;t edit it like the others:
        it&apos;s a <strong>reserve</strong> for paying the card when the statement arrives.
      </p>

      <h2 id="reserve">How the reserve works</h2>
      <p>
        Here&apos;s the key: when you pay with the card <strong>from an envelope that has money</strong>,
        that money doesn&apos;t disappear. It <strong>moves</strong> from the spending envelope to the card&apos;s envelope.
      </p>

      <Flow>
        <FlowBox title="You spend $1,500 with the card" sub="from the «Vacation» envelope" />
        <FlowArrow label="the app sets it aside" />
        <FlowBox title="Vacation goes down $1,500" sub="you spent from that envelope" />
        <FlowArrow />
        <FlowBox title="The card's envelope goes up $1,500" sub="money set aside to pay it" variant="accent" />
      </Flow>

      <Money label="A card purchase that is covered">
        <MoneyRow name="✈️ Vacation — before" amount="$3,000" />
        <MoneyRow name="✈️ Vacation — after" amount="$1,500" sign="pos" />
        <MoneyRow name="💳 Card payment — set aside" amount="$1,500" sign="pos" />
        <p className="muted">When the statement arrives, you already have the $1,500 set aside. Paying the card won&apos;t hurt.</p>
      </Money>

      <Callout type="good" title="Why this changes everything">
        <p>
          Card debt hurts because it arrives <em>later</em>, when you&apos;ve already spent the money. With
          the reserve, you set the payment aside <strong>at the moment you buy</strong>. The card becomes just
          a way to pay, not a source of debt.
        </p>
      </Callout>

      <h2 id="no-funds">When you spend with the card without funds in the envelope</h2>
      <p>
        What happens if you buy with the card from an envelope <strong>that doesn&apos;t have enough</strong>? That
        part becomes <strong>uncovered debt</strong> (overspending): you spent money you hadn&apos;t
        set aside, so the app can&apos;t reserve the payment.
      </p>

      <Money label="An uncovered purchase">
        <MoneyRow name="🛒 Groceries had" amount="$200" />
        <MoneyRow name="Card purchase" amount="−$500" sign="neg" />
        <MoneyRow name="Set aside to pay the card" amount="$200" sign="pos" />
        <MoneyRow name="Uncovered debt" amount="$300" sign="neg" />
      </Money>

      <Callout type="warn" title="How to fix it">
        <p>
          Assign money to that envelope (or <Link href="/en/support/budget">move money</Link> from another one that
          has some) to cover the missing $300. As soon as you do, that debt is covered and the card
          payment is complete again.
        </p>
      </Callout>

      <h2 id="pay">Paying the card</h2>
      <p>
        When you pay the statement, you record it as a <strong>transfer</strong> from your checking
        account to the card (see <Link href="/en/support/accounts">Accounts</Link>). That payment uses the
        money you already had <strong>set aside</strong> in the card&apos;s envelope, so your budget
        stays balanced.
      </p>

      <h2 id="questions">What if…?</h2>
      <WhatIf>
        <WhatIfItem q="What if I don't pay the full balance, just part of it?">
          <p>Record the payment for the amount you paid. Whatever reserve you don&apos;t use stays in the card&apos;s envelope for the next payment. The remaining debt still shows in the account balance.</p>
        </WhatIfItem>
        <WhatIfItem q="What if my card already had debt when I started using Sobres?">
          <p>That&apos;s debt that isn&apos;t covered yet. Set up an envelope/assignment to pay it down little by little; the <Link href="/en/support/goals">Debt payment</Link> goal type is ideal for that.</p>
        </WhatIfItem>
        <WhatIfItem q="What if I get a refund or return on the card?">
          <p>Record it as income in the matching category; adjust the reserve if needed. The logic is the reverse of a purchase: instead of setting money aside, you free it up.</p>
        </WhatIfItem>
        <WhatIfItem q="Why can't I edit the card's envelope like the others?">
          <p>Because the app manages it on its own: its balance is calculated from your purchases, payments and reserves. You control the spending envelopes; the reserve adjusts accordingly.</p>
        </WhatIfItem>
      </WhatIf>

      <PrevNext slug={SLUG} />
    </>
  );
}

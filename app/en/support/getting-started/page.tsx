import type { Metadata } from "next";
import { PageHeader, Toc, PrevNext, Callout, Steps, Flow, FlowBox, FlowArrow, BigCta, Money, MoneyRow } from "../components";

const SLUG = "/en/support/getting-started";

export const metadata: Metadata = { title: "Start here" };

export default function GettingStarted() {
  return (
    <>
      <PageHeader
        slug={SLUG}
        lead="In five minutes you'll understand what the envelope method is and how Sobres works. No jargon: just your money, split into envelopes."
      />

      <Toc
        items={[
          { id: "what-is-it", label: "What is the envelope method?" },
          { id: "cycle", label: "The 4-step cycle" },
          { id: "goal", label: "The only goal that matters" },
          { id: "next", label: "What now?" },
        ]}
      />

      <h2 id="what-is-it">What is the envelope method?</h2>
      <p>
        Imagine you get your paycheck in cash and, before spending anything, you split
        the bills into <strong>labeled paper envelopes</strong>: one for Rent, another for
        Groceries, another for Gas, another for Vacation. When you want to spend on
        something, you take money from the matching envelope. If an envelope runs out,
        that category is done… unless you move money over from another envelope.
      </p>
      <p>
        That&apos;s the envelope method, and it has worked for decades because you can&apos;t
        fool yourself: <strong>you see exactly how much you have left for each thing</strong>.
        Sobres brings that idea to your iPhone, without carrying cash around.
      </p>

      <Callout type="tip" title="The core idea">
        <p>
          <strong>Give your money a job</strong> before you spend it. Instead of looking at
          your bank balance and asking yourself &quot;can I afford this?&quot;, you look at the
          envelope and you already know.
        </p>
      </Callout>

      <h2 id="cycle">The 4-step cycle</h2>
      <p>Using Sobres means repeating this cycle every time money comes in:</p>

      <Steps>
        <li><strong>Add your accounts and balances.</strong> Tell the app how much you have today in your checking account, your cash, your savings. That&apos;s your starting point.</li>
        <li><strong>Record your income.</strong> When you get paid, you write it down. That money lands in your account and shows up as <strong>&quot;Unassigned&quot;</strong>: money waiting for a job.</li>
        <li><strong>Assign all of it to envelopes.</strong> You spread that money across your categories until &quot;Unassigned&quot; reaches $0. All of it now has a destination.</li>
        <li><strong>Spend and record.</strong> When you buy something, you record the transaction and choose which envelope it came from. That envelope&apos;s available amount goes down. That way you always know how much you have left.</li>
      </Steps>

      <Flow>
        <FlowBox title="Income" sub="you record that you got paid" />
        <FlowArrow />
        <FlowBox title="Unassigned" sub="money without a job" variant="yellow" />
        <FlowArrow label="you assign" />
        <FlowBox title="Envelopes" sub="Rent, Groceries, Vacation…" variant="accent" />
        <FlowArrow label="you spend" />
        <FlowBox title="Recorded expense" sub="the envelope's available goes down" />
      </Flow>

      <Money label="A quick example">
        <p>You get paid <strong>$10,000</strong>. You split it like this:</p>
        <MoneyRow name="🏠 Rent" amount="$4,000" />
        <MoneyRow name="🛒 Groceries" amount="$3,000" />
        <MoneyRow name="✈️ Vacation" amount="$1,000" />
        <MoneyRow name="🚨 Emergencies" amount="$2,000" />
        <MoneyRow name="Unassigned" amount="$0" sign="pos" />
        <p className="muted">When &quot;Unassigned&quot; reaches $0, you&apos;re done: all your money has a job.</p>
      </Money>

      <h2 id="goal">The only goal that matters</h2>
      <p>
        It&apos;s not about having a zero balance. It&apos;s about getting <strong>&quot;Unassigned&quot;
        to $0</strong>, because that means you&apos;ve already decided, calmly, what every bit
        of your money will be used for. After that you just follow the plan you made yourself.
      </p>

      <Callout type="good" title="What makes this method special">
        <p>
          Money you don&apos;t spend in an envelope <strong>isn&apos;t lost</strong>: it stays there and
          rolls over to the next month. That&apos;s what we mean when we say the available amount
          &quot;accumulates&quot;. Your Vacation envelope keeps growing month after month until you
          take the trip.
        </p>
      </Callout>

      <h2 id="next">What now?</h2>
      <p>
        You have the map. The next step is understanding <strong>where your money goes</strong>{" "}
        when you tap each button: that&apos;s what will give you complete confidence with the app.
      </p>

      <BigCta
        title="How your money moves"
        sub="The key page. Diagrams, the story of the $10,000 and the 3 rules that explain almost everything."
        href="/en/support/money-flow"
        cta="Continue →"
      />

      <PrevNext slug={SLUG} />
    </>
  );
}

import { describe, it, expect } from "vitest";
import { BudgetEngine } from "@/lib/engine/BudgetEngine";
import { assignMoney, moveMoney, materialize } from "@/lib/data/mutations";
import { startOfMonth, nextMonth } from "@/lib/date/month";
import {
  makeData,
  account,
  group,
  category,
  tx,
  split,
  entry,
  D,
} from "../factory";

const JAN = startOfMonth(new Date(2024, 0, 1));
const FEB = startOfMonth(new Date(2024, 1, 1));

describe("§14 acceptance scenarios", () => {
  it("1. Sobre simple: assign 1000, spend 300 → 700; carries over; TBB reflects 1000", () => {
    const acc = account({ id: "acc-1" });
    const cat = category({ id: "super", name: "Súper", groupID: "g" });
    const data = makeData({
      accounts: [acc],
      groups: [group({ id: "g" })],
      categories: [cat],
      transactions: [
        tx({ accountID: "acc-1", amount: D(1000), date: new Date(2024, 0, 2) }), // income
        tx({
          accountID: "acc-1",
          categoryID: "super",
          amount: D(-300),
          date: new Date(2024, 0, 10),
        }),
      ],
      budgetEntries: [entry({ categoryID: "super", month: JAN, assigned: D(1000) })],
    });
    const e = new BudgetEngine(data);

    expect(e.available(cat, JAN).toNumber()).toBe(700);
    // next month, nothing assigned → carryover keeps 700
    expect(e.available(cat, FEB).toNumber()).toBe(700);
    // TBB January: income 1000 − assigned 1000 = 0
    expect(e.toBeBudgeted(JAN).toNumber()).toBe(0);
  });

  it("2. Sobregasto de efectivo: assign 100, spend 150 → −50; no negative carryover; next TBB −50", () => {
    const acc = account({ id: "acc-1" });
    const cat = category({ id: "rest", name: "Restaurantes", groupID: "g" });
    const data = makeData({
      accounts: [acc],
      groups: [group({ id: "g" })],
      categories: [cat],
      transactions: [
        tx({ accountID: "acc-1", amount: D(1000), date: new Date(2024, 0, 2) }),
        tx({
          accountID: "acc-1",
          categoryID: "rest",
          amount: D(-150),
          date: new Date(2024, 0, 10),
        }),
      ],
      budgetEntries: [entry({ categoryID: "rest", month: JAN, assigned: D(100) })],
    });
    const e = new BudgetEngine(data);

    expect(e.available(cat, JAN).toNumber()).toBe(-50);
    expect(e.availabilityColor(cat, JAN)).toBe("red");
    // negative does NOT carry into the envelope
    expect(e.available(cat, FEB).toNumber()).toBe(0);
    // but TBB(FEB) drops by 50 via realizedCashOverspend (income 1000 − assigned 100 − 50)
    expect(e.toBeBudgeted(FEB).toNumber()).toBe(850);
  });

  it("3. TBB = 0 when fully assigned; < 0 when over-assigned", () => {
    const acc = account({ id: "acc-1" });
    const cat = category({ id: "c", groupID: "g" });
    const data = makeData({
      accounts: [acc],
      groups: [group({ id: "g" })],
      categories: [cat],
      transactions: [
        tx({ accountID: "acc-1", amount: D(1000), date: new Date(2024, 0, 2) }),
      ],
      budgetEntries: [entry({ categoryID: "c", month: JAN, assigned: D(1000) })],
    });
    const e = new BudgetEngine(data);
    expect(e.toBeBudgeted(JAN).toNumber()).toBe(0);

    assignMoney(data, "c", D(1200), JAN);
    e.invalidate();
    expect(e.toBeBudgeted(JAN).toNumber()).toBe(-200);
  });

  it("4. Tarjeta fondeada: Súper 500, charge 500 on card → reserve +500, Súper 0, color green", () => {
    const checking = account({ id: "chk" });
    const card = account({
      id: "card",
      type: "creditCard",
      creditLimit: D(10000),
    });
    const superCat = category({ id: "super", name: "Súper", groupID: "g" });
    const ccCat = category({
      id: "cc",
      name: "Tarjeta",
      groupID: "cc-group",
      creditCardAccountID: "card",
    });
    const data = makeData({
      accounts: [checking, card],
      groups: [group({ id: "g" }), group({ id: "cc-group", name: "Tarjetas de Crédito" })],
      categories: [superCat, ccCat],
      transactions: [
        tx({ accountID: "chk", amount: D(1000), date: new Date(2024, 0, 1) }),
        tx({
          accountID: "card",
          categoryID: "super",
          amount: D(-500),
          date: new Date(2024, 0, 10),
        }),
      ],
      budgetEntries: [entry({ categoryID: "super", month: JAN, assigned: D(500) })],
    });
    const e = new BudgetEngine(data);

    expect(e.available(superCat, JAN).toNumber()).toBe(0);
    expect(e.ccAvailable(ccCat, JAN).toNumber()).toBe(500);
    // debt = 500, reserve = 500 → green
    expect(e.availabilityColor(ccCat, JAN)).toBe("green");
  });

  it("5. Tarjeta subfinanciada: Súper 300, charge 500 → funded 300, unfunded 200, amber", () => {
    const card = account({
      id: "card",
      type: "creditCard",
      creditLimit: D(10000),
    });
    const superCat = category({ id: "super", name: "Súper", groupID: "g" });
    const ccCat = category({
      id: "cc",
      groupID: "cc-group",
      creditCardAccountID: "card",
    });
    const data = makeData({
      accounts: [card],
      groups: [group({ id: "g" }), group({ id: "cc-group", name: "Tarjetas de Crédito" })],
      categories: [superCat, ccCat],
      transactions: [
        tx({
          accountID: "card",
          categoryID: "super",
          amount: D(-500),
          date: new Date(2024, 0, 10),
        }),
      ],
      budgetEntries: [entry({ categoryID: "super", month: JAN, assigned: D(300) })],
    });
    const e = new BudgetEngine(data);

    // reserve only funded by 300
    expect(e.ccAvailable(ccCat, JAN).toNumber()).toBe(300);
    // unfunded CC expenses for the month = 200
    expect(e.calculateUnfundedCCExpenses(card, JAN).toNumber()).toBe(200);
    // debt 500 > reserve 300 → amber
    expect(e.availabilityColor(ccCat, JAN)).toBe("amber");

    // simulate month close writing overspendingAdjust = -200 in FEB
    data.budgetEntries.push(
      entry({ categoryID: "cc", month: FEB, assigned: D(0), overspending: D(-200) }),
    );
    e.invalidate();
    // FEB reserve carries 300 forward then -200 = 100
    expect(e.ccAvailable(ccCat, FEB).toNumber()).toBe(100);
  });

  it("6. Pago de tarjeta: transfer 500 reduces reserve and debt; not counted as spend", () => {
    const checking = account({ id: "chk" });
    const card = account({
      id: "card",
      type: "creditCard",
      creditLimit: D(10000),
    });
    const superCat = category({ id: "super", groupID: "g" });
    const ccCat = category({
      id: "cc",
      groupID: "cc-group",
      creditCardAccountID: "card",
    });
    const data = makeData({
      accounts: [checking, card],
      groups: [group({ id: "g" }), group({ id: "cc-group", name: "Tarjetas de Crédito" })],
      categories: [superCat, ccCat],
      transactions: [
        tx({ accountID: "chk", amount: D(1000), date: new Date(2024, 0, 1) }),
        tx({
          accountID: "card",
          categoryID: "super",
          amount: D(-500),
          date: new Date(2024, 0, 10),
        }),
        // payment: transfer from checking (−500) to card (+500)
        tx({
          accountID: "chk",
          amount: D(-500),
          transferAccountID: "card",
          date: new Date(2024, 0, 20),
        }),
        tx({
          accountID: "card",
          amount: D(500),
          transferAccountID: "chk",
          date: new Date(2024, 0, 20),
        }),
      ],
      budgetEntries: [entry({ categoryID: "super", month: JAN, assigned: D(500) })],
    });
    const e = new BudgetEngine(data);

    // reserve: funded 500 − payment 500 = 0
    expect(e.ccAvailable(ccCat, JAN).toNumber()).toBe(0);
    // card balance: -500 + 500 = 0 → no debt
    expect(e.currentBalance(card).toNumber()).toBe(0);
    // income only the 1000, payment transfer excluded
    expect(e.totalIncomeCumulative(nextMonth(JAN)).toNumber()).toBe(1000);
  });

  it("7. Mover dinero a sobregastado restores it to 0", () => {
    const acc = account({ id: "acc-1" });
    const rest = category({ id: "rest", groupID: "g" });
    const superCat = category({ id: "super", groupID: "g" });
    const data = makeData({
      accounts: [acc],
      groups: [group({ id: "g" })],
      categories: [rest, superCat],
      transactions: [
        tx({ accountID: "acc-1", amount: D(1000), date: new Date(2024, 0, 1) }),
        tx({
          accountID: "acc-1",
          categoryID: "rest",
          amount: D(-150),
          date: new Date(2024, 0, 10),
        }),
      ],
      budgetEntries: [
        entry({ categoryID: "rest", month: JAN, assigned: D(100) }),
        entry({ categoryID: "super", month: JAN, assigned: D(200) }),
      ],
    });
    const e = new BudgetEngine(data);
    expect(e.available(rest, JAN).toNumber()).toBe(-50);

    // move $50 from Súper → Restaurantes
    moveMoney(data, "super", "rest", D(50), JAN);
    e.invalidate();
    expect(e.available(rest, JAN).toNumber()).toBe(0);
    expect(e.available(superCat, JAN).toNumber()).toBe(150);
  });

  it("8. Multimoneda: USD account, spend US$20 at 18.0 → 360 MXN activity; assignment not converted", () => {
    const usd = account({ id: "usd", currencyCode: "USD" });
    const cat = category({ id: "viajes", groupID: "g" });
    const data = makeData({
      accounts: [usd],
      groups: [group({ id: "g" })],
      categories: [cat],
      transactions: [
        tx({
          accountID: "usd",
          categoryID: "viajes",
          amount: D(-20),
          date: new Date(2024, 0, 10),
        }),
      ],
      budgetEntries: [entry({ categoryID: "viajes", month: JAN, assigned: D(400) })],
      usdToMxn: D(18),
    });
    const e = new BudgetEngine(data);

    expect(e.activity("viajes", JAN).toNumber()).toBe(-360);
    // assigned (MXN) is NOT converted: 400 − 360 = 40
    expect(e.available(cat, JAN).toNumber()).toBe(40);
  });

  it("9. Meta mensual: monthlyFunding 1000, assigned 600 → needed 400, fraction 0.6", () => {
    const cat = category({
      id: "ahorro",
      groupID: "g",
      goalType: "monthlyFunding",
      goalAmount: D(1000),
    });
    const data = makeData({
      groups: [group({ id: "g" })],
      categories: [cat],
      budgetEntries: [entry({ categoryID: "ahorro", month: JAN, assigned: D(600) })],
    });
    const e = new BudgetEngine(data);

    const gp = e.goalProgress(cat, JAN)!;
    expect(gp.monthlyNeeded.toNumber()).toBe(400);
    expect(gp.overallFraction).toBeCloseTo(0.6, 5);
    expect(gp.isMet).toBe(false);
  });

  it("10. Pago programado de ingreso materializes a positive tx and adds to assigned (no double count)", () => {
    const acc = account({ id: "acc-1" });
    const cat = category({ id: "sueldo", groupID: "g" });
    const data = makeData({
      accounts: [acc],
      groups: [group({ id: "g" })],
      categories: [cat],
    });
    const payment = {
      id: "pay-1",
      budgetID: "budget-1",
      accountID: "acc-1",
      categoryID: "sueldo",
      name: "Sueldo",
      amount: D(5000),
      frequency: "monthly" as const,
      nextDueDate: new Date(2024, 0, 1),
      isActive: true,
      transactionType: "income" as const,
      createdAt: new Date(2024, 0, 1),
    };
    data.scheduledPayments.push(payment);

    const res = materialize(data, payment, JAN);
    expect(res.ok).toBe(true);
    expect(data.transactions.length).toBe(1);
    expect(data.transactions[0].amount.toNumber()).toBe(5000);

    const e = new BudgetEngine(data);
    // assigned was bumped by 5000
    expect(e.assigned("sueldo", JAN).toNumber()).toBe(5000);
    // activity ignores positives → no spend double count
    expect(e.activity("sueldo", JAN).toNumber()).toBe(0);
    // TBB: income 5000 − assigned 5000 = 0
    expect(e.toBeBudgeted(JAN).toNumber()).toBe(0);
  });
});

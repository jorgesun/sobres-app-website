"use client";

import { useMemo, useState } from "react";
import Decimal from "decimal.js";
import { useStore } from "@/lib/data/store";
import { Money } from "@/components/money";
import { formatMoney, convertToMXN, ZERO } from "@/lib/money/decimal";
import { NewAccountModal } from "@/components/accounts/NewAccountModal";
import { NewTransactionModal } from "@/components/accounts/NewTransactionModal";
import type { Account, AccountType } from "@/lib/db/schema";

const TYPE_LABELS: Record<AccountType, string> = {
  checkings: "Cheques / Nómina",
  savings: "Ahorro",
  creditCard: "Tarjetas de Crédito",
  cash: "Efectivo",
  investment: "Inversión",
};
const TYPE_ORDER: AccountType[] = [
  "checkings",
  "savings",
  "cash",
  "creditCard",
  "investment",
];

export default function AccountsPage() {
  const { engine } = useStore();
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const out: Record<string, Account[]> = {};
    for (const a of engine?.raw.accounts ?? []) {
      if (a.isClosed) continue;
      (out[a.type] ??= []).push(a);
    }
    return out;
  }, [engine]);

  if (!engine) return null;

  const mxn = (a: Account) =>
    convertToMXN(engine.currentBalance(a), a.currencyCode, engine.raw.usdToMxn);
  const grand = (engine.raw.accounts ?? [])
    .filter((a) => !a.isClosed)
    .reduce((acc, a) => acc.plus(mxn(a)), ZERO);

  if (selected) {
    const acc = engine.raw.accounts.find((a) => a.id === selected);
    if (acc) return <AccountDetail account={acc} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-title font-bold text-ink">Cuentas</h1>
        <button
          onClick={() => setShowNew(true)}
          className="rounded-pill bg-blue px-4 py-2 text-sub font-semibold text-white"
        >
          + Nueva cuenta
        </button>
      </div>

      <div className="rounded-card bg-gradient-to-br from-deep2 to-deep p-6 text-white">
        <div className="text-sub text-white/70">Patrimonio neto (MXN)</div>
        <div className="text-balance font-bold">{formatMoney(grand)}</div>
      </div>

      {TYPE_ORDER.filter((t) => grouped[t]?.length).map((type) => {
        const list = grouped[type];
        const subtotal = list.reduce((acc, a) => acc.plus(mxn(a)), ZERO);
        return (
          <div key={type} className="overflow-hidden rounded-card border border-line">
            <div className="flex items-center justify-between bg-band px-4 py-2.5">
              <span className="text-label font-semibold uppercase tracking-wide text-muted">
                {TYPE_LABELS[type]}
              </span>
              <Money value={subtotal} className="text-label font-semibold text-muted" />
            </div>
            <ul className="divide-y divide-line">
              {list.map((a) => {
                const bal = engine.currentBalance(a);
                return (
                  <li key={a.id}>
                    <button
                      onClick={() => setSelected(a.id)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-field"
                    >
                      <div>
                        <div className="text-body text-ink">{a.name}</div>
                        <div className="text-label text-faint">
                          {a.institution ?? TYPE_LABELS[a.type]}
                          {a.currencyCode === "USD" ? " · USD" : ""}
                        </div>
                      </div>
                      <Money
                        value={bal}
                        className={`font-semibold ${
                          bal.isNegative() ? "text-[#E5484D]" : "text-ink"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {(engine.raw.accounts ?? []).filter((a) => !a.isClosed).length === 0 && (
        <p className="py-12 text-center text-muted">
          No tienes cuentas todavía. Crea la primera.
        </p>
      )}

      {showNew && <NewAccountModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

function AccountDetail({
  account,
  onBack,
}: {
  account: Account;
  onBack: () => void;
}) {
  const { engine } = useStore();
  const [showTx, setShowTx] = useState(false);

  const txs = useMemo(
    () =>
      (engine?.raw.transactions ?? [])
        .filter((t) => t.accountID === account.id)
        .sort((a, b) => b.date.getTime() - a.date.getTime()),
    [engine, account.id],
  );
  if (!engine) return null;

  const balance = engine.currentBalance(account);
  const catName = (id: string | null) =>
    id ? engine.raw.categories.find((c) => c.id === id)?.name ?? "—" : null;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sub text-blue">
        ‹ Cuentas
      </button>

      <div className="rounded-card bg-gradient-to-br from-deep2 to-deep p-6 text-white">
        <div className="text-sub text-white/70">{account.name}</div>
        <div className="text-balance font-bold">{formatMoney(balance)}</div>
        {account.creditLimit && (
          <div className="mt-1 text-label text-white/60">
            Crédito disponible:{" "}
            {formatMoney(engine.availableCredit(account) ?? new Decimal(0))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-title font-bold text-ink">Movimientos</h2>
        <button
          onClick={() => setShowTx(true)}
          className="rounded-pill bg-blue px-4 py-2 text-sub font-semibold text-white"
        >
          + Transacción
        </button>
      </div>

      <div className="overflow-hidden rounded-card border border-line">
        {txs.length === 0 ? (
          <p className="px-4 py-8 text-center text-muted">Sin movimientos.</p>
        ) : (
          <ul className="divide-y divide-line">
            {txs.map((t) => (
              <li key={t.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="flex items-center gap-2 text-body text-ink">
                    {t.payee ?? "(sin beneficiario)"}
                    {t.transferAccountID && (
                      <span className="rounded-pill bg-blueSoft px-2 py-0.5 text-[11px] text-blue">
                        Transferencia
                      </span>
                    )}
                    {t.isReconciled ? (
                      <span className="text-[11px] text-green">✓✓</span>
                    ) : t.isCleared ? (
                      <span className="text-[11px] text-muted">✓</span>
                    ) : null}
                  </div>
                  <div className="text-label text-faint">
                    {t.date.toLocaleDateString("es-MX")}
                    {catName(t.categoryID) ? ` · ${catName(t.categoryID)}` : ""}
                  </div>
                </div>
                <Money
                  value={t.amount}
                  className={`font-semibold ${
                    t.amount.isNegative() ? "text-ink" : "text-green"
                  }`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {showTx && (
        <NewTransactionModal accountID={account.id} onClose={() => setShowTx(false)} />
      )}
    </div>
  );
}

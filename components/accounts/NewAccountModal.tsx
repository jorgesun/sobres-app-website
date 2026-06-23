"use client";

import { useState } from "react";
import Decimal from "decimal.js";
import { useStore } from "@/lib/data/store";
import type { AccountType } from "@/lib/db/schema";

const TYPES: { value: AccountType; label: string }[] = [
  { value: "checkings", label: "Cheques/Nómina" },
  { value: "savings", label: "Ahorro" },
  { value: "creditCard", label: "Tarjeta de Crédito" },
  { value: "cash", label: "Efectivo" },
  { value: "investment", label: "Inversión" },
];

export function NewAccountModal({ onClose }: { onClose: () => void }) {
  const { addAccount } = useStore();
  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType>("checkings");
  const [institution, setInstitution] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState<"MXN" | "USD">("MXN");
  const [creditLimit, setCreditLimit] = useState("");
  const [onBudget, setOnBudget] = useState(true);
  const [saving, setSaving] = useState(false);

  const isCard = type === "creditCard";

  async function submit() {
    if (!name.trim() || saving) return;
    setSaving(true);
    await addAccount({
      name: name.trim(),
      type,
      institution: institution.trim() || undefined,
      initialBalance: new Decimal(balance || "0"),
      isOnBudget: type === "investment" ? false : onBudget,
      currencyCode: currency,
      creditLimit: isCard && creditLimit ? new Decimal(creditLimit) : null,
    });
    onClose();
  }

  return (
    <Overlay onClose={onClose} title="Nueva cuenta">
      <Field label="Nombre">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Ej. BBVA Nómina"
        />
      </Field>
      <Field label="Tipo">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as AccountType)}
          className={inputCls}
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Institución (opcional)">
        <input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className={inputCls}
        />
      </Field>
      <div className="flex gap-3">
        <Field label="Saldo inicial" className="flex-1">
          <input
            type="number"
            inputMode="decimal"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className={inputCls}
            placeholder="0.00"
          />
        </Field>
        <Field label="Moneda" className="w-28">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "MXN" | "USD")}
            className={inputCls}
          >
            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>
        </Field>
      </div>
      {isCard && (
        <Field label="Límite de crédito">
          <input
            type="number"
            inputMode="decimal"
            value={creditLimit}
            onChange={(e) => setCreditLimit(e.target.value)}
            className={inputCls}
            placeholder="0.00"
          />
        </Field>
      )}
      {type !== "investment" && (
        <label className="flex items-center gap-2 text-sub text-ink">
          <input
            type="checkbox"
            checked={onBudget}
            onChange={(e) => setOnBudget(e.target.checked)}
          />
          Incluir en el presupuesto
        </label>
      )}
      <button
        onClick={submit}
        disabled={!name.trim() || saving}
        className="mt-2 w-full rounded-button bg-blue py-3 text-button text-white disabled:opacity-40"
      >
        Crear cuenta
      </button>
    </Overlay>
  );
}

export const inputCls =
  "w-full rounded-field border border-line bg-white px-3 py-2 text-input outline-none focus:border-blue";

export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-label text-muted">{label}</label>
      {children}
    </div>
  );
}

export function Overlay({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-md space-y-3 overflow-y-auto rounded-t-card bg-white p-6 sm:rounded-card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-title font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="text-2xl text-muted">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

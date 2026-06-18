"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";

export interface CalculatorLabels {
  homePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  monthlyPayment: string;
  principalInterest: string;
  loanAmount: string;
  disclaimer: string;
}

const fieldClass =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-bronze focus:outline-none tabular-nums";

export function MortgageCalculator({ labels }: { labels: CalculatorLabels }) {
  const [price, setPrice] = useState(1280000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const { loanAmount, monthly } = useMemo(() => {
    const loan = Math.max(0, price * (1 - downPct / 100));
    const r = rate / 100 / 12;
    const n = years * 12;
    const m =
      r === 0 ? loan / n : (loan * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    return { loanAmount: loan, monthly: Number.isFinite(m) ? m : 0 };
  }, [price, downPct, rate, years]);

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
      <div className="space-y-5">
        <Field label={`${labels.homePrice}`}>
          <input
            type="number"
            min={0}
            step={10000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className={fieldClass}
          />
        </Field>
        <Field label={`${labels.downPayment} — ${downPct}% (${formatPrice((price * downPct) / 100)})`}>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full accent-bronze"
          />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label={`${labels.interestRate} — ${rate}%`}>
            <input
              type="range"
              min={1}
              max={12}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-bronze"
            />
          </Field>
          <Field label={labels.loanTerm}>
            <select
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className={fieldClass}
            >
              {[30, 20, 15, 10].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-sm border border-line bg-surface p-8 text-center">
        <p className="eyebrow">{labels.monthlyPayment}</p>
        <p className="mt-3 font-serif text-5xl tabular-nums text-ink">
          {formatPrice(Math.round(monthly))}
        </p>
        <p className="mt-1 text-sm text-muted">{labels.principalInterest}</p>
        <div className="mt-6 border-t border-line pt-4 text-sm text-muted">
          {labels.loanAmount}:{" "}
          <span className="tabular-nums text-ink">{formatPrice(Math.round(loanAmount))}</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}

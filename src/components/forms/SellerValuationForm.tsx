"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { submitInquiry, type InquiryActionState } from "@/app/inquiry-actions";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/locale";

const inputClass =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";
const labelClass = "mb-2 block text-xs font-medium text-ink";

interface SelectOption {
  value: string;
  label: string;
}

export interface SellerValuationFormLabels {
  propertyAddress: string;
  addressPlaceholder: string;
  propertyType: string;
  propertyTypePlaceholder: string;
  propertyTypes: SelectOption[];
  bedrooms: string;
  bedroomsPlaceholder: string;
  bedroomOptions: SelectOption[];
  timeline: string;
  timelinePlaceholder: string;
  timelineOptions: SelectOption[];
  name: string;
  phone: string;
  email: string;
  notes: string;
  notesPlaceholder: string;
  consent: string;
  submit: string;
  sending: string;
  thanksTitle: string;
  thanksBody: string;
}

export function SellerValuationForm({
  labels,
  locale,
}: {
  labels: SellerValuationFormLabels;
  locale: Locale;
}) {
  const pathname = usePathname();
  const [state, formAction, pending] = useActionState<InquiryActionState | null, FormData>(
    submitInquiry,
    null,
  );

  if (state?.ok) {
    return (
      <div className="flex min-h-80 flex-col justify-center" role="status">
        <p className="font-serif text-3xl leading-tight text-ink">{labels.thanksTitle}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {labels.thanksBody}
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" action={formAction}>
      <input type="hidden" name="source" value="sell-valuation" />
      <input type="hidden" name="page_path" value={pathname} />
      <input type="hidden" name="form_locale" value={locale} />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="valuation-address" className={labelClass}>
          {labels.propertyAddress}
        </label>
        <input
          id="valuation-address"
          name="property_address"
          required
          placeholder={labels.addressPlaceholder}
          autoComplete="street-address"
          className={inputClass}
          aria-invalid={Boolean(state?.fieldErrors?.propertyAddress)}
          aria-describedby={
            state?.fieldErrors?.propertyAddress ? "valuation-address-error" : undefined
          }
        />
        {state?.fieldErrors?.propertyAddress && (
          <p id="valuation-address-error" className="mt-1.5 text-xs text-bronze-dark">
            {state.fieldErrors.propertyAddress}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="valuation-property-type" className={labelClass}>
            {labels.propertyType}
          </label>
          <select
            id="valuation-property-type"
            name="property_type"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {labels.propertyTypePlaceholder}
            </option>
            {labels.propertyTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="valuation-bedrooms" className={labelClass}>
            {labels.bedrooms}
          </label>
          <select
            id="valuation-bedrooms"
            name="bedrooms"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {labels.bedroomsPlaceholder}
            </option>
            {labels.bedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="valuation-timeline" className={labelClass}>
          {labels.timeline}
        </label>
        <select
          id="valuation-timeline"
          name="selling_timeline"
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            {labels.timelinePlaceholder}
          </option>
          {labels.timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="valuation-name" className={labelClass}>
            {labels.name}
          </label>
          <input
            id="valuation-name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(state?.fieldErrors?.name)}
            aria-describedby={state?.fieldErrors?.name ? "valuation-name-error" : undefined}
          />
          {state?.fieldErrors?.name && (
            <p id="valuation-name-error" className="mt-1.5 text-xs text-bronze-dark">
              {state.fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="valuation-phone" className={labelClass}>
            {labels.phone}
          </label>
          <input
            id="valuation-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="valuation-email" className={labelClass}>
          {labels.email}
        </label>
        <input
          id="valuation-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          aria-invalid={Boolean(state?.fieldErrors?.email)}
          aria-describedby={state?.fieldErrors?.email ? "valuation-email-error" : undefined}
        />
        {state?.fieldErrors?.email && (
          <p id="valuation-email-error" className="mt-1.5 text-xs text-bronze-dark">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="valuation-notes" className={labelClass}>
          {labels.notes}
        </label>
        <textarea
          id="valuation-notes"
          name="message"
          rows={3}
          placeholder={labels.notesPlaceholder}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-bronze"
          aria-invalid={Boolean(state?.fieldErrors?.consent)}
          aria-describedby={
            state?.fieldErrors?.consent ? "valuation-consent-error" : undefined
          }
        />
        <span>{labels.consent}</span>
      </label>
      {state?.fieldErrors?.consent && (
        <p id="valuation-consent-error" className="text-xs text-bronze-dark">
          {state.fieldErrors.consent}
        </p>
      )}

      {state?.error && (
        <p className="text-sm text-bronze-dark" role="alert">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-bronze hover:bg-bronze-dark"
      >
        {pending ? labels.sending : labels.submit}
      </Button>
    </form>
  );
}

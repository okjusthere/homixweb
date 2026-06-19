"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { submitInquiry, type InquiryActionState } from "@/app/inquiry-actions";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";

export interface InquiryLabels {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: string;
  submit: string;
  thanksTitle: string;
  thanksBody: string;
}

const DEFAULT_LABELS: InquiryLabels = {
  name: "Full name",
  phone: "Phone",
  email: "Email",
  message: "How can we help?",
  consent:
    "I agree to be contacted by Homix by phone, text, or email about my inquiry. Consent is not a condition of any service. Message and data rates may apply; reply STOP to opt out.",
  submit: "Send inquiry",
  thanksTitle: "Thank you.",
  thanksBody: "We've received your note and will be in touch shortly.",
};

/**
 * Lead capture form backed by a server action. TCPA: consent is unchecked by
 * default and is NOT a condition of any service.
 */
export function InquiryForm({
  labels = DEFAULT_LABELS,
  source = "website",
}: {
  labels?: InquiryLabels;
  source?: string;
}) {
  const pathname = usePathname();
  const [state, formAction, pending] = useActionState<InquiryActionState | null, FormData>(
    submitInquiry,
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-sm border border-line bg-surface p-8 text-center">
        <p className="font-serif text-2xl text-ink">{labels.thanksTitle}</p>
        <p className="mt-2 text-sm text-muted">{state.message || labels.thanksBody}</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" action={formAction}>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="page_path" value={pathname} />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder={labels.name}
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(state?.fieldErrors?.name)}
          />
          {state?.fieldErrors?.name && (
            <p className="mt-1.5 text-xs text-bronze-dark">{state.fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            {labels.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={labels.phone}
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={labels.email}
          autoComplete="email"
          className={inputClass}
          aria-invalid={Boolean(state?.fieldErrors?.email)}
        />
        {state?.fieldErrors?.email && (
          <p className="mt-1.5 text-xs text-bronze-dark">{state.fieldErrors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={labels.message}
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
        />
        <span>{labels.consent}</span>
      </label>
      {state?.fieldErrors?.consent && (
        <p className="text-xs text-bronze-dark">{state.fieldErrors.consent}</p>
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
        {pending ? "Sending..." : labels.submit}
      </Button>
    </form>
  );
}

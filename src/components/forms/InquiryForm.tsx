"use client";

import { useState } from "react";
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
 * Lead capture form. Client-side only for now — wire the submit handler to your
 * CRM / email / serverless route later. TCPA: consent is unchecked by default
 * and is NOT a condition of any service.
 */
export function InquiryForm({ labels = DEFAULT_LABELS }: { labels?: InquiryLabels }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-sm border border-line bg-surface p-8 text-center">
        <p className="font-serif text-2xl text-ink">{labels.thanksTitle}</p>
        <p className="mt-2 text-sm text-muted">{labels.thanksBody}</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: POST to /api/inquiry or your CRM. Keep timestamped consent.
        setSubmitted(true);
      }}
    >
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
          />
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
        />
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
        />
        <span>{labels.consent}</span>
      </label>

      <Button type="submit" className="w-full bg-bronze hover:bg-bronze-dark">
        {labels.submit}
      </Button>
    </form>
  );
}

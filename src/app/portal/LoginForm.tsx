"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { portalLoginAction, type PortalActionState } from "./actions";

const input =
  "mt-2 w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";

export function LoginForm({
  labels,
}: {
  labels: {
    name: string;
    password: string;
    signIn: string;
    signingIn: string;
    wrong: string;
  };
}) {
  const [state, action, pending] = useActionState<PortalActionState | null, FormData>(
    portalLoginAction,
    null,
  );
  return (
    <form action={action} className="mx-auto max-w-sm space-y-4 text-left">
      <div>
        <label htmlFor="name" className="block text-sm text-muted">
          {labels.name}
        </label>
        <input id="name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-muted">
          {labels.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={input}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? labels.signingIn : labels.signIn}
      </Button>
      {state?.error && <p className="text-sm text-bronze-dark">{labels.wrong}</p>}
    </form>
  );
}

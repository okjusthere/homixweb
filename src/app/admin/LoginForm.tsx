"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { loginAction, type ActionState } from "./actions";

const input =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState | null, FormData>(
    loginAction,
    null,
  );
  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-4">
      <label htmlFor="password" className="block text-sm text-muted">
        Admin password / 管理密码
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className={input}
      />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in / 登录"}
      </Button>
      {state?.error && <p className="text-sm text-bronze-dark">{state.error}</p>}
    </form>
  );
}

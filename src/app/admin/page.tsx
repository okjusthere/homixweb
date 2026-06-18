import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { getOrigin } from "@/lib/site-url";
import { Dashboard, type AdminAgent } from "./Dashboard";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function notice(title: string, body: string) {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <Eyebrow>Homix Admin</Eyebrow>
      <h1 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-lg text-muted">{body}</p>
    </Container>
  );
}

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return notice(
      "Connect Supabase first.",
      "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then run supabase/schema.sql and the migrate endpoint.",
    );
  }
  if (!isAdminConfigured()) {
    return notice(
      "Set an admin password.",
      "Add an ADMIN_PASSWORD environment variable (your team's login password), then reload.",
    );
  }

  if (!(await isAdmin())) {
    return (
      <Container className="flex min-h-[60vh] flex-col justify-center py-24">
        <div className="mx-auto w-full max-w-sm text-center">
          <Eyebrow>Homix Admin</Eyebrow>
          <h1 className="mt-4 font-serif text-3xl text-ink">Sign in</h1>
          <div className="mt-8 text-left">
            <LoginForm />
          </div>
        </div>
      </Container>
    );
  }

  const sb = getSupabase()!;
  const { data } = await sb
    .from("agents")
    .select("id, name, slug, visible, edit_token")
    .order("sort", { ascending: true });

  const base = await getOrigin();
  const agents: AdminAgent[] = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    visible: r.visible ?? true,
    editUrl: `${base}/edit/${r.edit_token}`,
  }));

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Homix Admin</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          Advisors
        </h1>
        <p className="mt-4 text-muted">
          Add advisors and copy their private edit links. Each advisor fills in
          their own photo and details.
        </p>
        <div className="mt-10">
          <Dashboard agents={agents} />
        </div>
      </div>
    </Container>
  );
}

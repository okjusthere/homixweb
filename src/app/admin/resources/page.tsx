import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { AdminNav } from "../AdminNav";
import { ResourceManager, type AdminResource } from "./ResourceManager";

export const metadata: Metadata = {
  title: "Resources",
  robots: { index: false, follow: false },
};

export default async function AdminResourcesPage() {
  if (!isSupabaseConfigured() || !isAdminConfigured() || !(await isAdmin())) {
    redirect("/admin");
  }

  const sb = getSupabase()!;
  const { data } = await sb
    .from("resources")
    .select("id, title, category, url, visible")
    .order("sort", { ascending: true })
    .order("title", { ascending: true });

  const resources: AdminResource[] = (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category ?? "Resources",
    url: r.url,
    visible: r.visible ?? true,
  }));

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AdminNav active="resources" />
        <Eyebrow>Homix Admin</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          Resource library
        </h1>
        <p className="mt-4 text-muted">
          These appear in the agent portal at <code>/portal/resources</code>, behind
          login.
        </p>
        <div className="mt-10">
          <ResourceManager resources={resources} />
        </div>
      </div>
    </Container>
  );
}

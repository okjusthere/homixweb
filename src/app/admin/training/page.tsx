import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { AdminNav } from "../AdminNav";
import { TrainingManager, type AdminVideo } from "./TrainingManager";

export const metadata: Metadata = {
  title: "Training",
  robots: { index: false, follow: false },
};

export default async function AdminTrainingPage() {
  if (!isSupabaseConfigured() || !isAdminConfigured() || !(await isAdmin())) {
    redirect("/admin");
  }

  const sb = getSupabase()!;
  const { data } = await sb
    .from("training_videos")
    .select("id, title, category, cloudflare_uid, duration, visible")
    .order("sort", { ascending: true })
    .order("title", { ascending: true });

  const videos: AdminVideo[] = (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category ?? "Training",
    cloudflareUid: r.cloudflare_uid ?? "",
    duration: r.duration ?? "",
    visible: r.visible ?? true,
  }));

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AdminNav active="training" />
        <Eyebrow>Homix Admin</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          Training videos
        </h1>
        <p className="mt-4 text-muted">
          These appear in the agent portal at <code>/portal/training</code>, behind
          login.
        </p>
        <div className="mt-10">
          <TrainingManager videos={videos} />
        </div>
      </div>
    </Container>
  );
}

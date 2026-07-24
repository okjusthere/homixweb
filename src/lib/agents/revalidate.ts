import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";

export function revalidatePublicAgents(slug?: string) {
  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/agents/${slug}`);
    revalidatePath(`/zh/agents/${slug}`);
  }
}

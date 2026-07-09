import { permanentRedirect } from "next/navigation";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

export default async function LegacyJournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  permanentRedirect(localizePath(await getRouteLocale(params), "/guides/articles"));
}

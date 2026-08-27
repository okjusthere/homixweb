import { permanentRedirect } from "next/navigation";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

export default async function LegacyPaymentOptionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  permanentRedirect(localizePath(locale, "/flexible-payment-homes"));
}

"use server";

import { cookies, headers } from "next/headers";
import { sendInquiryEmail, type InquiryEmailData } from "@/lib/inquiry-email";
import { getSupabase } from "@/lib/supabase";

export interface InquiryActionState {
  ok: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<
    Record<"propertyAddress" | "name" | "email" | "consent", string>
  >;
}

const SUCCESS_MESSAGE = "Thank you. We received your inquiry and will be in touch shortly.";
const PROPERTY_TYPES: Record<string, { en: string; zh: string }> = {
  "single-family": { en: "Single-family home", zh: "独栋住宅" },
  condo: { en: "Condo", zh: "Condo 公寓" },
  coop: { en: "Co-op", zh: "Co-op 合作公寓" },
  multifamily: { en: "Multi-family home", zh: "多家庭住宅" },
  townhouse: { en: "Townhouse", zh: "联排住宅" },
  other: { en: "Other", zh: "其他" },
};
const BEDROOMS: Record<string, { en: string; zh: string }> = {
  studio: { en: "Studio", zh: "Studio" },
  "1": { en: "1 bedroom", zh: "1 卧" },
  "2": { en: "2 bedrooms", zh: "2 卧" },
  "3": { en: "3 bedrooms", zh: "3 卧" },
  "4": { en: "4 bedrooms", zh: "4 卧" },
  "5-plus": { en: "5+ bedrooms", zh: "5 卧以上" },
};
const SELLING_TIMELINES: Record<string, { en: string; zh: string }> = {
  now: { en: "As soon as possible", zh: "尽快出售" },
  "0-3": { en: "Within 3 months", zh: "3 个月内" },
  "3-6": { en: "Within 3-6 months", zh: "3-6 个月内" },
  "6-plus": { en: "More than 6 months", zh: "6 个月以后" },
  curious: { en: "Just exploring", zh: "先了解市场" },
};

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMessage(value: FormDataEntryValue | null): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, 2000);
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function clientIp(h: Headers): string {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "";
}

function selectedLabel(
  options: Record<string, { en: string; zh: string }>,
  value: FormDataEntryValue | null,
  locale: "en" | "zh",
): string {
  return options[clean(value, 40)]?.[locale] ?? "";
}

export async function submitInquiry(
  _prev: InquiryActionState | null,
  formData: FormData,
): Promise<InquiryActionState> {
  const honeypot = clean(formData.get("company"), 120);
  if (honeypot) return { ok: true, message: SUCCESS_MESSAGE };

  const store = await cookies();
  const submittedLocale = clean(formData.get("form_locale"), 5);
  const locale =
    submittedLocale === "zh"
      ? "zh"
      : submittedLocale === "en"
        ? "en"
        : store.get("locale")?.value === "zh"
          ? "zh"
          : "en";
  const name = clean(formData.get("name"), 120);
  const phone = clean(formData.get("phone"), 40);
  const email = clean(formData.get("email"), 254).toLowerCase();
  const notes = cleanMessage(formData.get("message"));
  const source = clean(formData.get("source"), 80) || "website";
  const pagePath = clean(formData.get("page_path"), 300);
  const consent = formData.get("consent") === "on";
  const isSellerValuation = source === "sell-valuation";
  const propertyAddress = clean(formData.get("property_address"), 300);
  const propertyType = selectedLabel(PROPERTY_TYPES, formData.get("property_type"), locale);
  const bedrooms = selectedLabel(BEDROOMS, formData.get("bedrooms"), locale);
  const sellingTimeline = selectedLabel(
    SELLING_TIMELINES,
    formData.get("selling_timeline"),
    locale,
  );

  const fieldErrors: InquiryActionState["fieldErrors"] = {};
  if (isSellerValuation && !propertyAddress) {
    fieldErrors.propertyAddress =
      locale === "zh" ? "请输入房屋地址。" : "Please enter the property address.";
  }
  if (!name) fieldErrors.name = locale === "zh" ? "请输入姓名。" : "Please enter your name.";
  if (!validEmail(email)) {
    fieldErrors.email =
      locale === "zh" ? "请输入有效的电子邮箱。" : "Please enter a valid email.";
  }
  if (!consent) {
    fieldErrors.consent =
      locale === "zh" ? "请确认同意后再提交。" : "Please confirm consent before submitting.";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: locale === "zh" ? "请检查标出的字段。" : "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const message = isSellerValuation
    ? cleanMessage(
        [
          `${locale === "zh" ? "房屋地址" : "Property address"}: ${propertyAddress}`,
          `${locale === "zh" ? "房屋类型" : "Property type"}: ${propertyType || "-"}`,
          `${locale === "zh" ? "卧室数量" : "Bedrooms"}: ${bedrooms || "-"}`,
          `${locale === "zh" ? "出售计划" : "Selling timeline"}: ${sellingTimeline || "-"}`,
          "",
          `${locale === "zh" ? "补充说明" : "Additional notes"}:`,
          notes || "-",
        ].join("\n"),
      )
    : notes;
  const h = await headers();
  const metadata = {
    ip_address: clientIp(h) || null,
    user_agent: h.get("user-agent") || null,
    referrer: h.get("referer") || null,
  };

  const emailData: InquiryEmailData = {
    name,
    phone,
    email,
    message,
    source,
    pagePath,
    locale,
  };

  const sb = getSupabase();
  let inquiryId: string | null = null;
  let stored = false;

  if (sb) {
    const { data, error } = await sb
      .from("inquiries")
      .insert({
        name,
        phone: phone || null,
        email,
        message: message || null,
        consent,
        source,
        page_path: pagePath || null,
        locale,
        status: "received",
        ...metadata,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Inquiry insert failed:", error.message);
    } else {
      stored = true;
      inquiryId = data?.id ?? null;
    }
  }

  const emailResult = await sendInquiryEmail(emailData);
  if (!emailResult.sent) {
    console.error("Inquiry email failed:", emailResult.error);
  }

  if (sb && inquiryId) {
    await sb
      .from("inquiries")
      .update({
        status: emailResult.sent
          ? "emailed"
          : emailResult.skipped
            ? "stored_email_not_configured"
            : "stored_email_failed",
        email_sent_at: emailResult.sent ? new Date().toISOString() : null,
        email_error: emailResult.sent ? null : emailResult.error,
      })
      .eq("id", inquiryId);
  }

  if (!stored && !emailResult.sent) {
    return {
      ok: false,
      error:
        "We could not send your inquiry right now. Please call or email Homix directly.",
    };
  }

  return {
    ok: true,
    message:
      isSellerValuation && locale === "zh"
        ? "我们已收到估值申请，Homix 顾问将在一个工作日内与你联系。"
        : isSellerValuation
          ? "We received your valuation request. A Homix advisor will contact you within one business day."
          : SUCCESS_MESSAGE,
  };
}

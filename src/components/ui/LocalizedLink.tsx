"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { localeFromPathname, localizePath } from "@/lib/locale";

type Props = ComponentProps<typeof NextLink>;

/** Keeps internal navigation inside the current public language URL tree. */
export default function LocalizedLink({ href, ...props }: Props) {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const localizedHref = typeof href === "string" ? localizePath(locale, href) : href;

  return <NextLink href={localizedHref} {...props} />;
}

"use client";

import Image from "next/image";
import { useEffect } from "react";

export function ShareRedirect({
  target,
  name,
  photoUrl,
  locale,
}: {
  target: string;
  name: string;
  photoUrl: string;
  locale: "en" | "zh";
}) {
  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  const zh = locale === "zh";

  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-3xl items-center px-6 py-16 sm:px-10">
      <div className="flex w-full flex-col items-center text-center">
        <Image
          src={photoUrl}
          alt={name}
          width={112}
          height={112}
          priority
          className="h-28 w-28 rounded-full border border-line object-cover"
        />
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-bronze">
          Homix Realty
        </p>
        <h1 className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl">
          {zh ? `${name} 为你分享` : `Shared with you by ${name}`}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {zh ? "正在打开分享内容…" : "Opening the shared page…"}
        </p>
        <a
          href={target}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-sm bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink/85"
        >
          {zh ? "继续查看" : "Continue"}
        </a>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAgentByToken } from "@/lib/agents";
import { isSupabaseConfigured } from "@/lib/supabase";
import { EditForm } from "./EditForm";

export const metadata: Metadata = {
  title: "Edit your profile",
  robots: { index: false, follow: false },
};

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const agent = await getAgentByToken(token);

  if (!agent) {
    return (
      <Container className="flex min-h-[60vh] flex-col justify-center py-24">
        <Eyebrow>Homix</Eyebrow>
        <h1 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
          This edit link isn&rsquo;t valid.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          {isSupabaseConfigured()
            ? "The link may be mistyped or no longer active. Ask Homix for a fresh link."
            : "Profile editing isn't set up yet. Please check back soon."}
          <br />
          这个编辑链接无效或已失效,请向 Homix 索取新的链接。
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Edit your profile / 编辑你的主页</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {agent.name}
        </h1>
        <p className="mt-4 text-muted">
          Update your photo and details below, then save. Changes go live on your
          Homix profile within a minute.
          <br />
          在下方更新你的头像与资料后保存,约一分钟内同步到你的 Homix 主页。
        </p>

        <div className="mt-10">
          <EditForm agent={agent} token={agent.editToken} />
        </div>
      </div>
    </Container>
  );
}

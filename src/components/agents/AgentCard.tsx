import Image from "next/image";
import Link from "next/link";
import type { Agent } from "@/lib/listings";

/** Editorial 4:5 portrait card for the advisor directory. */
export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/50">
        <Image
          src={agent.photo}
          alt={agent.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-ink transition-colors group-hover:text-bronze">
        {agent.name}
      </p>
      <p className="text-sm text-muted">{agent.title}</p>
    </Link>
  );
}

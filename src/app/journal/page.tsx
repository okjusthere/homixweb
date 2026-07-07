import { permanentRedirect } from "next/navigation";

export default function LegacyJournalPage() {
  permanentRedirect("/guides/articles");
}

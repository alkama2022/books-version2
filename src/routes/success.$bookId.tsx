import { createFileRoute } from "@tanstack/react-router";
import { SuccessPage } from "@/components/store-pages";
export const Route = createFileRoute("/success/$bookId")({
  head: () => ({
    meta: [
      { title: "Demo Purchase Complete — Akada" },
      { name: "description", content: "Your sample purchase is ready in your demo library." },
      { property: "og:title", content: "Demo Purchase Complete — Akada" },
      { property: "og:description", content: "Your book is ready in the Akada prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { bookId } = Route.useParams();
  return <SuccessPage bookId={bookId} />;
}

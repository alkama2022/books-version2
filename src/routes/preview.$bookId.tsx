import { createFileRoute } from "@tanstack/react-router";
import { PreviewPage } from "@/components/store-pages";
export const Route = createFileRoute("/preview/$bookId")({
  head: () => ({
    meta: [
      { title: "Book Preview — Akada" },
      { name: "description", content: "Read a limited sample before choosing your book." },
      { property: "og:title", content: "Book Preview — Akada" },
      { property: "og:description", content: "Read a limited sample on Akada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { bookId } = Route.useParams();
  return <PreviewPage bookId={bookId} />;
}

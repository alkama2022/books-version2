import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BooksPage } from "@/components/store-pages";
export const Route = createFileRoute("/books/")({
  validateSearch: z.object({ q: z.string().catch("") }),
  head: () => ({
    meta: [
      { title: "Browse Books — Akada" },
      {
        name: "description",
        content: "Search and filter practical digital books by topic, author and price.",
      },
      { property: "og:title", content: "Browse Books — Akada" },
      { property: "og:description", content: "Find your next useful digital book." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BooksRoute,
});
function BooksRoute() {
  const { q } = Route.useSearch();
  return <BooksPage initialQuery={q} />;
}

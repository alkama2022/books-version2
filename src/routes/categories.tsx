import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPage } from "@/components/store-pages";
export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Book Categories — Akada" },
      { name: "description", content: "Explore digital books by subject and interest." },
      { property: "og:title", content: "Book Categories — Akada" },
      { property: "og:description", content: "Explore digital books by subject and interest." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

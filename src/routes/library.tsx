import { createFileRoute } from "@tanstack/react-router";
import { LibraryPage } from "@/components/store-pages";
export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "My Library — Akada" },
      { name: "description", content: "Access books purchased in the Akada prototype." },
      { property: "og:title", content: "My Library — Akada" },
      { property: "og:description", content: "Your digital book collection on Akada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

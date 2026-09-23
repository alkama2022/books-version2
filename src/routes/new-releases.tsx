import { createFileRoute } from "@tanstack/react-router";
import { NewReleasesPage } from "@/components/store-pages";
export const Route = createFileRoute("/new-releases")({
  head: () => ({
    meta: [
      { title: "New Releases — Akada" },
      { name: "description", content: "See the newest sample digital books added to Akada." },
      { property: "og:title", content: "New Releases — Akada" },
      { property: "og:description", content: "Fresh practical reads on Akada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewReleasesPage,
});

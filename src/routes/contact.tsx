import { createFileRoute } from "@tanstack/react-router";
import { ContactPageContent } from "@/components/store-pages";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & support — Akada" },
      { name: "description", content: "We are here to help." },
      { property: "og:title", content: "Contact & support — Akada" },
      { property: "og:description", content: "We are here to help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPageContent,
});

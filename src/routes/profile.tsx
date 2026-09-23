import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/store-pages";
export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Akada" },
      { name: "description", content: "View the prototype Akada account area." },
      { property: "og:title", content: "Profile — Akada" },
      { property: "og:description", content: "Your Akada account preview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/store-pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akada — Digital books for practical growth" },
      {
        name: "description",
        content: "Discover affordable digital books for learning, work and everyday growth.",
      },
      { property: "og:title", content: "Akada Digital Bookstore" },
      { property: "og:description", content: "Useful digital books, ready when you are." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/store-pages";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Akada — Akada" },
      { name: "description", content: "A simpler way to find useful books." },
      { property: "og:title", content: "About Akada — Akada" },
      { property: "og:description", content: "A simpler way to find useful books." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
function AboutPage() {
  return (
    <ContentPage
      eyebrow="Akada"
      title="About Akada"
      description="A simpler way to find useful books."
    >
      <h2>
        Akada is a digital bookstore concept designed around practical learning and easy access.
      </h2>
      <p>
        We believe useful knowledge should be clear to discover, simple to buy and easy to return
        to. This first version uses sample content and a simulated purchase journey while the
        foundations for secure accounts, verified payments and protected delivery are prepared.
      </p>
      <p>
        Only books owned by, or properly licensed to, the seller should ever be distributed through
        Akada.
      </p>
    </ContentPage>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/store-pages";
export const Route = createFileRoute("/copyright")({
  head: () => ({
    meta: [
      { title: "Copyright reporting — Akada" },
      { name: "description", content: "We respect authors and publishers." },
      { property: "og:title", content: "Copyright reporting — Akada" },
      { property: "og:description", content: "We respect authors and publishers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CopyrightPage,
});
function CopyrightPage() {
  return (
    <ContentPage
      eyebrow="Akada"
      title="Copyright reporting"
      description="We respect authors and publishers."
    >
      <h2>Akada must only distribute books the seller owns or has permission to sell.</h2>
      <p>
        Rights holders should be able to report suspected infringement with the title, ownership
        evidence and contact information. A verified reporting channel will be published before
        launch.
      </p>
      <p>Until then, no real books or downloadable files are distributed through this prototype.</p>
    </ContentPage>
  );
}

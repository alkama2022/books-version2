import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/store-pages";
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Akada" },
      { name: "description", content: "Clear rules for using Akada." },
      { property: "og:title", content: "Terms & Conditions — Akada" },
      { property: "og:description", content: "Clear rules for using Akada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});
function TermsPage() {
  return (
    <ContentPage
      eyebrow="Akada"
      title="Terms & Conditions"
      description="Clear rules for using Akada."
    >
      <h2>
        These sample terms explain the intended service and will require legal review before launch.
      </h2>
      <p>
        Digital products will only be supplied after verified payment. Access and download rights
        may vary by title and licence. Users must not redistribute purchased files.
      </p>
      <p>
        All prototype purchases are simulated, carry no monetary value and remain only on the
        current device.
      </p>
    </ContentPage>
  );
}

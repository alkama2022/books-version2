import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/store-pages";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Akada" },
      { name: "description", content: "Your information should be handled carefully." },
      { property: "og:title", content: "Privacy Policy — Akada" },
      { property: "og:description", content: "Your information should be handled carefully." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});
function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Akada"
      title="Privacy Policy"
      description="Your information should be handled carefully."
    >
      <h2>
        This prototype stores demo purchase information only in your browser. It has no connected
        customer database.
      </h2>
      <p>
        A production privacy policy will explain what account, order and payment information is
        collected, why it is needed, how long it is retained and how users can exercise their
        rights.
      </p>
      <p>
        Payment card details should be handled by the connected payment provider, not stored by this
        storefront.
      </p>
    </ContentPage>
  );
}

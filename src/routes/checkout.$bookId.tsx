import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/components/store-pages";
export const Route = createFileRoute("/checkout/$bookId")({
  head: () => ({
    meta: [
      { title: "Demo Checkout — Akada" },
      { name: "description", content: "Try the Akada prototype checkout without a real payment." },
      { property: "og:title", content: "Demo Checkout — Akada" },
      { property: "og:description", content: "A clearly labelled simulated bookstore checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { bookId } = Route.useParams();
  return <CheckoutPage bookId={bookId} />;
}

import { createFileRoute } from "@tanstack/react-router";
import { BookDetailsPage } from "@/components/store-pages";
import { findBook } from "@/lib/books";
export const Route = createFileRoute("/books/$bookId")({
  head: ({ params }) => {
    const book = findBook(params.bookId);
    const title = book ? `${book.title} — Akada` : "Book unavailable — Akada";
    const description = book?.description ?? "Browse practical digital books on Akada.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});
function Page() {
  const { bookId } = Route.useParams();
  return <BookDetailsPage bookId={bookId} />;
}

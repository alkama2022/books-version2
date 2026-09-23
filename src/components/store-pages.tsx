import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookMarked,
  Check,
  CheckCircle2,
  Download,
  Filter,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Trash2,
  LogOut,
  User,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookCover,
  BookGrid,
  CategoryTiles,
  EmptyState,
  PageHeader,
  Price,
  SearchInput,
  TrustStrip,
} from "@/components/storefront";
import { books, categories, findBook, formatNaira, type Book } from "@/lib/books";
import { useLibrary } from "@/lib/library";
import { useAuth } from "@/lib/auth";

export function HomePage() {
  const featured = books.filter((b) => b.featured);
  const first = books[0];
  const second = books[2];
  const third = books[4];
  return (
    <>
      <section className="overflow-hidden bg-hero">
        <div className="site-container grid min-h-[650px] items-center gap-10 py-14 md:grid-cols-[1.05fr_.95fr] md:py-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Digital books. Practical knowledge.
            </p>
            <h1 className="max-w-2xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">
              Discover books that move you forward.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Learn, grow and explore with affordable digital books you can access instantly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/books" search={{ q: "" }}>
                  Explore Books
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              All books and authors shown are sample content for this prototype. Secure payments &
              downloads ready via backend integration.
            </p>
          </div>
          {first && second && third && (
            <div
              className="relative mx-auto h-[390px] w-full max-w-[500px] md:h-[500px]"
              aria-label="Featured sample book covers"
            >
              <BookCover
                book={first}
                priority
                className="absolute left-[29%] top-0 z-20 aspect-[3/4] w-[45%] rotate-2"
              />
              <BookCover
                book={second}
                priority
                className="absolute left-0 top-[18%] z-10 aspect-[3/4] w-[39%] -rotate-6"
              />
              <BookCover
                book={third}
                priority
                className="absolute right-0 top-[21%] aspect-[3/4] w-[38%] rotate-6"
              />
            </div>
          )}
        </div>
      </section>
      <TrustStrip />
      <section className="site-container py-16 md:py-24">
        <SectionTitle eyebrow="Curated for you" title="Featured books" action="View all books" />
        <BookGrid items={featured} />
      </section>
      <section className="bg-wash">
        <div className="site-container py-16 md:py-24">
          <SectionTitle
            eyebrow="Find your next read"
            title="Browse by category"
            action="See all categories"
            to="/categories"
          />
          <CategoryTiles />
        </div>
      </section>
      <section className="site-container py-16 md:py-24">
        <div className="grid items-center gap-10 border-y py-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Built for everyday learning
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Knowledge should be easy to reach.
            </h2>
          </div>
          <div>
            <p className="leading-7 text-muted-foreground">
              Akada helps readers discover practical books, understand their value and keep every
              purchase in one simple library — persisted locally and ready for backend sync.
            </p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <Link to="/about">
                Why Akada <ArrowLeft className="rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
function SectionTitle({
  eyebrow,
  title,
  action,
  to = "/books",
}: {
  eyebrow: string;
  title: string;
  action: string;
  to?: "/books" | "/categories";
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      <Button asChild variant="ghost" className="hidden sm:inline-flex">
        {to === "/books" ? (
          <Link to="/books" search={{ q: "" }}>
            {action}
          </Link>
        ) : (
          <Link to="/categories">{action}</Link>
        )}
      </Button>
    </div>
  );
}

export function BooksPage({ initialQuery = "" }: { initialQuery?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleQueryChange = (v: string) => {
    setQuery(v);
    navigate({ to: "/books", search: { q: v } as never });
  };

  const filtered = useMemo(
    () =>
      books
        .filter((book) => {
          const q = query.toLowerCase();
          return (
            (!q ||
              `${book.title} ${book.author} ${book.category} ${book.description}`
                .toLowerCase()
                .includes(q)) &&
            (category === "All" || book.category === category)
          );
        })
        .sort((a, b) => {
          if (sort === "newest") return b.publishedAt.localeCompare(a.publishedAt);
          if (sort === "low") return a.price - b.price;
          if (sort === "high") return b.price - a.price;
          if (sort === "popular") return Number(Boolean(b.popular)) - Number(Boolean(a.popular));
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
        }),
    [query, category, sort],
  );

  const categoryCounts = useMemo(() => {
    const m = new Map<string, number>();
    books.forEach((b) => m.set(b.category, (m.get(b.category) ?? 0) + 1));
    return m;
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Find a book for your next step."
        description="Search practical sample titles by topic, author or category."
      />
      <div className="site-container py-10">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <SearchInput value={query} onChange={handleQueryChange} />
          <label className="sr-only" htmlFor="sort">
            Sort books
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-12 rounded-md border bg-background px-4 text-sm"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {["All", ...categories].map((item) => {
            const count = item === "All" ? books.length : (categoryCounts.get(item) ?? 0);
            return (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
                className="shrink-0"
              >
                {item} <span className="ml-1 opacity-70">({count})</span>
              </Button>
            );
          })}
        </div>
        <div className="mb-7 mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "book" : "books"} found
          </p>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <Filter className="size-4" /> {books.length} total titles
          </span>
        </div>
        {filtered.length ? (
          <BookGrid items={filtered} />
        ) : (
          <EmptyState title="No books found." text="Try another title, author or topic." />
        )}
      </div>
    </>
  );
}

export function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Browse"
        title="Start with what interests you."
        description="Explore learning, career and practical life topics in a few taps."
      />
      <div className="site-container py-12 md:py-16">
        <CategoryTiles />
      </div>
    </>
  );
}
export function NewReleasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fresh reads"
        title="New releases"
        description="Recently added sample books, sorted by publication date."
      />
      <div className="site-container py-12 md:py-16">
        <BookGrid items={[...books].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))} />
      </div>
    </>
  );
}

export function BookDetailsPage({ bookId }: { bookId: string }) {
  const book = findBook(bookId);
  const { hasBook } = useLibrary();
  if (!book)
    return (
      <EmptyState
        title="This book isn't available."
        text="It may have moved or is no longer in the sample catalogue."
      />
    );
  const related = books
    .filter((item) => item.category === book.category && item.id !== book.id)
    .slice(0, 4);
  const owned = hasBook(book.id);
  return (
    <div className="site-container py-8 md:py-14">
      <Link
        to="/books"
        search={{ q: "" }}
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to books
      </Link>
      <section className="grid gap-9 md:grid-cols-[minmax(260px,380px)_1fr] lg:gap-16">
        <BookCover book={book} priority className="mx-auto aspect-[3/4] w-full max-w-[380px]" />
        <div className="self-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {book.category}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">by {book.author}</p>
          {owned && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              ✓ In your library
            </p>
          )}
          <p className="mt-6 max-w-2xl text-lg leading-8">{book.description}</p>
          <div className="mt-7">
            <Price book={book} />
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {owned ? (
              <Button asChild size="lg">
                <Link to="/library">Go to Library</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/checkout/$bookId" params={{ bookId: book.id }}>
                  <ShoppingBagIcon />
                  Buy Now
                </Link>
              </Button>
            )}
            {book.previewAvailable ? (
              <Button asChild size="lg" variant="outline">
                <Link to="/preview/$bookId" params={{ bookId: book.id }}>
                  Read Preview
                </Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" disabled>
                Preview unavailable
              </Button>
            )}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <LockKeyhole className="size-4" />{" "}
            {owned
              ? "You own this book on this device. Downloads persist locally."
              : "Demo purchase only — no real payment until payment provider is connected."}
          </p>
        </div>
      </section>
      <section className="mt-14 grid gap-10 border-b border-t py-12 md:grid-cols-3">
        <InfoBlock title="What you'll learn" items={book.learn} />
        <InfoBlock title="Who this is for" text={book.audience} />
        <InfoBlock
          title="Book information"
          items={[
            `${book.pages} pages`,
            `PDF · ${book.fileSize}`,
            book.language,
            new Date(book.publishedAt).toLocaleDateString("en-NG", {
              month: "long",
              year: "numeric",
            }),
          ]}
        />
      </section>
      <section className="grid gap-10 py-12 md:grid-cols-2">
        <InfoBlock title="What's inside?" items={book.contents} ordered />
        <InfoBlock title="About the author" text={book.authorBio} />
      </section>
      {related.length > 0 && (
        <section className="border-t pt-12">
          <h2 className="mb-8 font-display text-3xl font-bold">Related books</h2>
          <BookGrid items={related} />
        </section>
      )}
    </div>
  );
}
function ShoppingBagIcon() {
  return <BookMarked className="size-4" />;
}
function InfoBlock({
  title,
  items,
  text,
  ordered,
}: {
  title: string;
  items?: string[];
  text?: string;
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <div>
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {text && <p className="mt-4 leading-7 text-muted-foreground">{text}</p>}
      {items && (
        <Tag className="mt-4 space-y-3">
          {items.map((item, i) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
              {ordered ? (
                <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
              ) : (
                <Check className="mt-1 size-4 shrink-0 text-primary" />
              )}
              {item}
            </li>
          ))}
        </Tag>
      )}
    </div>
  );
}

export function PreviewPage({ bookId }: { bookId: string }) {
  const book = findBook(bookId);
  const { hasBook } = useLibrary();
  if (!book)
    return <EmptyState title="Preview unavailable." text="This sample book could not be found." />;
  const owned = hasBook(book.id);
  return (
    <div className="bg-reader py-8 text-reader-foreground">
      <div className="site-container">
        <div className="mb-6 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            className="text-reader-muted hover:bg-reader-surface hover:text-reader-foreground"
          >
            <Link to="/books/$bookId" params={{ bookId }}>
              <ArrowLeft /> Book details
            </Link>
          </Button>
          <span className="text-xs text-reader-muted">
            {owned
              ? "Full access — you own this book"
              : `Sample preview · 3 of ${book.pages} pages`}
          </span>
        </div>
        <article className="mx-auto max-w-3xl rounded-md bg-reader-paper p-7 text-reader-paper-foreground shadow-xl md:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {owned ? "You own this book" : "Limited preview"}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">{book.title}</h1>
          <p className="mt-2 text-muted-foreground">{book.author}</p>
          <div className="my-10 h-px bg-border" />
          <h2 className="font-display text-2xl font-bold">Chapter 1 — A practical beginning</h2>
          <p className="mt-5 text-lg leading-9">
            Every useful skill begins with a clear first step. This sample chapter introduces the
            central idea of the book and gives you one practical action you can take today.
          </p>
          <p className="mt-5 text-lg leading-9">
            Rather than trying to master everything at once, focus on understanding the problem,
            practising a small technique, and reflecting on what changed. Progress becomes easier to
            see when the work is specific.
          </p>
          {owned ? (
            <>
              <p className="mt-5 text-lg leading-9">
                As an owner, you have access to the full text on this device. In production, the
                complete PDF/EPUB would be delivered after verified payment and stored securely.
              </p>
              <p className="mt-5 text-lg leading-9">
                Continue to your library to download or read anytime. Your purchase is persisted in
                localStorage and will sync to a backend once authentication is enabled.
              </p>
            </>
          ) : (
            <div className="relative mt-6 max-h-40 overflow-hidden">
              <p className="text-lg leading-9">
                In the full book, you will continue with guided examples, short exercises and a
                structured plan designed for independent learning...
              </p>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-preview-fade" />
            </div>
          )}
        </article>
        {!owned && (
          <div className="mx-auto mt-8 max-w-3xl rounded-md border border-reader-border bg-reader-surface p-6 text-center">
            <h2 className="font-display text-2xl font-bold">Enjoying the preview?</h2>
            <p className="mt-2 text-reader-muted">
              Get the full book and keep it in your Akada library.
            </p>
            <Button asChild className="mt-5">
              <Link to="/checkout/$bookId" params={{ bookId }}>
                Buy Now · {formatNaira(book.price)}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().min(2, "Enter your name").optional().or(z.literal("")),
});

export function CheckoutPage({ bookId }: { bookId: string }) {
  const book = findBook(bookId);
  const navigate = useNavigate();
  const { purchase, hasBook } = useLibrary();
  const { user, signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { email: user?.email ?? "", name: user?.name ?? "" },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email);
    }
  }, [user, form]);

  if (!book)
    return <EmptyState title="Checkout unavailable." text="This sample book could not be found." />;
  if (hasBook(book.id)) {
    return (
      <>
        <PageHeader
          eyebrow="Already owned"
          title="You already own this book."
          description="This title is in your library on this device."
        />
        <div className="site-container py-10">
          <p className="text-muted-foreground">Go to your library to read or download.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link to="/library">Go to Library</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/preview/$bookId" params={{ bookId: book.id }}>
                Read Now
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    setLoading(true);
    window.setTimeout(() => {
      purchase(book.id);
      if (!user && values.email) signIn(values.email);
      toast.success("Demo purchase complete", {
        description: `${book.title} added to your library.`,
      });
      navigate({ to: "/success/$bookId", params: { bookId: book.id } });
    }, 900);
  };

  return (
    <>
      <PageHeader
        eyebrow="Demo checkout"
        title="Complete your sample purchase."
        description="No real money will be charged. This flow demonstrates the future checkout experience."
      />
      <div className="site-container grid gap-10 py-10 md:grid-cols-[1fr_380px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-6">
          <div className="rounded-md border bg-highlight/40 p-4 text-sm">
            <strong>Prototype mode:</strong> this is a simulated payment and does not contact a bank
            or payment provider. Replace with Paystack/Flutterwave server verification before
            launch.
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Ada Lovelace"
              {...form.register("name")}
              aria-invalid={!!form.formState.errors.name}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address *</Label>
            <p className="text-sm text-muted-foreground">
              Receipt and library access will be tied to this email (stored locally for demo).
            </p>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 pl-11"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
            {loading ? "Simulating payment…" : `Pay ${formatNaira(book.price)} (Demo)`}
          </Button>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4" /> In production, verify payment on the server before
            granting access. Do not trust client-side purchase alone.
          </p>
        </form>

        <aside className="rounded-md border bg-card p-5">
          <h2 className="font-display text-xl font-bold">Order summary</h2>
          <div className="mt-5 flex gap-4">
            <BookCover book={book} className="aspect-[3/4] w-24 shrink-0" />
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {book.pages} pages · PDF · {book.fileSize}
              </p>
            </div>
          </div>
          <div className="my-5 border-t" />
          <div className="flex justify-between text-sm">
            <span>Digital book</span>
            <span>{formatNaira(book.price)}</span>
          </div>
          <div className="mt-3 flex justify-between text-lg font-bold">
            <span>Order total</span>
            <span>{formatNaira(book.price)}</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Secure delivery after verified payment. Demo keeps the book in this browser's library.
          </p>
        </aside>
      </div>
    </>
  );
}

export function SuccessPage({ bookId }: { bookId: string }) {
  const book = findBook(bookId);
  const { hasBook } = useLibrary();
  if (!book)
    return (
      <EmptyState title="Purchase not found." text="Return to the bookstore and choose a book." />
    );
  const owned = hasBook(bookId);
  return (
    <div className="site-container py-16 text-center md:py-24">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-success text-success-foreground">
        <CheckCircle2 className="size-10" />
      </div>
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {owned ? "Demo purchase complete" : "Preview only"}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        {owned ? "Your book is ready!" : "Not yet purchased"}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        <strong className="text-foreground">{book.title}</strong>{" "}
        {owned
          ? "is now in your demo library on this device."
          : "is not in your library yet. Complete checkout to claim it."}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        {owned
          ? "No real payment was made and no receipt email was sent. In production this would be verified server-side."
          : "No payment has been processed."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/library">Go to My Library</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/preview/$bookId" params={{ bookId }}>
            {owned ? "Read Now" : "Preview"}
          </Link>
        </Button>
        {!owned && (
          <Button asChild size="lg" variant="outline">
            <Link to="/checkout/$bookId" params={{ bookId: bookId }}>
              Buy Now
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export function LibraryPage() {
  const { purchases, isHydrated, clear } = useLibrary();
  const [query, setQuery] = useState("");
  const items = purchases
    .map((p) => ({ purchase: p, book: findBook(p.bookId) }))
    .filter((item): item is { purchase: (typeof purchases)[number]; book: Book } =>
      Boolean(item.book),
    )
    .filter((item) =>
      `${item.book.title} ${item.book.author}`.toLowerCase().includes(query.toLowerCase()),
    );

  if (!isHydrated) {
    return (
      <>
        <PageHeader
          eyebrow="Your collection"
          title="My Library"
          description="Books purchased in this demo are saved on this device."
        />
        <div className="site-container py-10">
          <p className="text-muted-foreground">Loading your library…</p>
        </div>
      </>
    );
  }

  const handleDownload = (book: Book) => {
    const content = `Akada Demo Download\n\nTitle: ${book.title}\nAuthor: ${book.author}\nThis is a simulated PDF download for the prototype.\nIn production, serve the file from a verified backend with signed URLs and DRM if required.\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("Download started", { description: `Simulated file for "${book.title}"` });
  };

  return (
    <>
      <PageHeader
        eyebrow="Your collection"
        title="My Library"
        description="Books purchased in this demo are saved on this device. Connect a backend to sync across devices."
      />
      <div className="site-container py-10">
        {purchases.length > 0 && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl flex-1">
              <SearchInput value={query} onChange={setQuery} />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clear();
                toast.info("Library cleared");
              }}
            >
              <Trash2 className="size-4" /> Clear library
            </Button>
          </div>
        )}
        {purchases.length === 0 ? (
          <EmptyState
            title="Your library is waiting for you."
            text="Discover your next book and it will appear here after the demo checkout."
            action="Explore Books"
          />
        ) : items.length === 0 ? (
          <EmptyState title="No matching books." text="Try another title or author." />
        ) : (
          <div className="space-y-4">
            {items.map(({ book, purchase }) => (
              <article
                key={book.id}
                className="grid gap-5 rounded-md border bg-card p-4 sm:grid-cols-[100px_1fr_auto] sm:items-center"
              >
                <BookCover book={book} className="aspect-[3/4] w-24" />
                <div>
                  <h2 className="font-display text-xl font-bold">{book.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Purchased{" "}
                    {new Date(purchase.purchasedAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <Link to="/preview/$bookId" params={{ bookId: book.id }}>
                      Read
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => handleDownload(book)}>
                    <Download /> Download
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const profileSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export function ProfilePage() {
  const { user, signIn, signOut, isHydrated } = useAuth();
  const { purchases } = useLibrary();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { email: "" },
  });

  const onSignIn = (values: z.infer<typeof profileSchema>) => {
    signIn(values.email);
    toast.success("Signed in (demo)", { description: values.email });
    form.reset();
  };

  if (!isHydrated) {
    return (
      <>
        <PageHeader eyebrow="Account" title="Your profile" description="Loading account…" />
        <div className="site-container py-12">Loading…</div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Your profile"
        description="A demo auth layer — persisted locally, ready to swap for OAuth/JWT."
      />
      <div className="site-container grid gap-6 py-12 md:grid-cols-2">
        <div className="rounded-md border p-6">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold">
            <User className="size-5" /> Profile information
          </h2>
          {user ? (
            <>
              <p className="mt-4 text-sm text-muted-foreground">Signed in as</p>
              <p className="mt-1 font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {purchases.length} {purchases.length === 1 ? "book" : "books"} in library
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  signOut();
                  toast.info("Signed out");
                }}
              >
                <LogOut className="size-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <p className="mt-4 text-sm text-muted-foreground">
                Not signed in — demo mode stores your email locally only.
              </p>
              <form onSubmit={form.handleSubmit(onSignIn)} className="mt-4 space-y-3">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
                <Button type="submit">Sign in (demo)</Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                In production replace with secure auth (OAuth, JWT, httpOnly cookies).
              </p>
            </>
          )}
        </div>
        <div className="rounded-md border p-6">
          <h2 className="font-display text-xl font-bold">Quick access</h2>
          <div className="mt-4 grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/library">
                <BookMarked /> My Library ({purchases.length})
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/contact">
                <Mail /> Help & support
              </Link>
            </Button>
            {user && (
              <p className="mt-2 text-xs text-muted-foreground">
                Email tied to demo purchases: {user.email}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactPageContent() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    toast.success("Message received (demo)", {
      description: `Thanks ${values.name}, we will reply to ${values.email} when support is live.`,
    });
    form.reset();
  };

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Contact & support"
        description="We are here to help — demo form stores nothing server-side yet."
      />
      <div className="site-container grid gap-10 py-12 md:grid-cols-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="c-name">Name</Label>
            <Input id="c-name" {...form.register("name")} placeholder="Your name" />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-email">Email</Label>
            <Input
              id="c-email"
              type="email"
              {...form.register("email")}
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-message">Message</Label>
            <Textarea
              id="c-message"
              rows={5}
              {...form.register("message")}
              placeholder="How can we help?"
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>
          <Button type="submit">
            <Send className="size-4" /> Send message
          </Button>
          <p className="text-xs text-muted-foreground">
            Prototype: no email is sent. Wire to a server function / Resend / backend ticket system
            before launch.
          </p>
        </form>
        <div className="rounded-md border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Other help</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            For copyright concerns, use the dedicated reporting page. For orders in production,
            include your purchase email and order ID.
          </p>
          <div className="mt-4 grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/copyright">Copyright reporting</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/terms">Terms & Conditions</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ContentPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <article className="site-container max-w-3xl py-12 text-base leading-8 text-muted-foreground [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_p]:mt-4">
        {children}
      </article>
    </>
  );
}

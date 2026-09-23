import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  ChevronRight,
  CircleUserRound,
  Home,
  Library,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books, categories, formatNaira, type Book } from "@/lib/books";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
      <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <BookOpen className="size-5" />
      </span>
      Akada
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["/", "Home"],
    ["/books", "Books"],
    ["/categories", "Categories"],
    ["/new-releases", "New Releases"],
    ["/about", "About"],
  ] as const;
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="site-container flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                activeProps={{ className: "text-primary font-semibold" }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost" size="icon">
              <Link to="/books" search={{ q: "" }} aria-label="Search books">
                <Search />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link to="/library" aria-label="My Library">
                <Library />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link to="/profile" aria-label="Profile">
                <CircleUserRound />
              </Link>
            </Button>
            <Button asChild className="ml-2">
              <Link to="/books" search={{ q: "" }}>
                Browse Books
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="border-t bg-background px-4 py-3 md:hidden" aria-label="Mobile menu">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 font-medium hover:bg-muted"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-background px-1 pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Quick navigation"
      >
        <MobileLink to="/" label="Home" icon={<Home />} />
        <MobileBooksLink label="Explore" icon={<BookOpen />} />
        <MobileBooksLink label="Search" icon={<Search />} />
        <MobileLink to="/library" label="Library" icon={<Library />} />
        <MobileLink to="/profile" label="Profile" icon={<CircleUserRound />} />
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-ink text-ink-foreground">
      <div className="site-container grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 text-xl font-bold">Akada</div>
          <p className="max-w-xs text-sm text-ink-muted">
            Useful digital books for learning, work and everyday growth. Sample catalogue for
            demonstration.
          </p>
        </div>
        <FooterCol
          title="Explore"
          links={[
            ["/books", "Books"],
            ["/categories", "Categories"],
            ["/new-releases", "New Releases"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["/about", "About"],
            ["/contact", "Contact"],
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            ["/terms", "Terms"],
            ["/privacy", "Privacy"],
            ["/copyright", "Copyright"],
          ]}
        />
      </div>
      <div className="border-t border-ink-border py-5 text-center text-xs text-ink-muted">
        © 2026 Akada. Prototype bookstore; all titles and authors shown are sample content.
      </div>
    </footer>
  );
}
function MobileLink({
  to,
  label,
  icon,
}: {
  to: "/" | "/library" | "/profile";
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground active:bg-muted"
    >
      {icon}
      {label}
    </Link>
  );
}
function MobileBooksLink({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <Link
      to="/books"
      search={{ q: "" }}
      className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground active:bg-muted"
    >
      {icon}
      {label}
    </Link>
  );
}
function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      <ul className="space-y-2">
        {links.map(([to, label]) => (
          <li key={to}>
            <a href={to} className="text-sm text-ink-muted hover:text-ink-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b bg-wash">
      <div className="site-container py-12 md:py-16">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </header>
  );
}

export function Price({ book }: { book: Book }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-bold text-foreground">{formatNaira(book.price)}</span>
      {book.oldPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {formatNaira(book.oldPrice)}
        </span>
      )}
    </div>
  );
}

export function BookCover({
  book,
  priority = false,
  className = "",
}: {
  book: Book;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`book-cover relative overflow-hidden rounded-md bg-muted shadow-cover ${className}`}
    >
      <img
        src={book.cover}
        alt={`${book.title} sample cover`}
        width={768}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-cover-label p-3 text-cover-label">
        <p className="font-display text-base font-bold leading-tight">{book.title}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.12em] opacity-80">{book.author}</p>
      </div>
    </div>
  );
}

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group min-w-0">
      <Link
        to="/books/$bookId"
        params={{ bookId: book.id }}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <BookCover
          book={book}
          className="aspect-[3/4] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-cover-hover"
        />
      </Link>
      <div className="pt-4">
        <div className="mb-2 flex min-h-5 items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            {book.category}
          </span>
          {book.popular && (
            <span className="rounded-full bg-highlight px-2 py-0.5 text-[10px] font-bold text-highlight-foreground">
              Popular
            </span>
          )}
        </div>
        <Link
          to="/books/$bookId"
          params={{ bookId: book.id }}
          className="line-clamp-2 font-display text-base font-bold leading-snug hover:text-primary md:text-lg"
        >
          {book.title}
        </Link>
        <p className="mt-1 truncate text-sm text-muted-foreground">{book.author}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Price book={book} />
          <Button asChild variant="ghost" size="sm" className="px-2 text-primary">
            <Link to="/books/$bookId" params={{ bookId: book.id }}>
              View <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
export function BookGrid({ items }: { items: Book[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="border-y bg-background">
      <div className="site-container grid grid-cols-2 gap-4 py-5 md:grid-cols-5">
        {[
          "Instant digital access",
          "Simple demo checkout",
          "Affordable books",
          "Read anywhere",
          "Your library, anytime",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs font-semibold md:text-sm">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
              <Check className="size-3" />
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action = "Browse all books",
}: {
  title: string;
  text: string;
  action?: string;
}) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-muted">
        <Search className="size-6 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <Button asChild className="mt-6">
        <Link to="/books" search={{ q: "" }}>
          {action}
        </Link>
      </Button>
    </div>
  );
}

export function CategoryTiles() {
  const icons = ["</>", "₦", "A+", "↗", "◎", "⚡", "✦", "ABC", "✓", "NG"];
  const counts = categories.map((c) => books.filter((b) => b.category === c).length);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {categories.map((category, i) => {
        const count = counts[i];
        return (
          <Link
            key={category}
            to="/books"
            search={{ q: category }}
            className="group flex min-h-36 flex-col justify-between rounded-md border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
          >
            <span className="font-mono text-xl font-bold text-primary">{icons[i]}</span>
            <span className="font-display font-bold leading-tight">{category}</span>
            <span className="text-xs text-muted-foreground">
              {count} {count === 1 ? "book" : "books"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search books, authors or topics</span>
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search books, authors or topics..."
        className="h-12 rounded-md bg-background pl-12 pr-10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted"
        >
          <X className="size-4" />
        </button>
      )}
    </label>
  );
}

export function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

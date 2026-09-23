import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Purchase = { bookId: string; purchasedAt: string };
type LibraryContextValue = {
  purchases: Purchase[];
  purchase: (bookId: string) => void;
  hasBook: (bookId: string) => boolean;
  clear: () => void;
  isHydrated: boolean;
};
const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);
const STORAGE_KEY = "akada-demo-library";

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed))
          setPurchases(
            parsed.filter(
              (p) => p && typeof p.bookId === "string" && typeof p.purchasedAt === "string",
            ),
          );
      }
    } catch {
      setPurchases([]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    } catch {
      // storage full or private mode
    }
  }, [purchases, isHydrated]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setPurchases(e.newValue ? JSON.parse(e.newValue) : []);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<LibraryContextValue>(
    () => ({
      purchases,
      isHydrated,
      purchase: (bookId: string) =>
        setPurchases((current) => {
          if (current.some((item) => item.bookId === bookId)) return current;
          const next = [...current, { bookId, purchasedAt: new Date().toISOString() }];
          return next;
        }),
      hasBook: (bookId: string) => purchases.some((item) => item.bookId === bookId),
      clear: () => setPurchases([]),
    }),
    [purchases, isHydrated],
  );
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const value = useContext(LibraryContext);
  if (!value) throw new Error("LibraryProvider is missing");
  return value;
}

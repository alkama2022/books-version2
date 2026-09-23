import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthUser = { email: string; name: string };
type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
  isHydrated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "akada-demo-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [user, isHydrated]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isHydrated,
      signIn: (email: string) => {
        const name = email.split("@")[0] ?? "Reader";
        setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) });
      },
      signOut: () => setUser(null),
    }),
    [user, isHydrated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const v = useContext(AuthContext);
  if (!v) throw new Error("AuthProvider missing");
  return v;
}

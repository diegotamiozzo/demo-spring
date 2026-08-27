import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, type AuthUser } from "../lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    const u = await api.login(email, password);
    setUser(u); // Aqui o 'u' já vem com { email, name }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const u = await api.signup(email, password, name);
    setUser(u); // Aqui o 'u' também traz { email, name }
  };

  const signOut = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
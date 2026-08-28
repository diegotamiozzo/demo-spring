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

const USER_STORAGE_KEY = "@DemoSpring:user";

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado lendo diretamente do localStorage para evitar piscar a tela de welcome
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Valida a sessão com o backend no carregamento
    api
      .me()
      .then((u) => {
        setUser(u);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const signIn = async (email: string, password: string) => {
    const u = await api.login(email, password);
    setUser(u);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
  };

  const signUp = async (email: string, password: string, name: string) => {
    const u = await api.signup(email, password, name);
    setUser(u);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
  };

  const signOut = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    } finally {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
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
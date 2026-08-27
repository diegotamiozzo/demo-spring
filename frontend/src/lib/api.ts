const API_BASE = "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response wasn't JSON
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export interface AuthUser {
  email: string;
  name?: string;
}

export interface DashboardData {
  stats: { label: string; value: string; change: string; positive: boolean }[];
  chart: { day: string; height: number }[];
  activities: { color: string; text: string; time: string }[];
}

export const api = {
  async login(email: string, password: string): Promise<AuthUser> {
    return request<AuthUser>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async signup(email: string, password: string, name: string): Promise<AuthUser> {
    return request<AuthUser>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  },

  async logout(): Promise<void> {
    await request<void>("/auth/logout", { method: "POST" });
  },

  async me(): Promise<AuthUser> {
    return request<AuthUser>("/auth/me");
  },

  async getDashboard(): Promise<DashboardData> {
    return request<DashboardData>("/dashboard");
  },
};
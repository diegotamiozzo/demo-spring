import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api, type DashboardData } from "../lib/api";

export function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getDashboard()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Erro ao carregar dados."));
  }, []);

  if (error) {
    return (
      <div>
        <div className="auth-error">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p className="page-subtitle">Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Painel</h1>
        <p className="page-subtitle">Visão geral da sua aplicação</p>
      </div>

      <div className="welcome-banner">
        <h2>Olá, <strong>{user?.name}</strong>!</h2>
        <p>
          Conectado como <strong>{user?.email}</strong>. Este é o seu painel genérico, 
          comece sua aplicação por aqui!
        </p>
      </div>

    </div>
  );
}

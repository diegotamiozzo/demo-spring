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
        <h2>Olá! 👋</h2>
        <p>
          Conectado como <strong>{user?.email}</strong>. Este é o seu painel genérico —
          explore as métricas e atividades abaixo.
        </p>
      </div>

      <div className="stats-grid">
        {data.stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.positive ? "positive" : "negative"}`}>
              {s.change} este mês
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div className="panel">
          <h3 className="panel-title">Atividade semanal</h3>
          <div className="bar-chart">
            {data.chart.map((d) => (
              <div key={d.day} className="bar-col">
                <div className="bar" style={{ height: `${d.height}%` }} />
                <span className="bar-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Atividades recentes</h3>
          {data.activities.map((a, i) => (
            <div key={i} className="activity-item">
              <div className="activity-dot" style={{ background: a.color }} />
              <div>
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

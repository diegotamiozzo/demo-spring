import { useNavigate } from "react-router-dom";

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configurações</h1>
        <p className="page-subtitle">Área de ajustes da aplicação</p>
      </div>

      <div className="auth-card" style={{ maxWidth: "600px", marginTop: "20px" }}>
        <p style={{ marginBottom: "20px", color: "var(--text-muted, #666)" }}>
          Esta página está limpa e pronta para receber suas futuras configurações.
        </p>

        <button 
          type="button" 
          className="btn-primary" 
          onClick={() => navigate("/dashboard")}
        >
          Voltar ao Painel
        </button>
      </div>
    </div>
  );
}
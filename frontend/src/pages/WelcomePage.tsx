import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function WelcomePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Tenta extrair o nome do usuário de várias formas possíveis (propriedade name, nome, ou o prefixo do email)
  const getUserName = () => {
    if (!user) return "";
    if (typeof user === 'object') {
      const u = user as any;
      if (u.name) return u.name;
      if (u.nome) return u.nome;
      if (u.email) return u.email.split('@')[0];
    }
    return "Usuário";
  };

  const displayName = getUserName();

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "420px", width: "100%", padding: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img src="/logo.png" alt="Logo" className="auth-logo" style={{ width: "64px", height: "64px", objectFit: "contain", marginBottom: "16px" }} />
          <h1 className="auth-title" style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Bem-vindo</h1>
          <p className="auth-subtitle" style={{ color: "#6c757d", fontSize: "14px" }}>Sistema inteligente de gestão e monitoramento</p>
        </div>

        {user ? (
          // Estado com sessão ativa: Mais interativo e personalizado
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              padding: "14px 16px", 
              background: "#f8f9fa", 
              border: "1px solid #e9ecef",
              borderRadius: "10px", 
              fontSize: "14px" 
            }}>
              <span style={{ color: "#495057" }}>
                Olá, <strong style={{ color: "#212529" }}>{displayName}</strong>
              </span>
              <button
                onClick={signOut}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "#dc3545", 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  fontWeight: 600,
                  fontSize: "13px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  transition: "background 0.2s"
                }}
              >
                Sair
              </button>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "12px", fontWeight: 600, cursor: "pointer" }}
            >
              Acessar Painel
            </button>
          </div>
        ) : (
          // Estado sem sessão: Visual limpo para entrada ou cadastro
          <div className="welcome-actions" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link 
              to="/login" 
              className="btn-primary" 
              style={{ textAlign: "center", textDecoration: "none", display: "block", padding: "12px", fontWeight: 600 }}
            >
              Entrar
            </Link>
            
            <div className="auth-footer" style={{ marginTop: "16px", textAlign: "center", fontSize: "14px", color: "#6c757d" }}>
              Não tem uma conta?{" "}
              <Link to="/signup" style={{ color: "#007bff", fontWeight: 600, textDecoration: "none" }}>
                Cadastre-se
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
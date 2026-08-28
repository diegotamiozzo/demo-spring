import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extrai as iniciais do nome ou e-mail
  const getInitials = (text?: string | null) => {
    if (!text) return "DT";
    return text.substring(0, 2).toUpperCase();
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/dado.png" alt="Dado" className="sidebar-logo-icon" />
          <span className="sidebar-logo-text">Optimize</span>
        </div>
        <nav>
          <Link className="nav-item active" to="/dashboard">
            <span className="nav-icon">📊</span> Painel
          </Link>
        </nav>

        <div className="sidebar-spacer" />

        {/* Rodapé do Usuário com Menu Flutuante */}
        <div className="sidebar-user-container" ref={menuRef}>
          {menuOpen && (
            <div className="user-popover-menu">
              <div className="popover-header">
                <div className="user-avatar">
                  {getInitials(user?.name || user?.email)}
                </div>
                <div className="user-info">
                  <span className="user-email-subtitle">{user?.name}</span>
                  <span className="user-email-subtitle">{user?.email}</span>
                </div>
              </div>

              <div className="popover-divider" />

              <button
                className="popover-item"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/dashboard/settings");
                }}
              >
                <span className="popover-icon">⚙️</span> Settings
              </button>

              <button className="popover-item logout" onClick={() => signOut()}>
                <span className="popover-icon">🚪</span> Log out
              </button>
            </div>
          )}

          <div
            className="sidebar-user-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="user-avatar">
              {getInitials(user?.name)}
            </div>
            <span className="sidebar-user-name">{user?.name || "Usuário"}</span>
            <span className="sidebar-user-arrow">↕</span>
          </div>
        </div>
      </aside>

      {/* O Outlet injeta a página ativa (Dashboard ou Settings) */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
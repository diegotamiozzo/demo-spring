import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export function Layout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">A</div>
          <span className="sidebar-logo-text">App</span>
        </div>

        <nav>
          <a className="nav-item active" href="#">
            <span className="nav-icon">📊</span> Painel
          </a>
          <a className="nav-item" href="#">
            <span className="nav-icon">📁</span> Projetos
          </a>
          <a className="nav-item" href="#">
            <span className="nav-icon">👥</span> Equipe
          </a>
          <a className="nav-item" href="#">
            <span className="nav-icon">⚙️</span> Configurações
          </a>
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-user">
          <div className="sidebar-user-email">{user?.email}</div>
          <button className="btn-logout" onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}

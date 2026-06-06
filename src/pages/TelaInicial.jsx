import { Link } from "react-router-dom";
import "../styles/TelaInicial.css";

function TelaInicial() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-conteudo">
          <h1>Sistema de Gerenciamento de Certificados</h1>
          <p>Gerencie eventos, participantes e certificados de forma simples e rápida.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <Link to="/eventos" className="card">
          <h2>Eventos</h2>
          <p>Visualizar, adicionar e gerenciar eventos.</p>
        </Link>
        <Link to="/participantes" className="card">
          <h2>Participantes</h2>
          <p>Visualizar, adicionar e gerenciar participantes.</p>
        </Link>
        <Link to="/certificados" className="card">
          <h2>Certificados</h2>
          <p>Visualizar, adicionar e gerenciar certificados.</p>
        </Link>
      </div>
    </div>
  );
}

export default TelaInicial;
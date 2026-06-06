import { Link } from "react-router-dom";
import "../styles/TelaInicial.css";
 
function TelaInicial() {
  return (
    <div className="dashboard">
      <h1>Bem-vindo ao sistema de certificados</h1>
      <p>Gerencie eventos, participantes e certificados do PET Computação.</p>

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
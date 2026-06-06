import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">PET Computação</span>
      <div className="navbar-links">
        <Link to="/">Tela Inicial</Link>
        <Link to="/eventos">Eventos</Link>
        <Link to="/participantes">Participantes</Link>
        <Link to="/certificados">Certificados</Link>
      </div>
    </nav>
  );
}

export default Navbar;
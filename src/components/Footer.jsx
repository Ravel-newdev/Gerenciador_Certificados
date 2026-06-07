import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-coluna">
        <span className="footer-logo">PET Computação</span>
        <span className="footer-sub">UFC — Universidade Federal do Ceará</span>
      </div>

      <div className="footer-coluna">
        <span className="footer-titulo-coluna">Endereço</span>
        <span className="footer-info">Av. Humberto Monte</span>
        <span className="footer-info">UFC, Campus do Pici</span>
        <span className="footer-info">Departamento de Computação</span>
        <span className="footer-info">Bloco 910</span>
        <span className="footer-info">petcomp@ufc.br</span>
      </div>

      <div className="footer-coluna">
        <span className="footer-titulo-coluna">Links para contato</span>
        <a className="footer-link" href="https://pet.dc.ufc.br" target="_blank" rel="noreferrer">Site</a>
        <a className="footer-link" href="https://instagram.com/petcompufc/" target="_blank" rel="noreferrer">Instagram</a>
        <a className="footer-link" href="https://www.linkedin.com/company/pet-computa%C3%A7%C3%A3o-ufc/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>

      <div className="footer-bottom">
        &copy; 2025 PET Computação Todos os direitos reservados
      </div>
    </footer>
  );
}

export default Footer;
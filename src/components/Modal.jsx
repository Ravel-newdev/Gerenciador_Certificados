import "../styles/Modal.css";

function Modal({ titulo, aberto, onFechar, children }) {
  if (!aberto) return null;

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{titulo}</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
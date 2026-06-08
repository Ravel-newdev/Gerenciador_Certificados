import { useState, useEffect } from "react";
import Tabela from "../components/Tabela";

const colunas = [
  { key: "id", label: "ID" },
  { key: "titulo", label: "Título" },
  { key: "texto", label: "Descrição" },
  { key: "data_inicio", label: "Data de Início" },
  { key: "data_fim", label: "Data de Finalização" },
];

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ titulo: "", texto: "", data_inicio: "", data_fim: "" });

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/versao1/eventos/all");
      if (response.ok) {
        const dados = await response.json();
        const dadosFormatados = dados.map((ev) => ({
          ...ev,
          id: ev.id_evento, 
        }));
        setEventos(dadosFormatados);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  function abrirModalCriar() {
    setEditando(null);
    setForm({ titulo: "", texto: "", data_inicio: "", data_fim: "" });
    setModalAberto(true);
  }

  function abrirModalEditar(item) {
    setEditando(item);
    setForm({ titulo: item.titulo, texto: item.texto, data_inicio: item.data_inicio, data_fim: item.data_fim });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditando(null);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editando) {
        await fetch(`http://127.0.0.1:8000/api/versao1/eventos/editar/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      } else {
        await fetch("http://127.0.0.1:8000/api/versao1/eventos/adicionar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      }
      
      carregarEventos(); 
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar evento.");
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Tem certeza que deseja deletar este evento?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/versao1/eventos/${id}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          setEventos(eventos.filter((ev) => ev.id !== id));
        } else {
          alert("Erro ao deletar o evento.");
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }

  return (
    <div className="pagina">
      <div className="pagina-header">
        <h1>Eventos</h1>
        <button className="btn-primario" onClick={abrirModalCriar}>
          + Novo Evento
        </button>
      </div>

      <Tabela
        colunas={colunas}
        dados={eventos}
        onEditar={abrirModalEditar}
        onDeletar={handleDeletar}
      />

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editando ? "Editar Evento" : "Novo Evento"}</h2>
              <button className="modal-fechar" onClick={fecharModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Título
                <input type="text" name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título do evento" required />
              </label>
              <label>
                Descrição
                <input type="text" name="texto" value={form.texto} onChange={handleChange} placeholder="Descrição" required />
              </label>
              <label>
                Data Início
                <input type="date" name="data_inicio" value={form.data_inicio} onChange={handleChange} required />
              </label>
              <label>
                Data Fim
                <input type="date" name="data_fim" value={form.data_fim} onChange={handleChange} required />
              </label>
              <div className="modal-botoes">
                <button type="button" className="btn-secundario" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="btn-primario">
                  {editando ? "Salvar alterações" : "Criar evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Eventos;
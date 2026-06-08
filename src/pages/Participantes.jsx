import { useState, useEffect } from "react";
import Tabela from "../components/Tabela";
import "../styles/Participantes.css";

const colunas = [
  { key: "id", label: "ID" },
  { key: "nome", label: "Nome" },
  { key: "cpf", label: "CPF" },
];

function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", cpf: "" });

  useEffect(() => {
    carregarParticipantes();
  }, []);

  async function carregarParticipantes() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/versao1/participantes/all");
      if (response.ok) {
        const dados = await response.json();
        const dadosFormatados = dados.map((p) => ({
          ...p,
          id: p.id_usuario, 
        }));
        setParticipantes(dadosFormatados);
      }
    } catch (error) {
      console.error("Erro ao buscar participantes:", error);
    }
  }

  function abrirModalCriar() {
    setEditando(null);
    setForm({ nome: "", cpf: "" });
    setModalAberto(true);
  }

  function abrirModalEditar(item) {
    setEditando(item);
    setForm({ nome: item.nome, cpf: item.cpf });
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
        await fetch(`http://127.0.0.1:8000/api/versao1/participantes/editar/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      } else {
        await fetch("http://127.0.0.1:8000/api/versao1/participantes/adicionar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      }
      
      carregarParticipantes(); 
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar participante.");
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Tem certeza que deseja deletar este participante?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/versao1/participantes/${id}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          setParticipantes(participantes.filter((p) => p.id !== id));
        } else {
          alert("Erro ao deletar o participante.");
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }

  return (
    <div className="pagina">
      <div className="pagina-header">
        <h1>Participantes</h1>
        <button className="btn-primario" onClick={abrirModalCriar}>
          + Novo Participante
        </button>
      </div>

      <Tabela
        colunas={colunas}
        dados={participantes}
        onEditar={abrirModalEditar}
        onDeletar={handleDeletar}
      />

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editando ? "Editar Participante" : "Novo Participante"}</h2>
              <button className="modal-fechar" onClick={fecharModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Nome
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  required
                />
              </label>
              <label>
                CPF
                <input
                  type="text"
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </label>
              <div className="modal-botoes">
                <button type="button" className="btn-secundario" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primario">
                  {editando ? "Salvar alterações" : "Criar participante"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Participantes;
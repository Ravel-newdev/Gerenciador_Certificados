import { useState } from "react";
import Tabela from "../components/Tabela";
import "../styles/Participantes.css";

const colunas = [
  { key: "id", label: "ID" },
  { key: "nome", label: "Nome" },
  { key: "cpf", label: "CPF" },
];

const dadosMock = [
  { id: 1, nome: "Max", cpf: "123.456.789-00" },
  { id: 2, nome: "Fernando Trinta", cpf: "987.654.321-00" },
];

function Participantes() {
  const [participantes, setParticipantes] = useState(dadosMock);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", cpf: "" });

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

  function handleSubmit(e) {
    e.preventDefault();
    if (editando) {
      setParticipantes(participantes.map((p) =>
        p.id === editando.id ? { ...p, ...form } : p
      ));
    } else {
      setParticipantes([...participantes, { id: Date.now(), ...form }]);
    }
    fecharModal();
  }

  function handleDeletar(id) {
    if (window.confirm("Tem certeza que deseja deletar este participante?")) {
      setParticipantes(participantes.filter((p) => p.id !== id));
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
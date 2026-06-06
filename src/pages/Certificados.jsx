import { useState, useEffect } from "react";
import Tabela from "../components/Tabela";
import "../styles/Certificados.css"
const colunas = [
  { key: "id", label: "ID" },
  { key: "participante", label: "Participante" },
  { key: "evento", label: "Evento" },
  { key: "carga_horaria", label: "Carga Horária" },
];

const dadosMock = [
  { id: 1, participante: "João Gabriel", evento: "SAC 30", carga_horaria: 20 },
  { id: 2, participante: "Ceres", evento: "Uweb", carga_horaria: 8 },
];

function Certificados() {
  const [certificados, setCertificados] = useState(dadosMock);
  const [modalAberto, setModalAberto] = useState(false);
  const [certificadoEditando, setCertificadoEditando] = useState(null);
  const [form, setForm] = useState({
    id_usuario: "",
    id_evento: "",
    carga_horaria: "",
  });

  function abrirModalCriar() {
    setCertificadoEditando(null);
    setForm({ id_usuario: "", id_evento: "", carga_horaria: "" });
    setModalAberto(true);
  }

  function abrirModalEditar(item) {
    setCertificadoEditando(item);
    setForm({
      id_usuario: item.id_usuario || "",
      id_evento: item.id_evento || "",
      carga_horaria: item.carga_horaria || "",
    });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setCertificadoEditando(null);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (certificadoEditando) {
      // editar certificados
      setCertificados(certificados.map((c) =>
        c.id === certificadoEditando.id ? { ...c, ...form } : c
      ));
    } else {
      // criar certificados
      const novo = { id: Date.now(), participante: "—", evento: "—", ...form };
      setCertificados([...certificados, novo]);
    }
    fecharModal();
  }

  function handleDeletar(id) {
    if (window.confirm("Tem certeza que deseja deletar este certificado?")) {
      setCertificados(certificados.filter((c) => c.id !== id));
    }
  }

  function handlePDF(item) {
    // por enquanto só avisa, implementamos depois
    alert(`Gerar PDF do certificado #${item.id}`);
  }

  return (
    <div className="pagina">
      <div className="pagina-header">
        <h1>Certificados</h1>
        <button className="btn-primario" onClick={abrirModalCriar}>
          + Novo Certificado
        </button>
      </div>

      <Tabela
        colunas={colunas}
        dados={certificados}
        onEditar={abrirModalEditar}
        onDeletar={handleDeletar}
        onPDF={handlePDF}
      />

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{certificadoEditando ? "Editar Certificado" : "Novo Certificado"}</h2>
              <button className="modal-fechar" onClick={fecharModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                ID do Participante
                <input
                  type="number"
                  name="id_usuario"
                  value={form.id_usuario}
                  onChange={handleChange}
                  placeholder="Ex: 1"
                  required
                />
              </label>

              <label>
                ID do Evento
                <input
                  type="number"
                  name="id_evento"
                  value={form.id_evento}
                  onChange={handleChange}
                  placeholder="Ex: 1"
                  required
                />
              </label>

              <label>
                Carga Horária (h)
                <input
                  type="number"
                  name="carga_horaria"
                  value={form.carga_horaria}
                  onChange={handleChange}
                  placeholder="Ex: 20"
                  required
                />
              </label>

              <div className="modal-botoes">
                <button type="button" className="btn-secundario" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primario">
                  {certificadoEditando ? "Salvar alterações" : "Criar certificado"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificados;
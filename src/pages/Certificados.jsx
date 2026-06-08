import { useState, useEffect } from "react";
import Tabela from "../components/Tabela";
import "../styles/Certificados.css";

const colunas = [
  { key: "id", label: "ID" },
  { key: "id_usuario", label: "ID Participante" }, 
  { key: "id_evento", label: "ID Evento" }, 
  { key: "carga_horaria", label: "Carga Horária (h)" },
];

function Certificados() {
  const [certificados, setCertificados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [certificadoEditando, setCertificadoEditando] = useState(null);
  const [form, setForm] = useState({ id_usuario: "", id_evento: "", carga_horaria: "" });

  useEffect(() => {
    carregarCertificados();
  }, []);

  async function carregarCertificados() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/versao1/certificados/all");
      if (response.ok) {
        const dados = await response.json();
        const dadosFormatados = dados.map((cert) => ({
          ...cert,
          id: cert.id_certificado, 
        }));
        setCertificados(dadosFormatados);
      }
    } catch (error) {
      console.error("Erro ao buscar certificados:", error);
    }
  }

  function abrirModalCriar() {
    setCertificadoEditando(null);
    setForm({ id_usuario: "", id_evento: "", carga_horaria: "" });
    setModalAberto(true);
  }

  function abrirModalEditar(item) {
    setCertificadoEditando(item);
    setForm({
      id_usuario: item.id_usuario,
      id_evento: item.id_evento,
      carga_horaria: item.carga_horaria,
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (certificadoEditando) {
    
        await fetch(`http://127.0.0.1:8000/api/versao1/certificados/editar/${certificadoEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Criar - Enviando JSON
        await fetch("http://127.0.0.1:8000/api/versao1/certificados/adicionar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      
      carregarCertificados();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar certificado:", error);
      alert("Erro ao salvar.");
    }
  }

  async function handleDeletar(id) {
    if (window.confirm("Tem certeza que deseja deletar este certificado?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/versao1/certificados/${id}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          setCertificados(certificados.filter((c) => c.id !== id));
        } else {
          alert("Erro ao deletar o certificado.");
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
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
                <input type="number" name="id_usuario" value={form.id_usuario} onChange={handleChange} placeholder="Ex: 1" required />
              </label>
              <label>
                ID do Evento
                <input type="number" name="id_evento" value={form.id_evento} onChange={handleChange} placeholder="Ex: 1" required />
              </label>
              <label>
                Carga Horária (h)
                <input type="number" name="carga_horaria" value={form.carga_horaria} onChange={handleChange} placeholder="Ex: 20" required />
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
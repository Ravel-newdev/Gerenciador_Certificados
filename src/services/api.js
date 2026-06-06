const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// participantes apenas
export async function getParticipantes() {
  const res = await fetch(`${BASE_URL}/participantes`);
  return res.json();
}

export async function criarParticipante(dados) {
  const res = await fetch(`${BASE_URL}/participantes/adicionar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function editarParticipante(id, dados) {
  const res = await fetch(`${BASE_URL}/participantes/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function deletarParticipante(id) {
  const res = await fetch(`${BASE_URL}/participantes/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// vou botar a mesma estrutura para Eventos e Certificados 
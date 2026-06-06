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

// eventos abaixo

export async function getEventos() {
  const res = await fetch(`${BASE_URL}/eventos`);
  return res.json();
}

export async function criarEvento(dados) {
  const res = await fetch(`${BASE_URL}/eventos/adicionar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function editarEvento(id, dados) {
  const res = await fetch(`${BASE_URL}/eventos/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function deletarEvento(id) {
  const res = await fetch(`${BASE_URL}/eventos/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// certificados abaixo

export async function getCertificados() {
  const res = await fetch(`${BASE_URL}/certificados`);
  return res.json();
}

export async function criarCertificado(dados) {
  const res = await fetch(`${BASE_URL}/certificados/adicionar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function editarCertificado(id, dados) {
  const res = await fetch(`${BASE_URL}/certificados/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function deletarCertificado(id) {
  const res = await fetch(`${BASE_URL}/certificados/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
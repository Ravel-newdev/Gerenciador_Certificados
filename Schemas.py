from pydantic import BaseModel

class Evento(BaseModel):
    id: str
    texto: str
    titulo: str
    data_inicio: str
    data_fim: str

class Participante(BaseModel):
    id_participante: str
    cpf: str
    nome: str

class Certificado(BaseModel):
    id: str
    carga_horaria: str
    id_usuario: str
    id_evento: str
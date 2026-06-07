from pydantic import BaseModel
from fastapi import Query
from typing import Annotated
from datetime import date

class Evento(BaseModel):
    texto: str
    titulo: str
    data_inicio: date
    data_fim: date

class Participante(BaseModel):
    cpf: Annotated[str, Query(pattern="^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$")]
    nome: str

class Certificado(BaseModel):
    carga_horaria: int
    id_usuario: int
    id_evento: int


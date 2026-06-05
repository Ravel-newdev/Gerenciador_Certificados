from pydantic import BaseModel
from fastapi import Query
from typing import Annotated
from random import randint

class Evento(BaseModel):
    id: str
    texto: str
    titulo: str
    data_inicio: str
    data_fim: str

class Participante(BaseModel):
    id_participante: str
    cpf: Annotated[str, Query(max_length=11)]
    nome: str

class Certificado(BaseModel):
    id: str
    carga_horaria: str
    id_usuario: str
    id_evento: str
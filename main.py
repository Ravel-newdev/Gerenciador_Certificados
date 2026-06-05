from fastapi import FastAPI
from typing import Any
from fastapi import HTTPException
from random import randint
import Schemas


app = FastAPI(root_path="/api/versao1")
"""
TODO:
-PARTICIPANTE{
-ID
-CPF
-NOME
}
-EVENTO{
-ID
-TEXTO
-TITULO
-DATA_INICIO
-DATA_FIM
}

-CERTIFICADO{
-ID
-CARGA_HORARIA
-ID_PARTICIPANTE
-ID_EVENTO
}
"""

dados: Any=[
    {
        "id_participante":1,
        "CPF":"555.555.555.55",
        "Nome":"Fulano da Silva",

    },
    {   "id_participante":2,
        "CPF":"666.666.666.66",
        "Nome":"Capetilson da Silva",
    }
]

@app.get("/")
async def root():
    return {"message":"Hello World"}


@app.get("/participantes")
async def read_participantes():
    return {"participantes":dados}


@app.get("/participantes/{id}")
async def read_participante(id:int):
    for participante in dados:
        if participante.get("id_participante")== id:
            return {"participantes":participante}
    raise HTTPException(status_code=404)


@app.post("/participantes/adicionar")
async def criar_participante(body: Schemas.Participante):
    novo: Any = body
    dados.append(novo)
    return{"participante":novo}


@app.put("/participantes/editar/{id}")
async def editar_participantes(id: int, body: Schemas.Participante):
    for indice, participante in enumerate(dados):
        if participante.get("id_participante") == id:
            atualizado: Any = body
            dados[indice]= atualizado
            return {"participante":atualizado}
    raise HTTPException(status_code=404)       



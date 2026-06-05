from fastapi import FastAPI
from typing import Any
from fastapi import HTTPException
import Schemas


app = FastAPI(root_path="/api/versao1")
"""
TODO:
-Exclusao participante
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
#refatorar com oop depois, antes de criar certificados e eventos
dados: Any = [
    {
        "id_participante":1,
        "CPF":"555.555.555.55",
        "Nome":"Carlos",

    },
    {   "id_participante":2,
        "CPF":"777.777.777.77",
        "Nome":"Nicolas",
    },
        {   "id_participante":3,
        "CPF":"123.123.123.45",
        "Nome":"Ravel",
    }

]



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
    novo = body
    dados.append(novo)
    return{"participante":novo}


@app.put("/participantes/editar/{id}")
async def editar_participantes(id: int, body: Schemas.Participante):
    for indice, participante in enumerate(dados):
        if participante.get("id_participante") == id:
            atualizado: Schemas.Participante = body
            dados[indice]= atualizado
            return {"participante":atualizado}
    raise HTTPException(status_code=404)       



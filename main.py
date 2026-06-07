from fastapi import FastAPI, Depends
from typing import Any, Annotated
from fastapi import HTTPException
import Schemas
from Model import engine, SQLModel, create_table_and_bd, get_session, Session, Usuario, select
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

SessionDep = Annotated[Session, Depends(get_session)]

@app.get("/participantes")
async def read_participantes(session: SessionDep):
    pass
    


@app.get("/participantes/{id}")
async def read_participante(id:int, session: SessionDep):
    try:
        declaracao = select(Usuario).where(Usuario.id == id)
        dado = session.exec(declaracao)
        
    except:
        raise HTTPException(status_code=404)
    else:
        return dado


@app.post("/participantes/adicionar")
async def criar_participante(usuario: Schemas.Participante, session: SessionDep):
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    session.close()
    return usuario


@app.put("/participantes/editar/{id}")
async def editar_participantes(id: int, body: Schemas.Participante, session: SessionDep):
    
    
    raise HTTPException(status_code=404)       



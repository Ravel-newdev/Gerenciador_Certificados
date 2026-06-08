from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Response,HTTPException
from json import JSONEncoder # pyright: ignore[reportUnusedImport]
from typing import Any, Annotated # pyright: ignore[reportUnusedImport]
import Schemas
import os

import pathlib
from fastapi.responses import FileResponse
from Model import engine, SQLModel, create_table_and_bd, get_session, Session, Usuario, select, Evento, Certificado # pyright: ignore[reportUnusedImport]
from contextlib import asynccontextmanager




    
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

@asynccontextmanager
async def lifespan(app:FastAPI):
    create_table_and_bd(engine)
    with Session(engine) as session:
        if not session.exec(select(Usuario)).first():
            session.add_all([ 
                Usuario(cpf="1234",nome="Nicolas"),
                Usuario(cpf="5678",nome="vinicius")
                
            ])
    yield


app = FastAPI(root_path="/api/versao1", lifespan=lifespan)

@app.get("/certificados/all")
async def certificados(id_usuario: int, id_evento: int, session: SessionDep):
    try:
        statement = select(Certificado).where(Certificado.id_usuario == id_usuario and Certificado.id_evento == id_evento)
        queries = session.exec(statement)
        certificadosDoUsuario = queries.all()

    except:
        return HTTPException(status_code=404)
    
    else:
        return certificadosDoUsuario

@app.get("/eventos/all")
async def eventos(session: SessionDep):
    try:
        statement = select(Evento)
        object_eventos = session.exec(statement)
        events = object_eventos.all()
        
    except:
        return HTTPException(status_code=404)
    
    else:
        return events

@app.put("/eventos/editar/{id}")
async def editar_eventos(id: int, evento: Schemas.Evento, session: SessionDep):
    try:
        statement = select(Evento).where(Evento.id == id)
        events = session.exec(statement)
        event = events.one()
        event.texto = evento.texto
        event.titulo = evento.titulo
        event.data_inicio = evento.data_inicio
        event.data_fim = evento.data_fim
        session.add(event)
        session.commit()
        session.close()

    except:
        return HTTPException(status_code=404)
    

@app.put("/certificados/editar")
async def editar_certificado(id: int, session: SessionDep, certificado: Schemas.Certificado):
    try:
        certificado_que_quero_editar = session.get(Certificado, id)
        certificado_que_quero_editar.id_usuario = certificado.id_usuario
        certificado_que_quero_editar.id_evento = certificado.id_evento
        session.add(certificado_que_quero_editar)
        session.commit()
        session.close()
    
    except:
        return HTTPException(status_code=404)

    

@app.post("/certificados/adicionar")
async def adicionar_certificado(certificado: Schemas.Certificado, session: SessionDep):
    try:
        objeto_certificado = Certificado.model_validate(certificado)
        session.add(objeto_certificado)
        session.commit()

    except:
        raise HTTPException(status_code=404)

@app.get("/participantes/all")
async def read_participantes(session: SessionDep):
    try:
        statement = select(Usuario)
        users = session.exec(statement)
        lista_usuarios = users.all()
        
    except:
        raise HTTPException(status_code=500)

    else:
        return lista_usuarios


@app.get("/participantes/{id}")
async def read_participante(id:int, session: SessionDep):
    try:
        declaracao = select(Usuario).where(Usuario.id == id)
        dado = session.exec(declaracao)
        dado = dado.one()
        
    except:
        raise HTTPException(status_code=404)
    else:
        return dado


@app.post("/participantes/adicionar")
async def criar_participante(usuario: Schemas.Participante, session: SessionDep):
    try:
        usuario_db = Usuario.model_validate(usuario)
        session.add(usuario_db)
        session.commit()
        session.refresh(usuario_db)
    except Exception as e:
        print(e)
        session.rollback()
        raise HTTPException(status_code=500, detail="Erro ao salvar no banco")
    else:
        return usuario_db


@app.put("/participantes/editar/{id}")
async def editar_participantes(id: int, usuario: Schemas.Participante, session: SessionDep):
    try:
        statement = select(Usuario).where(Usuario.id == id)
        users = session.exec(statement)
        user = users.one()
        user.nome = usuario.nome
        user.cpf = usuario.cpf
        session.add(user)
        session.commit()
        session.close()
    except:
        raise HTTPException(status_code=404)
      
@app.delete("/participantes/{id}")
async def deletar_participante(id:int, usuario: Schemas.Participante, session: SessionDep):
    try:
        declaracao = select(Usuario).where(Usuario.id == id)
        dado = session.exec(declaracao)
        del dado #deleta objeto
        return Response (status_code=204)
        
    except:
        raise HTTPException(status_code=404)


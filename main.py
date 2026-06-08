from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends,HTTPException
from typing import Annotated
import Schemas
from fastapi.middleware.cors import CORSMiddleware
from Model import engine, create_table_and_bd, get_session, Session, Usuario, select, Evento, Certificado 




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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/eventos/all")
async def eventos(session: SessionDep):
    try:
        statement = select(Evento)
        object_eventos = session.exec(statement)
        events = object_eventos.all()
        
    except Exception as e:
        print("Erro ao buscar todos os eventos: ", e)
        return HTTPException(status_code=404)
    
    else:
        return events

@app.put("/eventos/editar/{id}")
async def editar_eventos(id: int, evento: Schemas.Evento, session: SessionDep):
    try:
        event = session.get(Evento, id)
        
        if not event:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
            
        event.texto = evento.texto
        event.titulo = evento.titulo
        event.data_inicio = evento.data_inicio
        event.data_fim = evento.data_fim
        
        session.add(event)
        session.commit()
        return event
    except Exception as e:
        print("Erro ao editar evento:", e)
        raise HTTPException(status_code=500, detail="Erro interno ao editar")
        
@app.post("/eventos/adicionar")
async def criar_evento(evento: Schemas.Evento, session: SessionDep):
    try:
        evento_db = Evento.model_validate(evento)
        session.add(evento_db)
        session.commit()
        session.refresh(evento_db)
        return evento_db
    except Exception as e:
        print("Erro ao salvar evento:", e)
        session.rollback()
        raise HTTPException(status_code=500, detail="Erro ao salvar no banco")

@app.delete("/eventos/{id}")
async def deletar_evento(id: int, session: SessionDep):
    try:
        dado = session.get(Evento, id)
        if not dado:
            raise HTTPException(status_code=404, detail="Evento não encontrado")
            
        session.delete(dado)
        session.commit()
        from fastapi import Response 
        return Response(status_code=204)
    except Exception as e:
        print("Erro ao deletar evento:", e)
        raise HTTPException(status_code=500, detail="Erro interno ao deletar")
    

@app.get("/certificados/all")
async def ler_certificados(session: SessionDep):
    try:
        statement = select(Certificado)
        certificados_db = session.exec(statement).all()
        return certificados_db
    except Exception as e:
        print("Erro ao buscar certificados:", e)
        raise HTTPException(status_code=500, detail="Erro ao buscar certificados")

@app.post("/certificados/adicionar")
async def adicionar_certificado(certificado: Schemas.Certificado, session: SessionDep):
    try:
        objeto_certificado = Certificado.model_validate(certificado)
        session.add(objeto_certificado)
        session.commit()
        session.refresh(objeto_certificado)
        return objeto_certificado
    except Exception as e:
        print("Erro ao adicionar certificado:", e)
        session.rollback()
        raise HTTPException(status_code=500, detail="Erro ao adicionar")

@app.put("/certificados/editar/{id}")
async def editar_certificado(id: int, certificado: Schemas.Certificado, session: SessionDep):
    try:
        cert = session.get(Certificado, id)
        if not cert:
            raise HTTPException(status_code=404, detail="Certificado não encontrado")
            
        cert.id_usuario = certificado.id_usuario
        cert.id_evento = certificado.id_evento
        cert.carga_horaria = certificado.carga_horaria
        
        session.add(cert)
        session.commit()
        session.refresh(cert)
        return cert
    except Exception as e:
        print("Erro ao editar certificado:", e)
        raise HTTPException(status_code=500, detail="Erro interno ao editar")

@app.delete("/certificados/{id}")
async def deletar_certificado(id: int, session: SessionDep):
    try:
        cert = session.get(Certificado, id)
        if not cert:
            raise HTTPException(status_code=404, detail="Certificado não encontrado")
            
        session.delete(cert)
        session.commit()
        from fastapi import Response
        return Response(status_code=204)
    except Exception as e:
        print("Erro ao deletar certificado:", e)
        raise HTTPException(status_code=500, detail="Erro interno ao deletar")

@app.get("/participantes/all")
async def read_participantes(session: SessionDep):
    try:
        statement = select(Usuario)
        users = session.exec(statement)
        lista_usuarios = users.all()
        
    except Exception as e:
        print("Erro ao buscar participantes: ", e)
        raise HTTPException(status_code=500)

    else:
        return lista_usuarios


@app.get("/participantes/{id}")
async def read_participante(id:int, session: SessionDep):
    try:
        declaracao = select(Usuario).where(Usuario.id == id)
        dado = session.exec(declaracao)
        dado = dado.one()
        
    except Exception as e:
        print("Erro ao buscar participante: ", e)
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
        #statement = select(Usuario).where(Usuario.id == id)
        #users = session.exec(statement)
        #user = users.one()
        user = session.get(Usuario, id)
        user.nome = usuario.nome
        user.cpf = usuario.cpf
        session.add(user)
        session.commit()
        session.close()
    except Exception as e:
        print("Erro ao editar participante: ", e)
        raise HTTPException(status_code=404)
      
@app.delete("/participantes/{id}")
async def deletar_participante(id:int, session: SessionDep):
    try:
        dado = session.get(Usuario, id)
        session.delete(dado)
        session.commit()
        
    except Exception as e:
        print("Erro ao deletar participante: ", e)
        raise HTTPException(status_code=404)


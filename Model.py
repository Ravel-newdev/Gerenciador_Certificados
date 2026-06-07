from fastapi import Depends
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated
from uuid import UUID
from datetime import date
import Schemas



class Usuario(SQLModel, Schemas.Participante, table=True):
    id_usuario: int | None = Field(default=None ,description="id do usuario", primary_key=True)
    CPF: str = Field (index=True)
    Nome: str = Field (index=True)


class Evento(SQLModel, Schemas.Evento, table=True):
    id_evento: int | None = Field(primary_key=True)

class Certificado(SQLModel, Schemas.Certificado, table=True):
    id_certificado: int | None = Field(primary_key=True)

postgre_file_name="database.db"
postgre_url=f"postgresql://{postgre_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(postgre_url,echo=True)

def create_table_and_bd(engine):
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session




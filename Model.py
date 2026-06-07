from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated
from uuid import UUID
from datetime import date



class Usuario(SQLModel, table=True):
    id: UUID = Field(description="id do usuario", primary_key=True)
    nome: str = Field(description="Nome do usuario")
    cpf: str = Field(description="cpf do usuario", regex="^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$")


class Evento(SQLModel, table=True):
    id: UUID = Field(primary_key=True)
    titulo: str = Field()
    descricao: str = Field()
    data_inicio: date = Field()
    data_fim: date = Field()


class Certificado(SQLModel, table=True):
    id: UUID = Field(primary_key=True)
    carga_horaria: int = Field() 
    data_de_inicio: date = Field()
    data_do_fim: date = Field()



engine = create_engine(echo=True)

def create_table_and_bd(engine):
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session





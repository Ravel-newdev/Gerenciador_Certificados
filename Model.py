from fastapi import Depends
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated
from uuid import UUID
from datetime import date
import os 
from dotenv import load_dotenv
import Schemas

load_dotenv(".env")


USUARIO = os.getenv("USUARIO")
SENHA = os.getenv("SENHA")  # Substitua pela senha que você criou na instalação do MySQL
HOST = os.getenv("HOST")       # O banco está rodando no seu próprio computador
PORTA = os.getenv("PORTA")          # A porta padrão do MySQL
BANCO = os.getenv("BANCO") # O nome do banco que criamos no Passo 2

# Monta a URL de conexão
mysql_url = f"mysql+pymysql://{USUARIO}:{SENHA}@{HOST}:{PORTA}/{BANCO}"

class Usuario(SQLModel, table=True):
    id_usuario: int | None = Field(default=None ,description="id do usuario", primary_key=True)
    cpf: str = Field(index=True)
    nome: str = Field(index=True)


class Evento(SQLModel, table=True):
    id_evento: int | None = Field(primary_key=True)
    texto: str
    titulo: str
    data_inicio: date
    data_fim: date

class Certificado(SQLModel, table=True):
    id_certificado: int | None = Field(primary_key=True)
    carga_horaria: int
    id_usuario: int
    id_evento: int


engine = create_engine(mysql_url,echo=True)

def create_table_and_bd(engine):
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session




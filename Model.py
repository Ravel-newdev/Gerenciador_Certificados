from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated
from uuid import UUID
from datetime import date
import Schemas



class Usuario(SQLModel, Schemas.Participante, table=True):
    id: int | None = Field(description="id do usuario", primary_key=True)


class Evento(SQLModel, Schemas.Evento, table=True):
    id: int | None = Field(primary_key=True)

class Certificado(SQLModel, Schemas.Certificado, table=True):
    id: int | None = Field(primary_key=True)


engine = create_engine(echo=True)

def create_table_and_bd(engine):
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session



# PET Certificados- Sistema web de gerenciamento de certificados, participantes e eventos
>## projeto direcionado para o Processo seletivo do PET da Computação da Universidade Federal do Ceára



## Tecnologias e Ferramentas:

-**Frontend:** React , Javascript

-**Backend (API REST):** FastApi , python

-**Banco de Dados:** PostgreSQL

-**Validação dos dados:** Pydantic

-**ORM/Banco de dados**: SQLmodel

-**Ferramentas de Design:** Figma


## funcionalidades:
**Frontend**: 
. eventos - Checar, listar ,adicionar ,modificar dados dos eventos e remover

. Participantes - Checar, listar ,adicionar ,modificar dados dos participantes e remover

. Certificados -  Checar,adicionar ,remover ,listar e modificar os dados

**Backend**:
. vai por meio do FastApi criar Endpoints para enviar, consultar, atualizar e deletar dados

. Persistir dados dos Eventos, Participantes e Certificados no banco de dados

## Como Rodar o Projeto Localmente:

### Pré-requisitos:
* Python 3.10 ou superior instalado
* Instância ativa do PostgreSQL com tabelas edital importadas

### Passo a Passo:

1. **Clonar o repositório:**
```bash
   git clone https://github.com/Ravel-newdev/Gerenciador_Certificados.git
   cd Gerenciador_Certificados
```
Configurar e Ativar o Backend:

primeiro você acessa a pasta do backend, então cria o espaço virtual denominado venv, depois disso vai instalar as dependências necessarias ,proprias do requerimentos.txt , entao vai ligar o servidor de desenvolvimento para API rodar

```Bash
   cd backend

   python -m venv venv
   .\venv\Scripts\activate 
   pip install -r requirements.txt
   uvicorn main:app --reload
````


Configurar e Ativar o Frontend:
primeiro abri o arquivo do frontend , entao instala as dependencias do arquivo package.json , então inicia o servidor de desenvolvimento local

## Passo a Passo

   ```bash
   cd frontend
   npm install 
   npm start
   ```



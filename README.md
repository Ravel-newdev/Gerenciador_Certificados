<<<<<<< HEAD
# PET Certificados- Sistema web de gerenciamento de certificados, participantes e eventos
>## projeto direcionado para o Processo seletivo do PET da Computação da Universidade Federal do Ceára



## Tecnologias e Ferramentas:

-**Frontend:** React , Javascript

-**Backend (API REST):** FastApi , python

-**Banco de Dados:** MySQL(Base de dados `banco_ps`)

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
* MySKL
* Nodejs

### Passo a Passo:

1. **Clonar o repositório:**
```bash
   git clone https://github.com/Ravel-newdev/Gerenciador_Certificados.git
   cd Gerenciador_Certificados
```

2. Configurar o Banco de dados:
Crie um banco de dados denominado banco_ps no seu MySQL
Importe e depois execute o script SQL fornecido pelo PET,
crie um arquivo .env no backend e coloque essa informações:
USUARIO = seu usuario do MySKL
SENHA = sua senha do MySQL 
HOST = localhost      
PORTA = 3306         
BANCO = banco_ps

4. Configurar e Ativar o Backend:

primeiro no seu terminal do proprio windows ou no aplicativo de programação que você usa, irá acessar a pasta do backend, então cria o espaço virtual denominado venv, depois disso vai  ativa-lo e instalar as dependências necessarias ,proprias do requerimentos.txt , entao vai ligar o servidor de desenvolvimento(Uvicorn) para API rodar

```Bash
   cd backend
   
   python -m venv venv
   .\venv\Scripts\activate 
   pip install -r requirements.txt
   uvicorn main:app --reload
````


4. Configurar e Ativar o Frontend:
primeiro por meio de outro terminal , irá abrir o arquivo do frontend , entao instala as dependencias do arquivo package.json , então inicia o servidor de desenvolvimento local do react

## codigo

   ```bash
   cd frontend
   npm install
   npm build
   npm start
   ```

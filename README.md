<<<<<<< HEAD
# PET Certificados- Sistema web de gerenciamento de certificados, participantes e eventos
>## projeto direcionado para o Processo seletivo do PET da Computação da Universidade Federal do Ceára

##Participantes:
| Nome | Cargo | GitHub |
|---|---|---|
| Ravel Costa | Lider de equipe  Desenvolvedor Front-end | [@Ravel-newdev](https://github.com/Ravel-newdev) |
| Vinicius Viana | Desenvolvedor Back-end | [@Menemakerson](https://github.com/Menemakerson) |
| Nicolas de Sena | Desenvolvedor Back-end | [@Nicomincer](https://github.com/Nicomincer) |
| Carlos Eduardo | Estagiario Front-end | [@jouty-dev](https://github.com/jouty-dev) |



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

   ```bash
   cd frontend
   npm install
   npm build
   npm start
   ```


## Routes
todos possuem todos os endpoints possuem /api/versao1
###Endpoints:
GET /participantes/all — mostra a lista de participantes
GET /participantes/{id} — procura os dados de um determinado participante por meio do ID 
POST /participantes/adicionar — Cria um novo participante (passando por validação)
PUT /participantes/editar/{id} — edita nome ou CPF de um participante
DELETE /participantes/{id} — Remove um partipante atraves do ID dele
GET /eventos/all — mostra a lista de eventos salvos.
POST /eventos/adicionar — Registra um novo evento junto das suas informações(nome, texto, data de início e fim)
PUT /eventos/editar/{id} — edita as informações dos eventos atraves do ID
DELETE /eventos/{id} — deleta um evento do banco de dados.
GET /certificados/all — mostra a lista de certificados do sistema.
POST /certificados/adicionar — adiciona um certificado com suas informações(a carga horaria, o ID do usuário e o ID do evento).
PUT /certificados/editar/{id} — edita alguma informação do certificado especifico pelo ID
DELETE /certificados/{id} — Remove um certificado do sistema através do ID

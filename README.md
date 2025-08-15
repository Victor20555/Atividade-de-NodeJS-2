# Projeto de API Node.js

## Sobre

Este é um projeto de API Node.js que implementa autenticação e gerenciamento de usuários usando Express.js e TypeScript.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- JWT para autenticação
- Prisma (presumido com base na estrutura do projeto)

## Instalação

```bash
# Clone o repositório
git clone [sua-url-do-repositório]

# Navegue até o diretório do projeto
cd Atividade-de-NodeJS-2

# Instale as dependências
npm install
```

## Configuração

```bash
# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Execute as migrações do banco de dados
npm run prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

## Rotas Disponíveis

### Rotas Públicas

- `POST /users` - Registrar um novo usuário
- `POST /sessions` - Autenticar usuário e obter token JWT

### Rotas Protegidas

- `GET /me` - Obter perfil do usuário autenticado (requer token JWT)

## Autenticação

Para acessar rotas protegidas, inclua o token JWT no cabeçalho Authorization:

```
Authorization: Bearer seu-token-jwt
```

## Desenvolvimento

```bash
# Executar testes
npm run test

# Build do projeto
npm run build
```



# Deploy da Aplicação com Docker Compose + Coolify

Este projeto utiliza **Docker Compose** para orquestrar os serviços da aplicação e o **Coolify** como plataforma de deploy.

Como o Coolify já possui um **Reverse Proxy** integrado (Traefik), **não é necessário mapear portas utilizando `ports`**. Os serviços apenas expõem suas portas internamente através da diretiva `expose`, permitindo a comunicação entre containers e o roteamento externo realizado pelo Coolify.

---

## Docker Compose

```yaml
services:
  server:
    build:
      context: .
      dockerfile: Dockerfile

    environment:
      NODE_ENV: production
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USER: ${DB_USER}
      DB_PASS: ${DB_PASS}
      DB_NAME: ${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-24h}
      CORS_ORIGIN: ${CORS_ORIGIN:-*}
      CIGAM_API_BASE_URL: ${CIGAM_API_BASE_URL:-}
      CIGAM_API_TOKEN: ${CIGAM_API_TOKEN:-}

    expose:
      - "3000"

    volumes:
      - uploads_data:/app/uploads

    restart: unless-stopped

  web:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_URL: ${VITE_API_URL:-/api/v1}

    expose:
      - "80"

    depends_on:
      - server

    restart: unless-stopped

volumes:
  uploads_data:
```

---

## Estrutura dos Serviços

### Backend (`server`)

Responsável pela API de integração com o sistema Cigam.

**Configurações:**

- Build realizado através do `Dockerfile` na raiz do projeto
- Executa as migrations do Sequelize automaticamente antes da inicialização
- Inicia a aplicação Node.js na porta **3000**
- Persiste arquivos de upload no volume `uploads_data`
- Possui healthcheck na rota `/health`

Comando executado durante a inicialização:

```bash
npx sequelize db:migrate && node dist/server.js
```

---

### Frontend (`web`)

Responsável pela interface da aplicação.

**Configurações:**

- Build realizado através do diretório `./frontend`
- Servido via **Nginx** na porta **80**
- Faz proxy reverso de `/api/` para `server:3000`
- SPA configurada com fallback para `index.html`

A variável de build utilizada é:

```env
VITE_API_URL=/api/v1
```

Como ambos os containers pertencem à mesma rede criada pelo Docker Compose, o hostname `server` é resolvido automaticamente.

---

## Banco de Dados

O banco de dados **PostgreSQL** é gerenciado externamente pelo Coolify (serviço de banco de dados gerenciado).

As variáveis de conexão devem ser configuradas no Coolify e injetadas no serviço `server`:

```env
DB_HOST=host-do-banco
DB_PORT=5432
DB_USER=usuario
DB_PASS=senha
DB_NAME=nome-do-banco
```

---

## Por que utilizar `expose`?

No Coolify, o acesso externo é realizado através do Reverse Proxy (Traefik).

Por esse motivo, **não é necessário utilizar `ports`**.

### Correto

```yaml
expose:
  - "3000"
```

### Evite

```yaml
ports:
  - "3000:3000"
```

Utilizando `expose`:

- o serviço permanece acessível apenas para outros containers;
- evita conflitos de portas no servidor;
- deixa o gerenciamento de acesso externo sob responsabilidade do Coolify;
- melhora a organização do ambiente.

---

## Comunicação entre os Containers

A comunicação ocorre utilizando o nome do serviço definido no Docker Compose.

Exemplo:

```text
server:3000
```

Não é necessário utilizar:

- IP do servidor
- localhost
- domínio público

O Docker realiza essa resolução automaticamente.

---

## Variáveis de Ambiente

Configure no Coolify as seguintes variáveis:

```env
# Database (fornecido pelo serviço gerenciado do Coolify)
DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=

# Segurança
JWT_SECRET=
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=*

# API Cigam
CIGAM_API_BASE_URL=https://api.cigam.com.br
CIGAM_API_TOKEN=

# Frontend
VITE_API_URL=/api/v1
```

Exemplo:

```env
DB_HOST=postgres.internal
DB_PORT=5432
DB_USER=integracao_cigam
DB_PASS=senha-segura-aqui
DB_NAME=integracao_cigam
JWT_SECRET=minha-chave-secreta-jwt
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://meudominio.com.br
CIGAM_API_BASE_URL=https://api.cigam.com.br
CIGAM_API_TOKEN=meu-token-cigam
VITE_API_URL=/api/v1
```

---

## Fluxo de Inicialização

Quando o deploy é iniciado, o processo ocorre na seguinte ordem:

1. Build da imagem do Backend
2. Build da imagem do Frontend
3. Inicialização do Backend
4. Execução das migrations do Sequelize
5. Inicialização da API (healthcheck valida a rota `/health`)
6. Inicialização do Frontend (Nginx)
7. Coolify configura automaticamente o domínio e o HTTPS

---

## Boas Práticas

- Utilize sempre variáveis de ambiente para informações sensíveis.
- Nunca exponha portas utilizando `ports` quando estiver utilizando o proxy do Coolify.
- Execute as migrations automaticamente durante o deploy.
- Utilize `restart: unless-stopped` para garantir a recuperação automática dos containers.
- Configure o banco de dados como serviço gerenciado no Coolify, não dentro do docker-compose.

---

## Estrutura do Projeto

```
integracao-cigam/
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── src/                  # Código fonte do backend
├── frontend/             # Código fonte do frontend
│   ├── Dockerfile
│   └── src/
└── deploy.md
```

---

## Benefícios desta abordagem

- Deploy simplificado no Coolify.
- Sem necessidade de abrir portas manualmente.
- Comunicação interna segura entre containers.
- Compatível com o Reverse Proxy do Coolify.
- HTTPS configurado automaticamente pelo Coolify.
- Banco de dados gerenciado separadamente (mais seguro e escalável).
- Estrutura simples e escalável para ambientes de produção.

# Engenharia Reversa — Módulo Boleto

## O que é o Módulo

Sistema de gerenciamento de PDFs de boletos (payment slips brasileiros). Permite upload, download e consulta de boletos em PDF vinculados a clientes. Integra com sistema externo "botnext" que consome os endpoints. Não há gateway de pagamento — é apenas armazenamento e recuperação de arquivos.

---

## Arquitetura

```
HTTP Request
    ↓
boletoRouter.js              (Express Router → /api/v1/boletos/*)
    ↓  loginRequired middleware (JWT auth)
boletoController.js          (handlers HTTP, upload/download com multer)
    ↓  multerBoletoCigam.js  (config upload PDF — só aceita .pdf)
    ↓  clienteService        (validação de cliente no upload)
boletoService.js             (lógica de negócio, validação)
    ↓
boletoRepository.js          (acesso a dados, herda boletoInterface.js)
    ↓
boletoModel.js               (Sequelize Model → tabela "boletos")
    ↓  belongsTo Cliente (FK: id_cliente, CASCADE delete)
database/index.js            (inicialização Sequelize)
    ↓
SQLite (dev) / PostgreSQL (prod)
```

**Stack**: Node.js + Express 5 + Sequelize 6 + Awilix (DI) + Multer (upload)

---

## Arquivos do Módulo

| Camada | Arquivo | Responsabilidade |
|--------|---------|-----------------|
| **Model** | `src/models/boletoModel.js` | Schema da tabela `boletos` |
| **Interface** | `src/interfaces/boletoInterface.js` | Contrato abstrato (incompleto) |
| **Repository** | `src/repositories/boletoRepository.js` | Queries Sequelize |
| **Service** | `src/services/boletoService.js` | Lógica de negócio e validação |
| **Controller** | `src/controllers/boletoController.js` | Handlers HTTP (CRUD + upload/download) |
| **Router** | `src/routers/boletoRouter.js` | Definição de rotas + Swagger docs |
| **Config Upload** | `src/config/multerBoletoCigam.js` | Configuração Multer para PDFs |
| **Migration** | `src/migrations/20250917144818-create-boleto.cjs` | Criação da tabela |
| **DI Container** | `src/di/container.js` (linhas 19-21, 42-44) | Registro de dependências |
| **App** | `src/app.js` (linhas 15, 52) | Montagem da rota base |

---

## Modelo de Dados (Tabela `boletos`)

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | INTEGER | PK auto-increment | PK |
| `id_cliente` | INTEGER | FK → `clientes.id` | CASCADE on delete |
| `contato` | STRING | Nome do contato | NOT NULL, unique |
| `cnpj_cliente` | STRING | CNPJ do cliente | NOT NULL, unique |
| `nome_arquivo` | STRING | Nome do arquivo salvo (com timestamp) | NOT NULL, unique |
| `nome_original_arquivo` | STRING | Nome original do upload | NOT NULL, unique |
| `telefone` | STRING | Telefone | NOT NULL |
| `data_recebimento` | DATE | Data que o boleto foi recebido | Nullable |
| `data_tentativa` | DATE | Data da tentativa de entrega (botnext) | Nullable |
| `created_at` | DATE | Timestamp de criação | Auto |
| `updated_at` | DATE | Timestamp de atualização | Auto |

**Relação**: `Boleto belongsTo Cliente` via `id_cliente`

---

## Endpoints

Base URL: `/api/v1/boletos`

Todos os endpoints (exceto heartbeat) requerem JWT via header `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/heartbeat` | Health check (sem auth) |
| GET | `/find-all` | Lista todos os boletos (?limit=&order=) |
| GET | `/find-by-id-customer/:id` | Busca boleto por ID do cliente (findOne) |
| GET | `/find-all-by-id-customer/:id` | Lista todos os boletos de um cliente |
| POST | `/create` | Cria novo registro de boleto |
| POST | `/upload/:id/:contato/:cnpj_cliente/:telefone` | Upload de PDF do boleto |
| GET | `/download/:id/:nomeArquivo` | Download do PDF do boleto |
| PUT | `/update/:id` | Atualiza datas (data_recebimento, data_tentativa) |

---

## Fluxos

### Upload de Boleto
```
1. POST /upload/:id/:contato/:cnpj_cliente/:telefone (multipart/form-data)
2. Multer valida: apenas application/pdf
3. Arquivo salvo em src/uploads/pdfs/{id_cliente}/
4. Nome: {Date.now()}_{random4digitos}.pdf
5. Valida se cliente existe (clienteService.findById)
6. Cria registro Boleto no banco
7. Retorna URL do arquivo
```

### Download de Boleto
```
1. GET /download/:id/:nomeArquivo
2. Busca Boleto por id + nomeArquivo
3. Monta caminho: src/uploads/pdfs/{id}/{filename}
4. Envia como application/pdf (Content-Disposition: attachment)
```

### Integração Externa
- **botnext**: Sistema externo que consome os endpoints de upload/download
- A integração é do lado do consumidor (botnext chama esta API)

---

## Bugs Encontrados no Módulo

| # | Severidade | Arquivo | Problema |
|---|-----------|---------|----------|
| 1 | **Crítico** | `boletoController.js:27,34` | Usa `boletoGer` (não importado) em vez de `logger` → ReferenceError em runtime |
| 2 | **Médio** | `boletoRouter.js:188,215` | Rota `/download/:id/:nomeArquivo` definida duas vezes |
| 3 | **Médio** | `boletoRouter.js` | Swagger docs: upload e download documentados como `delete` |
| 4 | **Médio** | `boletoInterface.js` | Incompleta: falta `findById`, `findAllByIdCustomer`, `findByFileName`, `update` |
| 5 | **Médio** | `boletoModel.js` | Unique constraints em `contato`, `cnpj_cliente`, `nome_arquivo` impedem múltiplos boletos |
| 6 | **Médio** | `boletoModel.js` | Associação assimétrica: Cliente não define `hasMany(Boleto)` |
| 7 | **Médio** | `boletoModel.js` | Importa `bcryptjs` sem usar |
| 8 | **Médio** | `20250917144818-create-boleto.cjs:70` | `down()` dropa tabela `logs` em vez de `boletos` |
| 9 | **Baixo** | `boletoController.js:120-137` | Código comentado (lógica de substituição de arquivo) |

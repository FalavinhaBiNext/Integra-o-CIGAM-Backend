# Fluxo de Integração — Envio de Boletos

## Visão Geral

Para enviar um boleto ao sistema, o cliente precisa:

1. **Autenticar-se** → obter um token JWT
2. **Enviar o boleto** → upload do PDF + dados

Base URL: `https://<servidor>/api/v1`

---

## 1. Autenticação

### Requisição

```
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "usuario@empresa.com",
  "senha": "123456"
}
```

### Resposta (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "João Silva",
    "email": "joao@empresa.com",
    "role": "ADMIN",
    "company_id": "550e8400-e29b-41d4-a716-446655440001"
  }
}
```

O `token` deve ser enviado em **todas as requisições seguintes** no header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Possíveis erros

| Status | Mensagem |
|--------|----------|
| 400 | `Dados invalidos.` — e-mail inválido ou senha com menos de 6 caracteres |
| 401 | `E-mail ou senha invalidos.` |
| 401 | `Esta empresa esta inativa na plataforma. Contate o suporte.` |

---

## 2. Envio do Boleto

### Requisição

```
POST /api/v1/boletos/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| `file` | ✅ | Arquivo PDF do boleto (máx. 10 MB) |
| `company_id` | ✅ | UUID da empresa |
| `cnpj_cliente` | ✅ | CPF ou CNPJ do cliente |
| `empresa` | ✅ | Nome do cliente/empresa |
| `telefone` | ✅ | Telefone de contato |
| `contato` | ✅ | Nome do contato |
| `num_lancamento` | ✅ | Número do lançamento (ex: LAN-001) |
| `vencimento` | ❌ | Data de vencimento (ex: 2026-08-15) |
| `valor` | ❌ | Valor do boleto (ex: 1500.00) |
| `codigo_empresa` | ❌ | Código interno |
| `data_recebimento` | ❌ | Data de recebimento (ex: 2026-07-10) |

### Exemplo com cURL

```bash
curl -X POST https://<servidor>/api/v1/boletos/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@boleto.pdf" \
  -F "company_id=550e8400-e29b-41d4-a716-446655440001" \
  -F "cnpj_cliente=12345678000190" \
  -F "empresa=Cliente XYZ Ltda" \
  -F "telefone=11999999999" \
  -F "contato=Maria Souza" \
  -F "num_lancamento=LAN-2026-001" \
  -F "vencimento=2026-08-15" \
  -F "valor=1500.00"
```

### Resposta (201)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "company_id": "550e8400-e29b-41d4-a716-446655440001",
  "cnpj_cliente": "12345678000190",
  "empresa": "Cliente XYZ Ltda",
  "telefone": "11999999999",
  "contato": "Maria Souza",
  "nome_arquivo": "1712345678901_abc123.pdf",
  "num_lancamento": "LAN-2026-001",
  "vencimento": "2026-08-15T00:00:00.000Z",
  "valor": "1500.00",
  "codigo_empresa": null,
  "data_recebimento": null,
  "active": true,
  "created_at": "2026-07-10T20:30:00.000Z",
  "updated_at": "2026-07-10T20:30:00.000Z"
}
```

### Possíveis erros

| Status | Mensagem |
|--------|----------|
| 400 | `Nenhum arquivo enviado.` |
| 400 | `Dados inválidos.` — campos obrigatórios faltando ou formato incorreto |
| 401 | `Token nao fornecido.` ou `Token invalido ou expirado.` |
| 403 | `Acesso negado. Voce nao pode enviar boletos para outra empresa.` |
| 403 | `Acesso negado. Esta funcionalidade exige a contratacao do modulo correspondente.` |

---

## 3. Consultar Boletos Enviados

### Listar boletos da empresa

```
GET /api/v1/boletos/company/{companyId}
Authorization: Bearer <token>
```

### Consultar um boleto específico

```
GET /api/v1/boletos/{id}
Authorization: Bearer <token>
```

### Download do PDF

```
GET /api/v1/boletos/download/{id}
Authorization: Bearer <token>
```

Retorna o arquivo PDF para download.

---

## 4. Resumo do Fluxo

```
Cliente                              Servidor
  |                                       |
  |  POST /api/v1/auth/login              |
  |  { email, senha }                     |
  |──────────────────────────────────────>|
  |                             Valida, gera JWT |
  |<──────────────────────────────────────|
  |  { token, user }                      |
  |                                       |
  |  POST /api/v1/boletos/upload          |
  |  Authorization: Bearer <token>        |
  |  multipart: file.pdf + dados          |
  |──────────────────────────────────────>|
  |                      Valida JWT, salva PDF, |
  |                      cria registro no BD    |
  |<──────────────────────────────────────|
  |  201 { id, dados do boleto }          |
```

---

## Observações importantes

- O token JWT expira em **24 horas**. Após esse período, é necessário autenticar novamente.
- O usuário só pode enviar boletos para a **própria empresa** (definida no `company_id` do token).
- Apenas usuários com permissão **SUPERADMIN** podem enviar boletos para empresas diferentes.
- O arquivo enviado deve ser **PDF** (outros formatos são rejeitados).
- Todos os campos de data devem estar no formato **YYYY-MM-DD**.
- O campo `valor` é armazenado como string para preservar formatação e casas decimais.

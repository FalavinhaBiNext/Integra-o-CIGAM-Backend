## Context

O ERP CIGAM envia boletos para o sistema. O N8N é disparado paralelamente e, após 1 minuto, envia o boleto ao cliente. No passo final do N8N, ele precisa atualizar a data de recebimento do cliente enviando uma requisição do tipo PATCH. Para isso, criaremos a rota atômica de recebimento.

## Goals / Non-Goals

**Goals:**
- Prover a rota `PATCH /boletos/:id/recebimento` com tratamento específico de validação e controle de tenant.
- Utilizar a infraestrutura existente de services (`BoletoService.update`) para efetivar a gravação no banco de dados.

**Non-Goals:**
- Não serão feitas alterações de banco de dados ou migrações (o campo `data_recebimento` já existe na tabela de boletos).

## Decisions

### 1. PATCH com Validação Local e Reuso de Service
- **Decisão**: Criaremos um validador específico `validateUpdateRecebimento` para extrair apenas `data_recebimento`, e chamaremos `BoletoService.update(id, { data_recebimento })` para gravar no banco.
- **Alternativa**: Criar uma nova função no service e repository.
- **Razão**: O método `update` do Service e do Repository já atualiza qualquer campo parcialmente de maneira genérica e segura. Reutilizar esse método evita redundância de código e mantém o código compacto.

## Risks / Trade-offs

- **[Risco]**: N8N pode falhar caso o token expire.
  - **Mitigação**: O fluxo do N8N já obtém o token logo antes de realizar as requisições de consulta e reusará o mesmo token na requisição PATCH.

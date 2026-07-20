# boleto-recebimento Specification

## Purpose
TBD - created by archiving change rota-recebimento-boleto. Update Purpose after archive.
## Requirements
### Requirement: PATCH Recebimento Endpoint
O sistema SHALL prover uma rota protegida `PATCH /boletos/:id/recebimento` para atualizar a data de recebimento do boleto pelo cliente.
- O endpoint MUST exigir autenticação JWT e validação de tenant (o boleto deve pertencer à mesma empresa do usuário logado, a menos que o usuário seja `SUPERADMIN`).
- O payload da requisição MUST conter o campo `data_recebimento` no corpo da requisição.
- O valor de `data_recebimento` MUST ser uma string de data válida (ou valor conversível para Date no formato ISO).
- O endpoint MUST retornar HTTP status 200 com a entidade de boleto atualizada em formato JSON em caso de sucesso.

#### Scenario: Atualização com Sucesso
- **WHEN** o usuário autenticado envia uma requisição `PATCH /boletos/:id/recebimento` com `{"data_recebimento": "2026-07-16T12:30:00Z"}` e o boleto pertence à sua empresa
- **THEN** o sistema atualiza o campo no banco de dados e retorna o boleto atualizado com status 200.

#### Scenario: Acesso Negado de Outra Empresa
- **WHEN** o usuário autenticado tenta enviar `PATCH /boletos/:id/recebimento` para um boleto de outra empresa (que não seja a dele e ele não seja `SUPERADMIN`)
- **THEN** o sistema retorna HTTP status 403 (Acesso Negado).


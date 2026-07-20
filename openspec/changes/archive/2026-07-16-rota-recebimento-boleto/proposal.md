## Why

O fluxo do sistema exige que workflows externos (como N8N) registrem a data de recebimento do boleto pelo cliente após o envio. Atualmente, para alterar apenas o campo `data_recebimento`, é necessário enviar uma requisição `PUT /boletos/:id` contendo potencialmente todos os campos do boleto. Criar uma rota específica e atômica (`PATCH /boletos/:id/recebimento`) torna a integração mais limpa, reduz o tráfego de dados desnecessário e evita erros na atualização de campos secundários do boleto.

## What Changes

- Adição de uma nova rota protegida `PATCH /boletos/:id/recebimento` no Express.
- Criação do método `updateRecebimento` no `BoletoController` para tratar a requisição.
- Criação do Zod schema `updateRecebimentoSchema` em `boleto.validator.ts` para validar exclusivamente o campo `data_recebimento`.

## Capabilities

### New Capabilities
- `boleto-recebimento`: Rota PATCH atômica para inserção/alteração da data de recebimento do boleto.

### Modified Capabilities
<!-- Nenhuma especificação anterior é modificada diretamente em nível de contrato global -->

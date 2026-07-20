## 1. Implementação da Rota e Validador

- [x] 1.1 Criar a schema `updateRecebimentoSchema` e a função de validação `validateUpdateRecebimento` em `src/modules/boleto/validators/boleto.validator.ts`.
- [x] 1.2 Criar o método `updateRecebimento` no `BoletoController` em `src/modules/boleto/controllers/boleto.controller.ts` para tratar a requisição PATCH, validar o tenant e invocar o service de atualização.
- [x] 1.3 Adicionar a rota `PATCH /:id/recebimento` em `src/modules/boleto/routes/boleto.routes.ts`.

## 2. Validação e Testes

- [x] 2.1 Rodar a suíte de testes existente usando `npm test` para validar a estabilidade do backend.
- [x] 2.2 Iniciar o servidor com `npm run dev` (ou similar) para certificar-se de que a rota carrega sem falhas de DI/inicialização.

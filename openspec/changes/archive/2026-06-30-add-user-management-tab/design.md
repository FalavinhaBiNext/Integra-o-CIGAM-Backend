## Context

O dashboard atual possui controle de abas locais. Vamos estender esse controle adicionando a aba "Usuários" (ativa apenas para papéis `ADMIN` ou `MASTER`) e implementando um novo componente de gerenciamento.

## Goals / Non-Goals

**Goals:**
- Prover visualização tabulada e limpa dos colaboradores.
- Implementar formulário modal dinâmico para operações de criação (POST) e atualização (PUT).
- Permitir ativação/desativação rápida e exclusão definitiva de registros.

**Non-Goals:**
- Não expor o gerenciamento de usuários de outras empresas. A listagem e filtros devem ser estritamente restritos à empresa do usuário logado (`user.company_id`).

## Decisions

### Decisão 1: Proteção de Tela no Frontend
A renderização do link da aba "Usuários" será condicionada por:
```typescript
(user.role === 'ADMIN' || user.role === 'MASTER')
```
Caso um usuário comum tente injetar estado, o componente `UserManagement.tsx` retornará uma mensagem de permissão negada.

### Decisão 2: Componentização do Modal de Usuário
O formulário de cadastro/edição será montado como um elemento flutuante (modal) na tela, reusando os componentes base de `Button` e `Input` criados anteriormente.

## Risks / Trade-offs

- **[Risco]** Alteração de senha acidental na edição de usuário.
  * *Mitigação* → O campo de senha será opcional na tela de edição. O backend apenas atualizará a hash da senha caso uma senha com tamanho mínimo de 6 caracteres seja informada no input.

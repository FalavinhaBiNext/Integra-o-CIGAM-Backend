## 1. Banco de Dados e Migrations

- [x] 1.1 Criar a migration em JS em `src/database/migrations/` e os modelos do Sequelize em `src/database/models/` para as tabelas `rotas` e `modulo_rotas`.

## 2. Backend: CRUD & Middleware Guard

- [x] 2.1 Criar controllers, repositories, validators e registrar injeções de dependências para `Modulo`, `Rota` e `ModuloRota`.
- [x] 2.2 Desenvolver e aplicar o middleware `moduleGuard.ts` de forma global em `src/routes/index.ts` após o `authMiddleware`.

## 3. Frontend: Aba "Módulos & Rotas"

- [x] 3.1 Desenvolver o componente `ModuleRouteManager.tsx` no frontend (listagem de módulos, formulário de adição de novos módulos, e painel de vinculação de rotas).
- [x] 3.2 Modificar o painel `SuperAdminPanel.tsx` para apresentar a aba "Módulos & Rotas" ao operador.

## 4. Testes e Validação

- [x] 4.1 Executar as migrations do banco local (`npm run sequelize db:migrate`) e testar compilação com `npm run build`.

## 1. Backend: Funções & Proteções de API

- [x] 1.1 Adicionar a role `'SUPERADMIN'` no tipo `UsuarioRole` em `src/database/models/Usuario.ts` e na definição do enum do Sequelize.
- [x] 1.2 Aplicar o `authMiddleware` de forma geral nas rotas de `src/routes/index.ts`.
- [x] 1.3 Criar o middleware `roleMiddleware(['SUPERADMIN'])` em `src/shared/middlewares` para restringir rotas do sistema.
- [x] 1.4 Ajustar a validação de login (AuthService) para consultar o status ativo da empresa e impedir a geração de tokens se estiver inativa.

## 2. Frontend: Painel do Operador

- [x] 2.1 Criar a view de controle global `SuperAdminPanel.tsx` com tabelas de monitoramento de tenants (empresas) e bloqueio/desbloqueio.
- [x] 2.2 Atualizar o fluxo do `App.tsx` para redirecionar usuários autenticados com role `SUPERADMIN` para o painel global.

## 3. Testes e Compilação

- [x] 3.1 Validar a compilação do TypeScript no backend e frontend (`npm run build`).

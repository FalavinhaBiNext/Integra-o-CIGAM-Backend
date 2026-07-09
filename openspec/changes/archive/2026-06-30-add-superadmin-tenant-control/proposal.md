## Why

Atualmente, não há diferenciação entre o operador do SaaS (administrador da plataforma) e os colaboradores dos clientes, e todas as rotas corporativas do backend estão expostas publicamente. Para viabilizar um modelo de licenciamento SaaS comercial e seguro, precisamos introduzir a role `SUPERADMIN` para controlar a atividade de empresas (tenants), inativar clientes inadimplentes e proteger todas as rotas do backend com autenticação e isolamento de dados.

## What Changes

### Backend
- Atualizar o tipo `UsuarioRole` e o enum do Sequelize para incluir a role `'SUPERADMIN'`.
- Registrar e aplicar o `authMiddleware` de forma global para todas as rotas em `src/routes/index.ts` (exceto `/auth/login` e `/health`).
- Ajustar a lógica de Login para verificar se a empresa do usuário está ativa (`active: true`) e recusar o acesso caso esteja bloqueada.
- Adicionar validação de Tenant Isolation para garantir que usuários não `SUPERADMIN` só acessem dados de sua própria `company_id`.

### Frontend
- Ajustar o `App.tsx` para direcionar usuários com papel `SUPERADMIN` para um painel administrativo exclusivo.
- Criar a view `SuperAdminPanel.tsx` no frontend contendo a tabela de monitoramento de empresas e o cadastro de novos Tenants (Empresa + primeiro usuário Master).

## Capabilities

### New Capabilities

- `tenant-control`: Capacidade do administrador do sistema de gerenciar, suspender e ativar tenants (empresas contratantes).

### Modified Capabilities

- `auth`: A autenticação agora exige verificação ativa do status do Tenant e todas as chamadas corporativas requerem o cabeçalho `Authorization: Bearer <token>`.

## Impact

- Afeta `src/database/models/Usuario.ts` (definição do enum).
- Afeta `src/routes/index.ts` e `src/modules/auth/services/` (lógica de validação de login).
- Cria `frontend/src/components/SuperAdminPanel.tsx` no frontend.

## Why

Atualmente, não há interface gráfica para gerenciar a criação de novos módulos no sistema, e as permissões de acesso às rotas do backend estão fixadas diretamente no código (hardcoded). Para viabilizar uma infraestrutura de vendas SaaS dinâmica, precisamos de um gerenciamento no banco de dados que associe rotas específicas da API (ex: `POST /boletos`, `GET /boletos`) a módulos comerciais (ex: "Boletos & PDFs"). O SuperAdmin deve poder gerenciar essa estrutura visualmente no frontend, de modo que novos módulos e rotas sejam criados e protegidos dinamicamente por um middleware de controle.

## What Changes

### Banco de Dados
- Criar a migration e o model para a tabela `rotas` (`id`, `nome`, `metodo`, `caminho`, `active`).
- Criar a migration e o model para a tabela `modulo_rotas` (`id`, `modulo_id`, `rota_id`, `active`).

### Backend
- Desenvolver rotas CRUD e controllers para a entidade `Modulo` (permitindo criação e edição via API).
- Desenvolver rotas CRUD e controllers para a entidade `Rota` e associação `ModuloRota`.
- Criar o middleware `moduleGuard.ts` em `src/shared/middlewares` para interceptar todas as requisições de negócios de Tenants, identificar o módulo proprietário da rota requisitada e verificar se o Tenant possui o módulo ativo na tabela `company_modulos`.

### Frontend
- Ajustar o `SuperAdminPanel.tsx` no frontend do SuperAdmin para incluir uma nova aba: **"Módulos & Rotas"**.
- Desenvolver a tabela de Módulos (com formulário de criação/edição de módulos: nome, descrição, ícone).
- Desenvolver um painel de gerenciamento de rotas por módulo (exibindo as rotas associadas e permitindo criar e vincular novas rotas informando Método HTTP e Caminho da API).

## Capabilities

### New Capabilities

- `module-route-guard`: Middleware centralizado do backend que valida o acesso a rotas com base na contratação do módulo associado pela empresa (Tenant) do usuário.

### Modified Capabilities

- `tenant-control`: Permite ao SuperAdmin agora não apenas habilitar módulos existentes nas empresas clientes, mas também cadastrar novos módulos comerciais e gerenciar a blindagem de suas rotas.

## Impact

- Afeta `src/database/models/` (novos arquivos `Rota.ts` e `ModuloRota.ts`).
- Cria `src/shared/middlewares/moduleGuard.ts`.
- Afeta `src/routes/index.ts` aplicando o novo guard.
- Cria `frontend/src/components/ModuleRouteManager.tsx` e atualiza o `SuperAdminPanel.tsx` para renderizar a nova aba.

## Why

Atualmente, a gestão de colaboradores e papéis da empresa é efetuada de forma externa ou direta no banco. O administrador do tenant necessita de uma visualização administrativa unificada no dashboard para monitorar o acesso, adicionar colaboradores e revogar acessos no ecossistema SaaS.

## What Changes

- Adicionar a aba "Usuários" na barra superior do `Dashboard.tsx`, visível exclusivamente para usuários que possuam privilégios de `ADMIN` ou `MASTER`.
- Desenvolver um painel administrativo com tabela listando os colaboradores da empresa e seus respectivos status.
- Criar um formulário modal para cadastro e edição de dados de usuário (Nome, E-mail, Senha e Papel).

## Capabilities

### New Capabilities

- `user-management`: Permite que administradores gerenciem a listagem de colaboradores da mesma empresa (company_id) através de operações de leitura, criação, atualização e exclusão lógica/física.

### Modified Capabilities

- Nenhuma (Sem modificação nos fluxos de boletos ou configurações existentes).

## Impact

- Afeta `frontend/src/pages/Dashboard.tsx` incluindo a verificação da role do usuário logado para renderizar o link da aba.
- Cria o componente `frontend/src/components/UserManagement.tsx` contendo modais e formulários de cadastro.
- Consome os endpoints de `/usuarios` no frontend.

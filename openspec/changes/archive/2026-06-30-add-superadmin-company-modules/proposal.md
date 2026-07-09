## Why

Atualmente, o gerenciamento de módulos ativos é feito a nível de Tenant em Configurações. No entanto, em um modelo de negócio SaaS padrão, o operador do sistema (SuperAdmin) deve ter o controle total e exclusivo sobre quais módulos estão disponíveis para quais empresas (clientes) com base em seu plano de contratação.

## What Changes

- Atualizar o `SuperAdminPanel.tsx` para incluir um botão de ação "Módulos" ao lado de cada empresa na tabela.
- Criar um Modal flutuante no `SuperAdminPanel` que exibe a lista de todos os módulos disponíveis no sistema e permite ao SuperAdmin ativar/desativar o acesso de cada módulo para a empresa selecionada.
- O modal reutilizará a lógica de requisição HTTP assíncrona consumindo as rotas `/company-modulos` e `/modulos` direcionadas ao ID da empresa ativa.

## Capabilities

### Modified Capabilities

- `tenant-control`: Estende a capacidade do administrador global de inativar ou ativar módulos específicos por empresa diretamente no painel global.

## Impact

- Afeta `frontend/src/components/SuperAdminPanel.tsx` injetando novos estados locais, requisições de carregamento de módulos por empresa e o respectivo modal de configurações de permissões de módulos.

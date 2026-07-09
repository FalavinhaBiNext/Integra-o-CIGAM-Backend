## Why

Atualmente, o frontend da aplicação exibe apenas a listagem e upload de boletos. Para possibilitar o gerenciamento completo do SaaS e a parametrização de conexões corporativas com o ERP, o usuário precisa de uma tela para gerenciar as credenciais da integração com o Cigam e configurar quais módulos do sistema estão ativos para a sua empresa.

## What Changes

- Modificar o cabeçalho/navegação de `Dashboard.tsx` no frontend para incluir suporte a abas de navegação (ex: "Boletos" e "Configurações").
- Criar a visualização de configurações de integração com formulário para salvar login, senha, URL do portal, token e visualizar o status da conexão da tabela `company_integrations`.
- Criar a visualização de módulos ativos exibindo a lista de todos os módulos globais e permitindo habilitá-los/desabilitá-los para a empresa atual através da tabela `company_modulos`.

## Capabilities

### New Capabilities

- `company-settings`: Permite visualizar e alterar os parâmetros de integração com o ERP Cigam e gerenciar os módulos de sistema contratados/ativos para a empresa logada.

### Modified Capabilities

- Nenhuma (Sem modificação nos requisitos de comportamentos e fluxos das capacidades de boletos existentes).

## Impact

- Afeta `frontend/src/pages/Dashboard.tsx` introduzindo controle de estado para navegação de abas.
- Cria novos componentes de visualização em `frontend/src/components/CompanySettings.tsx`.
- Consome novos endpoints de `/company-integrations` e `/company-modulos` no frontend.

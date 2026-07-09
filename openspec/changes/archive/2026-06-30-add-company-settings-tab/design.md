## Context

O frontend atual exibe apenas a visualização de boletos. Vamos introduzir suporte a abas no Dashboard (`activeTab`) para alternar entre "Boletos" e "Configurações da Empresa", criando um novo componente dedicado para a parametrização do SaaS e ERP Cigam.

## Goals / Non-Goals

**Goals:**
- Prover um painel visual para gerenciar credenciais da Cigam (URL, Login, Senha, Token) e testar/salvar status de conexão.
- Exibir os módulos do sistema contratados pela empresa através de checkboxes e persistir as alterações em tempo real via chamadas HTTP.

**Non-Goals:**
- Adicionar roteamento complexo no frontend (ex: `react-router-dom`). O controle de abas será feito através de estados locais do React (`activeTab`) para manter a aplicação ágil e focada.
- Criar novos endpoints no backend. Os serviços de `company-integration` e `company-modulo` já são suficientes.

## Decisions

### Decisão 1: Criação do Componente `CompanySettings.tsx`
Encapsularemos todo o formulário de integração do ERP e a listagem de checkboxes de módulos em um único componente reutilizável em `src/components/CompanySettings.tsx`.

### Decisão 2: Uso de inputs mascarados para credenciais sensíveis
Campos de senha e tokens da API da Cigam usarão inputs do tipo `password` e exibição em formato de máscara para mitigar riscos de segurança visual.

## Risks / Trade-offs

- **[Risco]** Erros de concorrência ao atualizar múltiplos checkboxes de módulos de forma rápida.
  * *Mitigação* → Desabilitar temporariamente o checkbox individual durante a requisição assíncrona HTTP de habilitação/desabilitação (estado de loading local).

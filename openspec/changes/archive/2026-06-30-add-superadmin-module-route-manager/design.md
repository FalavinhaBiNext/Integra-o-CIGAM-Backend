## Context

Deseja-se criar e gerenciar novos módulos e suas rotas integradas dinamicamente no frontend do SuperAdmin. As rotas devem ser protegidas por um middleware baseado no status de contratação do módulo pelo Tenant.

## Goals / Non-Goals

**Goals:**
- Prover banco de dados com tabelas `rotas` e `modulo_rotas`.
- Interceptar e blindar as requisições de negócios com o middleware `moduleGuard.ts`.
- Prover interface visual no painel do SuperAdmin para cadastrar novos módulos, novas rotas e associá-los.

**Non-Goals:**
- Não iremos tratar rotas externas ao middleware. A validação de escopo aplica-se somente a rotas filhas do `globalRoutes` (ex: `/boletos`, `/company-modulos`, `/usuarios`, etc.).

## Decisions

### Decisão 1: Modelagem das Rotas no Sequelize
As tabelas no Sequelize conterão chaves primárias do tipo UUID e colunas de controle:
- **`rotas`**: `id`, `nome` (rótulo amigável), `metodo` (enum: GET, POST, PUT, DELETE, PATCH), `caminho` (string), `active` (boolean).
- **`modulo_rotas`**: `id`, `modulo_id`, `rota_id`, `active`.

### Decisão 2: Algoritmo de Casamento de Rota no Middleware
O middleware `moduleGuard` obterá o método HTTP da requisição (`req.method`) e o caminho base/relativo (`req.path`). Ele buscará se essa combinação está mapeada na tabela `rotas`. Se sim, verificará a existência do vínculo ativo na tabela `company_modulos` para a empresa do usuário.

### Decisão 3: Interface "Módulos & Rotas" no SuperAdmin
Inserir no frontend do SuperAdmin um painel contendo:
- Tabela de Módulos cadastrados (com ações de adicionar, editar e inativar).
- Botão "Rotas Associadas" que abre um painel para adicionar novos caminhos e vincular/desvincular àquele módulo selecionado.

## Risks / Trade-offs

- **[Risco]** Casamento de caminhos contendo parâmetros dinâmicos (ex: `/boletos/83df-231a` contra `/boletos/:id`).
  * *Mitigação* → O middleware usará uma regex simples de substituição (trocando trechos do tipo `:id` ou `:companyId` por coringas de URL) para casar de forma segura as rotas do Express.

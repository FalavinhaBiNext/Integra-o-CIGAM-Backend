## Context

O console global de SuperAdmin possui a listagem de empresas. Estenderemos essa listagem com um botão de ação rápida para configurar e gerenciar quais módulos comerciais estão habilitados para a empresa ativa.

## Goals / Non-Goals

**Goals:**
- Prover interface em modal para habilitar/desabilitar módulos por empresa como SuperAdmin.
- Sincronizar as mudanças assincronamente com o banco de dados usando os endpoints existentes.

**Non-Goals:**
- Criar novos modelos de banco ou alterar lógica de controladores. A lógica necessária já está implementada na tabela `company_modulos`.

## Decisions

### Decisão 1: Botão de ação na tabela de empresas
Adicionar uma coluna ou ícone de chave/engrenagem na tabela de empresas em `SuperAdminPanel.tsx` denominado "Módulos".

### Decisão 2: Modal dedicado para controle de módulos por empresa
Ao invés de carregar todos os módulos antecipadamente, o modal carregará a listagem global e o status da empresa sob demanda quando o SuperAdmin clicar no botão da empresa correspondente.

## Risks / Trade-offs

- Nossos endpoints de `/company-modulos` exigirão privilégios de `SUPERADMIN` ou `MASTER`. Como o SuperAdmin tem privilégios totais de acesso de backend, as requisições serão bem-sucedidas.

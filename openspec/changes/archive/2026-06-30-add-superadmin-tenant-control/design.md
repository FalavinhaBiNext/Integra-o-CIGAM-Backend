## Context

O backend expõe endpoints corporativos publicamente e não realiza validação do status de atividade do Tenant cliente. Vamos proteger os recursos aplicando `authMiddleware`, validando a atividade da empresa contratante no login e adicionando o painel de Super Admin para controle de licenciamento.

## Goals / Non-Goals

**Goals:**
- Proteger 100% das rotas de negócio no backend com o token JWT.
- Inviabilizar login de usuários associados a empresas inativas.
- Prover visualização e gestão de Tenants clientes no frontend.

**Non-Goals:**
- Permitir que o `company_id` de usuários seja nulo. Em vez disso, usaremos uma empresa de controle do sistema para o `SUPERADMIN`, evitando refatorações complexas de constraints no banco.

## Decisions

### Decisão 1: Criação de Middleware de Proteção de Papel (`roleMiddleware`)
Criar o middleware `roleMiddleware.ts` no backend para validar se o usuário do token possui um papel específico (ex: `SUPERADMIN`), bloqueando chamadas a rotas administrativas por usuários de outras empresas.

### Decisão 2: Proteção Geral de Rotas
Em `src/routes/index.ts`, as rotas corporativas serão agrupadas ou protegidas individualmente com o `authMiddleware`. Apenas `/auth/login` e `/health` permanecerão públicas.

### Decisão 3: Criação de `SuperAdminPanel.tsx` no Frontend
Adicionar a view do painel administrativo de controle global no frontend, montando a tabela de empresas e as ações de bloqueio/cadastro.

## Risks / Trade-offs

- **[Risco]** Sobrecarga de validação em cada rota de banco de dados.
  * *Mitigação* → O status ativo do tenant será validado principalmente no login (geração do JWT). Nas rotas corriqueiras, a validação de Tenant Isolation comparando o ID da rota com o ID do token decodificado em memória (via Express `req.user`) evita consultas extras ao banco.

## Context

Atualmente, todos os 7 modelos do Sequelize (`BoletoModel`, `CompanyModel`, `UsuarioModel`, etc.) declaram suas propriedades usando propriedades públicas como `public id!: string`. 
Sob as regras de compilação modernas do TypeScript, isso gera código JavaScript no construtor que define `this.id = undefined`, sobrescrevendo os métodos assessores dinâmicos do Sequelize que residem no protótipo.

## Goals / Non-Goals

**Goals:**
- Resolver o bug de inicialização indesejada nas instâncias de modelos do Sequelize.
- Garantir que chamadas a DTOs de resposta da API (como `BoletoResponseDTO.fromEntity(boleto)`) retornem os valores preenchidos do banco de dados em vez de campos `undefined`.

**Non-Goals:**
- Alterar tabelas do banco de dados ou criar novas migrations. A estrutura física dos dados e tabelas está correta.
- Modificar lógicas de negócio em Services ou Controllers.

## Decisions

### Decisão 1: Utilização do modificador `declare`
- **Alternativa A**: Modificar a configuração de compilação global `useDefineForClassFields: false` no `tsconfig.json`.
  * *Prós*: Corrige o comportamento para classes legadas sem mudar o código.
  * *Contras*: Altera o comportamento global do compilador TypeScript, podendo causar incompatibilidades futuras e fugir da especificação padrão do ESNext.
- **Alternativa B (Escolhida)**: Mudar a declaração dos atributos dos modelos de `public` para `declare`.
  * *Prós*: É a prática padrão recomendada pelo próprio Sequelize v6+ com TypeScript. Garante a integridade sem alterar configurações globais de compilação.
  * *Contras*: Exige alterar manualmente as linhas de declaração nos 7 modelos.

## Risks / Trade-offs

- **[Risco]** Erro humano ou digitação incorreta durante a alteração dos modelos.
  * *Mitigação* → Executar a suíte de testes existente (`npm test`) imediatamente após a aplicação das alterações para certificar que nenhum tipo ou comportamento de integração quebrou.

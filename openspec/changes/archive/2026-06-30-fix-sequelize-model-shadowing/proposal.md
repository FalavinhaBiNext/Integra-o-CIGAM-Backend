## Why

Os modelos do Sequelize declarados em TypeScript utilizando propriedades públicas (`public id!: string`) compilam para inicializadores no construtor JavaScript que definem as propriedades como `undefined`. Isso causa um sombreamento (*shadowing*) que impede o acesso aos *getters* e *setters* dinâmicos do Sequelize no protótipo, fazendo com que qualquer propriedade de instância lida retorne `undefined`.

## What Changes

- Alterar a declaração de propriedades de `public` para `declare` em todos os 7 arquivos de modelos do Sequelize em `src/database/models/` (`Boleto.ts`, `Company.ts`, `CompanyIntegration.ts`, `CompanyModulo.ts`, `Modulo.ts`, `UserType.ts`, `Usuario.ts`).
- Remover os modificadores de atribuição desnecessários `!` e `readonly` onde aplicável para usar a sintaxe nativa de declaração pura do Sequelize v6 (`declare campo: tipo;`).

## Capabilities

### New Capabilities

- Nenhuma (Trata-se de uma refatoração interna/técnica sem adição de novas regras ou comportamentos de negócio para o usuário).

### Modified Capabilities

- Nenhuma (Nenhum requisito de negócio ou fluxo de comportamento da API está sendo modificado).

## Impact

- Afeta todos os modelos de dados e sua representação em TypeScript.
- DTOs de resposta da API (como `BoletoResponseDTO.fromEntity`) que extraíam os dados diretamente da instância do modelo voltarão a serializar as propriedades corretamente, resolvendo respostas vazias (`{}`).

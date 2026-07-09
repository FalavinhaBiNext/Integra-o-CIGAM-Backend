# Integração Cigam — AGENTS.md

## Commands

| Action | Command |
|--------|---------|
| Dev server (hot reload) | `npm run dev` |
| Build | `npm run build` |
| Production start | `npm start` |
| Run tests | `npm test` |
| Sequelize CLI | `npm run sequelize <args>` |

## Architecture

- **Express + TypeScript**, modular (`src/modules/<name>/`). Each module has: `controllers/`, `services/`, `repositories/`, `dto/`, `validators/`, `interfaces/`, `errors/`, `routes/`.
- **DI with tsyringe** — uses `@injectable()` and `@inject()` decorators. Container centralized in `src/shared/container/index.ts`. Routes resolve dependencies via `container.resolve()`.
- **Sequelize** with SQLite (dev/test) and PostgreSQL (production). Config in `src/database/config/database.js` (`.js` for sequelize-cli compat).
- **Migrations live in `src/database/migrations/` and are written in JS.**
- DB models in `src/database/models/`. Domain types in `src/modules/<name>/models/`.
- **Path alias** `@/` → `./src/*` (configured in `tsconfig.json`).
- **Zod** for validation. Error classes in `src/shared/errors/AppError.ts`.
- All `sequelize` models use `underscored: true` with `created_at`/`updated_at`. Primary keys are UUID (`UUIDV4`).
- Error messages are in **Portuguese**.

## Conventions

- `controller` → reads request, calls DTO/validator, calls service, returns response.
- `service` → business rules, no `req`/`res`.
- `repository` → encapsulates Sequelize queries.
- `DTO` → `*InputDTO` types + `*DTO.fromRequest(req)` + `*ResponseDTO.fromEntity(entity)`.
- `validator` → Zod schema + `safeParse`, throws `ValidationError` on failure.
- Error classes extend `AppError` (statusCode + details).
- Use `return next(error)` in controllers, never catch-and-respond inline.

## Existing instruction file

`ai/Backend/SKILL.md` — comprehensive reference for the project's architecture patterns, conventions, and code examples. Agent should consult it for detailed guidance on controllers, services, repositories, DTOs, validators, error handling, and DI.

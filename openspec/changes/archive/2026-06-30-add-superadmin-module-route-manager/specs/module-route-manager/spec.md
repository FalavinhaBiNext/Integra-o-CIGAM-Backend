## ADDED Requirements

### Requirement: System Admin Module Management

#### Scenario: Register new commercial module
- **WHEN** super admin fills name, description, and icon in new module form
- **THEN** system saves the new module to the database

#### Scenario: Register API route and link to module
- **WHEN** super admin defines a route name, path, and method (e.g. GET /boletos)
- **AND** assigns it to a module
- **THEN** system registers the route and association in the database

### Requirement: Module Route Guard Enforcement

#### Scenario: Block request if route module is not contracted by tenant
- **WHEN** user calls an API endpoint (e.g. GET /boletos)
- **AND** the route is mapped to a module
- **AND** user's company does not have that module active in `company_modulos`
- **THEN** system returns 403 Forbidden with message "Acesso negado. Modulo nao contratado."

#### Scenario: Allow request if route module is contracted
- **WHEN** user calls an API endpoint (e.g. GET /boletos)
- **AND** the route is mapped to a module
- **AND** user's company has that module active in `company_modulos`
- **THEN** system allows the request to proceed

# User Management

## Purpose
Esta capacidade permite que os administradores e masters gerenciem a listagem de colaboradores e atribuições de permissão para a sua empresa correspondente.

## Requirements

### Requirement: Manage Company Users
The system SHALL list, create, update, toggle active status, and delete users associated with the administrator's company.

#### Scenario: List company users
- **WHEN** user with role ADMIN/MASTER clicks on the "Usuários" tab
- **THEN** system loads and lists users belonging to their company

#### Scenario: Create new user
- **WHEN** admin fills the modal form with valid details and submits
- **THEN** system sends POST request to `/usuarios` and updates list

#### Scenario: Update user
- **WHEN** admin edits a user's name, email, or role and submits
- **THEN** system sends PUT request to `/usuarios/:id` and updates list

#### Scenario: Toggle user status
- **WHEN** admin clicks on the user status toggle
- **THEN** system sends PATCH to `/usuarios/:id/ativo` and switches status in the UI

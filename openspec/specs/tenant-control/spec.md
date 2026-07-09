# Tenant Control

## Purpose
Esta capacidade permite que os administradores globais do SaaS gerenciem as contas corporativas clientes (tenants), bloqueando ou ativando o acesso à plataforma e provisionando novas empresas parceiras.

## Requirements

### Requirement: System Admin Tenant Management
The system SHALL allow super administrators to manage companies (tenants) contracting the platform.

#### Scenario: List all companies
- **WHEN** super administrator accesses the platform
- **THEN** system lists all registered companies with their status (active/inactive)

#### Scenario: Activate or deactivate companies
- **WHEN** super admin toggles the company's active state
- **THEN** system updates the active field on the company record

#### Scenario: Create new company with Master user
- **WHEN** super admin fills company and master user details
- **THEN** system creates both company and master user in database

### Requirement: Tenant Authenticity Enforcement
The system SHALL enforce active subscription/tenant status during authentication and API access.

#### Scenario: Prevent login of user from inactive company
- **WHEN** user attempts to authenticate
- **AND** their company active status is false
- **THEN** system returns 401 Unauthorized with descriptive error message

#### Scenario: Require JWT for business endpoints
- **WHEN** request is made to boletos, integrations, or users endpoints
- **AND** no valid JWT is provided
- **THEN** system returns 401 Unauthorized

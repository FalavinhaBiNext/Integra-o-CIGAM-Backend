# SuperAdmin Modules Control

## Purpose
Esta capacidade estende o controle de Tenants, permitindo que os administradores globais do SaaS (SuperAdmins) gerenciem de forma granular e exclusiva quais módulos comerciais cada empresa cliente possui permissão de utilizar.

## Requirements

### Requirement: System Admin Tenant Management

#### Scenario: Manage tenant module access
- **WHEN** super admin clicks on the module configuration action for a company
- **THEN** system loads all available modules and company-assigned modules
- **WHEN** super admin checks or unchecks a module for that company
- **THEN** system calls `/company-modulos` to create or delete module assignments

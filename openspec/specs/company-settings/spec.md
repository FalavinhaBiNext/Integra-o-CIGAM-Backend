# Company Settings

## Purpose
Esta capacidade permite que a empresa autenticada gerencie os parâmetros de integração com o ERP Cigam e habilite ou desabilite módulos de negócio.

## Requirements

### Requirement: View and Update Integration
The system SHALL display the current ERP integration parameters for the logged-in company and allow updating them.

#### Scenario: Load integration parameters
- **WHEN** user accesses the Settings tab
- **THEN** system loads the URL, login, and masked token from `/company-integrations/company/:companyId`

#### Scenario: Save integration parameters
- **WHEN** user modifies fields and clicks "Salvar"
- **THEN** system submits data via PUT/POST and shows success toast

### Requirement: Toggle active modules
The system SHALL list system modules and allow users to enable or disable them for their company.

#### Scenario: Toggle module access
- **WHEN** user clicks on a module checkbox
- **THEN** system creates or toggles the active status of the module on the backend and updates the UI

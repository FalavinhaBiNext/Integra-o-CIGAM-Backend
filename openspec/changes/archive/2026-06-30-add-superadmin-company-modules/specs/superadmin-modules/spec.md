## MODIFIED Requirements

### Requirement: System Admin Tenant Management

#### Scenario: Manage tenant module access
- **WHEN** super admin clicks on the module configuration action for a company
- **THEN** system loads all available modules and company-assigned modules
- **WHEN** super admin checks or unchecks a module for that company
- **THEN** system calls `/company-modulos` to create or delete module assignments

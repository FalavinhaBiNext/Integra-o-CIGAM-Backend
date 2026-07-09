## ADDED Requirements

### Requirement: Model properties load successfully
All Sequelize model instances SHALL return their actual database column values when attributes are accessed directly in code, rather than returning undefined.

#### Scenario: Verify properties retrieval
- **WHEN** a record is fetched from the database (e.g., Company, Boleto, Usuario)
- **THEN** its mapped fields (e.g., id, company_id, nome) MUST NOT be undefined

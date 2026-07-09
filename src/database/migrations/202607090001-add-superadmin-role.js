'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(
      "ALTER TYPE enum_usuarios_role ADD VALUE IF NOT EXISTS 'SUPERADMIN'",
    );
  },

  down: async (queryInterface) => {
    // Não é possível remover um valor de ENUM no PostgreSQL sem recriar o tipo.
    // Esta migration não tem rollback.
  },
};

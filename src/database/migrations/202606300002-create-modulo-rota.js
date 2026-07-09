'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('modulo_rotas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      modulo_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'modulos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rota_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'rotas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('modulo_rotas', ['modulo_id']);
    await queryInterface.addIndex('modulo_rotas', ['rota_id']);
    await queryInterface.addIndex('modulo_rotas', ['modulo_id', 'rota_id'], { unique: true });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('modulo_rotas');
  },
};

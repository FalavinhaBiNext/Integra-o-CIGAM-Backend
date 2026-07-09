'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('company_integrations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      empresa: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      url_portal: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status_conexao: {
        type: Sequelize.ENUM('Conectado', 'Desconectado', 'Erro', 'Nao_Testado'),
        allowNull: false,
        defaultValue: 'Nao_Testado',
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

    await queryInterface.addIndex('company_integrations', ['company_id']);
    await queryInterface.addIndex('company_integrations', ['status_conexao']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('company_integrations');
  },
};

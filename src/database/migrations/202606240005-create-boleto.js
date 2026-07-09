'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boletos', {
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
      cnpj_cliente: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      empresa: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      contato: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nome_arquivo: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      num_lancamento: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      vencimento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      valor: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      codigo_empresa: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      data_recebimento: {
        type: Sequelize.DATE,
        allowNull: true,
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

    await queryInterface.addIndex('boletos', ['company_id']);
    await queryInterface.addIndex('boletos', ['cnpj_cliente']);
    await queryInterface.addIndex('boletos', ['num_lancamento']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('boletos');
  },
};

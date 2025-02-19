const { expect } = require('chai');
const { Sequelize } = require('sequelize');

// Configuração do Sequelize para o banco de dados de teste
const sequelize = new Sequelize('database_test', 'username', 'password', {
  host: '127.0.0.1',
  dialect: 'sqlite',
  storage: ':memory:',
});

describe('Conexão com o Banco de Dados', () => {
  it('deve conectar ao banco de dados', async () => {
    try {
      await sequelize.authenticate();
      expect(true).to.be.true;
    } catch (error) {
      expect.fail('Não foi possível conectar ao banco de dados:', error);
    }
  });

  it('deve realizar uma operação no banco de dados', async () => {
    try {
      // Definindo um modelo de exemplo
      const User = sequelize.define('User', {
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      });

      // Sincronizando o modelo com o banco de dados
      await sequelize.sync({ force: true });

      // Criando um usuário de exemplo
      const user = await User.create({ username: 'usuarioteste' });

      // Verificando se o usuário foi criado corretamente
      expect(user.username).to.equal('usuarioteste');
    } catch (error) {
      expect.fail('A operação no banco de dados falhou:', error);
    }
  });
});
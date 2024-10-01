import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql', // MariaDB é compatível com o dialect 'mysql'
  }
);

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados MariaDB!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

export default sequelize;
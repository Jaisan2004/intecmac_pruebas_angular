const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pruebas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;
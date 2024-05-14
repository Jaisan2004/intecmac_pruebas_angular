const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pruebas', 'root', '', {
    host: '192.168.1.17',
    dialect: 'mysql'
  });

  export default sequelize;
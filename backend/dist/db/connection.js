"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('pruebas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;

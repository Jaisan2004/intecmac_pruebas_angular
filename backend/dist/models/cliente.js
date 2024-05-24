"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cliente = connection_1.default.define('cliente', {
    cli_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cli_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    cli_nit: {
        type: sequelize_1.DataTypes.STRING
    },
    id_clasificacion: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cli_direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    cli_telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    cli_ciudad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cli_zona: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cli_asesor_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    cli_pp_sistema: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Cliente;

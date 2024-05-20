"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const PqrsProducto = connection_1.default.define('pqrs_productos', {
    pqrs_productos_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pqrs_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    prod_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    lote: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = PqrsProducto;

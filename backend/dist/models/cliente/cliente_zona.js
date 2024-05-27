"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Cliente_Zona = connection_1.default.define('cliente_zona', {
    cz_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cz_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    c_c_id: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Cliente_Zona;

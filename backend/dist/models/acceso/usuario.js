"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Usuarios = connection_1.default.define('usuarios', {
    usu_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    carg_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    usu_contrasena: {
        type: sequelize_1.DataTypes.STRING
    },
    rol_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    usu_status: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Usuarios;

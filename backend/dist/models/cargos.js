"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cargo = connection_1.default.define('cargos', {
    carg_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    carg_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    carg_correo: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Cargo;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Modulo = connection_1.default.define('acc_modulos', {
    mod_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    mod_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    mod_id_padre: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Modulo;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const CredEstadoEstudio = connection_1.default.define('cred_estado_estudio', {
    cred_esta_estu_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_estu_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cred_esta_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cred_esta_estu_fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    cred_esta_estu_fecha_fin: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = CredEstadoEstudio;

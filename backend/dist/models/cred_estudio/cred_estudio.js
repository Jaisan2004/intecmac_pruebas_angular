"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const CredEstudio = connection_1.default.define('cred_estudio', {
    cred_estu_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_fecha_creacion: {
        type: sequelize_1.DataTypes.DATE
    },
    cli_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cred_tipo_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cred_obser_comercial: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_cliente_desde: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_cupo_actual: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_descuento_otorgado: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_obser_contabilidad: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_plazo_aprobado: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cred_cupo_aprobado: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_obser_gerencia: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = CredEstudio;

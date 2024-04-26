"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Pqrs = connection_1.default.define('pqrs', {
    pqrs_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pqrs_fecha_recepcion: {
        type: sequelize_1.DataTypes.DATE
    },
    cli_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    prod_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    pqrs_lote: {
        type: sequelize_1.DataTypes.STRING
    },
    pqrs_prod_cantidad: {
        type: sequelize_1.DataTypes.NUMBER
    },
    pqrs_doc: {
        type: sequelize_1.DataTypes.STRING
    },
    pqrs_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    pqrs_analisis: {
        type: sequelize_1.DataTypes.STRING
    },
    costo: {
        type: sequelize_1.DataTypes.STRING
    },
    pqrs_causa_raiz_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    carg_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    pt_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    pqrs_fecha_respuesta: {
        type: sequelize_1.DataTypes.DATE
    },
    pqrs_dias_gestion: {
        type: sequelize_1.DataTypes.NUMBER
    },
    pqrs_documento_cruce: {
        type: sequelize_1.DataTypes.STRING
    },
    pqrs_estado: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Pqrs;

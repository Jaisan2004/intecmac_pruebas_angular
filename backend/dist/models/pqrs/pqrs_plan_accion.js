"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Pqrs = connection_1.default.define('pqrs_plan_accion', {
    ppa_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    ppa_fecha_inicio: {
        type: sequelize_1.DataTypes.DATE
    },
    ppa_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    ppa_fecha_cumplimiento: {
        type: sequelize_1.DataTypes.DATE
    },
    carg_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    pqrs_id: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Pqrs;

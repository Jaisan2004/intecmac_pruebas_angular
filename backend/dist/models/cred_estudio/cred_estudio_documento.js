"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const CredEstudioDocumento = connection_1.default.define('cred_estudio_documento', {
    cred_estu_doc_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_estu_doc_url: {
        type: sequelize_1.DataTypes.STRING
    },
    cred_estu_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cred_doc_id: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = CredEstudioDocumento;

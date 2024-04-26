"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Producto = connection_1.default.define('productos', {
    prod_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    prod_ref: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_presentacion: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_und_vta_x_carton: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_iva: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
exports.default = Producto;

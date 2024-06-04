"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPermisos = exports.getPermisosByRol = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const permisos_1 = __importDefault(require("../../models/acceso/permisos"));
const getPermisosByRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT ap.per_id, am.mod_nombre, ar.ruta_nombre FROM acc_permisos ap JOIN acc_rutas ar ON ap.ruta_id = ar.ruta_id JOIN 
    acc_modulos am ON ar.mod_id = am.mod_id WHERE ap.rol_id = ${id} ORDER BY am.mod_nombre ASC;`;
    const listPermisos = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (listPermisos) {
        res.json(listPermisos);
    }
    else {
        res.status(400).json({
            msg: 'No existen permisos para este rol'
        });
    }
});
exports.getPermisosByRol = getPermisosByRol;
const postPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield permisos_1.default.create(body);
        res.json({
            msg: 'Permisos Agregado Exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al crear los Permisos hable con soporte'
        });
    }
});
exports.postPermisos = postPermisos;

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
exports.deletePermiso = exports.updatePermiso = exports.postPermisos = exports.getPermiso = exports.getPermisosByRol = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const permisos_1 = __importDefault(require("../../models/acceso/permisos"));
const getPermisosByRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT ap.per_id, am.mod_nombre,com.mod_nombre as componente, ar.ruta_nombre, ar.ruta_descripcion FROM acc_permisos ap JOIN acc_rutas ar ON ap.ruta_id = ar.ruta_id
     JOIN acc_modulos com ON ar.mod_id = com.mod_id LEFT join acc_modulos am on com.mod_id_padre = am.mod_id WHERE ap.rol_id = ${id} ORDER BY am.mod_nombre,com.mod_nombre ASC;`;
    try {
        const listPermisos = yield connection_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (listPermisos && listPermisos.length !== 0) {
            res.json(listPermisos);
        }
        else {
            res.status(400).json({
                msg: 'No existen permisos para este rol'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los permisos hable con Soporte'
        });
    }
});
exports.getPermisosByRol = getPermisosByRol;
const getPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT ap.per_id, am.mod_id,com.mod_id as comp_id,ar.ruta_id FROM acc_permisos ap JOIN acc_rutas ar ON ap.ruta_id = ar.ruta_id 
    JOIN acc_modulos com ON ar.mod_id = com.mod_id LEFT join acc_modulos am on com.mod_id_padre = am.mod_id WHERE ap.per_id = ${id} ORDER BY am.mod_nombre,com.mod_nombre ASC;`;
    try {
        const permiso = yield connection_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT
        });
        if (permiso && permiso.length !== 0) {
            res.json(permiso);
        }
        else {
            res.status(400).json({
                msg: `No ningun permiso con el id: ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el permiso hable con soporte'
        });
    }
});
exports.getPermiso = getPermiso;
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
const updatePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const permiso = yield permisos_1.default.findByPk(id);
        if (permiso) {
            permiso.update(body);
            res.json({
                msg: `Permiso modificado exitosamente`
            });
        }
        else {
            res.status(400).json({
                msg: `No existe un permiso con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error en el servidor al editar el permiso`
        });
    }
});
exports.updatePermiso = updatePermiso;
const deletePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const permiso = yield permisos_1.default.findByPk(id);
        if (permiso) {
            permiso.destroy();
            res.json({
                msg: `Permiso eliminado exitosamente`
            });
        }
        else {
            res.status(400).json({
                msg: `No existe un permiso con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error en el servidor al eliminar el permiso`
        });
    }
});
exports.deletePermiso = deletePermiso;

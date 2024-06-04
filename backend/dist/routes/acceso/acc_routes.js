"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_1 = require("../../controllers/acceso/roles");
const permisos_1 = require("../../controllers/acceso/permisos");
const modulo_1 = require("../../controllers/acceso/modulo");
const ruta_1 = require("../../controllers/acceso/ruta");
const router = (0, express_1.Router)();
//Roles
router.get('/roles', roles_1.getRoles);
router.get('/roles/:id', roles_1.getRol);
router.post('/roles', roles_1.postRol);
router.put('/roles/:id', roles_1.updateRol);
//Permisos
router.get('/permisos/:id', permisos_1.getPermisosByRol);
router.get('/permiso/:id', permisos_1.getPermiso);
router.post('/permisos', permisos_1.postPermisos);
router.put('/permisos/:id', permisos_1.updatePermiso);
router.delete('/permisos/:id', permisos_1.deletePermiso);
//Modulos
router.get('/modulos', modulo_1.getModulos);
//Componentes
router.get('/componentes/:id', modulo_1.getComponentes);
//Rutas
router.get('/rutas/:id', ruta_1.getRutasByComponente);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_1 = require("../../controllers/acceso/roles");
const permisos_1 = require("../../controllers/acceso/permisos");
const router = (0, express_1.Router)();
//Roles
router.get('/roles', roles_1.getRoles);
router.get('/roles/:id', roles_1.getRol);
router.post('/roles', roles_1.postRol);
router.put('/roles/:id', roles_1.updateRol);
//Permisos
router.get('/permisos/:id', permisos_1.getPermisosByRol);
exports.default = router;

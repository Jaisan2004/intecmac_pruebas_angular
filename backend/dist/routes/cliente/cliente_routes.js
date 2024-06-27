"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_clasificacion_1 = require("../../controllers/cliente/cliente_clasificacion");
const cliente_ciudad_1 = require("../../controllers/cliente/cliente_ciudad");
const cliente_zona_1 = require("../../controllers/cliente/cliente_zona");
const router = (0, express_1.Router)();
router.get('/cliente_clasificacion', cliente_clasificacion_1.getClienteClasificaciones);
//Ciudades del cliente
router.get('/cliente_ciudad', cliente_ciudad_1.getClienteCiudades);
router.get('/cliente_ciudad/:id', cliente_ciudad_1.getClienteCiudad);
router.post('/cliente_ciudad', cliente_ciudad_1.postClienteCiudad);
router.put('/cliente_ciudad/:id', cliente_ciudad_1.updateClienteCiudad);
router.get('/cliente_zona/:id', cliente_zona_1.getClienteZonaCiudades);
exports.default = router;

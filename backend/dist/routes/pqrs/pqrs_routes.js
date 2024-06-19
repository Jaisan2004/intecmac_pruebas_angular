"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pqrs_plan_accion_1 = require("../../controllers/pqrs/pqrs_plan_accion");
const pqrs_producto_1 = require("../../controllers/pqrs/pqrs_producto");
const formsSelect_1 = require("../../controllers/formsSelect");
const validad_token_1 = __importDefault(require("../validad_token"));
const enviosCorreos_1 = require("../../controllers/enviosCorreos");
const router = (0, express_1.Router)();
//Pqrs productos
router.post('/pqrs_producto/', validad_token_1.default, pqrs_producto_1.postPqrsProducto);
router.get('/pqrs_productos/:id', validad_token_1.default, formsSelect_1.getInfoProducto);
router.get('/pqrs_producto/:id', validad_token_1.default, pqrs_producto_1.getPqrsProducto);
router.put('/pqrs_producto/:id', validad_token_1.default, pqrs_producto_1.updatePqrsProducto);
router.delete('/pqrs_producto/:id', validad_token_1.default, pqrs_producto_1.deletePqrsProducto);
//Pqrs Planes de accion
router.get('/planes_accion/:id', validad_token_1.default, pqrs_plan_accion_1.getPqrsPlanes);
router.post('/plan_accion/', validad_token_1.default, pqrs_plan_accion_1.postPlanPqrs);
router.get('/plan_accion/:id', validad_token_1.default, pqrs_plan_accion_1.getPlanPqrs);
router.put('/plan_accion/:id', validad_token_1.default, pqrs_plan_accion_1.updatePlanPqrs);
//correos PQRS
router.post('/plan_accion_correo', validad_token_1.default, enviosCorreos_1.correoPlan);
router.post('/pqrs_creada', validad_token_1.default, enviosCorreos_1.correoCreaPQRS);
exports.default = router;

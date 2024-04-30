"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pqrs_plan_accion_1 = require("../../controllers/pqrs/pqrs_plan_accion");
const router = (0, express_1.Router)();
router.get('/plan_accion/:id', pqrs_plan_accion_1.getPqrsPlan);
exports.default = router;

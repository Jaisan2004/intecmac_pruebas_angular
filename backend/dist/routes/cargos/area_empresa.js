"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validad_token_1 = __importDefault(require("../validad_token"));
const area_empresa_1 = require("../../controllers/cargos/area_empresa");
const router = (0, express_1.Router)();
router.get('/', validad_token_1.default, area_empresa_1.getAreasEmpresa);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargoController_1 = require("../../controllers/cargos/cargoController");
const validad_token_1 = __importDefault(require("../validad_token"));
const router = (0, express_1.Router)();
router.get('/traer/:id', validad_token_1.default, cargoController_1.getCargo);
router.get('/traerByArea/:id', cargoController_1.getCargoByArea);
exports.default = router;

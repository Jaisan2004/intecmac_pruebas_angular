"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../../controllers/cliente/cliente");
const validad_token_1 = __importDefault(require("../validad_token"));
const router = (0, express_1.Router)();
router.get('/', validad_token_1.default, cliente_1.getClientes);
router.get('/:id', validad_token_1.default, cliente_1.getCliente);
router.post('/', validad_token_1.default, cliente_1.postCliente);
router.put('/:id', validad_token_1.default, cliente_1.updateCliente);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formsSelect_1 = require("../controllers/formsSelect");
const validad_token_1 = __importDefault(require("./validad_token"));
const router = (0, express_1.Router)();
router.get('/clientes', validad_token_1.default, formsSelect_1.getClienteOption);
router.get('/clientes/:id', validad_token_1.default, formsSelect_1.getInfoCliente);
router.get('/productos', validad_token_1.default, formsSelect_1.getProductoOption);
router.get('/pqrsCausa', validad_token_1.default, formsSelect_1.getPqrsCausaOption);
router.get('/cargos', validad_token_1.default, formsSelect_1.getCargosOption);
router.get('/pqrsTipologia', validad_token_1.default, formsSelect_1.getPqrsTipologiaOption);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formsSelect_1 = require("../controllers/formsSelect");
const router = (0, express_1.Router)();
router.get('/clientes', formsSelect_1.getClienteOption);
router.get('/clientes/:id', formsSelect_1.getInfoCliente);
router.get('/productos', formsSelect_1.getProductoOption);
router.get('/pqrsCausa', formsSelect_1.getPqrsCausaOption);
router.get('/cargos', formsSelect_1.getCargosOption);
router.get('/pqrsTipologia', formsSelect_1.getPqrsTipologiaOption);
exports.default = router;
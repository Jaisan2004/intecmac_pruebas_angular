"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const router = (0, express_1.Router)();
router.get('/', cliente_1.getClientes);
router.get('/:id', cliente_1.getCliente);
exports.default = router;

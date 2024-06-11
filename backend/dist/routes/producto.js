"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validad_token_1 = __importDefault(require("./validad_token"));
const producto_1 = require("../controllers/producto");
const router = (0, express_1.Router)();
router.get('/', validad_token_1.default, producto_1.getProductos);
router.get('/:id', validad_token_1.default, producto_1.getProducto);
router.post('/', validad_token_1.default, producto_1.postProducto);
router.put('/:id', validad_token_1.default, producto_1.updateProducto);
exports.default = router;

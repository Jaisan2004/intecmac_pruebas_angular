"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducto = exports.postProducto = exports.getProducto = exports.getProductos = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducto = yield producto_1.default.findAll();
    res.json(listProducto);
});
exports.getProductos = getProductos;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pqrs = yield producto_1.default.findByPk(id);
    if (pqrs) {
        res.json(pqrs);
    }
    else {
        res.status(404).json({
            msg: 'No existe PQRS'
        });
    }
});
exports.getProducto = getProducto;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield producto_1.default.create(body);
        res.json({
            msg: `Producto: "${body.prod_descripcion}" creado exitosamente`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error en el servidor hable con soporte'
        });
    }
});
exports.postProducto = postProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const producto = yield producto_1.default.findByPk(id);
        if (producto) {
            producto.update(body);
            res.json({
                msg: `Se modifico el Producto: ${body.prod_descripcion} exitosamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite ningun Producto con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al editar el producto hable con soporte'
        });
    }
});
exports.updateProducto = updateProducto;

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
exports.updatePqrsProducto = exports.postPqrsProducto = exports.getPqrsProducto = exports.getPqrsProductos = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const pqrs_producto_1 = __importDefault(require("../../models/pqrs/pqrs_producto"));
const getPqrsProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = 'SELECT pp.pqrs_productos_id, p.pqrs_id, pr.prod_id,pr.prod_ref, pr.prod_descripcion, pp.lote, pp.cantidad FROM pqrs_productos pp INNER JOIN pqrs p on pp.pqrs_id = p.pqrs_id '
        + 'INNER JOIN productos pr on pp.prod_id = pr.prod_id;';
    const listProducto = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (listProducto) {
        res.json(listProducto);
    }
    else {
        res.status(404).json({
            msg: 'No existe PQRS'
        });
    }
});
exports.getPqrsProductos = getPqrsProductos;
const getPqrsProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prsProducto = yield pqrs_producto_1.default.findByPk(id);
    if (prsProducto) {
        res.json(prsProducto);
    }
    else {
        res.status(404).json({
            msg: 'No existe Producto en la pqrs PQRS'
        });
    }
});
exports.getPqrsProducto = getPqrsProducto;
const postPqrsProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield pqrs_producto_1.default.create(body);
        res.json({
            msg: 'Producto Agregado a la Pqrs Exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.postPqrsProducto = postPqrsProducto;
const updatePqrsProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const pqrsProducto = yield pqrs_producto_1.default.findByPk(id);
        if (pqrsProducto) {
            pqrsProducto.update(body);
            res.json({
                msg: 'El Producto de la PQRS se actualizo exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el Producto en la PQRS con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.updatePqrsProducto = updatePqrsProducto;

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
exports.updateCliente = exports.postCliente = exports.getCliente = exports.getClientes = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const cliente_1 = __importDefault(require("../../models/cliente/cliente"));
const sequelize_1 = require("sequelize");
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT c.cli_id, c.cli_nombre, c.cli_nit, cc.cli_cla_clasificacion,concat(cci.c_c_nombre,"/",cz.cz_nombre) as zona,` +
        ` c.cli_direccion, c.cli_telefono, c.cli_asesor_nombre, c.cli_pp_sistema FROM cliente c inner JOIN cliente_clasificacion cc on` +
        ` c.id_clasificacion=cc.cli_cla_id INNER JOIN cliente_ciudad cci on c.cli_ciudad = cci.c_c_id INNER JOIN cliente_zona cz on c.cli_zona = cz.cz_id ORDER BY c.cli_nombre;`;
    try {
        const listCliente = yield connection_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(listCliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los clientes'
        });
    }
});
exports.getClientes = getClientes;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pqrs = yield cliente_1.default.findByPk(id);
        if (pqrs) {
            res.json(pqrs);
        }
        else {
            res.status(404).json({
                msg: 'No existe Cliente'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer al cliente hable con soporte'
        });
    }
});
exports.getCliente = getCliente;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cliente_1.default.create(body);
        res.json({
            msg: 'Cliente Agregado Exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.postCliente = postCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const cliente = yield cliente_1.default.findByPk(id);
        if (cliente) {
            cliente.update(body);
            res.json({
                msg: 'El Cliente se actualizo exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el producto con el id ${id}`
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
exports.updateCliente = updateCliente;

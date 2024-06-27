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
exports.getPqrsTipologiaOption = exports.getCargosOption = exports.getPqrsCausaOption = exports.getInfoProducto = exports.getProductoOption = exports.getInfoCliente = exports.getClienteOption = void 0;
const cliente_1 = __importDefault(require("../models/cliente/cliente"));
const producto_1 = __importDefault(require("../models/producto"));
const pqrs_causa_raiz_1 = __importDefault(require("../models/pqrs/pqrs_causa_raiz"));
const cargos_1 = __importDefault(require("../models/cargos/cargos"));
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const pqrs_tipologia_1 = __importDefault(require("../models/pqrs/pqrs_tipologia"));
const getClienteOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCliente = yield cliente_1.default.findAll({
        attributes: ['cli_id', 'cli_nombre'],
        order: [['cli_nombre', 'ASC']]
    });
    res.json(listCliente);
});
exports.getClienteOption = getClienteOption;
const getInfoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = 'SELECT c.cli_nombre, concat(cc.c_c_nombre,"/",cz.cz_nombre) as zona, c.cli_pp_sistema,c.cli_asesor_nombre FROM cliente c INNER JOIN cliente_ciudad cc ON c.cli_ciudad = cc.c_c_id INNER JOIN cliente_zona cz on cz.cz_id=c.cli_zona WHERE cli_id=' + id + ';';
    const pqrs = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (pqrs) {
        res.json(pqrs);
    }
    else {
        res.status(404).json({
            msg: 'No existe PQRS'
        });
    }
});
exports.getInfoCliente = getInfoCliente;
const getProductoOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducto = yield producto_1.default.findAll({
        attributes: ['prod_id', 'prod_descripcion'],
        order: [['prod_descripcion', 'ASC']]
    });
    res.json(listProducto);
});
exports.getProductoOption = getProductoOption;
const getInfoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = 'SELECT pp.pqrs_productos_id, pr.prod_ref, pr.prod_descripcion, pp.lote, pp.cantidad FROM pqrs_productos pp INNER JOIN pqrs p on pp.pqrs_id = p.pqrs_id '
        + 'INNER JOIN productos pr on pp.prod_id = pr.prod_id where p.pqrs_id = ' + id + ';';
    try {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los productos'
        });
    }
});
exports.getInfoProducto = getInfoProducto;
const getPqrsCausaOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCausas = yield pqrs_causa_raiz_1.default.findAll({
        order: [['pcr_causa', 'ASC']]
    });
    res.json(listCausas);
});
exports.getPqrsCausaOption = getPqrsCausaOption;
const getCargosOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCargos = yield cargos_1.default.findAll({
        order: [['carg_nombre', 'ASC']]
    });
    res.json(listCargos);
});
exports.getCargosOption = getCargosOption;
const getPqrsTipologiaOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTipologia = yield pqrs_tipologia_1.default.findAll();
    res.json(listTipologia);
});
exports.getPqrsTipologiaOption = getPqrsTipologiaOption;

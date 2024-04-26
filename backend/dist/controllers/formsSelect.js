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
exports.getPqrsTipologiaOption = exports.getCargosOption = exports.getPqrsCausaOption = exports.getProductoOption = exports.getInfoCliente = exports.getClienteOption = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const producto_1 = __importDefault(require("../models/producto"));
const pqrs_causa_raiz_1 = __importDefault(require("../models/pqrs/pqrs_causa_raiz"));
const cargos_1 = __importDefault(require("../models/cargos"));
const pqrs_tipologia_1 = __importDefault(require("../models/pqrs/pqrs_tipologia"));
const getClienteOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCliente = yield cliente_1.default.findAll({
        attributes: ['cli_id', 'cli_nombre']
    });
    res.json(listCliente);
});
exports.getClienteOption = getClienteOption;
const getInfoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pqrs = yield cliente_1.default.findByPk(id, {
        attributes: ['cli_zona', 'cli_asesor_nombre']
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
        attributes: ['prod_id', 'prod_descripcion']
    });
    res.json(listProducto);
});
exports.getProductoOption = getProductoOption;
const getPqrsCausaOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCausas = yield pqrs_causa_raiz_1.default.findAll();
    res.json(listCausas);
});
exports.getPqrsCausaOption = getPqrsCausaOption;
const getCargosOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCargos = yield cargos_1.default.findAll();
    res.json(listCargos);
});
exports.getCargosOption = getCargosOption;
const getPqrsTipologiaOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTipologia = yield pqrs_tipologia_1.default.findAll();
    res.json(listTipologia);
});
exports.getPqrsTipologiaOption = getPqrsTipologiaOption;

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
exports.getCargoByArea = exports.getCargo = exports.getCargos = void 0;
const cargos_1 = __importDefault(require("../../models/cargos/cargos"));
const getCargos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCliente = yield cargos_1.default.findAll();
        res.json(listCliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los cargos hable con soporte'
        });
    }
});
exports.getCargos = getCargos;
const getCargo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pqrs = yield cargos_1.default.findByPk(id);
        if (pqrs) {
            res.json(pqrs);
        }
        else {
            res.status(404).json({
                msg: 'No existe Cargo'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer el cargo hable con soporte'
        });
    }
});
exports.getCargo = getCargo;
const getCargoByArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listCargos = yield cargos_1.default.findAll({
            where: {
                area_emp_id: id
            }
        });
        res.json(listCargos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los cargos hable con soporte'
        });
    }
});
exports.getCargoByArea = getCargoByArea;

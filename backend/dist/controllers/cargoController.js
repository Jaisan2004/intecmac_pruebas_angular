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
exports.getCargo = exports.getCargos = void 0;
const cargos_1 = __importDefault(require("../models/cargos"));
const getCargos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCliente = yield cargos_1.default.findAll();
    res.json(listCliente);
});
exports.getCargos = getCargos;
const getCargo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pqrs = yield cargos_1.default.findByPk(id);
    if (pqrs) {
        res.json(pqrs);
    }
    else {
        res.status(404).json({
            msg: 'No existe Cargo'
        });
    }
});
exports.getCargo = getCargo;

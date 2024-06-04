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
exports.getComponentes = exports.getModulos = void 0;
const modulo_1 = __importDefault(require("../../models/acceso/modulo"));
const getModulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mod_id = null;
    try {
        const listModulos = yield modulo_1.default.findAll({
            where: {
                mod_id_padre: mod_id
            }
        });
        if (listModulos) {
            res.json(listModulos);
        }
        else {
            res.status(404).json({
                msg: 'No existen modulos en la base de datos'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al traer los modulos hable con soporte'
        });
    }
});
exports.getModulos = getModulos;
const getComponentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listComponent = yield modulo_1.default.findAll({
            where: {
                mod_id_padre: id
            }
        });
        if (listComponent) {
            res.json(listComponent);
        }
        else {
            res.status(404).json({
                msg: 'No existen componentes para este modulo en la base de datos'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al traer los componentes del modulo hable con soporte'
        });
    }
});
exports.getComponentes = getComponentes;

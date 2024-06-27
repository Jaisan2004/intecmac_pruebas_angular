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
exports.updateClienteCiudad = exports.postClienteCiudad = exports.getClienteCiudad = exports.getClienteCiudades = void 0;
const cliente_ciudad_1 = __importDefault(require("../../models/cliente/cliente_ciudad"));
const getClienteCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listClienteCiudad = yield cliente_ciudad_1.default.findAll({
            order: [['c_c_nombre', 'ASC']]
        });
        res.json(listClienteCiudad);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer las ciudades'
        });
    }
});
exports.getClienteCiudades = getClienteCiudades;
const getClienteCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ciudad = yield cliente_ciudad_1.default.findByPk(id);
        if (ciudad) {
            res.json(ciudad);
        }
        else {
            res.status(404).json({
                msg: `No exite ninguna ciudad con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer la ciudad hable con soporte'
        });
    }
});
exports.getClienteCiudad = getClienteCiudad;
const postClienteCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cliente_ciudad_1.default.create(body);
        res.json({
            msg: `Ciudad ${body.c_c_nombre} creada exitosamente`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al crear la ciudad hable con soporte'
        });
    }
});
exports.postClienteCiudad = postClienteCiudad;
const updateClienteCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const ciudad = yield cliente_ciudad_1.default.findByPk(id);
        if (ciudad) {
            ciudad.update(body);
        }
        else {
            res.status(404).json({
                msg: `No existe una ciudad con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al editar la ciudad hable con soporte'
        });
    }
});
exports.updateClienteCiudad = updateClienteCiudad;

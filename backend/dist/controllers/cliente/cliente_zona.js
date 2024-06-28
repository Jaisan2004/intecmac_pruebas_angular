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
exports.updateClienteZona = exports.postClienteZona = exports.getClienteZona = exports.getClienteZonaCiudades = void 0;
const cliente_zona_1 = __importDefault(require("../../models/cliente/cliente_zona"));
const getClienteZonaCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listClienteZona = yield cliente_zona_1.default.findAll({
            where: { c_c_id: id }
        });
        res.json(listClienteZona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al traer los barrios de la ciudad hable con soporte'
        });
    }
});
exports.getClienteZonaCiudades = getClienteZonaCiudades;
const getClienteZona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const zona = yield cliente_zona_1.default.findByPk(id);
        if (zona) {
            res.json(zona);
        }
        else {
            res.status(404).json({
                msg: `No existe ningun barrio con el id: ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el barrio hable con soporte'
        });
    }
});
exports.getClienteZona = getClienteZona;
const postClienteZona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cliente_zona_1.default.create(body);
        res.json({
            msg: `Barrio: "${body.cz_nombre}" creado exitosamente`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el barrio hable con soporte'
        });
    }
});
exports.postClienteZona = postClienteZona;
const updateClienteZona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const zona = yield cliente_zona_1.default.findByPk(id);
        if (zona) {
            zona.update(body);
            res.json({
                msg: `Barrio: ${body.cz_nombre} editado exitosamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un barrio con el id:${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al editar el barrio'
        });
    }
});
exports.updateClienteZona = updateClienteZona;

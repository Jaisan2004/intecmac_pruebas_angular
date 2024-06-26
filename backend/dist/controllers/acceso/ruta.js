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
exports.deleteRuta = exports.updateRuta = exports.postRuta = exports.getRuta = exports.getRutasByComponente = void 0;
const ruta_1 = __importDefault(require("../../models/acceso/ruta"));
const getRutasByComponente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listRutas = yield ruta_1.default.findAll({
            where: { mod_id: id }
        });
        if (listRutas) {
            res.json(listRutas);
        }
        else {
            res.status(404).json({
                msg: 'No exten rutas para ese modulo'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer las rutas hable con soporte'
        });
    }
});
exports.getRutasByComponente = getRutasByComponente;
const getRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ruta = yield ruta_1.default.findByPk(id);
        if (ruta) {
            res.json(ruta);
        }
        else {
            res.status(404).json({
                msg: `No existe una ruta con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer la ruta hable con soporte'
        });
    }
});
exports.getRuta = getRuta;
const postRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield ruta_1.default.create(body);
        res.json({
            msg: `Ruta ${body.ruta_nombre} creada exitosamente`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la ruta hable con soporte'
        });
    }
});
exports.postRuta = postRuta;
const updateRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const ruta = yield ruta_1.default.findByPk(id);
        if (ruta) {
            ruta.update(body);
            res.json({
                msg: `Ruta modificada exitosamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite una ruta con el id: ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el sevidor al modificar la ruta hable con soporte'
        });
    }
});
exports.updateRuta = updateRuta;
const deleteRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ruta = yield ruta_1.default.findByPk(id);
        if (ruta) {
            yield ruta_1.default.destroy();
            res.json({
                msg: `Ruta eliminada exitosamente ${ruta.ruta_nombre}`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una ruta con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al eliminar la ruta'
        });
    }
});
exports.deleteRuta = deleteRuta;

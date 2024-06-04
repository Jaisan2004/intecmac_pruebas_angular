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
exports.updateRol = exports.postRol = exports.getRol = exports.getRoles = void 0;
const roles_1 = __importDefault(require("../../models/acceso/roles"));
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRoles = yield roles_1.default.findAll();
    res.json(listRoles);
});
exports.getRoles = getRoles;
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield roles_1.default.findByPk(id);
    if (rol) {
        res.json(rol);
    }
    else {
        res.status(404).json({
            msg: 'No existe Rol'
        });
    }
});
exports.getRol = getRol;
const postRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield roles_1.default.create(body);
        res.json({
            msg: 'Rol Agregado Exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al crear el Rol hable con soporte'
        });
    }
});
exports.postRol = postRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const rol = yield roles_1.default.findByPk(id);
        if (rol) {
            rol.update(body);
            res.json({
                msg: 'El Rol se actualizo exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un Rol con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error al editar el Rol hable con soporte'
        });
    }
});
exports.updateRol = updateRol;

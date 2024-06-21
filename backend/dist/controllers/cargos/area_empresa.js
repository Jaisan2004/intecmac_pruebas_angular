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
exports.getAreasEmpresa = void 0;
const area_empresa_1 = __importDefault(require("../../models/cargos/area_empresa"));
const getAreasEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAreasEmpresa = yield area_empresa_1.default.findAll({
            order: [['area_emp_nombre', 'ASC']]
        });
        res.json(listAreasEmpresa);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer las areas de la empresa hable con soporte'
        });
    }
});
exports.getAreasEmpresa = getAreasEmpresa;

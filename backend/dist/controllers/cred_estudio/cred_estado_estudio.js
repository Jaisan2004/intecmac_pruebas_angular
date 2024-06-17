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
exports.postEstadoEstudio = exports.getEstadosByEstudio = void 0;
const cred_estado_estudio_1 = __importDefault(require("../../models/cred_estudio/cred_estado_estudio"));
const getEstadosByEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listEstadoByEstudio = yield cred_estado_estudio_1.default.findAll({
            where: {
                cred_estu_id: id
            }
        });
        res.json(listEstadoByEstudio);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los estados del estudio de credito'
        });
    }
});
exports.getEstadosByEstudio = getEstadosByEstudio;
const postEstadoEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cred_estado_estudio_1.default.create(body);
        res.json({
            msg: `Se registo el estado del estudio de credito`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al momento de registrar el estado de estudio de credito'
        });
    }
});
exports.postEstadoEstudio = postEstadoEstudio;

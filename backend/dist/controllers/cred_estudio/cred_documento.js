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
exports.getCredDocumento = exports.getCredDocumentos = void 0;
const cred_documento_1 = __importDefault(require("../../models/cred_estudio/cred_documento"));
const getCredDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCredDocumentos = yield cred_documento_1.default.findAll();
        res.json(listCredDocumentos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer los documentos hable con soporte'
        });
    }
});
exports.getCredDocumentos = getCredDocumentos;
const getCredDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const documento = yield cred_documento_1.default.findByPk(id);
        if (documento) {
            res.json(documento);
        }
        else {
            res.status(404).json({
                msg: `No exite un documento con el id: ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el documento hable con el profesor'
        });
    }
});
exports.getCredDocumento = getCredDocumento;

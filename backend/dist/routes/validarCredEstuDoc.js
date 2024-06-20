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
const cred_estudio_documento_1 = __importDefault(require("../models/cred_estudio/cred_estudio_documento"));
const validarCredEstuDoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const documento = yield cred_estudio_documento_1.default.findOne({
            where: {
                cred_estu_doc_url: body.cred_estu_doc_url
            }
        });
        const nombre = body.cred_estu_doc_url.split('/').pop();
        if (documento) {
            console.log(documento);
            res.status(400).json({
                msg: `Ya exite un documento: ${nombre}`
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al registrar el documento en el estudio de credito'
        });
    }
});
exports.default = validarCredEstuDoc;

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
exports.getClienteZonaCiudades = void 0;
const cliente_zona_1 = __importDefault(require("../../models/cliente/cliente_zona"));
const getClienteZonaCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const listClienteZona = yield cliente_zona_1.default.findAll({
        where: { c_c_id: id }
    });
    res.json(listClienteZona);
});
exports.getClienteZonaCiudades = getClienteZonaCiudades;

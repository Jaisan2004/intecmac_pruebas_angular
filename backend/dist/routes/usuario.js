"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const validad_token_1 = __importDefault(require("./validad_token"));
const router = (0, express_1.Router)();
router.post('/nuevo', usuarios_1.postUser);
router.post('/login', usuarios_1.loginUsuario);
router.post('/permisos', validad_token_1.default, usuarios_1.permisosUsuario);
exports.default = router;

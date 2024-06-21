"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../../controllers/acceso/usuarios");
const validad_token_1 = __importDefault(require("../validad_token"));
const router = (0, express_1.Router)();
router.get('/', validad_token_1.default, usuarios_1.getUsers);
router.get('/:id', validad_token_1.default, usuarios_1.getUser);
router.post('/nuevo', validad_token_1.default, usuarios_1.postUser);
router.post('/login', usuarios_1.loginUsuario);
router.post('/permisos', validad_token_1.default, usuarios_1.permisosUsuario);
router.put('/:id', validad_token_1.default, usuarios_1.updateUser);
exports.default = router;

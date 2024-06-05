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
exports.permisosUsuario = exports.loginUsuario = exports.updateUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../../models/acceso/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const jwt_decode_1 = require("jwt-decode");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT usu.usu_id, usu.username, usu.carg_id, c.carg_nombre, c.carg_correo,usu.usu_contrasena,usu.rol_id, ar.rol_nombre, usu.usu_status,' +
        ' if(usu.usu_status = 1, "Activo", "Deshabilitado") as estado FROM usuarios usu join cargos c on c.carg_id=usu.carg_id' +
        ' join acc_roles ar on ar.rol_id = usu.rol_id ORDER BY usu.username,usu.usu_status;';
    const listUsuarios = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (listUsuarios) {
        res.json(listUsuarios);
    }
    else {
        res.status(404).json({
            msg: 'No existen Usuarios en la base de datos'
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, carg_id, usu_contrasena, rol_id } = req.body;
    //Validaciones de usuario
    const usuario = yield usuario_1.default.findOne({ where: { username: username } });
    if (usuario) {
        return res.status(400).json({
            msg: "Ya existe un usuario con este nombre"
        });
    }
    const hashContraseña = yield bcrypt_1.default.hash(usu_contrasena, 10);
    try {
        yield usuario_1.default.create({
            username: username,
            carg_id: carg_id,
            usu_contrasena: hashContraseña,
            rol_id: rol_id,
        });
        res.json({
            message: `Usuario ${username} Creado exitosamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `ups ocurrio un error`,
            error: error
        });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, carg_id, usu_contrasena, rol_id, usu_status } = req.body;
    const { id } = req.params;
    let body;
    if (usu_contrasena) {
        const hashContraseña = yield bcrypt_1.default.hash(usu_contrasena, 10);
        body = {
            usu_contrasena: hashContraseña
        };
    }
    else {
        body = {
            username: username,
            carg_id: carg_id,
            rol_id: rol_id,
        };
    }
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (usuario) {
            usuario.update(body);
            res.json({
                msg: 'El Producto de la PQRS se actualizo exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el Usuario con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.updateUser = updateUser;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield usuario_1.default.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario registrado con el nombre ${username}`
        });
    }
    //Validamos Contraseña
    const contraseñaValida = yield bcrypt_1.default.compare(password, user.usu_contrasena);
    if (!contraseñaValida) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        });
    }
    if (user.usu_status == 0) {
        return res.status(403).json({
            msg: `El usuario ${username} esta inactivo hable con el administrador`
        });
    }
    const rol = user.rol_id;
    //Generamos Token
    const token = jsonwebtoken_1.default.sign({
        "username": `${username}`,
        "rol": `${rol}`
    }, process.env.SECRET_KEY || 'intecma2024', {
    //expiresIn: '10000'
    });
    res.json({ token });
});
exports.loginUsuario = loginUsuario;
const permisosUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagina } = req.body;
    const headerToken = req.headers['authorization'];
    const bearerToken = headerToken === null || headerToken === void 0 ? void 0 : headerToken.slice(7);
    let tokenDecode;
    if (bearerToken) {
        tokenDecode = (0, jwt_decode_1.jwtDecode)(bearerToken);
    }
    else {
        res.status(406).json({
            msg: 'Sin permisos'
        });
    }
    if (pagina == undefined) {
        res.status(400).json({
            msg: 'Pagina no encontrada'
        });
    }
    const rol = tokenDecode.rol;
    const query = `SELECT ar.rol_nombre, aru.ruta_nombre FROM acc_roles ar JOIN acc_permisos ap ` +
        `on ar.rol_id = ap.rol_id join acc_rutas aru on aru.ruta_id = ap.ruta_id where aru.ruta_nombre = '${pagina}' and ar.rol_id= ${rol};`;
    const permisos = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (permisos.length !== 0) {
        return res.json({
            permisos,
            permiso: true
        });
    }
    else {
        return res.json({
            permiso: false
        });
    }
});
exports.permisosUsuario = permisosUsuario;

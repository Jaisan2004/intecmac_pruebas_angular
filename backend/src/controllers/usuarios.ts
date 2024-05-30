import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import Usuarios from '../models/usuario';
import jwt from 'jsonwebtoken'
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import { jwtDecode } from 'jwt-decode';

export const postUser = async(req: Request, res: Response) => {

    const {username, carg_id, usu_contraseña, rol_id} = req.body;
    
    //Validaciones de usuario
    const usuario = await Usuarios.findOne({where:{username: username}});

    if(usuario){
        return res.status(400).json({
            msg:"Ya existe un usuario con este nombre"
        })
    }

    const hashContraseña=await bcrypt.hash(usu_contraseña, 10);

    try {
        await Usuarios.create({
            username: username,
            carg_id: carg_id,
            usu_contraseña: hashContraseña,
            rol_id: rol_id,
        })
        res.json({
            message: `Usuario ${username} Creado exitosamente`,
        })     
    } catch (error) {
        res.status(400).json({
            msg: `ups ocurrio un error`,
            error: error
        })
    }

    
}

export const loginUsuario= async (req: Request, res: Response)=>{

    const {username, password} = req.body;
    
    //Validamos si el usuario existe en la base de datos
    const user = await Usuarios.findOne({where: {username: username}});

    if(!user){
        return res.status(400).json({
            msg: `No existe un usuario registrado con el correo ${username}`
        })
    }

    //Validamos Contraseña
    const contraseñaValida = await bcrypt.compare(password, user.usu_contraseña)
    
    if(!contraseñaValida){
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        })
    }

    if(user.usu_status == 0){
        return res.status(403).json({
            msg: `El usuario ${username} esta inactivo hable con el administrador`
        })
    }
    
    const rol = user.rol_id
    //Generamos Token
    const token=jwt.sign({
        "username": `${username}`,
        "rol": `${rol}`
    },process.env.SECRET_KEY || 'intecma2024', {
        //expiresIn: '10000'
    });

    res.json({token});
}

export const permisosUsuario = async (req: Request, res: Response)=>{
    const {pagina} = req.body
    const headerToken = req.headers['authorization'];

    const bearerToken = headerToken?.slice(7);

    let tokenDecode: any;

    if(bearerToken){
        tokenDecode=jwtDecode(bearerToken);
    } else{
        res.status(406).json({
            msg: 'Sin permisos'
        })
    }

    if(pagina == undefined){
        res.status(400).json({
            msg:'Pagina no encontrada'
        })
    }

    const rol = tokenDecode.rol;
    
    const query = `SELECT ar.rol_nombre, aru.ruta_nombre FROM acc_roles ar JOIN acc_permisos ap `+
    `on ar.rol_id = ap.rol_id join acc_rutas aru on aru.ruta_id = ap.ruta_id where aru.ruta_nombre = '${pagina}' and ar.rol_id= ${rol};`

    const permisos = await sequelize.query(query, {
        type: QueryTypes.SELECT
    });

    if(permisos.length !== 0){
        return res.json({
            permisos,
            permiso:  true
        });
    }else{
        return res.json({
            permiso: false
        })
    }
    
}
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import Usuarios from '../../models/acceso/usuario';
import jwt from 'jsonwebtoken'
import sequelize from '../../db/connection';
import { QueryTypes } from 'sequelize';
import { jwtDecode } from 'jwt-decode';

export const getUsers = async (req: Request, res: Response) => {
    const query = 'SELECT usu.usu_id, usu.username, usu.carg_id, c.carg_nombre, c.carg_correo,usu.usu_contrasena,usu.rol_id, ar.rol_nombre, usu.usu_status,' +
        ' if(usu.usu_status = 1, "Activo", "Deshabilitado") as estado FROM usuarios usu join cargos c on c.carg_id=usu.carg_id' +
        ' join acc_roles ar on ar.rol_id = usu.rol_id ORDER BY usu.username,usu.usu_status;'

    const listUsuarios = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    if (listUsuarios) {
        res.json(listUsuarios)
    } else {
        res.status(404).json({
            msg: 'No existen Usuarios en la base de datos'
        })
    }
}

const getUserInfo = async (id:any)=>{
    const query = `SELECT usu.username, c.carg_nombre, c.carg_correo FROM usuarios usu join cargos c on c.carg_id=usu.carg_id join acc_roles ar 
    on ar.rol_id = usu.rol_id WHERE usu.usu_id = ${id} ORDER BY usu.username,usu.usu_status;`

    const user = await sequelize.query(query,{
        type: QueryTypes.SELECT,
    });

    if(user){
        return user;
    }else{
        return false;
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await Usuarios.findByPk(id);

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
}

export const postUser = async (req: Request, res: Response) => {

    const { username, carg_id, usu_contrasena, rol_id } = req.body;

    //Validaciones de usuario
    const usuario = await Usuarios.findOne({ where: { username: username } });

    if (usuario) {
        return res.status(400).json({
            msg: "Ya existe un usuario con este nombre"
        })
    }

    const hashContraseña = await bcrypt.hash(usu_contrasena, 10);

    try {
        await Usuarios.create({
            username: username,
            carg_id: carg_id,
            usu_contrasena: hashContraseña,
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

export const updateUser = async (req: Request, res: Response) => {
    const { username, carg_id, usu_contrasena, rol_id, usu_status } = req.body;
    const { id } = req.params;

    let body;

    if (usu_contrasena) {
        const hashContraseña = await bcrypt.hash(usu_contrasena, 10);

        body = {
            usu_contrasena: hashContraseña
        }
    } else {
        body = {
            username: username,
            carg_id: carg_id,
            rol_id: rol_id,
            usu_status: usu_status
        }
    }
    try {

        const usuario = await Usuarios.findByPk(id)
        if (usuario) {
            usuario.update(body);
            res.json({
                msg: 'El Producto de la PQRS se actualizo exitosamente'
            })
        } else {
            res.status(404).json({
                msg: `No existe el Usuario con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }
}

export const loginUsuario = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    //Validamos si el usuario existe en la base de datos
    const user = await Usuarios.findOne({ where: { username: username } });

    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario registrado con el nombre ${username}`
        })
    }

    //Validamos Contraseña
    const contraseñaValida = await bcrypt.compare(password, user.usu_contrasena)

    if (!contraseñaValida) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        })
    }

    if (user.usu_status == 0) {
        return res.status(403).json({
            msg: `El usuario ${username} esta inactivo hable con el administrador`
        })
    }

    const [userInfo] = await getUserInfo(user.usu_id);


    const rol = user.rol_id
    //Generamos Token
    const token = jwt.sign({
        "username": `${username}`,
        "codigo":user.usu_id,//se pone 'codigo' para que no sea evidente que es el id del usuario
        "rol": `${rol}`
    }, process.env.SECRET_KEY || 'intecma2024', {
        //expiresIn: '10000'
    });

    res.json({ token,
        userInfo
     });
}

export const permisosUsuario = async (req: Request, res: Response) => {
    const { pagina } = req.body
    const headerToken = req.headers['authorization'];

    const bearerToken = headerToken?.slice(7);

    let tokenDecode: any;

    if (bearerToken) {
        tokenDecode = jwtDecode(bearerToken);
    } else {
        res.status(406).json({
            msg: 'Sin permisos'
        })
    }

    if (pagina == undefined) {
        res.status(400).json({
            msg: 'Pagina no encontrada'
        })
    }

    const rol = tokenDecode.rol;

    const query = `SELECT ar.rol_nombre, aru.ruta_nombre FROM acc_roles ar JOIN acc_permisos ap ` +
        `on ar.rol_id = ap.rol_id join acc_rutas aru on aru.ruta_id = ap.ruta_id where aru.ruta_nombre = '${pagina}' and ar.rol_id= ${rol};`

    const permisos = await sequelize.query(query, {
        type: QueryTypes.SELECT
    });

    if (permisos.length !== 0) {
        return res.json({
            permisos,
            permiso: true
        });
    } else {
        return res.json({
            permiso: false
        })
    }

}
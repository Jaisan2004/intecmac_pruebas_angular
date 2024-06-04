import { Request, Response } from 'express'
import sequelize from '../../db/connection';
import { QueryTypes } from 'sequelize';
import Permisos from '../../models/acceso/permisos';

export const getPermisosByRol = async(req: Request, res: Response) => {
    const {id} = req.params

    const query = `SELECT ap.per_id, am.mod_nombre, ar.ruta_nombre FROM acc_permisos ap JOIN acc_rutas ar ON ap.ruta_id = ar.ruta_id JOIN 
    acc_modulos am ON ar.mod_id = am.mod_id WHERE ap.rol_id = ${id} ORDER BY am.mod_nombre ASC;`

    const listPermisos = await sequelize.query(query,{
        type: QueryTypes.SELECT,
    });

    if(listPermisos){
        res.json(listPermisos)
    }else{
        res.status(400).json({
            msg: 'No existen permisos para este rol'
        })
    }
    
}

export const postPermisos= async(req: Request, res: Response) =>{
    const { body } = req;

    try {
        await Permisos.create(body);

        res.json({
            msg: 'Permisos Agregado Exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al crear los Permisos hable con soporte'
        })

    }
}
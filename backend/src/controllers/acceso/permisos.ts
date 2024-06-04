import { Request, Response } from 'express'
import sequelize from '../../db/connection';
import { QueryTypes } from 'sequelize';
import Permisos from '../../models/acceso/permisos';

export const getPermisosByRol = async(req: Request, res: Response) => {
    const {id} = req.params

    const query = `SELECT ap.per_id, am.mod_nombre,com.mod_nombre as componente, ar.ruta_nombre, ar.ruta_descripcion FROM acc_permisos ap JOIN acc_rutas ar ON ap.ruta_id = ar.ruta_id
     JOIN acc_modulos com ON ar.mod_id = com.mod_id LEFT join acc_modulos am on com.mod_id_padre = am.mod_id WHERE ap.rol_id = ${id} ORDER BY am.mod_nombre,com.mod_nombre ASC;`

    try {
        const listPermisos = await sequelize.query(query,{
            type: QueryTypes.SELECT,
        });
    
        if(listPermisos&& listPermisos.length !== 0){
            res.json(listPermisos)
        }else{
            res.status(400).json({
                msg: 'No existen permisos para este rol'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los permisos hable con Soporte'
        })
    }
    
}

export const getPermiso = async(req: Request, res: Response)=>{
    const {id} = req.params;

    const query = `SELECT ap.per_id, am.mod_id,com.mod_id as comp_id,ar.ruta_id FROM acc_permisos ap JOIN acc_rutas ar ON ap.ruta_id = ar.ruta_id 
    JOIN acc_modulos com ON ar.mod_id = com.mod_id LEFT join acc_modulos am on com.mod_id_padre = am.mod_id WHERE ap.per_id = ${id} ORDER BY am.mod_nombre,com.mod_nombre ASC;`

    try {
        const permiso = await sequelize.query(query, {
            type: QueryTypes.SELECT
        })
    
        if(permiso && permiso.length !== 0){
            res.json(permiso);
        }else{
            res.status(400).json({
                msg: `No ningun permiso con el id: ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el permiso hable con soporte'
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

export const updatePermiso = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const permiso = await Permisos.findByPk(id);

        if(permiso){
            permiso.update(body);

            res.json({
                msg: `Permiso modificado exitosamente`
            });
        }else{
            res.status(400).json({
                msg: `No existe un permiso con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error en el servidor al editar el permiso`
        })
    }
}

export const deletePermiso = async(req: Request, res: Response)=>{
    const {id} = req.params;

    try {
        const permiso = await Permisos.findByPk(id);

        if(permiso){
            permiso.destroy();

            res.json({
                msg: `Permiso eliminado exitosamente`
            });
        }else{
            res.status(400).json({
                msg: `No existe un permiso con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error en el servidor al eliminar el permiso`
        })
    }
}
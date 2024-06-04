import { Request, Response } from 'express'
import Roles from '../../models/acceso/roles';

export const getRoles = async(req: Request, res: Response) => {
    const listRoles = await Roles.findAll()

    res.json(listRoles)
}

export const getRol= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const rol = await Roles.findByPk(id)

    if(rol){
        res.json(rol)
    }else{
        res.status(404).json({
            msg: 'No existe Rol'
        })
    }
    
}

export const postRol= async(req: Request, res: Response) =>{
    const { body } = req;

    try {
        await Roles.create(body);

        res.json({
            msg: 'Rol Agregado Exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al crear el Rol hable con soporte'
        })

    }
}

export const updateRol = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    try {
        const rol = await Roles.findByPk(id)
        if (rol) {
            rol.update(body);
            res.json({
                msg: 'El Rol se actualizo exitosamente'
            })
        } else {
            res.status(404).json({
                msg: `No existe un Rol con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error al editar el Rol hable con soporte'
        })

    }

}
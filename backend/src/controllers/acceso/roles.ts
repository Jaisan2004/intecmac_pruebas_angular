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
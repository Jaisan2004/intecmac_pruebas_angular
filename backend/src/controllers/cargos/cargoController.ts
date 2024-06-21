import { Request, Response } from 'express'
import Cargo from '../../models/cargos/cargos';

export const getCargos = async(req: Request, res: Response) => {
    const listCliente = await Cargo.findAll()

    res.json(listCliente)
}

export const getCargo= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const pqrs = await Cargo.findByPk(id);

    if(pqrs){
        res.json(pqrs)
    }else{
        res.status(404).json({
            msg: 'No existe Cargo'
        })
    }
    
}
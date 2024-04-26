import { Request, Response } from 'express'
import Cliente from '../models/cliente';

export const getClientes = async(req: Request, res: Response) => {
    const listCliente = await Cliente.findAll()

    res.json(listCliente)
}

export const getCliente= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const pqrs = await Cliente.findByPk(id)

    if(pqrs){
        res.json(pqrs)
    }else{
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }
    
}
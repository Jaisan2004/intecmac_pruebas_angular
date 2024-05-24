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

export const postPQRS = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Cliente.create(body);

        res.json({
            msg: 'PRQS Agregados Exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }


}

export const updatePQRS = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    try {
        const pqrs = await Cliente.findByPk(id)
        if (pqrs) {
            pqrs.update(body);
            res.json({
                msg: 'El PQRS se actualizo exitosamente'
            })
        } else {
            res.status(404).json({
                msg: `No existe el producto con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }

}
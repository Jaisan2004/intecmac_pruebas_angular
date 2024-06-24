import { Request, Response } from 'express'
import Cargo from '../../models/cargos/cargos';

export const getCargos = async(req: Request, res: Response) => {
    try {
        const listCliente = await Cargo.findAll();
    
        res.json(listCliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los cargos hable con soporte'
        });        
    }
}

export const getCargo= async (req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        const pqrs = await Cargo.findByPk(id);
    
        if(pqrs){
            res.json(pqrs);
        }else{
            res.status(404).json({
                msg: 'No existe Cargo'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer el cargo hable con soporte'
        });
    }
    
}

export const getCargoByArea = async (req:Request, res:Response)=>{
    const {id} = req.params;
    try {
        const listCargos = await Cargo.findAll({
            where: {
                area_emp_id: id
            }
        });
        res.json(listCargos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los cargos hable con soporte'
        });
    }
}
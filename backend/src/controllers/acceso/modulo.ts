import { Request, Response } from 'express';
import Modulo from "../../models/acceso/modulo";

export const getModulos = async(req: Request, res: Response)=>{

    const mod_id = null
    
    try {
        const listModulos = await Modulo.findAll({
            where: {
                mod_id_padre: mod_id
            }
        });

        if(listModulos){
            res.json(listModulos);
        }else{
            res.status(404).json({
                msg: 'No existen modulos en la base de datos'
            })
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al traer los modulos hable con soporte'
        })
    }
    

}

export const getComponentes = async(req: Request, res: Response)=>{

    const {id} = req.params;
    
    try {
        const listComponent = await Modulo.findAll({
            where: {
                mod_id_padre: id
            }
        });

        if(listComponent){
            res.json(listComponent);
        }else{
            res.status(404).json({
                msg: 'No existen componentes para este modulo en la base de datos'
            })
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error al traer los componentes del modulo hable con soporte'
        })
    }
    

}
import { Request, Response } from 'express';
import Modulo from "../../models/acceso/modulo";

//Modulos
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

export const getModulo = async(req:Request, res: Response)=>{
    const {id} = req.params;

    try {
        const modulo = await Modulo.findByPk(id);

        if(modulo){
            res.json(modulo);
        }else{
            res.status(404).json({
                msg: 'No existen Modulos en la base de datos'
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el modulo'
        })
    }
}

export const postModulo = async(req: Request, res: Response)=>{
    const {body} = req;

    try {
        await Modulo.create(body);

        res.json({
            msg: `Modulo ${body.mod_nombre} Creado`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al crear el Modulo'
        });
    }
}

export const updateModulo = async(req: Request, res:Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const modulo = await Modulo.findByPk(id);
    
        if(modulo){
            modulo.update(body);
    
            res.json({
                msg: 'El modulo se modifico exitosamente'
            });
        } else {
            res.status(404).json({
                msg: `No existe ningun modulo con el id: ${id}`
            });
        }
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al editar el modulo'
        })
    }
}

//Componentes
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
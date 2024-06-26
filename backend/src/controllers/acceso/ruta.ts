import { Request, Response } from "express";
import Rutas from "../../models/acceso/ruta";

export const getRutasByComponente = async (req: Request, res: Response) =>{
    const {id} = req.params

    try {
        
        const listRutas = await Rutas.findAll({
            where: {mod_id: id}
        })
    
        if(listRutas){
            res.json(listRutas);
        }else{
            res.status(404).json({
                msg: 'No exten rutas para ese modulo'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer las rutas hable con soporte'
        })
    }
}

export const getRuta = async (req: Request, res: Response)=>{
    const {id} = req.params;

    try {
        const ruta = await Rutas.findByPk(id);

        if(ruta){
            res.json(ruta);
        }else{
            res.status(404).json({
                msg: `No existe una ruta con el id: ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer la ruta hable con soporte'
        })
    }
}

export const postRuta = async (req: Request, res: Response)=>{
    const {body} = req;

    try {
        await Rutas.create(body);

        res.json({
            msg: `Ruta ${body.ruta_nombre} creada exitosamente`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la ruta hable con soporte'
        }); 
    }
}

export const updateRuta = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const ruta = await Rutas.findByPk(id);

        if(ruta){
            ruta.update(body);

            res.json({
                msg: `Ruta modificada exitosamente`
            })
        } else {
            res.status(404).json({
                msg: `No exite una ruta con el id: ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el sevidor al modificar la ruta hable con soporte'
        })
    }
}

export const deleteRuta = async (req: Request, res: Response)=>{
    const {id} = req.params;

    try {
        const ruta = await Rutas.findByPk(id);
        if(ruta){
            await Rutas.destroy();

            res.json({
                msg: `Ruta eliminada exitosamente ${ruta.ruta_nombre}`
            })
        }else{
            res.status(404).json({
                msg: `No existe una ruta con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al eliminar la ruta'
        });
    }
}
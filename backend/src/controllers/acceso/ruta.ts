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
            msg: 'Error en el servidor al traer las rutas'
        })
    }
}
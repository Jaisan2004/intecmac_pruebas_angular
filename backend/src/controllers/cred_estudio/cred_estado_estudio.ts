import { Request, Response } from "express"
import CredEstadoEstudio from "../../models/cred_estudio/cred_estado_estudio";


export const getEstadosByEstudio = async (req: Request, res: Response) =>{
    const {id} = req.params;

    try {
        const listEstadoByEstudio = await CredEstadoEstudio.findAll({
            where:{
                cred_estu_id: id
            }
        })

        res.json(listEstadoByEstudio);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los estados del estudio de credito'
        })
    }
} 

export const postEstadoEstudio =  async (req:Request, res: Response) =>{
    const {body} = req;

    try {
        await CredEstadoEstudio.create(body);

        res.json({
            msg: `Se registo el estado del estudio de credito`
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al momento de registrar el estado de estudio de credito'
        })
    }
}
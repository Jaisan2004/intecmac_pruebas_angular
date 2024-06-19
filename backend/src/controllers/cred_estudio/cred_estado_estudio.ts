import { Request, Response } from "express"
import CredEstadoEstudio from "../../models/cred_estudio/cred_estado_estudio";
import sequelize from "../../db/connection";
import { where } from "sequelize";


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

export const getLastEstadoByEstudio = async (req: Request, res: Response)=>{
    const {id} =req.params;

    try {
        const ultimoEstadoEstu = await CredEstadoEstudio.findAll({
            attributes: [[sequelize.fn('MAX', sequelize.col('cred_esta_estu_id')), 'cred_esta_estu_id']],
            where: {cred_estu_id: id}
        });

        if(ultimoEstadoEstu){
            res.json(ultimoEstadoEstu)
        }else{
            res.status(404).json({
                msg: `El estudio de credito con el id: ${id} no tiene ningun estado`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer el ultimo estado del estudio de credito'
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

export const updateEstadoEstudio = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const estadoEstu = await CredEstadoEstudio.findByPk(id);

        if(estadoEstu){
            estadoEstu.updated(body);

            res.json({
                msg: `Estado del credito fue actualizado exictosamente`
            });
        }else{
            res.status(404).json({
                msg: `No Existe un estado con el id:${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el serviforal modificar el estudio de credito'
        });
    }
}
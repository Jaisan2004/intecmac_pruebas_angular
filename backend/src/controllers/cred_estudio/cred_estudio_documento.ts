import { Request, Response } from "express";
import CredEstudioDocumento from "../../models/cred_estudio/cred_estudio_documento";
import sequelize from "../../db/connection";
import { QueryTypes } from "sequelize";
import CredDocumento from "../../models/cred_estudio/cred_documento";

export const getCredDocByEstudio = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const query = `SELECT ced.cred_doc_id, cd.cred_doc_nombre FROM cred_estudio_documento ced 
    JOIN cred_documento cd ON ced.cred_doc_id = cd.cred_doc_id where ced.cred_estu_id = ${id};`;

    try {
        const listCredDocumento = sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        res.json(listCredDocumento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los documentos hable con soporte'
        });
    }
}

export const getCredDocEstudio = async (req: Request, res: Response)=>{
    const {id} = req.params;

    try {
        const credDocumento = await CredEstudioDocumento.findByPk(id);

        if(credDocumento){
            res.json(credDocumento);
        }else{
            res.status(404).json({
                msg: `No existe un documento para este estudio con el id: ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error en el servidor al traer el documento hable con soporte`
        })
    }
}

export const postCredDocEstudio = async (req: Request, res: Response)=>{
    const {body} = req;

    try {
        await CredEstudioDocumento.create(body);

        res.json({
            msg: `El documento se registro exitosamente en el estudio de credito`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al registrar el documento en el estudio de credito'
        });
    }
}

export const updateCredDocEstudio = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const credDocumento = await CredEstudioDocumento.findByPk(id);

        if(credDocumento){
            credDocumento.update(body);

            res.json({
                msg: 'Documento actualizado exitosamente'
            });
        }else{
            res.status(404).json({
                msg: `No exite un documento con el "id: ${id}" en el estudio de credito`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al actualizar el documento hable con soporte'
        });
    }
}

export const deleteCredDocEstudio = async (req: Request, res: Response)=>{
    const {id} = req.params;

    try {
        const credDocumento = await CredEstudioDocumento.findByPk(id);

        if(credDocumento){
            credDocumento.destroy();

            res.json({
                msg: `Se elimino el documento con el id: ${id} del estudio de credito`
            });
        }else{
            res.status(404).json({
                msg: `No exite un documento con el "id: ${id}" en el estudio de credito`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al eliminar el documento hable con soporte'
        });
    }
}
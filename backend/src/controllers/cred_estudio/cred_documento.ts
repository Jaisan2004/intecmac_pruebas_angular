import { Request, Response } from "express";
import CredDocumento from "../../models/cred_estudio/cred_documento";

export const getCredDocumentos = async(req: Request, res: Response)=>{
    try {
        const listCredDocumentos = await CredDocumento.findAll({
            order: [['cred_doc_nombre','ASC']]
        });

        res.json(listCredDocumentos);
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer los documentos hable con soporte'
        })
    }
}

export const getCredDocumento = async(req:Request, res: Response)=>{
    const {id} =req.params;

    try {
        const documento = await CredDocumento.findByPk(id);

        if(documento){
            res.json(documento);
        }else{
            res.status(404).json({
                msg: `No exite un documento con el id: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el documento hable con el profesor'
        });
    }
}
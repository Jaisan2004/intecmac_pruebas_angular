import { Request, Response } from 'express'
import Pqrs from '../../models/pqrs/pqrs'
import sequelize from '../../db/connection';
import { DATE, QueryTypes } from 'sequelize';
import multer from 'multer';

export const getPQRSs = async (req: Request, res: Response) => {

    const query = 'SELECT pq.pqrs_id, pq.pqrs_fecha_recepcion, pq.cli_id, cli.cli_nombre, cli.cli_zona, cli.cli_asesor_nombre, pq.prod_id, pro.prod_descripcion, pq.pqrs_lote,' +
        'pq.pqrs_prod_cantidad, pq.pqrs_doc, pq.pqrs_evidencia,pq.pqrs_descripcion, pq.pqrs_analisis,pq.pqrs_analisis, pq.costo, pq.pqrs_causa_raiz_id, pcr.pcr_causa, pq.carg_id, carg.carg_nombre,' +
        ' pq.pt_id, pt.pt_tipologia, pq.pqrs_fecha_respuesta, pq.pqrs_dias_gestion, pq.pqrs_documento_cruce, pq.pqrs_estado, pe.pe_estado from pqrs pq' +
        ' join cliente cli on pq.cli_id = cli.cli_id JOIN productos pro on pro.prod_id=pq.prod_id JOIN pqrs_causa_raiz pcr on pcr.pcr_id = pq.pqrs_causa_raiz_id' +
        ' join cargos carg on carg.carg_id=pq.carg_id join pqrs_tipologia pt on pt.pt_id=pq.pt_id join pqrs_estado pe on pe.pe_id= pq.pqrs_estado ORDER BY pq.pqrs_id DESC;';

    const listPqrs = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    res.json(listPqrs)
}

export const getPQRS = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pqrs = await Pqrs.findByPk(id)

    if (pqrs) {
        res.json(pqrs)
    } else {
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }

}

export const postPQRS = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Pqrs.create(body);

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
        const pqrs = await Pqrs.findByPk(id)
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



export const updatePQRSImage = async (req: Request, res: Response) => {

    const filePath = req.body.filePath;
    const { id } = req.params;

    try {
      const pqrs = await Pqrs.findByPk(id);
      if (pqrs) {
        pqrs.update({ pqrs_evidencia: filePath }, {
          where: {
            id: id,
          },
        });
        res.json({
          msg: 'El PQRS se actualizó exitosamente',
          filePath: filePath,
        });
      } else {
        res.status(404).json({
          msg: `No existe el producto con el id ${id}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: 'Ha ocurrido un error hable con soporte',
      });
    }

};

const storage = multer.diskStorage({
    filename: function(res, file, cb){
        const fileName = file.originalname;
        cb(null,`${fileName}`)
    },
    destination: function (req, file, cb) {
        cb(null, './src/public');
    }
});

export const upload = multer({ storage: storage });
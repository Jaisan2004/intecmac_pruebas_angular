import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Pqrs = db.define('pqrs',{
    pqrs_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pqrs_fecha_recepcion:{
        type: DataTypes.DATE
    },
    cli_id:{
        type: DataTypes.NUMBER
    },
    prod_id:{
        type: DataTypes.NUMBER
    },
    pqrs_lote:{
        type: DataTypes.STRING
    },
    pqrs_prod_cantidad:{
        type: DataTypes.NUMBER
    },
    pqrs_doc:{
        type: DataTypes.STRING
    },
    pqrs_evidencia:{
        type: DataTypes.STRING
    },
    pqrs_descripcion:{
        type: DataTypes.STRING
    },
    pqrs_analisis:{
        type: DataTypes.STRING
    },
    costo:{
        type: DataTypes.STRING
    },
    pqrs_causa_raiz_id:{
        type: DataTypes.NUMBER
    },
    carg_id:{
        type: DataTypes.NUMBER
    },
    pt_id:{
        type: DataTypes.NUMBER
    },
    pqrs_fecha_respuesta:{
        type: DataTypes.DATE
    },
    pqrs_dias_gestion:{
        type: DataTypes.NUMBER
    },
    pqrs_documento_cruce:{
        type: DataTypes.STRING
    },
    pqrs_estado:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})


export default Pqrs;
import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const CredEstudio = db.define('cred_estudio',{
    cred_estu_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_fecha_creacion:{
        type: DataTypes.DATE
    },
    cli_id:{
        type: DataTypes.NUMBER
    },
    cred_tipo_id:{
        type: DataTypes.NUMBER
    },
    cred_obser_comercial:{
        type: DataTypes.STRING
    },
    cred_cliente_desde:{
        type: DataTypes.STRING
    },
    cred_cupo_actual:{
        type: DataTypes.STRING
    },
    cred_descuento_otorgado:{
        type: DataTypes.STRING
    },
    cred_obser_dirComercial:{
        type: DataTypes.STRING
    },
    cred_obser_contabilidad:{
        type: DataTypes.STRING
    },
    cred_plazo_aprobado:{
        type: DataTypes.NUMBER
    },
    cred_cupo_aprobado:{
        type: DataTypes.STRING
    },
    cred_obser_gerencia:{
        type: DataTypes.STRING
    },
    usu_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})


export default CredEstudio;
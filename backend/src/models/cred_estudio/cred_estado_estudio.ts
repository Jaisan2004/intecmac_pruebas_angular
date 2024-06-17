import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const CredEstadoEstudio = db.define('cred_estado_estudio',{
    cred_esta_estu_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_estu_id:{
        type: DataTypes.NUMBER
    },
    cred_esta_id:{
        type: DataTypes.NUMBER
    },
    cred_esta_estu_fecha:{
        type: DataTypes.DATE
    },
    cred_esta_estu_fecha_fin:{
        type: DataTypes.DATE
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default CredEstadoEstudio;
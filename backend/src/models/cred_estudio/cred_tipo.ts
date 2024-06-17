import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const CredTipo = db.define('cred_tipo',{
    cred_tipo_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_tipo_nombre:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default CredTipo;
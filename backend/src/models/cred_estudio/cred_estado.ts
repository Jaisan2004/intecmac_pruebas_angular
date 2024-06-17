import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const CredEstado = db.define('cred_estado',{
    cred_esta_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_esta_nombre:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default CredEstado;
import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Pqrs_Causa = db.define('pqrs_causa_raiz',{
    pcr_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pcr_causa:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Pqrs_Causa;
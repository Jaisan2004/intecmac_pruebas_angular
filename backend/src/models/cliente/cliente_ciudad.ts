import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Cliente_Ciudad = db.define('cliente_ciudad',{
    c_c_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    c_c_nombre:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Cliente_Ciudad;
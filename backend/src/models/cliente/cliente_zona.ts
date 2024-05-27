import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Cliente_Zona = db.define('cliente_zona',{
    cz_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cz_nombre:{
        type: DataTypes.STRING
    },
    c_c_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Cliente_Zona;
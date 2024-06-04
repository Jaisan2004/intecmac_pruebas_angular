import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Modulo = db.define('acc_modulos',{
    mod_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    mod_nombre:{
        type: DataTypes.STRING
    },
    mod_id_padre:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default  Modulo;
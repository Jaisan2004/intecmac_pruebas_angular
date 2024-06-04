import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Permisos = db.define('acc_permisos',{
    per_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    rol_id:{
        type: DataTypes.NUMBER
    },
    ruta_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Permisos;
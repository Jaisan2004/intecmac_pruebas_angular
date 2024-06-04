import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Rutas = db.define('acc_rutas',{
    ruta_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    ruta_nombre:{
        type: DataTypes.STRING
    },
    ruta_descripcion:{
        type: DataTypes.STRING
    },
    mod_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Rutas;
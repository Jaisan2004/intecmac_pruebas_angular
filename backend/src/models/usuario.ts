import {DataTypes} from 'sequelize'
import db from '../db/connection';

const Usuarios = db.define('usuarios',{
    usu_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING
    },
    carg_id:{
        type: DataTypes.NUMBER
    },
    usu_contraseña:{
        type: DataTypes.STRING
    },
    rol_id:{
        type: DataTypes.NUMBER
    },
    usu_status:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Usuarios;
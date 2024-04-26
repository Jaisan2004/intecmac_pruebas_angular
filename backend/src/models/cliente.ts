import {DataTypes} from 'sequelize'
import db from '../db/connection';

const Cliente = db.define('cliente',{
    cli_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cli_nombre:{
        type: DataTypes.STRING
    },
    cli_nit:{
        type: DataTypes.STRING
    },
    id_clasificacion:{
        type: DataTypes.NUMBER
    },
    cli_direccion:{
        type: DataTypes.STRING
    },
    cli_telefono:{
        type: DataTypes.STRING
    },
    cli_zona:{
        type: DataTypes.STRING
    },
    cli_asesor_nombre:{
        type: DataTypes.STRING
    },
    cli_pp_sistema:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Cliente;
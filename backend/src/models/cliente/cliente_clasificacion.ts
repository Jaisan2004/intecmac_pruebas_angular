import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Cliente_Clasificacion = db.define('cliente_clasificacion',{
    cli_cla_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cli_cla_clasificacion:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Cliente_Clasificacion;
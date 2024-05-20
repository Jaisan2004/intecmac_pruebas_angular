import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const PqrsProducto = db.define('pqrs_productos',{
    pqrs_productos_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pqrs_id:{
        type: DataTypes.NUMBER
    },
    prod_id:{
        type: DataTypes.NUMBER
    },
    lote:{
        type: DataTypes.STRING
    },
    cantidad:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default PqrsProducto;
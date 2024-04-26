import {DataTypes} from 'sequelize'
import db from '../db/connection';

const Producto = db.define('productos',{
    prod_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    prod_ref:{
        type: DataTypes.STRING
    },
    prod_descripcion:{
        type: DataTypes.STRING
    },
    prod_presentacion:{
        type: DataTypes.STRING
    },
    prod_und_vta_x_carton:{
        type: DataTypes.STRING
    },
    prod_iva:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Producto;
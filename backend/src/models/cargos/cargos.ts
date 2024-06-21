import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Cargo = db.define('cargos',{
    carg_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    carg_nombre:{
        type: DataTypes.STRING
    },
    carg_celular:{
        type: DataTypes.STRING
    },
    carg_correo:{
        type: DataTypes.STRING
    },
    area_emp_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Cargo;
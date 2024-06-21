import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const areaEmpresa = db.define('area_empresa',{
    area_emp_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    area_emp_nombre:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default areaEmpresa;
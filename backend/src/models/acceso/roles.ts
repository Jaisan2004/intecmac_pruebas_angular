import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Roles = db.define('acc_roles',{
    rol_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    rol_nombre:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Roles;
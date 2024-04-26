import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const Pqrs_Tipologia = db.define('pqrs_tipologia',{
    pt_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pt_tipologia:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default Pqrs_Tipologia;
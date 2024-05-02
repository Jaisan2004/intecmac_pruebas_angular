import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const PlanPqrs = db.define('pqrs_plan_accion',{
    ppa_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    ppa_fecha_inicio:{
        type: DataTypes.DATE
    },
    ppa_descripcion:{
        type: DataTypes.STRING
    },
    ppa_fecha_cumplimiento:{
        type: DataTypes.DATE
    },
    carg_id:{
        type: DataTypes.NUMBER
    },
    pqrs_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})


export default PlanPqrs;
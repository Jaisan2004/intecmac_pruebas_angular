import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const CredEstudioDocumento = db.define('cred_estudio_documento',{
    cred_estu_doc_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_estu_doc_url:{
        type: DataTypes.STRING
    },
    cred_estu_id:{
        type: DataTypes.NUMBER
    },
    cred_doc_id:{
        type: DataTypes.NUMBER
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default CredEstudioDocumento;
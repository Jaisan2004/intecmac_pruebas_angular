import {DataTypes} from 'sequelize'
import db from '../../db/connection';

const CredDocumento = db.define('cred_documento',{
    cred_doc_id:{
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    cred_doc_nombre:{
        type: DataTypes.STRING
    },
    cred_doc_descripcion:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default CredDocumento;
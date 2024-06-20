import {Router} from 'express';
import { getEstadosByEstudio, getLastEstadoByEstudio, postEstadoEstudio, updateEstadoEstudio } from '../../controllers/cred_estudio/cred_estado_estudio';
import { getCredTipos } from '../../controllers/cred_estudio/cred_tipo';
import { getCredDocumento, getCredDocumentos } from '../../controllers/cred_estudio/cred_documento';
import { deleteCredDocEstudio, getCredDocByEstudio, getCredDocEstudio, postCredDocEstudio, updateCredDocEstudio } from '../../controllers/cred_estudio/cred_estudio_documento';
import { getLastCredEstu } from '../../controllers/cred_estudio/cred_estudio';
import validarToken from '../validad_token';



const router = Router();

//ultimo estudio de credito
router.get('/ultimo_estudio', getLastCredEstu);

//Estado del credito
router.get('/cred_estado_estudio/:id', getEstadosByEstudio);
router.get('/cred_estado_ultimo/:id', getLastEstadoByEstudio);
router.post('/cred_estado_estudio/', postEstadoEstudio);
router.put('/cred_estado_estudio/:id', updateEstadoEstudio);

//Documentos de estudios de credito
router.get('/cred_documento', getCredDocumentos);
router.get('/cred_documento/:id', getCredDocumento);

//Documentos del estudio de credito en especifico
router.get('/cred_estu_documentos/:id', getCredDocByEstudio);
router.get('/cred_estu_documento/:id', getCredDocEstudio);
router.post('/cred_estu_documento', validarToken,postCredDocEstudio);
router.put('/cred_estu_documento/:id', updateCredDocEstudio);
router.delete('/cred_estu_documento/:id', deleteCredDocEstudio);

//Tipo de estudios de creditos
router.get('/cred_tipo', getCredTipos);

export default router;
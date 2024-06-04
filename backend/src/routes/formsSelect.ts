import {Router} from 'express';
import { getCargosOption, getClienteOption, getInfoCliente, getPqrsCausaOption, getPqrsTipologiaOption, getProductoOption } from '../controllers/formsSelect';
import validarToken from './validad_token';


const router = Router();

router.get('/clientes', validarToken,getClienteOption);
router.get('/clientes/:id', validarToken,getInfoCliente);
router.get('/productos', validarToken,getProductoOption);
router.get('/pqrsCausa',validarToken, getPqrsCausaOption);
router.get('/cargos',validarToken, getCargosOption);
router.get('/pqrsTipologia', validarToken,getPqrsTipologiaOption);

export default router;
import {Router} from 'express';
import { loginUsuario, permisosUsuario, postUser } from '../controllers/usuarios';
import validarToken from './validad_token';

const router = Router();

router.post('/nuevo', postUser);
router.post('/login', loginUsuario);
router.post('/permisos', validarToken, permisosUsuario);

export default router;
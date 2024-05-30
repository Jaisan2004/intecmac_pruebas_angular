import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode";

const validarToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization'];

  if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
    //Tiene token
    try {
      const bearerToken = headerToken.slice(7);

    jwt.verify(bearerToken, process.env.SECRET_KEY || 'intecma2024');
    


    next()
    } catch (error) {
      res.status(401).json({
        msg:'Su Sesión no es valida ya caduco'
      })
    }
    
  } else {
    res.status(401).json({
      msg: 'Acceso denegado'
    })
  }

}

export default validarToken;
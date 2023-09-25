import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/req-exte";


const verifyTokenSesion = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = verifyToken(`${jwt}`) as { id: string };;
        if (!isUser) {
            res.status(400).send('TOKEN_NOT_VALID');
        } else {
            req.user = isUser;
            console.log(isUser)
            next();
        }
    } catch (e) {
        res.status(400).send('SESION_NOT_VALID')
    }
}

export { verifyTokenSesion };
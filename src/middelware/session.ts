import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/req-exte";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();

const validTokenSesion = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) return httpResponse.Unauthorized(res, 'Token is required')
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = verifyToken(`${jwt}`) as { id: string };;
        if (!isUser) {
            httpResponse.Unauthorized(res, 'Token not valid')
        } else {
            req.user = isUser;
            next();
        }
    } catch (e) {
        res.status(400).send('Invalid Token')
    }
}

export { validTokenSesion };
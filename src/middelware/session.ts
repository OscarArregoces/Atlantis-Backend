import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/req-exte";
import { HttpResponse } from "../utils/errors/response";
import UserModel from "../models/user";

const httpResponse = new HttpResponse();

const validTokenSesion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) return httpResponse.Unauthorized(res, 'Token is required');
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = verifyToken(`${jwt}`) as { id: string };
        if (!isUser) return httpResponse.Unauthorized(res, 'Invalid Token');
        const userExist = await UserModel.findOne({ _id: isUser.id });
        if (!userExist) return httpResponse.Unauthorized(res, 'Invalid Token');
        next();
    } catch (e) {
        return httpResponse.BadRequest(res, 'Invalid Token');
    }
}

export { validTokenSesion };
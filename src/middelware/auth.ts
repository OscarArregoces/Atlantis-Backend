import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { isValidObjectId } from "mongoose";

const httpResponse = new HttpResponse();

const validFieldsLogin = ({ body }: Request, res: Response, next: NextFunction) => {
    const { email, password } = body;
    if (!email) return httpResponse.BadRequest(res, 'email is required');
    if (!password) return httpResponse.BadRequest(res, 'password is required');
    next();
};
const validFieldsChangePassword = ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    const { password, newPassword } = body;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!password) return httpResponse.BadRequest(res, 'password is required');
    if (!newPassword) return httpResponse.BadRequest(res, 'newPassword is required');
    next();
};


export {
    validFieldsLogin,
    validFieldsChangePassword
};
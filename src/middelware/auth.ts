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
const validFieldsForgotPassword = ({ body }: Request, res: Response, next: NextFunction) => {
    const { email } = body;
    if (!email) return httpResponse.BadRequest(res, 'email is required');
    next();
};
const validFieldsVerifyTokenPassword = ({ body }: Request, res: Response, next: NextFunction) => {
    const { id } = body;
    if (!id) return httpResponse.BadRequest(res, 'id is required');
    next();
};
const validFieldsRecoverPassword = ({ body }: Request, res: Response, next: NextFunction) => {
    const { password, _id } = body;
    if (!password) return httpResponse.BadRequest(res, 'password is required');
    if (!_id) return httpResponse.BadRequest(res, '_id is required');
    next();
};


export {
    validFieldsLogin,
    validFieldsChangePassword,
    validFieldsForgotPassword,
    validFieldsRecoverPassword,
    validFieldsVerifyTokenPassword
};
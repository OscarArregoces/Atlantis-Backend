import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { isValidObjectId } from "mongoose";

const httpResponse = new HttpResponse();

const validFieldsCreateUser = ({ body }: Request, res: Response, next: NextFunction) => {
    const { email, password, person } = body;
    if (!email) return httpResponse.BadRequest(res, 'email is required');
    if (!password) return httpResponse.BadRequest(res, 'password is required');
    if (!person) return httpResponse.BadRequest(res, 'person is required');
    next();
}
const validFieldsGetPerson = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
}
const validFieldsPatchPerson = ({ body }: Request, res: Response, next: NextFunction) => {
    const { userData, personData } = body;
    if (!userData) return httpResponse.BadRequest(res, 'userData is required');
    if (!personData) return httpResponse.BadRequest(res, 'personData is required');
    next();
}
const validFieldsDeleteUser = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
}
const validFieldsCreateMember = ({ body }: Request, res: Response, next: NextFunction) => {
    const { userData, personData } = body;
    if (!userData) return httpResponse.BadRequest(res, 'userData is required');
    if (!personData) return httpResponse.BadRequest(res, 'personData is required');
    if (!userData.email) return httpResponse.BadRequest(res, 'userData.email is required');
    if (!userData.password) return httpResponse.BadRequest(res, 'userData.password is required');
    next();
}


export {
    validFieldsCreateUser,
    validFieldsGetPerson,
    validFieldsPatchPerson,
    validFieldsDeleteUser,
    validFieldsCreateMember,
};
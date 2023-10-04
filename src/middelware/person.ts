import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { isValidObjectId } from "mongoose";

const httpResponse = new HttpResponse();

const validFieldsCreateUser = ({ body }: Request, res: Response, next: NextFunction) => {
    const { email, password, person } = body;
    if (!email) return httpResponse.BadRequest(res, 'Email is required');
    if (!password) return httpResponse.BadRequest(res, 'Password is required');
    if (!person) return httpResponse.BadRequest(res, 'Person is required');
    next();
}
const validFieldsGetPerson = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!id) return httpResponse.BadRequest(res, 'Id is required');
    next();
}
const validFieldsPatchPerson = ({ body }: Request, res: Response, next: NextFunction) => {
    const { userData, personData } = body;
    if (!userData) return httpResponse.BadRequest(res, 'UserData is required');
    if (!personData) return httpResponse.BadRequest(res, 'PersonData is required');
    next();
}
const validFieldsDeleteUser = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!id) return httpResponse.BadRequest(res, 'Id is required');
    next();
}
const validFieldsCreateMember = ({ body }: Request, res: Response, next: NextFunction) => {
    const { userData, personData } = body;
    if (!userData) return httpResponse.BadRequest(res, 'UserData is required');
    if (!personData) return httpResponse.BadRequest(res, 'PersonData is required');
    if (!userData.email) return httpResponse.BadRequest(res, 'UserData.email is required');
    if (!userData.password) return httpResponse.BadRequest(res, 'UserData.password is required');
    next();
}


export {
    validFieldsCreateUser,
    validFieldsGetPerson,
    validFieldsPatchPerson,
    validFieldsDeleteUser,
    validFieldsCreateMember,
};
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
    const { email, password, person, name, surname, birthday, type_document, no_document, country, city, phone, img_url } = body;
    if (!email) return httpResponse.BadRequest(res, 'email is required');
    // if (!password) return httpResponse.BadRequest(res, 'password is required');
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    if (!surname) return httpResponse.BadRequest(res, 'surname is required');
    if (!no_document) return httpResponse.BadRequest(res, 'no_document is required');
    if (!phone) return httpResponse.BadRequest(res, 'phone is required');
    if (!city) return httpResponse.BadRequest(res, 'city is required');
    next();
}
const validFieldsDeleteUser = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
}
const validFieldsCreateMember = ({body}: Request, res: Response, next: NextFunction) => {
    const { email, password, person, name, surname, birthday, type_document, no_document, country, city, phone, img_url } = body;
    if (!email) return httpResponse.BadRequest(res, 'email is required');
    if (!password) return httpResponse.BadRequest(res, 'password is required');
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    if (!surname) return httpResponse.BadRequest(res, 'surname is required');
    if (!no_document) return httpResponse.BadRequest(res, 'no_document is required');
    if (!phone) return httpResponse.BadRequest(res, 'phone is required');
    if (!city) return httpResponse.BadRequest(res, 'city is required');
    next();
}


export {
    validFieldsCreateUser,
    validFieldsGetPerson,
    validFieldsPatchPerson,
    validFieldsDeleteUser,
    validFieldsCreateMember,
};
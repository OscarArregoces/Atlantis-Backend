import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { isValidObjectId } from "mongoose";

const httpResponse = new HttpResponse();

const validFieldsCreateCategory = ({ body }: Request, res: Response, next: NextFunction) => {
    const { name } = body;
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    next();
};
const validFieldsPatchCategory = ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    const { name } = body;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    next();
};
const validFieldsDeleteCategory = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};

export { validFieldsCreateCategory, validFieldsPatchCategory, validFieldsDeleteCategory };
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { isValidObjectId } from "mongoose";

const httpResponse = new HttpResponse();
const validFieldsCreateSubCategory = async ({ body }: Request, res: Response, next: NextFunction) => {
    const { name, category } = body;
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    if (!category) return httpResponse.BadRequest(res, 'category is required');
    next();
};

const validFieldsUpdateSubCategory = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { name, category } = body;
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    if (!category) return httpResponse.BadRequest(res, 'category is required');
    next();
};
const validFieldsDeleteSubCategory = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};
const validFieldsGetSubcategoryByCategory = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};

export { validFieldsCreateSubCategory, validFieldsUpdateSubCategory, validFieldsDeleteSubCategory, validFieldsGetSubcategoryByCategory };
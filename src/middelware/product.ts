import { NextFunction, Request, Response } from "express"
import { isValidObjectId } from "mongoose";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();

const validFieldsCreateProduct = ({ body }: Request, res: Response, next: NextFunction) => {
    const { name, brand, quantity, reference, unit_price, unit_cost, supplier, img_url, subcategory, } = body;
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    if (!brand) return httpResponse.BadRequest(res, 'brand is required');
    if (!quantity) return httpResponse.BadRequest(res, 'quantity is required');
    if (!reference) return httpResponse.BadRequest(res, 'reference is required');
    if (!unit_price) return httpResponse.BadRequest(res, 'unit_price is required');
    if (!unit_cost) return httpResponse.BadRequest(res, 'unit_cost is required');
    if (!supplier) return httpResponse.BadRequest(res, 'supplier is required');
    if (!subcategory) return httpResponse.BadRequest(res, 'subcategory is required');
    next();
};

const validFieldsFindProduct = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};
const validFieldsPatchProduct = ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    const { name, brand, quantity, reference, unit_price, unit_cost, supplier, img_url, subcategory, } = body;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!name) return httpResponse.BadRequest(res, 'name is required');
    if (!brand) return httpResponse.BadRequest(res, 'brand is required');
    if (!quantity) return httpResponse.BadRequest(res, 'quantity is required');
    if (!reference) return httpResponse.BadRequest(res, 'reference is required');
    if (!unit_price) return httpResponse.BadRequest(res, 'unit_price is required');
    if (!unit_cost) return httpResponse.BadRequest(res, 'unit_cost is required');
    if (!supplier) return httpResponse.BadRequest(res, 'supplier is required');
    if (!subcategory) return httpResponse.BadRequest(res, 'subcategory is required');
    next();
};
const validFieldsDeleteProduct = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};

export {
    validFieldsCreateProduct,
    validFieldsFindProduct,
    validFieldsPatchProduct,
    validFieldsDeleteProduct
};
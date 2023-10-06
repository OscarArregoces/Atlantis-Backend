import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { isValidObjectId } from "mongoose";


const httpResponse = new HttpResponse();

const validFieldsCreateSale = async ({ body }: Request, res: Response, next: NextFunction) => {
    const { client_name, client_phone, products } = body;
    if (!client_name) return httpResponse.BadRequest(res, 'client_name is required');
    if (!client_phone) return httpResponse.BadRequest(res, 'client_phone is required');
    if (!products) return httpResponse.BadRequest(res, 'products is required');
    if (!products.length) return httpResponse.BadRequest(res, 'products is empty');
    for (const product of products) {
        if (!product.product || product.product.trim().length === 0) return httpResponse.BadRequest(res, 'product invalid');
        if (!product.quantity || product.product.trim().length === 0) return httpResponse.BadRequest(res, 'product invalid');
        break;
    };
    next();
};

const validFieldsFindSale = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};
const validFieldsPatchSale = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    const { client_name, client_phone, products } = body;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    if (!client_name) return httpResponse.BadRequest(res, 'client_name is required');
    if (!client_phone) return httpResponse.BadRequest(res, 'client_phone is required');
    if (!products) return httpResponse.BadRequest(res, 'products is required');
    if (!products.length) return httpResponse.BadRequest(res, 'products is empty');
    for (const product of products) {
        if (!product.product || product.product.trim().length === 0) return httpResponse.BadRequest(res, 'product invalid');
        if (!product.quantity || product.product.trim().length === 0) return httpResponse.BadRequest(res, 'product invalid');
        break;
    };
    next();
};
const validFieldsDeleteSale = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return httpResponse.BadRequest(res, 'ID invalid');
    next();
};

export { validFieldsCreateSale, validFieldsFindSale, validFieldsPatchSale, validFieldsDeleteSale, };
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();
const ValidFieldsGraphicTranslate = ({ body }: Request, res: Response, next: NextFunction) => {
    const { nameProducts } = body;
    if (!nameProducts) return httpResponse.BadRequest(res, 'nameProducts is required');
    if (!Array.isArray(nameProducts)) return httpResponse.BadRequest(res, 'nameProducts not valid');
    if (nameProducts.length === 0) return httpResponse.BadRequest(res, 'nameProducts is empty');
    next();
};


export { ValidFieldsGraphicTranslate };
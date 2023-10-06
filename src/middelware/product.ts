import { NextFunction, Request, Response } from "express"
import { isValidObjectId } from "mongoose";

const validFieldsCreateProduct = ({ body }: Request, res: Response, next: NextFunction) => {
    const { name, quantity, total_price, unit_price, unit_cost, supplier, img_url, category, } = body;
    if (!name) return 'name is required';
    if (!quantity) return 'quantity is required';
    if (!total_price) return 'total_price is required';
    if (!unit_price) return 'unit_price is required';
    if (!unit_cost) return 'unit_cost is required';
    if (!supplier) return 'supplier is required';
    if (!img_url) return 'img_url is required';
    if (!category) return 'category is required';
    next();
};

const validFieldsFindProduct = ({ params }: Request, res: Response, next: NextFunction) => {
    // console.log('Pase por el middelware')
    const { id } = params;
    if (!isValidObjectId(id)) return 'ID invalid';
    next();
};
const validFieldsPatchProduct = ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    const { name, quantity, total_price, unit_price, unit_cost, supplier, img_url, category, } = body;
    if (!isValidObjectId(id)) return 'ID invalid';
    if (!name) return 'name is required';
    if (!quantity) return 'quantity is required';
    if (!total_price) return 'total_price is required';
    if (!unit_price) return 'unit_price is required';
    if (!unit_cost) return 'unit_cost is required';
    if (!supplier) return 'supplier is required';
    if (!img_url) return 'img_url is required';
    if (!category) return 'category is required';
    next();
};
const validFieldsDeleteProduct = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return 'ID invalid';
    next();
};

export {
    validFieldsCreateProduct,
    validFieldsFindProduct,
    validFieldsPatchProduct,
    validFieldsDeleteProduct
};
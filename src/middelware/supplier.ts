import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

const ValidFieldsCreateSupplier = ({ body }: Request, res: Response, next: NextFunction) => {
    const { name, phone, email, city, address } = body;
    if (!name) return 'name is required';
    if (!phone) return 'phone is required';
    if (!email) return 'email is required';
    if (!city) return 'city is required';
    if (!address) return 'address is required';
    next();
};
const ValidFieldsPatchSupplier = ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { name, phone, email, city, address } = body;
    const { id } = params;
    if (!isValidObjectId(id)) return 'ID invalid';
    if (!name) return 'name is required';
    if (!phone) return 'phone is required';
    if (!email) return 'email is required';
    if (!city) return 'city is required';
    if (!address) return 'address is required';
    next();
};
const ValidFieldsDeleteSupplier = ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params;
    if (!isValidObjectId(id)) return 'ID invalid';
    next();
};

export {
    ValidFieldsCreateSupplier,
    ValidFieldsPatchSupplier,
    ValidFieldsDeleteSupplier,
};
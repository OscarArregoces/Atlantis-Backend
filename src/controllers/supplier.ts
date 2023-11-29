import { Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { createNewSupplier, deleteSupplierById, findSuppliers, updateSupplierById } from "../services/supplier";

const httpResponse = new HttpResponse();
const createSupplier = async ({ body }: Request, res: Response) => {
    const response = await createNewSupplier(body);
    if (response === 'Supplier already exist') return httpResponse.BadRequest(res, response);
    return httpResponse.Ok(res, response);
};
const getSuppliers = async (req: Request, res: Response) => {
    const response = await findSuppliers();
    return httpResponse.Ok(res, response);

};
const patchSupplier = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const response = await updateSupplierById(id, body);
    if (response === 'Supplier not found') return httpResponse.BadRequest(res, response);
    return httpResponse.Ok(res, response);

};
const deleteSupplier = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await deleteSupplierById(id);
    if (response === 'Supplier not found') return httpResponse.BadRequest(res, response);

    return httpResponse.Ok(res, response);

};

export {
    createSupplier,
    getSuppliers,
    patchSupplier,
    deleteSupplier
};
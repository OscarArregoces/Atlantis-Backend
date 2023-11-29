import { Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { addNewSale, deleteSaleById, findAllSales, findSaleById, updateSaleById } from "../services/sale";


const httpResponse = new HttpResponse();

const createSale = async ({ body }: Request, res: Response) => {
    const response = await addNewSale(body);
    if (typeof response === 'string') return httpResponse.BadRequest(res, response);
    httpResponse.Ok(res, response);
};
const findSales = async (req: Request, res: Response) => {
    const response = await findAllSales();
    httpResponse.Ok(res, response);
};
const findSale = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await findSaleById(id);
    if (response === 'Not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
};
const patchSale = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const response = await updateSaleById(id, body);
    if (response === 'No hay suficiente cantidad en stock') return httpResponse.NotFound(res, response);
    if (response === 'Product not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
};
const deleteSale = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await deleteSaleById(id);
    if (response === 'Not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
};

export { createSale, findSales, findSale, patchSale, deleteSale, };
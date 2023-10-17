import { Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { addProduct, deleteProductById, findAllProducts, findProductById, updateProductById } from "../services/product";
const httpResponse = new HttpResponse();


const createProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await addProduct({ ...body, img_url: `/products/${req.file?.filename}` });
    httpResponse.Ok(res, response);
};
const findProducts = async (req: Request, res: Response) => {
    const response = await findAllProducts();
    httpResponse.Ok(res, response);
};
const findProduct = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await findProductById(id);
    if (response === 'Product not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
};
const patchProduct = async (req: Request, res: Response) => {
    const { params, body } = req;
    const { id } = params;
    const response = await updateProductById(id, {...body, img_url: `/products/${req.file?.filename}`});
    if (response === 'Product not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
};
const deleteProduct = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await deleteProductById(id);
    if (response === 'Product not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
};

export {
    createProduct,
    findProducts,
    findProduct,
    patchProduct,
    deleteProduct,
};
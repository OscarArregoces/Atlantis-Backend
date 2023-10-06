import { Request, Response } from "express";
import { createNewCategory, deleteCategoryById, findAllCategories, updateCategoryById } from "../services/category";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();

const createCategory = async ({ body }: Request, res: Response) => {
    try {
        const { name } = body
        const response = await createNewCategory(name);
        if (response === 'Category already exist') return httpResponse.BadRequest(res, response);
        httpResponse.Ok(res, response)
    } catch (error) {
        console.log(error)
    }
};

const allCategories = async (req: Request, res: Response) => {
    const response = await findAllCategories();
    httpResponse.Ok(res, response)
};

const patchCategory = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const response = await updateCategoryById(id, body);
    if (response === 'Category not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response)
}
const deleteCategory = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await deleteCategoryById(id);
    if (response === 'Category not exist') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response)
}

export {
    createCategory,
    allCategories,
    patchCategory,
    deleteCategory
};
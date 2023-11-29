import { Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { createNewSubCategory, deleteSubCategoryById, findSubCategories, findSubcategoryByCategory, updateSubCategoryById } from "../services/subCategory";

const httpResponse = new HttpResponse();
const createSubCategory = async ({ body }: Request, res: Response) => {
    const response = await createNewSubCategory(body);
    if (response === 'SubCategory alredy exist in this category') return httpResponse.BadRequest(res, response);
    return httpResponse.Ok(res, response);
};
const getSubCategories = async (req: Request, res: Response) => {
    const response = await findSubCategories();
    return httpResponse.Ok(res, response);
};
const updateSubCategory = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const response = await updateSubCategoryById(id, body);
    if (response === 'Subcategory not found') return httpResponse.NotFound(res, response);
    return httpResponse.Ok(res, response);
};
const deleteSubCategory = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await deleteSubCategoryById(id);
    if (response === 'Subcategory not found') return httpResponse.NotFound(res, response);
    return httpResponse.Ok(res, response);
};
const getSubcategoryByCategory = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await findSubcategoryByCategory(id);
    return httpResponse.Ok(res, response);
};

export { createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory, getSubcategoryByCategory };
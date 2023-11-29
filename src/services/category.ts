import { Category } from "../interfaces/category";
import { CategoryModel } from "../models/category"

const createNewCategory = async (name: string) => {
    const isExist = await CategoryModel.findOne({ name: name });
    if (isExist) return 'Category already exist';
    const response = await CategoryModel.create({ name: name })
    return response;
};
const findAllCategories = async () => {
    const response = await CategoryModel.find().sort({ updatedAt: -1 });
    return response;
};
const updateCategoryById = async (id: string, dataCategory: Category) => {
    const newCategory = await CategoryModel.findOneAndUpdate({ _id: id }, dataCategory, { new: true })
    if (!newCategory) return 'Category not exist';
    return newCategory;
};
const deleteCategoryById = async (id: string) => {
    const response = await CategoryModel.findOneAndDelete({ _id: id });
    if (!response) return 'Category not exist';
    return response;
};





export { createNewCategory, findAllCategories, updateCategoryById, deleteCategoryById };
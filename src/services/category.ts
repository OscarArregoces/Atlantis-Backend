import { Category } from "../interfaces/category";
import { CategoryModel } from "../models/category"

const createNewCategory = async (name: string) => {
    const isExist = await CategoryModel.findOne({ name: name });
    if (isExist) return 'Category already exist';
    const response = await CategoryModel.create({ name: name })
    return response;
};
const findAllCategories = async () => {
    const response = await CategoryModel.find({ visibility: true }).sort({ updatedAt: -1 });
    return response;
};
const updateCategoryById = async (id: string, dataCategory: Category) => {
    const newCategory = await CategoryModel.findOneAndUpdate({ _id: id }, dataCategory, { new: true })
    if (!newCategory) return 'Category not exist';
    return newCategory;
};
const deleteCategoryById = async (id: string) => {
    const category = await CategoryModel.findById(id);
    if (!category) return 'Category not exist';
    category.visibility = false;
    await category.save();
    return "Category deleted";
};





export { createNewCategory, findAllCategories, updateCategoryById, deleteCategoryById };
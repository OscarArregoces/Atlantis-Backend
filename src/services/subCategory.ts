import { SubCategory } from "../interfaces/category";
import { SubCategoryModel } from "../models/susbcategory";

const createNewSubCategory = async (subCategory: SubCategory) => {
    const { name, category } = subCategory;
    const isExist = await SubCategoryModel.findOne({ name: name, category: category });
    if (isExist) return 'SubCategory alredy exist in this category';
    const newSubCategory = await SubCategoryModel.create(subCategory);
    return newSubCategory;
};

const findSubCategories = async () => {
    const response = await SubCategoryModel.find({ visibility: true }).populate('category').sort({ updatedAt: -1 });
    return response;
};
const updateSubCategoryById = async (id: string, subCategory: SubCategory) => {
    const isExist = await SubCategoryModel.findOne({ _id: id });
    if (!isExist) return 'Subcategory not found';
    const newSubCategory = await SubCategoryModel.findOneAndUpdate({ _id: id }, subCategory, { new: true });
    return newSubCategory;
};
const deleteSubCategoryById = async (id: string) => {
    const subcategory = await SubCategoryModel.findById(id);
    if (!subcategory) return 'Subcategory not found';
    subcategory.visibility = false;
    await subcategory.save();
    return "subcategory deleted";
};
const findSubcategoryByCategory = async (id: string) => {
    const response = await SubCategoryModel.find({ category: id, visibility: true }).populate('category');
    return response;
};

export { createNewSubCategory, findSubCategories, updateSubCategoryById, deleteSubCategoryById, findSubcategoryByCategory };

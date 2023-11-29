import { Router } from "express";
import { validTokenSesion } from "../middelware/session";
import { createSubCategory, deleteSubCategory, getSubCategories, getSubcategoryByCategory, updateSubCategory } from "../controllers/subcategory";
import { validFieldsCreateSubCategory, validFieldsDeleteSubCategory, validFieldsGetSubcategoryByCategory, validFieldsUpdateSubCategory } from "../middelware/subCategory";

const router = Router();

router.get('/', validTokenSesion, getSubCategories);
router.post('/', validTokenSesion, validFieldsCreateSubCategory, createSubCategory);
router.patch('/:id', validTokenSesion, validFieldsUpdateSubCategory, updateSubCategory);
router.delete('/:id', validTokenSesion, validFieldsDeleteSubCategory, deleteSubCategory);
router.get('/byCategory/:id', validTokenSesion, validFieldsGetSubcategoryByCategory, getSubcategoryByCategory);

export { router };
import { Router } from "express";
import { allCategories, createCategory, deleteCategory, patchCategory } from "../controllers/category";
import { validFieldsCreateCategory, validFieldsDeleteCategory, validFieldsPatchCategory } from "../middelware/category";
import { validTokenSesion } from "../middelware/session";


const router = Router();

router.get('/', validTokenSesion, allCategories);
router.post('/', validTokenSesion, validFieldsCreateCategory, createCategory);
router.patch('/:id', validTokenSesion, validFieldsPatchCategory, patchCategory);
router.delete('/:id', validTokenSesion, validFieldsDeleteCategory, deleteCategory);

export { router };
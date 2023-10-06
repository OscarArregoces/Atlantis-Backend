import { Router } from "express";
import { validTokenSesion } from "../middelware/session";
import { validFieldsCreateProduct, validFieldsDeleteProduct, validFieldsFindProduct, validFieldsPatchProduct } from "../middelware/product";
import { createProduct, deleteProduct, findProduct, findProducts, patchProduct } from "../controllers/product";

const router = Router();

router.post('/', validTokenSesion, validFieldsCreateProduct, createProduct);
router.get('/', validTokenSesion, findProducts);
router.get('/:id', validTokenSesion, validFieldsFindProduct, findProduct);
router.patch('/:id', validTokenSesion, validFieldsPatchProduct, patchProduct);
router.delete('/:id', validTokenSesion, validFieldsDeleteProduct, deleteProduct);


export { router };
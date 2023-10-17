import { Router } from "express";
import { validTokenSesion } from "../middelware/session";
import { validFieldsCreateProduct, validFieldsDeleteProduct, validFieldsFindProduct, validFieldsPatchProduct } from "../middelware/product";
import { createProduct, deleteProduct, findProduct, findProducts, patchProduct } from "../controllers/product";
import { uploadProducts } from "../controllers/multer";

const router = Router();

router.post('/', validTokenSesion, uploadProducts.single('img_url'), validFieldsCreateProduct, createProduct);
router.get('/', validTokenSesion, findProducts);
router.get('/:id', validTokenSesion, validFieldsFindProduct, findProduct);
router.patch('/:id', validTokenSesion, uploadProducts.single('img_url'), validFieldsPatchProduct, patchProduct);
router.delete('/:id', validTokenSesion, validFieldsDeleteProduct, deleteProduct);


export { router };
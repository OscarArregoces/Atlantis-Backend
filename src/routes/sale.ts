import { Router } from "express";
import { validTokenSesion } from "../middelware/session";
import { validFieldsCreateSale, validFieldsDeleteSale, validFieldsFindSale, validFieldsPatchSale } from "../middelware/sale";
import { createSale, deleteSale, findSale, findSales, patchSale } from "../controllers/sale";

const router = Router();

router.post('/', validTokenSesion, validFieldsCreateSale, createSale);
router.get('/', validTokenSesion, findSales);
router.get('/:id', validTokenSesion, validFieldsFindSale, findSale);
router.patch('/:id', validTokenSesion, validFieldsPatchSale, patchSale);
router.delete('/:id', validTokenSesion, validFieldsDeleteSale, deleteSale);

export { router };
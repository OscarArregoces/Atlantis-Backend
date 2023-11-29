import { Router } from "express";
import { validTokenSesion } from "../middelware/session";
import { ValidFieldsCreateSupplier, ValidFieldsDeleteSupplier, ValidFieldsPatchSupplier } from "../middelware/supplier";
import { createSupplier, deleteSupplier, getSuppliers, patchSupplier } from "../controllers/supplier";

const router = Router();

router.post('/', validTokenSesion, ValidFieldsCreateSupplier, createSupplier);
router.get('/', validTokenSesion, getSuppliers);
router.patch('/:id', validTokenSesion, ValidFieldsPatchSupplier, patchSupplier);
router.delete('/:id', validTokenSesion, ValidFieldsDeleteSupplier, deleteSupplier);

export { router };
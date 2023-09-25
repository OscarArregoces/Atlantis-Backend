import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/item";
import { verifyTokenSesion } from "../middelware/session";

const router = Router();

router.get('/', verifyTokenSesion, getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);



export { router };
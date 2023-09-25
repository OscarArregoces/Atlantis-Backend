import { Router } from "express";
import multerMiddleware from "../middelware/file";
import { getFile } from "../controllers/upload";


const router = Router();

router.post('/', multerMiddleware.single('myfile'), getFile)

export { router };
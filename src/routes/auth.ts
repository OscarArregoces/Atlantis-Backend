import { Router } from "express";
import { changePassword, loginUser } from "../controllers/auth";
import { validFieldsChangePassword, validFieldsLogin } from "../middelware/auth";
import { validTokenSesion } from "../middelware/session";

const router = Router();

router.post('/login', validFieldsLogin, loginUser);
router.patch('/changePassword/:id', validTokenSesion, validFieldsChangePassword, changePassword);


export { router };
import { Router } from "express";
import { changePassword, forgotPasswordController, recoverPasswordController, loginUser, verifyTokenPasswordController } from "../controllers/auth";
import { validFieldsChangePassword, validFieldsForgotPassword, validFieldsLogin, validFieldsRecoverPassword, validFieldsVerifyTokenPassword } from "../middelware/auth";
import { validTokenSesion } from "../middelware/session";

const router = Router();

router.post('/login', validFieldsLogin, loginUser);
router.patch('/changePassword/:id', validTokenSesion, validFieldsChangePassword, changePassword);
router.post('/forgotPassword', validFieldsForgotPassword, forgotPasswordController); //GENERO EL CODIGO
router.post('/verifyTokenPassword', validFieldsVerifyTokenPassword, verifyTokenPasswordController); //VERIFICO EL CODIGO 
router.post('/recoverPassword', validFieldsRecoverPassword, recoverPasswordController); //CAMBIO LA CONTRASEÑA

export { router };
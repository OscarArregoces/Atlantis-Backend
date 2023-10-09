import { Router } from "express";
import { createMember, createUser, deleteUser, getPerson, getPersons, patchPerson } from "../controllers/person";
import { validFieldsCreateMember, validFieldsCreateUser, validFieldsDeleteUser, validFieldsGetPerson, validFieldsPatchPerson } from "../middelware/person";
import { validTokenSesion } from "../middelware/session";
import { uploadAvatars } from "../controllers/multer";

const router = Router();

router.post('/', validTokenSesion, validFieldsCreateUser, createUser);
router.get('/', validTokenSesion, getPersons);
router.get('/:id', validTokenSesion, validFieldsGetPerson, getPerson);
router.patch('/:id', validTokenSesion, uploadAvatars.single('img_url'), validFieldsPatchPerson, patchPerson);
router.delete('/:id', validTokenSesion, validFieldsDeleteUser, deleteUser);
router.post('/createMember', validTokenSesion, uploadAvatars.single('img_url'), validFieldsCreateMember, createMember);

export { router };
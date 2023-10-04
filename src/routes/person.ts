import { Router } from "express";
import { createMember, createUser, deleteUser, getPerson, getPersons, patchPerson } from "../controllers/person";
import { validFieldsCreateMember, validFieldsCreateUser, validFieldsDeleteUser, validFieldsGetPerson, validFieldsPatchPerson } from "../middelware/person";
import { validTokenSesion } from "../middelware/session";

const router = Router();

router.post('/', validTokenSesion, validFieldsCreateUser, createUser);
router.get('/', validTokenSesion, getPersons);
router.get('/:id', validTokenSesion, validFieldsGetPerson, getPerson);
router.patch('/:id', validTokenSesion, validFieldsPatchPerson, patchPerson);
router.delete('/:id', validTokenSesion, validFieldsDeleteUser, deleteUser);
router.post('/createMember', validTokenSesion, validFieldsCreateMember, createMember);

export { router };
import { Request, Response } from "express";
import { createNewMember, createUserByPerson, deletePerson, findPerson, findPersons, updatePerson } from "../services/person";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();

const createUser = async ({ body }: Request, res: Response) => {
    const response = await createUserByPerson(body);
    if (response === 'Person not exist') return httpResponse.NotFound(res, response);
    if (response === 'User already exist') return httpResponse.BadRequest(res, response);
    httpResponse.Ok(res, response);
}
const getPersons = async (req: Request, res: Response) => {
    const response = await findPersons();
    httpResponse.Ok(res, response);
}

const getPerson = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await findPerson(id);
    if (response === 'USER_NOT_FOUND') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
}

const patchPerson = async (req: Request, res: Response) => {
    const { params, body } = req;
    const { id } = params;
    const response = await updatePerson(id, { ...body, img_url: `/avatars/${req.file?.filename}` });
    if (response === 'USER_NOT_FOUND') return httpResponse.NotFound(res, response);
    if (response === 'PERSON_NOT_FOUND') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
}

const deleteUser = async ({ params }: Request, res: Response) => {
    const { id } = params;
    const response = await deletePerson(id);
    if (response === 'PERSON_NOT_FOUND') return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
}

const createMember = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await createNewMember({ ...body, img_url: `/avatars/${req.file?.filename}` });
    if (response === 'User already exist') return httpResponse.BadRequest(res, response)
    if (response === 'Person already exist') return httpResponse.BadRequest(res, response)
    httpResponse.Ok(res, response);
}


export { createUser, getPersons, getPerson, patchPerson, deleteUser, createMember };
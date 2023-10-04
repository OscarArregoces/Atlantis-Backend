import { Request, Response, response } from "express";
import { validPassword, validUser } from "../services/auth";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();

const loginUser = async ({ body }: Request, res: Response) => {
    const { email, password } = body;
    const responseLogin = await validUser({ email, password });
    if (responseLogin === 'User not exist') return httpResponse.BadRequest(res, responseLogin);
    if (responseLogin === 'Incorrect credential') return httpResponse.BadRequest(res, responseLogin);
    httpResponse.Ok(res, responseLogin);
}

const changePassword = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const { password, newPassword } = body;
    const responseLogin = await validPassword({ id, password, newPassword });
    if (responseLogin === 'User not exist') return httpResponse.BadRequest(res, responseLogin);
    if (responseLogin === 'Incorrect password') return httpResponse.BadRequest(res, responseLogin);
    httpResponse.Ok(res, responseLogin);
}

export { loginUser, changePassword };

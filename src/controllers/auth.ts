import { Request, Response } from "express";
import { recoverPasswordService, validPassword, validUser, forgotPasswordService, verifyTokenPasswordService } from "../services/auth";
import { HttpResponse } from "../utils/errors/response";

const httpResponse = new HttpResponse();

const loginUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { email, password } = body;
    const responseLogin = await validUser({ email, password });
    if (responseLogin === 'User not exist') return httpResponse.BadRequest(res, responseLogin);
    if (responseLogin === 'Incorrect credential') return httpResponse.BadRequest(res, responseLogin);
    httpResponse.Ok(res, responseLogin);
}

const changePassword = async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const { password, newPassword } = body;
    const response = await validPassword({ id, password, newPassword });
    if (response === 'User not exist') return httpResponse.BadRequest(res, response);
    if (response === 'Incorrect password') return httpResponse.BadRequest(res, response);
    httpResponse.Ok(res, response);
}

const forgotPasswordController = async ({ body }: Request, res: Response) => {
    const { email } = body;
    const response = await forgotPasswordService(email);
    if (response === "User not exist") return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
}
const verifyTokenPasswordController = async ({ body }: Request, res: Response) => {
    const { id } = body;
    const response = await verifyTokenPasswordService(id);
    if (response === "Invalid Token") return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
}

const recoverPasswordController = async ({ body }: Request, res: Response) => {
    const { password, _id } = body;
    const response = await recoverPasswordService(password, _id);
    if(response === "User not exist") return httpResponse.NotFound(res, response);
    httpResponse.Ok(res, response);
}

export { loginUser, changePassword, forgotPasswordController, recoverPasswordController, verifyTokenPasswordController };


//ARREGLAR QUE AGARRE LA URL DEL CLIENTE DINAMICAMENTE

// console.log(req.protocol);
// console.log(req.hostname);
// console.log(req.originalUrl);
// console.log(req.url);
import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { saveUser, validUser } from "../services/auth";

const registerUser = async ({ body }: Request, res: Response) => {
    try {
        const responseUser = await saveUser(body);
        res.status(200).send(responseUser)
    } catch (e) {
        handleHttp(res, 'ERROR_REGISTER_AUTH', e)
    }
}
const loginUser = async ({ body }: Request, res: Response) => {
    try {
        const { email, password } = body;
        const responseLogin = await validUser({ email, password });
        if (responseLogin === 'Incorrect credential') {
            return res.status(403).send(responseLogin)
        }
        res.status(200).send(responseLogin)
    } catch (e) {
        handleHttp(res, 'ERROR_LOGIN_AUTH', e)
    }
}


export { registerUser, loginUser };
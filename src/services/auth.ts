import { Login } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";


const saveUser = async ({ email, password, name, surname, description }: User) => {
    const checkIs = await UserModel.findOne({ email: email });
    if (checkIs) return 'User already exist';
    const passwordHash = await encrypt(password);
    const responseUserRegister = await UserModel.create({ email, password: passwordHash, name, surname, description });
    return responseUserRegister;
}

const validUser = async ({ email, password }: Login) => {
    const userExist = await UserModel.findOne({ email })
    if (!userExist) return "User not exist";

    const passwordHash = userExist.password;
    const checkCredential = await verified(password, passwordHash);

    if (!checkCredential) return "Incorrect credential";
    const token = generateToken(userExist.email);
    const data = {
        token,
        user: {
            id: userExist._id,
            name: userExist.name,
            surname: userExist.surname,
        }
    }
    return data;
}

export { saveUser, validUser };
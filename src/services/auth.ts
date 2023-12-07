import { ChangePassword, Login } from "../interfaces/auth.interface";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken, verifyToken } from "../utils/jwt.handle";
import UserModel from "../models/user";
import { sendMailForgotPassword, sendMailNotifyPassword } from "../libs/nodemailer";



const validUser = async ({ email, password }: Login) => {

    const userExist = await UserModel.findOne({ email: email }).populate('person')
    if (!userExist) return "User not exist";

    const passwordHash = userExist.password;
    const checkCredential = await verified(password, passwordHash);
    if (!checkCredential) return "Incorrect credential";
    const token = generateToken(userExist._id.toString());
    const data = {
        token,
        user: {
            _id: userExist._id,
            name: `${userExist.person.name} ${userExist.person.surname}`,
            person: userExist.person._id,
            img_url: userExist.person.img_url,
            email: userExist.email
        }
    }
    return data;
}
const validPassword = async ({ id, password, newPassword }: ChangePassword) => {

    const userExist = await UserModel.findOne({ _id: id });
    if (!userExist) return "User not exist";

    const passwordHash = userExist.password;
    const checkCredential = await verified(password, passwordHash);

    if (!checkCredential) return "Incorrect password";

    const newPasswordHash = await encrypt(newPassword);

    const userUpdated = await UserModel.findOneAndUpdate({ _id: id }, { password: newPasswordHash }, { new: true })

    return userUpdated;
}
const forgotPasswordService = async (email: string) => {
    const isExist = await UserModel.findOne({ email: email }).populate("person");
    if (!isExist) return "User not exist";
    const token = generateToken(email, "3m");
    const { name, surname } = isExist.person;
    const fullName = `${name} ${surname}`
    await sendMailForgotPassword(email, fullName, token);

    return "Correo enviado"
}
const verifyTokenPasswordService = async (id: string) => {
    try {
        const isUser = verifyToken(`${id}`) as { id: string };
        if (!isUser) return 'Invalid Token';
        const userExist = await UserModel.findOne({ email: isUser.id }).populate("person");
        if (!userExist) return 'Invalid Token';
        return { name: userExist.person.name, _id: userExist._id };
    } catch (error) {
        return 'Invalid Token'
    }
}

const recoverPasswordService = async (password: string, _id: string) => {
    const userExist = await UserModel.findOne({ _id: _id }).populate("person");
    if (!userExist) return 'User not exist';
    const passwordHash = await encrypt(password);
    await UserModel.findOneAndUpdate({ _id: _id }, { password: passwordHash });
    const { name, surname } = userExist.person;
    const fullName = `${name} ${surname}`;
    await sendMailNotifyPassword(userExist.email, fullName);
    return "User updated";
}
export { validUser, validPassword, recoverPasswordService, forgotPasswordService, verifyTokenPasswordService };
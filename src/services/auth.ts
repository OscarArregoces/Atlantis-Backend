import { ChangePassword, Login } from "../interfaces/auth.interface";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import UserModel from "../models/user";



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
            name: `${userExist.person.name} ${userExist.person.surname}` ,
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

export { validUser, validPassword };
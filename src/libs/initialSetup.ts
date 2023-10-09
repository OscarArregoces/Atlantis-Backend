import PersonModel from "../models/person";
import RoleModel from "../models/role"
import UserModel from "../models/user";
import { encrypt } from "../utils/bcrypt.handle";

export const createRoles = async () => {
    try {
        const countRoles = await RoleModel.estimatedDocumentCount();
        if (countRoles > 0) return;

        await Promise.all([
            new RoleModel({ name: 'user' }).save(),
            new RoleModel({ name: 'admin' }).save(),
        ])
    } catch (error) {
        console.error(error)
    }
}

export const createUserAndPerson = async () => {
    try {
        const countUser = await UserModel.estimatedDocumentCount();
        if (countUser > 0) return;

        const password = '12345'
        const roles = await RoleModel.find({});
        const newPersona = new PersonModel({name: 'Admin'});
        await newPersona.save();
        const passwordHash = await encrypt(password);
        const newUser = new UserModel({
            email: 'admin@gmail.com',
            password: passwordHash,
            person: newPersona._id,
            roles: roles.map((role) => role._id)
        });
        await newUser.save();

    } catch (error) {
        console.error(error)
    }
} 
import { Auth } from "../interfaces/auth.interface";
import { Person } from "../interfaces/person.interface"
import { User } from "../interfaces/user.interface";
import PersonModel from "../models/person";
import RoleModel from "../models/role";
import UserModel from "../models/user";
import { encrypt } from "../utils/bcrypt.handle";

const createUserByPerson = async ({ email, password, roles, person }: User) => {

    const checkIsPerson = await PersonModel.findOne({ _id: person._id });
    if (!checkIsPerson) return 'Person not exist';

    const checkIsUser = await UserModel.findOne({ email: email, person: person._id });
    if (checkIsUser) return 'User already exist';


    const passwordHash = await encrypt(password);
    if (roles) {
        const foundRoles = await RoleModel.find({ name: { $in: roles } });
        roles = foundRoles.map(role => role._id)
    } else {
        const role = await RoleModel.findOne({ name: 'user' });
        roles = [role!._id]
    }
    const responseUserRegister = await UserModel.create({ email, password: passwordHash, roles, person: person._id });
    return responseUserRegister;
}



const findPerson = async (id: string) => {
    const personFound = await UserModel.findOne({ _id: id }).populate('person');
    if (!personFound) return 'USER_NOT_FOUND';

    return personFound;
}
const findPersons = async () => {
    const personsFound = await UserModel.find().populate('person');
    return personsFound;
}

const updatePerson = async (id: string, userData: User, personData: Person) => {

    const newUser = await UserModel.findOneAndUpdate({ _id: id }, userData, { new: true });
    const newPerson = await PersonModel.findOneAndUpdate({ _id: newUser?.person }, personData, { new: true })
    if (!newUser) return 'USER_NOT_FOUND';
    if (!newPerson) return 'USER_NOT_FOUND';

    const response = {
        user: {
            "_id": newUser._id,
            "email": newUser.email,
            "password": newUser.password,
            "roles": newUser.roles,
        },
        person: {
            "_id": newPerson._id,
            "name": newPerson.name,
            "surname": newPerson.surname,
        }
    }
    return response;
}
const deletePerson = async (id: string) => {

    const response = await UserModel.findOneAndDelete({ _id: id });
    if (!response) return 'USER_NOT_FOUND';
    const responseMessage = 'User deleted';
    return responseMessage;
}

const createNewMember = async (userData: Auth, personData: Person) => {

    const userExist = await UserModel.findOne({ email: userData.email });
    if (userExist) return 'User already exist';

    const newPerson = await PersonModel.create(personData);
    const userRol = await RoleModel.findOne({ name: 'user' });
    const newUser = await UserModel.create({
        email: userData.email,
        password: userData.password,
        person: newPerson._id,
        roles: [userRol!._id],
    });

    const response = {
        user: newUser,
        person: newPerson
    }
    return response;
}



export { createUserByPerson, findPerson, findPersons, updatePerson, deletePerson, createNewMember };
